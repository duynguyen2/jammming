import React from 'react';
import { useState, useEffect } from 'react-dom';
import Track from '../Track/Track';

const Tracklist = (props) => {
    const [tracklist, setTracklist] = useState();
    
    return (
        <div className='Tracklist'>
            {props.tracklist.map(track => {
                return(
                    <Track
                        track={track}
                        id={track.id}
                        onRemoval={props.onRemoval}
                    />
                );
            })}
        </div>
    );
};

export default Tracklist;