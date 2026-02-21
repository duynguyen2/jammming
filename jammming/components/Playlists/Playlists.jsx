import React from 'react';
import { useState, useEffect } from 'react-dom';

const Playlists = (props) => {
    const [playlist, setPlaylist] = useState('New Playlist');

    async function handleSave() {
        const trackIDs = props.tracks.map(t => t.id);
        props.createPlaylist(playlist, trackIDs);
    };

    return (
        <div>
            <></>
            <input onChange={e => setPlaylist(e.target.value)} placeholder={playlist} />
            <div>

            </div>
            <a>Add Playlist to Spotify</a>
        </div>
    );
};

export default Playlists;