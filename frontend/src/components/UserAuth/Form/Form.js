import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Form.module.css';
import Input from '../../UI/Input/Input';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

const loginForm = (props) => {
    const formElements = [];
    for (let key in props.formItems) {
        formElements.push({
            id: key,
            config: props.formItems[key]
        })
    }
    const classesToUse = [classes.Form];
    if (props.formType === 'login') {
        classesToUse[1] = classes.Login
    }
    else if (props.formType === 'register') {
        classesToUse[2] = classes.Register
    }
    let form = (
        <form className={classesToUse.join(' ')} onSubmit={props.send}>
            {formElements.map(formElement => {
                return (
                    <Auxiliary key={formElement.id}>
                        <Input
                            label={formElement.config.elementConfig.placeholder + ':'}
                            elementType={formElement.config.elementType}
                            elementConfig={{ ...formElement.config.elementConfig, name: formElement.id }}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => props.fieldChanged(event, formElement.id)} />
                    </Auxiliary>
                )
            })}
            <NavLink className={classes.NavLink} to="/recover">Forgot your password?</NavLink>
            <Button style={{ margin: '15px auto' }} disabled={!props.formIsValid}>{props.formType}</Button>
        </form>
    );
    const divStyle = {
        width: '20px',
        height: '30px',
        display: 'block'
    }

    if (props.formType === 'login') {
        return (
            <Auxiliary>
                <div className={classes.Container}>
                    <h1 className={classes.LoginTitle}>Login</h1>
                    <Modal show={props.loading}><div style={divStyle} /><Spinner /><div style={divStyle} /></Modal>
                    {form}
                </div>
            </Auxiliary>
        );
    }
    else if (props.formType === 'register') {
        return (
            <Auxiliary>
                <div className={classes.Container}>
                    <h1 className={classes.LoginTitle}>Register</h1>
                    <Modal show={props.loading}><div style={divStyle} /><Spinner /><div style={divStyle} /></Modal>
                    {form}
                </div>
            </Auxiliary>
        );
    }
};

export default loginForm;