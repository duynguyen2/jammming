import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    const [searchItem, setSearchItem] = useState('');

    const handleItemChange = useCallback((event) => {
        setSearchItem(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        props.onSearch(searchItem);
    }, [props.onSearch, searchItem]);

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            search();
        }
    };

    return (
        <div>
            <h3>Search:</h3>
            <input
                placeholder='Enter Song, Album, or Artist...'
                onChange={handleItemChange}
                onKeyDown={handleKeyDown}
            />
            <button className='searchButton' onClick={handleSearch}>SEARCH</button>
        </div>
    );
};

export default SearchBar;