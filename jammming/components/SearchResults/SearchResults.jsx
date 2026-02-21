import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

const SearchResults = (props) => {

    return(
        <div>
            <h2>Results:</h2>
            <Tracklist
                tracks={props.SearchResults}
                onAdd={props.onAdd}
            />
        </div>
    );
};

export default SearchResults;