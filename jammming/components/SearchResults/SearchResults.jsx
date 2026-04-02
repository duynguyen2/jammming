import React from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

const SearchResults = (props) => {

    return(
        <div className='searhResults'>
            <h2>Results:</h2>
            <Tracklist
                tracklist={props.SearchResults}
                onAdd={props.onAdd}
                isRemoval={false}
            />
        </div>
    );
};

export default SearchResults;