import React, { useState } from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

const SearchResults = ({ searchResults, onAdd }) => {
    return(
        <div>
           <h2>Results</h2>
           <Tracklist
                tracks={searchResults}
                onAdd={onAdd}
                isRemoval={false}
           />
        </div>
    );
};

export default SearchResults;