import React from 'react';
import './Track.css';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {

    if(!track) return null;

    const handleClick = () => {
        if(isRemoval && onRemove) {
            onRemove(track);
        } else if (!isRemoval && onAdd) {
            onAdd(track);
        }
    };

    return(
        <div>
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            <button
                onClick={handleClick}
                disabled={isRemoval ? !onRemove : !onAdd}
            >
                {isRemoval ? '-' : '+'}
            </button>
        </div>
    );
};

export default Track;