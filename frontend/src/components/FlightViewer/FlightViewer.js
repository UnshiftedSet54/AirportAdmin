import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FlightViewer.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../UI/Spinner/Spinner';
import Flight from './Flight/Flight';

const flightViewer = (props) => {
        let flights = <Auxiliary><div style={{ height: '10%' }} /><Spinner /></Auxiliary>
        if (!props.loading && props.flights.length !== 0) {
            flights = props.flights.map(flight => {
                if (flight.estado !== 'CANCELADO') {
                    return (
                        <Link to={props.link + '/' + flight.id} key={flight.id}>
                            <Flight
                                flightId={flight.id}
                                dateDepart={flight.dateDepart}
                                depart={flight.depart}
                                destiny={flight.destiny}
                                picture={flight.picture}
                                description={flight.description} />
                        </Link>
                    )
                }
                return null;
            })
        }
        else if(!props.loading && props.flights.length === 0)
            flights = <h1>There are no flights available, We're sorry.</h1>
        return (
            <div className = {classes.FlightViewer}>
                {flights}
            </div>
        );
}

export default flightViewer;