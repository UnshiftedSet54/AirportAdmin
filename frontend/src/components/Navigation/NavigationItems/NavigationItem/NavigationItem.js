import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    let classToUse = null;
    switch (props.orientation) {
        case 'row':
            classToUse = classes.NavigationItemRow
            break;
        case 'column':
            classToUse = classes.NavigationItemColumn
            break;
        default:
            classToUse = classes.NavigationItemRow;
            break;
    }
    return (
        <li className={classToUse}>
            <NavLink
                exact={props.exact}
                activeClassName={classes.active}
                to={props.link}>
                {props.children}</NavLink>
        </li>
    );

};

export default navigationItem;
