import React from 'react';

import classes from './Toolbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import NavigationItems from '../NavigationItems/NavigationsItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.openSideDrawer} />
            <nav className={classes.DesktopOnly}>
                <NavigationItems
                    orientation="row" 
                    items={props.items} />
            </nav>
            <SearchBar />
        </header>
    );
};

export default toolbar;