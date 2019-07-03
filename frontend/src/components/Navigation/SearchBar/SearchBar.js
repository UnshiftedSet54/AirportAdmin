import React from 'react';

import classes from './SearchBar.module.css';

const searchBar = (props) => {
    return(
        <input 
            className={classes.SearchBar}
            type="text" 
            placeholder="Search"/>
    );
};

export default searchBar;