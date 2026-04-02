import { useCallback } from 'react';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = ({ name, playlistTracks, onRemove, onNameChange, onSave }) => {

    const handleNameChange = useCallback(event => {
        onNameChange(event.target.value);
    }, [onNameChange]);

    return (
        <div>
            <input
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />

            <Tracklist
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true}
            />

            <button onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;