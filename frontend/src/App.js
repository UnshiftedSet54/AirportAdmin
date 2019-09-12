import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Window from './components/UI/Window/Window';
import Flights from './containers/Flights/Flights';
import FlightManager from './containers/FlightManager/FlightManager';
import FullFlight from './containers/FullFlight/FullFlight';
import Mapa from './containers/Map/Map';

class App extends Component {
  state = {
    userIsAuth: false
  }

  authUser = () => {
    this.setState({ userIsAuth: true });
  }

  componentDidMount() {
    fetch('/Airport/EndPoint?q=checkAuth')
      .then(r => r.json())
      .then(data => this.setState({ userIsAuth: data.userIsAuth }))
  }

  render() {
    return (
      <div className="App">
        <Layout userIsAuth={this.state.userIsAuth}>
          <Switch>
            <Route path="/Home" exact component={Home} />
            <Route path="/Flights" exact component={Flights} />
            <Route path="/Login" exact render={(props) => <Window {...props} authenticate={this.authUser} />} />
            <Route path="/Register" exact render={(props) => <Window {...props} authenticate={this.authUser} />} />
            <Route path="/FlightManager" component={FlightManager} />
            <Route path="/mapa" exact component={Mapa} />
            <Redirect from="/Logout" to="/Home" exact />
            <Redirect from="/" to="/Home" exact />
            <Route path="/Flights/:flightId" component={FullFlight} />
          </Switch>
          <Route path="/Logout" exact render={() => {
            if (this.state.userIsAuth) {
              fetch('/Airport/EndPoint?q=logout')
                .then(r => {
                  if (r.ok)
                    this.setState({ userIsAuth: false });
                })
            }
          }} />
        </Layout>
      </div>
    );
  }
}

export default App;
