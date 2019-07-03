import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Window from './components/UI/Window/Window';

class App extends Component{
  state = {
    userIsAuth: false
  }
  
  authUser = () => {
    this.setState({ userIsAuth: true });
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/login" exact render={(props) => <Window {...props} authenticate={this.authUser}/>} />
            <Route path="/register" exact render={(props) => <Window {...props} authenticate={this.authUser}/>} />
            <Redirect from="/" to="/home" exact />
          </Switch>       
          <button onClick={() => {fetch('http://localhost:9000/Airport/EndPoint', {
            method: 'GET',
            mode:'cors'
          }).then(r => r.text()).then(data => console.log(data))}}> </button>
        </Layout>
      </div>
    );
  }
}

export default App;
