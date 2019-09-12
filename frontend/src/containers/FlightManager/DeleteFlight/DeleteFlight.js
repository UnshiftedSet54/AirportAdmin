import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import FlightViewer from '../../../components/FlightViewer/FlightViewer';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';

class deleteFlight extends Component {

    state = {
        deleted: null,
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

    deleteFlightHandler = (id) => {
        const url = '/Airport/Flights?id=' + id;
        const params = {
            method: 'DELETE'
        };
        fetch(url, params)
            .then(r => r.text())
            .then(data => this.setState({ deleted: data }));
    }


    render() {

        return (
            <Auxiliary>
                <FlightViewer
                    link='/FlightManager/delete'
                    loading={this.state.loading}
                    flights={this.state.flights} />
                <Route path={this.props.match.url + '/:id'} render={(props) => {
                    let info = (
                        <Auxiliary>
                            <h3>ARE YOU SURE YOU WANT TO REMOVE THIS FLIGHT? (id: {props.match.params.id})</h3>
                            <Button btntype="Danger" onClick={() => props.history.push('/FlightManager/delete')}>CANCEL</Button>
                            <Button btntype="Success" onClick={() => this.deleteFlightHandler(props.match.params.id)}>CONTINUE</Button>
                        </Auxiliary>
                    );
                    if (this.state.deleted)
                        info = <h2>{this.state.deleted}</h2>
                    return (
                        <Modal show={true} modalClosed={() => {
                            props.history.push('/FlightManager/delete')
                            window.location.reload();
                        }}>
                            {info}
                        </Modal>
                    );
                }} />
            </Auxiliary>
        )
    }
}


export default deleteFlight;