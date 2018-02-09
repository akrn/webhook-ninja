import React from 'react';
import { Link } from 'react-router-dom';
import history from '../utils/history';

import './IndexPage.css';


class IndexPage extends React.Component {
  render() {
    return (
      <main className="App-IndexPage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md">
              <FeatureElement header="1">Requests are updated in realtime</FeatureElement>
            </div>
            <div className="col-md">
              <FeatureElement header="2">Customizable responses<br /><span className="badge badge-warning">Coming Soon</span></FeatureElement>
            </div>
            <div className="col-md">
              <FeatureElement header="3">View history of your previous endpoints</FeatureElement>
            </div>
            <div className="col-md">
              <FeatureElement header="4">2048-bit SSL encryption</FeatureElement>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const FeatureElement = (props) => {
  return (
    <div className="mt-3">
      <div className="App-IndexPage-feature-header">{props.header}</div>
      <div className="App-IndexPage-feature-text">{props.children}</div>
    </div>
  );
};


export default IndexPage;