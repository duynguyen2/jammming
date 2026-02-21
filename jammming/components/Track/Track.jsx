import React, { useCallback } from 'react';
import { useState, useEffect } from 'react-dom';
import Tracklist from '../Tracklist/Tracklist';

const Track = (props) => {
    const [track, setTrack] = useState('');

    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback(() => {
        props.onRemoval(props.track);
    }, [props.onRemoval, props.track]);

    return(
        <div>
            <div>
                <h3>{props.track.title}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
        </div>
    );
};

export default Track;