import React, { useState, useCallback } from 'react';

const SearchBar = (props) => {
    const [searchItem, setSearchItem] = useState('');

    const handleItemChange = useCallback((event) => {
        setSearchItem(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        props.onSearch(searchItem);
    }, [props.onSearch, searchItem]);

    return (
        <div>
            <h3>Search:</h3>
            <input
                type='text'
                placeholder='Enter Song Name...'
                value={searchItem}
                onChange={handleItemChange}
                className='searchInput'
            />
            <button onClick={handleSearch}>SEARCH</button>
        </div>
    );
};

export default SearchBar;