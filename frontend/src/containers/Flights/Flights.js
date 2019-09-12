import React, { Component } from 'react';

import classes from './Flights.module.css';
import FlightFilter from '../../components/FlightFilter/FlightFilter';
import FlightViewer from '../../components/FlightViewer/FlightViewer';

class Flights extends Component {
    state = {
        flights: [],
        loading: true
    }

    componentDidMount() {
        const url = '/Airport/Flights';
        fetch(url, { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                const fetchedFlights = [];
                for (let key in data) {
                    fetchedFlights.push({
                        ...data[key],
                        id: key
                    });
                }
                this.setState({ flights: fetchedFlights, loading: false });
            })
    }

    setFilteredFlightsHandler = (params) => {
        this.setState({ loading: true });
        const url = `/Airport/FlightFilter?date=${params.departureDate}&month=${params.departureMonth}&year=${params.departureYear}&destination=${params.destination}`;
        fetch(url, { method: 'POST' })
            .then(r => {
                if (!r.ok) throw Error(r.statusText)
                return r.json();
            })
            .then(data => {
                const fetchedFlights = [];
                for (let key in data) {
                    fetchedFlights.push({
                        ...data[key],
                        id: key
                    });
                }
                this.setState({ flights: fetchedFlights, loading: false })
            })
    }

    render() {
        return (
            <div className={classes.Flights}>
                <FlightFilter filter={this.setFilteredFlightsHandler} />
                <div className={classes.FlightViewer}>
                    <FlightViewer
                        link='/flights'
                        loading={this.state.loading}
                        flights={this.state.flights} />
                </div>
            </div>
        );
    }
}

export default Flights;