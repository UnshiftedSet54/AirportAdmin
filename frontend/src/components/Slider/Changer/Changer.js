import React from 'react';
import classes from './Changer.module.css';

const changer = (props) => {
    const changerClasses = [classes.Changer];
    if(props.isSelected) {
        changerClasses.push(classes.Selected);
    }
    
    return(
        <div 
            onClick={props.clicked}
            className={changerClasses.join(' ')} />
    );
};

export default changer;