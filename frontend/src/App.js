import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './utils/history';
import IndexPage from './pages/IndexPage';
import ViewPage from './pages/ViewPage';

import './App.scss';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/view/:uniqueId" component={ViewPage} />
            <Route path="" exact component={IndexPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
