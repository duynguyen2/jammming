import React, { useCallback } from 'react';
import Tracklist from '../Tracklist/Tracklist';

const Playlists = (props) => {

    const handleNameChange = useCallback(event => {
        props.onNameChange(event.target.value);
    }, [props.onNameChange]);

    return (
        <div>
            <input onNameChange={handleNameChange} defaultValue={'New Playlist'} />
            <Tracklist
                tracklist={props.playlistTracks}
                isRemoval={true}
                onRemove={props.onRemove}
            />
            <button className='Save-Playlist' onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlists;