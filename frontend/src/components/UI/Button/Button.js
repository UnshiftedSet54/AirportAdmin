import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    let classesToUse = [classes.Button];
    if(props.btntype) {
        classesToUse[1] = classes[props.btntype];
    }
    return (
        <button 
            className={classesToUse.join(' ')} 
            {...props}>{props.children}</button>
    );
};

export default button;