import { useCallback } from 'react';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = ({ name, tracks, onRemove, onNameChange, onSave }) => {

    return (
        <div>
            <input
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter playlist name"
            />

            <Tracklist
                tracks={tracks}
                onRemove={onRemove}
                isRemoval={true}
            />

            <button 
                onClick={onSave}
                disabled={!name || !tracks.length}
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;