import React from 'react';
import Track from '../Track/Track';
import './Tracklist.css';

const Tracklist = ({ tracks = [], onAdd, onRemove, isRemoval }) => {

    if(!tracks.length) return <p>No tracks to display</p>;
    
    return (
        <div>
            {tracks.map(track => {
                if (!track?.id) return null;

                return (
                    <Track
                        key={track.id}
                        track={track}
                        onAdd={isRemoval ? null : onAdd}
                        onRemove={isRemoval ? onRemove : null}
                        isRemoval={isRemoval}
                    />
                );
            })}
        </div>
    );
};

export default Tracklist;