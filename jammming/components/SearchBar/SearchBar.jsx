import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchItem, setSearchItem] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchItem.trim()) {
            onSearch(searchItem);
        }
    };

    const handleSearchClick = () => {
        if(searchItem.trim()) {
            onSearch(searchItem.trim());
        }
    };

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }

    return (
        <div>
            <input
                value={searchItem}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter A Song, Album, or Artist"
            />
            <button onClick={handleSearchClick}>SEARCH</button>
        </div>
    );
};

export default SearchBar;