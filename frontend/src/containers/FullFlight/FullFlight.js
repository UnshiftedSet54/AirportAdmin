import React, { Component } from 'react';

import classes from './FullFlight.module.css';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import CheckoutSummary from '../../components/Flight/CheckoutSummary/CheckoutSummary';
import Payment from '../Payment/Payment';

class FullFlight extends Component {
    state = {
        info: {
            dateDepart: '',
            timeOfDepart: '',
            timeOfArrival: '',
            depart: '',
            destiny: '',
            picture: '',
            price: 0,
            description: ''
        },
        purchasing: false,
        purchasingContinue: false
    }

    componentDidMount() {
        fetch('/Airport/Flights?id=' + this.props.match.params.flightId)
            .then(r => r.json())
            .then(data => this.setState({ info: { ...data } }));
    }

    clickBuyHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        //alert('PURCHASE CONTINUED');
        this.setState({ purchasing: false, purchasingContinue: true });
    }

    render() {

        return (
            <div className={classes.FullFlight}>
                <Payment
                    show={this.state.purchasingContinue}
                    amount={this.state.info.price} />
                <Modal show={this.state.purchasing}>
                    <CheckoutSummary
                        info={this.state.info}
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler} />
                </Modal>

                <div className={classes.Content}>
                    <img src={this.state.info.picture} alt="flightDestination" />
                    <div style={{
                        width: '60%',
                        boxSizing: 'border-box',
                        padding: '16px 16px',
                        textAlign: 'center'
                    }}>
                        <h2>{this.state.info.depart + '-' + this.state.info.destiny}</h2>
                        <p><strong>Date of Departure:</strong> {this.state.info.dateDepart.substr(0, 11)}</p>
                        <p><strong>Time of Departure:</strong> {this.state.info.timeOfDepart.substr(11)}</p>
                        <p><strong>Time of Arrival:</strong> {this.state.info.timeOfArrival.substr(11)}</p>
                        <p><strong>From:</strong> {this.state.info.depart}</p>
                        <p><strong>To:</strong> {this.state.info.destiny}</p>
                        <p><strong>Price:</strong> {this.state.info.price}$</p>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', flexFlow: 'column', color: 'white' }}>
                    <h3 style={{ color: '#db7500', fontSize: '1.5rem' }}>Descripcion</h3>
                    <p>{this.state.info.description}</p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button onClick={this.clickBuyHandler}>BUY!</Button>
                </div>
            </div>
        );
    }
}

export default FullFlight;