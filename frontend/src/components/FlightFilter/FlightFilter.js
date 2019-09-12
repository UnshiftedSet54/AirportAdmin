import React, { Component } from 'react';

import classes from './FlightFilter.module.css';
import DateSelector from './DateSelector/DateSelector';
import Input from '../UI/Input/Input';

class FlightFilter extends Component {
    departureSelectorRef = null;
    state = {
        open: false,
        destination: {
            elementType: 'select',
            elementConfig: {
                placeholder: 'Destination',
                options: [
                    { value: 'PANAMA', displayValue: 'Panama' },
                    { value: 'NEW YORK', displayValue: 'Nueva York' },
                    { value: 'BOGOTA', displayValue: 'Bogota' },
                    { value: 'MIAMI', displayValue: 'Miami' },
                    { value: 'SANTIAGO DE CHILE', displayValue: 'Santiago de chile' }
                ]
            },
            value: 'NEW YORK',
            validation: {},
            valid: false,
        }
    }

    filterFlightsHandler = () => {
        const departure = this.departureSelectorRef.getDate();
        const params = {
            departureDate: departure.getUTCDate(),
            departureMonth: departure.getUTCMonth() + 1,
            departureYear: departure.getUTCFullYear(),
            destination: this.state.destination.value
        }
        this.props.filter(params);
    }
    toggleFilterHandler = () => {
        this.setState(prevState => ({ open: !prevState.open }));
    }

    fieldChanged = (event, inputId) => {
        const updatedState = {
            ...this.state
        };
        const updatedInput = updatedState[inputId];
        updatedInput.value = event.target.value;
        updatedState[inputId] = updatedInput;
        this.setState({ updatedState });
    }

    render() {
        let classesToUse = [classes.FlightFilter, classes.Close];
        if (this.state.open) {
            classesToUse[1] = classes.Open
        }
        const filterBarStyle = {
            backgroundColor: '#aaa',
            position: 'relative',
            top: '45%',
            width: '10%',
            height: '40px',
        }
        return (
            <div className={classes.FilterContainer + ' ' + classesToUse[1]}>
                <div className={classes.FlightFilter}>
                    <DateSelector
                        label="Departure"
                        ref={ref => this.departureSelectorRef = ref} />
                    <Input
                        label={this.state.destination.elementConfig.placeholder + ':'}
                        elementType={this.state.destination.elementType}
                        elementConfig={this.state.destination.elementConfig}
                        value={this.state.destination.value}
                        invalid={!this.state.destination.valid}
                        shouldValidate={this.state.destination.validation}
                        changed={(event) => this.fieldChanged(event, 'destination')} />
                    <button
                        className={classes.FilterButton}
                        onClick={this.filterFlightsHandler}>FILTER</button>
                </div>
                <div className={classes.Toggler} onClick={this.toggleFilterHandler}>
                    <div style={filterBarStyle} />
                    <div style={filterBarStyle} />
                    <div style={filterBarStyle} />
                </div>

            </div>

        );
    }
}

export default FlightFilter;