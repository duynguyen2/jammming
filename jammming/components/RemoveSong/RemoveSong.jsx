import React from 'react';
import { useState, useEffect } from 'react-dom';
import Playlists from '../Playlists/Playlists';

const RemoveSong = ({ songName }) => {
    const [song, setSong] = useState(songName);

    useEffect(() => {

    }, [song]);

    return (
        <></>
    );
};

export default RemoveSong;