import React from 'react';

import classes from './UserOptions.module.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationsItems';

const userOptions = (props) => {
    let classesToUserOps = [classes.UserOptions, classes.Closed];
    let classesToToggler = [classes.Toggler, classes.TogOpen];
    if (props.show) {
        classesToUserOps[1] = classes.Open;
        classesToToggler[1] = classes.TogClosed;
    }
    return (
        <div className={classes.Container} >
            <div
                onClick={props.toggleUserOps}
                className={classesToToggler.join(' ')} />
                
            <div 
                className={classesToUserOps.join(' ')}>
                {props.show ? <nav onClick={props.clicked} >
                    <NavigationItems
                        orientation="column"
                        items={props.items} />
                </nav> : null}
            </div>
        </div>



    );
}

export default userOptions;