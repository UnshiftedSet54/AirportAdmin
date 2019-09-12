import React from 'react';

import classes from './SearchBar.module.css';

const searchBar = (props) => {
    return (
        <div className={classes.SearchBarContainer}>
            <input
                className={classes.SearchBar}
                type="text"
                placeholder="Search" />
        </div>
    );
};

export default searchBar;