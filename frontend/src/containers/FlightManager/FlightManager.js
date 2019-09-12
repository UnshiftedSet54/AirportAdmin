import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import classes from './FlightManager.module.css';
import AddFlight from './AddFlight/AddFlight';
import EditFlight from './EditFlight/EditFlight';
import DeleteFlight from './DeleteFlight/DeleteFlight';

class FlightManager extends Component {
    state = {
        options: [
            {
                display: 'Add Flight',
                link: '/FlightManager/add'
            },
            {
                display: 'Remove Flight',
                link: '/FlightManager/delete'
            },
            {
                display: 'Edit Flight',
                link: '/FlightManager/edit'
            }
        ]
    }

    componentWillMount() {
        fetch('/Airport/EndPoint?q=checkAuth')
            .then(r => r.json())
            .then(data => {
                if (!data.userIsAuth)
                    this.props.history.push('/login');

            })
    }

    render() {
        console.log(this.props.match.url);
        return (
            <div className={classes.FlightManager}>
                <div className={classes.OptionsContainer}>
                    <ul className={classes.OptionsList}>
                        {this.state.options.map(option => (
                            <li
                                key={option.display}
                                className={classes.Option}>
                                <NavLink
                                    exact
                                    activeClassName={classes.active}
                                    to={option.link}>{option.display}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes.Content}>
                    <Switch>
                        <Route path="/FlightManager/add" component={AddFlight} />
                        <Route path={this.props.match.url + '/edit'} component={EditFlight} />
                        <Route path={this.props.match.url + '/delete'} component={DeleteFlight} />
                    </Switch>
                </div>
            </div>
        );

    }
}

export default FlightManager;