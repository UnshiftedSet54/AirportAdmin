import React, { Component } from 'react';

import classes from './Editor.module.css';
import Button from '../../../../components/UI/Button/Button';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../../components/UI/Modal/Modal';

class Editor extends Component {
    state = {
        depart: {
            value: '',
            editing: false
        },
        destiny: '',
        dateDepart: '',
        timeOfDepart: '',
        timeOfArrival: '',
        price: 0,
        picture: '',
        description: '',
        estado: '',
        completed: {
            value: false,
            message: ''
        }
    }

    componentDidMount() {
        const url = '/Airport/Flights?id=' + this.props.match.params.id;
        const params = {
            method: 'GET'
        };
        fetch(url, params)
            .then(r => r.json())
            .then(data => {
                let updatedState = {
                    ...this.state
                };
                for (const key in data) {
                    updatedState[key] = {
                        value: data[key],
                        editing: false
                    }
                }
                this.setState({ ...updatedState });
            })
    }

    triggerEditionHandler = (field) => {
        const updatedState = {
            ...this.state
        };
        const updatedField = {
            ...this.state[field]
        };
        updatedField.editing = !updatedField.editing;
        updatedState[field] = updatedField;
        this.setState({ ...updatedState });
    }

    fieldChangedHandler = (field, event) => {
        const updatedState = {
            ...this.state
        };
        const updatedField = {
            ...this.state[field]
        }
        updatedField.value = event.target.value;
        updatedState[field] = updatedField;
        this.setState({ ...updatedState });
    }

    saveChangesHandler = () => {
        let fd = new FormData();
        fd.append('depart', this.state.depart.value);
        fd.append('destiny', this.state.destiny.value);
        fd.append('dateDepart', this.state.dateDepart.value);
        fd.append('timeOfDepart', this.state.timeOfDepart.value);
        fd.append('timeOfArrival', this.state.timeOfArrival.value);
        fd.append('price', this.state.price.value);
        fd.append('description', this.state.description.value);
        fd.append('estado', this.state.estado.value);
        fd.append('id', this.props.match.params.id);
        const url = '/Airport/Update';
        const params = {
            method: 'POST',
            body: fd
        };
        fetch(url, params)
            .then(r => r.text())
            .then(data => this.setState({
                completed: {
                    value: true,
                    message: data
                }
            }));
    }

    render() {
        let departure = (this.state.depart.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('depart')}
                value={this.state.depart.value}
                onChange={(e) => this.fieldChangedHandler('depart', e)} /> :
            <h2
                onClick={() => this.triggerEditionHandler('depart')}>{this.state.depart.value}</h2>)
        let destiny = (this.state.destiny.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('destiny')}
                value={this.state.destiny.value}
                onChange={(e) => this.fieldChangedHandler('destiny', e)} /> :
            <h2
                onClick={() => this.triggerEditionHandler('destiny')}>{this.state.destiny.value}</h2>)
        let estado = (this.state.estado.editing ?
            <select
                onBlur={() => this.triggerEditionHandler('estado')}
                value={this.state.estado.value}
                onChange={(e) => this.fieldChangedHandler('estado', e)}>
                <option>CANCELADO</option>
                <option>ON TIME</option>
                <option>RETRASADO</option></select> :
            <strong
                onClick={() => this.triggerEditionHandler('estado')}>{this.state.estado.value}</strong>)

        let dateDepart = (this.state.dateDepart.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('dateDepart')}
                value={this.state.dateDepart.value}
                onChange={(e) => this.fieldChangedHandler('dateDepart', e)} /> :
            <p
                onClick={() => this.triggerEditionHandler('dateDepart')}>{this.state.dateDepart.value}</p>)
        let timeOfDepart = (this.state.timeOfDepart.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('timeOfDepart')}
                value={this.state.timeOfDepart.value}
                onChange={(e) => this.fieldChangedHandler('timeOfDepart', e)} /> :
            <p
                onClick={() => this.triggerEditionHandler('timeOfDepart')}>{this.state.timeOfDepart.value}</p>)
        let timeOfArrival = (this.state.timeOfArrival.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('timeOfArrival')}
                value={this.state.timeOfArrival.value}
                onChange={(e) => this.fieldChangedHandler('timeOfArrival', e)} /> :
            <p
                onClick={() => this.triggerEditionHandler('timeOfArrival')}>{this.state.timeOfArrival.value}</p>)
        let price = (this.state.price.editing ?
            <input
                onBlur={() => this.triggerEditionHandler('price')}
                value={this.state.price.value}
                onChange={(e) => this.fieldChangedHandler('price', e)} /> :
            <p
                onClick={() => this.triggerEditionHandler('price')}>{this.state.price.value}</p>)
        let description = (this.state.description.editing ?
            <textarea
                onBlur={() => this.triggerEditionHandler('description')}
                value={this.state.description.value}
                onChange={(e) => this.fieldChangedHandler('description', e)} /> :
            <p
                onClick={() => this.triggerEditionHandler('description')}>{this.state.description.value}</p>)

        return (
            <Auxiliary>
                <Modal
                    show={this.state.completed.value}
                    modalClosed={() => this.setState({
                        completed: {
                            value: false,
                            message: ''
                        }
                    })}>{this.state.completed.message}</Modal>
                <div className={classes.Info}>
                    {departure}----{destiny}
                    {estado}
                    <br />
                    <div style={{ display: 'flex' }}>
                        <img src='/Airport/Assets/DEFAULT/vuelo.jpg'
                            className={classes.Pic}
                            alt='Flight' />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong>Date of Departure:</strong>{dateDepart}
                            <strong>Time of Departure:</strong>{timeOfDepart}
                            <strong>Time of Arrival:</strong>{timeOfArrival}
                            <strong>Price:</strong>{price}
                        </div>
                    </div>
                    {description}
                    <Button onClick={this.saveChangesHandler}>SAVE</Button>
                </div>
            </Auxiliary>
        )
    }
}

export default Editor;