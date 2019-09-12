import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './Window.module.css';
import Form from '../../UserAuth/Form/Form';
import Modal from '../Modal/Modal';

class Window extends Component {
    backEndPort = 9000;
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 100
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            }
        },
        registerForm: {
            accountType: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Acccount Type',
                    options: [
                        { value: 'USER', displayValue: 'User' },
                        { value: 'ADMIN', displayValue: 'Admin' }
                    ]
                },
                value: 'User',
                validation: {},
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 40
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 17
                },
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                validation: {
                    required: true,
                    maxLength: 40
                },
                value: '',
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name*'
                },
                validation: {
                    required: true,
                    maxLength: 40
                },
                value: '',
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number*'
                },
                validation: {
                    required: true,
                    maxLength: 20
                },
                value: '',
                valid: false,
                touched: false
            }
        },
        loading: false,
        error: null,
        formIsValid: false
    }

    sendLoginInfo = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const data = {};
        for (let key in this.state.loginForm) {
            data[key] = this.state.loginForm[key].value;
        }
        this.sendToServer('/Airport/Login', 'POST', data);
    }

    sendRegisterInfo = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const data = {};
        for (let key in this.state.registerForm) {
            data[key] = this.state.registerForm[key].value;
        }
        this.sendToServer('/Airport/Register', 'POST', data)
    }

    sendToServer = (url, method, data) => {

        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        const params = {
            method: method,
            body: formData
        }
        fetch(url, params)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                return res.text();
            })
            .then(data => {
                if (data.startsWith('Incorrect')) {
                    this.setState({ error: data, loading: false });
                }
                else {
                    this.props.history.push('/');
                    this.props.authenticate();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid;
        }
        if (value.length <= rules.minLength || value.length >= rules.maxLength) {
            isValid = false
        }
        return isValid;
    }

    loginInputChangedHandler = (event, inputId) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdent in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdent].valid && formIsValid;
        }
        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    registerInputChangedHandler = (event, inputId) => {
        const updatedRegisterForm = {
            ...this.state.registerForm
        };
        const updatedFormElement = {
            ...updatedRegisterForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdent in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdent].valid && formIsValid;
        }
        this.setState({ registerForm: updatedRegisterForm, formIsValid: formIsValid });
    }

    render() {
        let errorWindow = null;
        if (this.state.error) {
            errorWindow = <Modal show={true} modalClosed={() => {
                this.setState({ error: null })
            }}><p style={{color: 'red'}}>{this.state.error}</p></Modal>;
        }
        return (
            <div className={classes.Window}>
                {errorWindow}
                <Switch>
                    <Route
                        path="/Login"
                        exact
                        render={() =>
                            <Form
                                formType="login"
                                formItems={this.state.loginForm}
                                loading={this.state.loading}
                                send={this.sendLoginInfo}
                                fieldChanged={this.loginInputChangedHandler}
                                formIsValid={this.state.formIsValid} />
                        } />
                    <Route
                        path="/Register"
                        exact
                        render={() =>
                            <Form
                                formType="register"
                                formItems={this.state.registerForm}
                                loading={this.state.loading}
                                send={this.sendRegisterInfo}
                                fieldChanged={this.registerInputChangedHandler}
                                formIsValid={this.state.formIsValid} />
                        } />
                </Switch>
            </div>
        );
    }
}

export default Window;