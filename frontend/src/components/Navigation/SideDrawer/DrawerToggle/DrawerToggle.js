import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle}>
        <img className={classes.DrawerToggleImage} onClick={props.clicked} src={'/Airport/Assets/Icons/three-bars.svg'} alt=""></img>
    </div>
);

export default drawerToggle;