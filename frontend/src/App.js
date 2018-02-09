import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './utils/history';
import endpointService from './services/endpoint';
import IndexPage from './pages/IndexPage';
import ViewPage from './pages/ViewPage';
import Header from './Header';
import './App.css';


class App extends Component {
  state = {
    loading: false
  }

  handleEnpointCreateClick = async () => {
    this.setState({ loading: true });
    let endpoint = await endpointService.create();
    history.push(`/view/${endpoint.uniqueId}`);
  }

  render() {
    let { loading } = this.state;

    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/" exact render={() => <Header landing={true} loading={loading} onEndpointCreateClick={this.handleEnpointCreateClick} />} />
            <Route render={() => <Header loading={loading} onEndpointCreateClick={this.handleEnpointCreateClick} />} />
          </Switch>
        
          <Switch>
            <Route path="/view/:uniqueId" component={ViewPage} />
            <Route path="/" exact component={IndexPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
