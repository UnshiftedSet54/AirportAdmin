import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const items = [];
    for ( let key in props.items ) {
        items.push(props.items[key]);
        props.items[key].name = key;
    }
    const itemsToBeDisplayed = (
        items.map(item => {
            return (
                <NavigationItem
                    key={item.name}
                    exact={item.exact} 
                    link={item.link}
                    orientation={props.orientation}>{item.name}</NavigationItem>
            );
        })
    );
    let classToUse = null;
    switch( props.orientation ) {
        case 'row':
            classToUse = classes.NavigationItemsRow
            break;
        case 'column':
            classToUse = classes.NavigationItemsColumn
            break;
        default:
            classToUse = classes.NavigationItemsRow;
            break;
    }
    return(
        <ul className={classToUse}>
            {itemsToBeDisplayed}
        </ul>
    );
};

export default navigationItems;