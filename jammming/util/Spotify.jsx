const clientId = 'CLIENT_ID';
const redirectUri = 'http://127.0.0.1:5173/';

let accessToken = localStorage.getItem('access_token') || '';
let tokenExpiration = Number(localStorage.getItem('token_expiration')) || 0;

// PKCE HELPERS
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => possible[x % possible.length])
    .join('');
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// SPOTIFY OBJECT
const Spotify = {

  async getAccessToken() {
    const now = Date.now();

    if(accessToken && now < tokenExpiration) {
      return accessToken;
    }

    const storedToken = localStorage.getItem('access_token');
    const expiration = localStorage.getItem('token_expiration');

    if(storedToken && now < expiration) {
      accessToken = storedToken;
      tokenExpiration = expiration;
      return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // If we have a code, exchange it for a token
    if (code) {
      const codeVerifier = localStorage.getItem('code_verifier');

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      if(!response.ok) throw new Error('Token request failed!');

      const data = await response.json();
      accessToken = data.access_token;

      const expiresIn = data.expires_in * 1000;
      tokenExpiration = Date.now() + expiresIn;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('token_expiration', tokenExpiration);

      // Clean URL
      window.history.pushState({}, document.title, "/");

      return accessToken;
    }

    // No token, redirect to Spotify login
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);

    console.log('CODE:', code);
    console.log('CODE VERIFIER:', codeVerifier);

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=playlist-modify-public playlist-modify-private user-read-email` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;

    console.log('CODE:', code);
    console.log('CODE VERIFIER:', codeVerifier);

    window.location = authUrl;
  },

  async search(term) {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch(e) {
      console.error('Search error:', e);
      return [];
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    console.log('TOKEN EXPIRATION:', tokenExpiration);
    console.log('NOW:', Date.now());
    console.log('IS VALID:', Date.now() < tokenExpiration);

    try {
      const token = await this.getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };

      // Get user ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
      const userData = await userResponse.json();
      const userId = userData.id;

      // Create playlist
      const createResponse = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name,
            description: 'Created with Jammming',
            public: true
          })
        }
      );

      if(!createResponse.ok) {
        const err = await createResponse.json();
        console.error('Failed to create playlist:', err);
        throw new Error('Failed to create playlist!');
      }

      const playlistData = await createResponse.json();
      console.log('Created playlist ID:', playlistData.id);

      // Add tracks
      const addResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: trackUris })
        }
      );

      if(!addResponse.ok) {
        const err = await addResponse.json();
        console.error('ADD TRACKS ERROR FULL:', err);
        throw new Error(err.error?.message || 'Failed to add tracks');
      }

    } catch(e) {
      console.error('Save playlist error:', e);
    }
  }

};



export default Spotify;