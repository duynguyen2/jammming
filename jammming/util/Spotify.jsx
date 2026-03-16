const clientID = 'ADD_YOUR_CLIENTID';
const redirectURI = 'http://127.0.0.1:5173/callback';

let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        // Check for access token match in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // This clears the parameters, allowing us to grab a new token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); 
            return accessToken;
        } else {
            // Use the updated redirectUri here
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(searchItem) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchItem}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        });
    },

    async savePlaylist(name, trackURIs) {
        if(!name || !trackURIs.length) return;

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        const userResponse = await fetch('http://api.spotify.com/v1/me', { headers });
        const userData = await userResponse.json();
        let userID = userData.id;

        const createResponse = await fetch(`https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide9`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: name, public: false})
        });

        const playlistData = await createResponse.json();
        const playlistId = playlistData.id;

        return await fetch(`https://api.spotify.com/v1/users/${playlistId}/items`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ uris: trackURIs })
        });
    }
};

export default Spotify;