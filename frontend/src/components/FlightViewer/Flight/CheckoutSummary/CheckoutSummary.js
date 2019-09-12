import React from 'react';

import classes from './CheckoutSummary.module.css';
import Button from '../../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <strong>YOU ARE ABOUT TO PURCHASE THE FOLLOWING</strong>
            <p><strong>Date of Departure:</strong> {props.info.dateDepart.substr(0, 11)}</p>
            <p><strong>Time of Departure:</strong> {props.info.timeOfDepart.substr(11)}</p>
            <p><strong>Time of Arrival:</strong> {props.info.timeOfArrival.substr(11)}</p>
            <p><strong>From:</strong> {props.info.depart}</p>
            <p><strong>To:</strong> {props.info.destiny}</p>
            <p><strong>Price:</strong> {props.info.price}$</p>
            <Button btntype="Danger" onClick={props.cancel}>CANCEL</Button>
            <Button btntype="Success" onClick={props.continue}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;