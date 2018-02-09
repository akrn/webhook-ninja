import React from 'react';

import history from './utils/history';
import './Header.css';


const Header = (props) => {
  let { landing, loading, onEndpointCreateClick } = props;

  let logo = <h1>Webhook <span className="App-header-logo"></span> Ninja</h1>;

  if (landing) {
    return (
      <header className="App-header App-header-landing">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-6">
              {logo}
            </div>
            <div className="col-6"></div>
          </div>

          <div className="row">
            <div className="col align-self-center text-center">
              {/*<h2>HTTP Request Inspector and Webhook Debugger</h2>*/}
              <p>Webhook Ninja is a free and easy-to-use service that allows you to create custom endpoints to inspect and debug incoming requests in real-time</p>
              <button disabled={loading} type="button" className="btn btn-lg App-header-button" onClick={onEndpointCreateClick}>Create Endpoint</button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="App-header">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-6">
            {logo}
          </div>
          <div className="col-6 text-right">
            <button disabled={loading} type="button" className="btn btn-sm App-header-button" onClick={onEndpointCreateClick}>Create New Endpoint</button>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;