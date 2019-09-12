import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class Payment extends Component {
    state = {
        description: "Payment for the flight",
        cardHolder: "",
        cardHolderID: 0,
        cardNumber: 0,
        cVC: 0,
        expirationDate: {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        },
        submitDisabled: false
    }

    sendPaymentHandler = (e) => {
        let formData = new FormData();
        let month = this.state.expirationDate.month;
        if (month < 10 && month > 0) {
            month = '0' + month;
        }
        formData.append('Amount', this.props.amount);
        formData.append('Description', this.state.description);
        formData.append('CardHolder', this.state.cardHolder);
        formData.append('CardHolderID', this.state.cardHolderID);
        formData.append('CardNumber', this.state.cardNumber);
        formData.append('CVC', this.state.cVC);
        formData.append('ExpirationDate', month + '/' + this.state.expirationDate.year)
        formData.append('IP', 'localhost');
        formData.append('StatusId', 1);
        e.preventDefault();
        let params = {
            method: 'POST',
            body: formData
        }
        fetch('/Airport/Payment', params)
            .then(r => r.text())
            .then(data => {
                this.setState({ submitDisabled: false })
                alert(data)
            });
        this.setState({ submitDisabled: true })
    }

    render() {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let years = [];
        for (let i = new Date().getFullYear(); i < new Date().getFullYear() + 10; i++) {
            years.push(i);
        }
        console.log(this.state.submitDisabled)
        return (
            <Modal show={this.props.show}>
                <form>
                    <span>Nro. Tarjeta:</span><input onChange={(e) => this.setState({ cardNumber: e.target.value })} />
                    <br /><br />
                    <span>Cod. Seguridad:</span><input onChange={(e) => this.setState({ cVC: e.target.value })} />
                    <br /><br />
                    <span>Vencimiento:</span><select onChange={(e) => {
                        let year = this.state.expirationDate.year;
                        this.setState({ expirationDate: { year: year, month: e.target.value } })
                    }}>
                        {months.map(month => (
                            <option key={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={(e) => {
                        let month = this.state.expirationDate.month;
                        this.setState({ expirationDate: { month: month, year: e.target.value } })
                    }}>

                        {years.map(year => (
                            <option key={year}>{year}</option>
                        ))}
                    </select>
                    <br /><br />
                    <span>Nombre en la Tarjeta:</span><input onChange={(e) => this.setState({ cardHolder: e.target.value })} />
                    <br /><br />
                    <span>Cedula o RIF:</span><input onChange={(e) => this.setState({ cardHolderID: e.target.value })} />
                    <br /><br />
                    <strong>Monto:</strong><span>{this.props.amount}$</span>
                    <br /><br />
                    <Button disabled={this.state.submitDisabled} onClick={this.sendPaymentHandler}>Submit</Button>
                </form>
            </Modal>
        );
    }
}

export default Payment;