import React, { useState } from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

const SearchResults = ({ searchResults, onAdd }) => {
    const [term, setTerm] = useState('');

    return(
        <div>
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
                    <Tracklist
                        tracks={searchResults}
                        onAdd={onAdd}
                        isRemoval={false}
                    />
            <button onClick={() => onSearch(term)}>SEARCH</button>
        </div>
    );
};

export default SearchResults;