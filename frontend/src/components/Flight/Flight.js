import React from 'react';


import classes from './Flight.module.css';

const flight = (props) => {
    //let date = new Date().setDate(props.dateDepart);
    return (
        <div className={classes.Flight}>
            <img src={props.picture} alt="destiny"></img>
            <div className={classes.FlightHead}>
                <p style={{ textAlign: 'center', margin: '0' }}>
                    <strong>{props.dateDepart.substring(0, 11)}</strong>
                </p>
                <p style={{ textAlign: 'center', margin: '0' }}><strong>{props.depart}-{props.destiny}</strong></p>
                <p>{props.description}</p>
            </div>
        </div>
    );
}





export default flight;