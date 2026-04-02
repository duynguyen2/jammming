import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchItem, setSearchItem] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchItem);
        }
    };

    const handleSearchClick = () => {
        onSearch(searchItem);
    };

    return (
        <div>
            <input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter A Song, Album, or Artist"
            />
            <button onClick={handleSearchClick}>SEARCH</button>
        </div>
    );
};

export default SearchBar;