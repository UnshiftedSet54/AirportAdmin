import React from 'react';

import classes from './UserOptions.module.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationsItems';

const userOptions = (props) => {
    return (
        <div className={classes.Container} >
            <div
                className={classes.UserOptions}>
                <nav onClick={props.clicked} >
                    <NavigationItems
                        orientation="column"
                        items={props.items} />
                </nav>
            </div>
        </div>



    );
}

export default userOptions;