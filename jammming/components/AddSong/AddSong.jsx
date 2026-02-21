import React from 'react';
import { useState, useEffect } from 'react-dom';

const AddSong = ({ songName }) => {
    const [song, setSong] = useState('');

    useEffect(() => {

    }, [song]);

    return(
        <>
        </>
    );
};

export default AddSong;