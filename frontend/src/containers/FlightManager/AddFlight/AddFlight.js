import React, { Component } from 'react';

import classes from './AddFlight.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';

class AddFlight extends Component {
    state = {
        airline: {
            label: 'Flight Airline: ',
            elementType: 'select',
            elementConfig: {
                placeholder: 'Flight Airline',
                options: []
            },
            value: '',
            validation: {},
            valid: true
        },
        departurePlace: {
            label: 'Departs From:',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'eg. Caracas'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: ''
        },
        destinyPlace: {
            label: 'Arrives To:',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'eg. Panama'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: ''
        },
        flightCapacity: {
            label: 'Flight Capacity:',
            elementType: 'input',
            elementConfig: {
                min: 100,
                max: 500,
                type: 'number',
                placeholder: 'eg. 200'
            },
            value: '',
            validation: {},
            valid: false
        },
        dateOfDeparture: {
            label: 'Date of Departure:',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'eg. YYYY-MM-DD'
            },
            value: '',
            validation: {
                required: true,
                minLength: 9,
                maxLength: 11
            },
            valid: false,
            touched: false,
            error: ''
        },
        timeOfDeparture: {
            label: 'Time of Departure:',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'eg. 22:30 eg. 08:15'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 6
            },
            valid: false,
            touched: false,
            error: ''
        },
        timeOfArrival: {
            label: 'Time of Arrival:',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'eg. 22:30 eg. 08:15'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 6
            },
            valid: false,
            touched: false,
            error: ''
        },
        flightDescription: {
            label: 'Flight Description:',
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'eg. a flight for enjoying in family!'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: ''
        },
        price: {
            label: 'Price: ',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'eg. 100.00'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            error: ''
        },
        added: {
            value: false,
            valid: true
        }
    }

    componentDidMount() {
        const url = '/Airport/Airline';
        fetch(url, { method: 'GET' })
            .then(r => r.json())
            .then(data => {
                const airlines = [];
                for (let key in data) {
                    airlines.push({ displayValue: data[key].name, value: key });
                }
                const updatedState = { ...this.state };
                const updatedInfoElement = { ...updatedState['airline'] };
                updatedInfoElement.elementConfig.options = airlines;
                updatedInfoElement.value = updatedInfoElement.elementConfig.options[0].value;
                updatedState['airline'] = updatedInfoElement;
                this.setState({ airline: updatedInfoElement });
            })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        let error = '';
        if (rules.required) {
            if (!(value.trim() !== '' && isValid)) {
                isValid = false;
                error = 'This field can\'t be empty';
            }
        }
        if (value.length <= rules.minLength || value.length >= rules.maxLength) {
            if (value.length <= rules.minLength) {
                error = 'Must be longer!';
            }
            else if (value.length >= rules.maxLength) {
                error = 'Must be shorter!';
            }
            isValid = false
        }
        return { isValid, error };
    }

    fieldChanged = (event, fieldId) => {
        const updatedState = {
            ...this.state
        };
        const updatedInfoElement = {
            ...updatedState[fieldId]
        }
        const fieldValidity = this.checkValidity(event.target.value, updatedInfoElement.validation);
        updatedInfoElement.value = event.target.value;
        updatedInfoElement.valid = fieldValidity.isValid;
        updatedInfoElement.error = fieldValidity.error;
        updatedInfoElement.touched = true;
        updatedState[fieldId] = updatedInfoElement;
        this.setState({ ...updatedState })
    }

    addFlightHandler = () => {
        const fd = new FormData();
        fd.append('airlineId', this.state.airline.value);
        fd.append('capacity', this.state.flightCapacity.value);
        fd.append('dateOfDepart', this.state.dateOfDeparture.value);
        fd.append('timeOfDepart', this.state.timeOfDeparture.value);
        fd.append('timeOfArrival', this.state.timeOfArrival.value);
        fd.append('placeOfDepart', this.state.departurePlace.value);
        fd.append('placeOfArrival', this.state.destinyPlace.value);
        fd.append('price', this.state.price.value);
        fd.append('description', this.state.flightDescription.value);
        const url = '/Airport/Insert';
        const params = {
            method: 'POST',
            body: fd
        };
        fetch(url, params)
            .then(r => r.text())
            .then(data => this.setState({ added: { value: true, valid: true } }));
    }

    render() {
        console.log('oerri');
        let validFlight = true;
        const flightInfo = [];
        for (let key in this.state) {
            flightInfo.push({
                id: key,
                config: this.state[key]
            });
            validFlight = this.state[key].valid && validFlight;
        }
        return (
            <div className={classes.AddFlight}>
                <Modal show={this.state.added.value} modalClosed={() => this.setState({ added: { value: false, valid: true } })}>Flight added successfully!</Modal>
                <div>
                    {flightInfo.map(info => {
                        if (info.id !== 'added')
                            return (<Auxiliary key={info.id}>
                                <Input
                                    label={info.config.label}
                                    elementType={info.config.elementType}
                                    elementConfig={{ ...info.config.elementConfig, name: info.id }}
                                    value={info.config.value}
                                    invalid={!info.config.valid}
                                    shouldValidate={info.config.validation}
                                    touched={info.config.touched}
                                    changed={(event) => this.fieldChanged(event, info.id)}
                                    error={info.config.error} />
                            </Auxiliary>);
                        return null;
                    })}

                </div>
                <Button disabled={!validFlight} onClick={this.addFlightHandler}>Add Flight</Button>
            </div>
        );
    }
}

export default AddFlight;