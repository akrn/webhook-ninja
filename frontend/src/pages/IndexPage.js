import React from 'react';
import { Link } from 'react-router-dom';
import history from '../utils/history';

import endpointService from '../services/endpoint';


class IndexPage extends React.Component {
  state = {
    isLoading: false
  }

  handleEndpointCreateClick = async () => {
    this.setState({ isLoading: true });
    let endpoint = await endpointService.create();
    history.push(`/view/${endpoint.uniqueId}`);
  }

  render() {
    return (
      <div>
        <div>
          <h5>Webhook Ninja</h5>
          <button onClick={this.handleEndpointCreateClick} disabled={this.state.isLoading}>Create Endpoint</button>
        </div>
      </div>
    );
  }
}


export default IndexPage;