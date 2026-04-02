import { generateCodeVerifier, generateCodeChallenge } from "../src/pkce";

const clientID = 'YOUR_CLIENT_ID';
const redirectURI = 'http://127.0.0.1:5173/callback';

let accessToken;

const Spotify = {
    async getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        // If no code → redirect to Spotify
        if (!code) {
        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem('code_verifier', verifier);

        const scope = 'playlist-modify-public playlist-modify-private';

        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&code_challenge_method=S256` +
            `&code_challenge=${challenge}`;

        window.location = authUrl;
        return;
        }

        // Exchange code for token
        const verifier = localStorage.getItem('code_verifier');

        const body = new URLSearchParams({
        client_id: clientID,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURI,
        code_verifier: verifier
        });

        const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
        });

        const data = await response.json();
        accessToken = data.access_token;

        // Clean URL
        window.history.replaceState({}, document.title, '/');

        return accessToken;
    },

    async search(searchItem) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchItem}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        const jsonResponse = await response.json();
        if(!jsonResponse.tracks) return [];

        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    async savePlaylist(name, trackURIs) {
        if(!name || !trackURIs.length) return;

        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        const userResponse = await fetch('http://api.spotify.com/v1/me', { headers });
        const userData = await userResponse.json();
        let userID = userData.id;

        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-type': 'applications/json'
            },
            body: JSON.stringify({ name })
        });

        const playlistData = await createResponse.json();
        const playlistId = playlistData.id;

        return await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-type': 'applications/json'
            },
            body: JSON.stringify({ trackURIs })
        });
    }
};

export default Spotify;