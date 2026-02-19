import React from 'react';
import { useState, useEffect } from 'react-dom';

const SearchBar = ({ data, filterData }) => {
    const [searchItem, setSearchItem] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSearchItem(value);
        filterData(value, data);
    };

    return (
        <div>
            <h3>Search:</h3>
            <input
                type='text'
                placeholder='Song Name'
                value={searchItem}
                onChange={handleInputChange}
                className='search_input'
            />
        </div>
    );
};

export default SearchBar;