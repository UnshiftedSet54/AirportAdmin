import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Editor from './Editor/Editor';
import FlightViewer from '../../../components/FlightViewer/FlightViewer';

class EditFlight extends Component {

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
    render() {
        return (
            <Auxiliary>
                <Switch>
                    <Route path='/FlightManager/edit' exact render={() => (
                        <FlightViewer
                            link='/FlightManager/edit'
                            loading={this.state.loading}
                            flights={this.state.flights} />
                    )} />
                    <Route path='/FlightManager/edit/:id' component={Editor} />
                </Switch>
            </Auxiliary>
        )
    }


};

export default EditFlight;