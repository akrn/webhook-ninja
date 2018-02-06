import React from 'react';
import { Link } from 'react-router-dom';

import { getBackendURL } from '../utils/config';
import endpointService from '../services/endpoint';


class ViewPage extends React.Component {
  constructor(props) {
    super(props);

    let { match: { params } } = props;

    this.state = {
      endpointURL: `${getBackendURL()}/${params.uniqueId}`,
      isLoading: true
    };
  }

  async componentDidMount() {
    let { match: { params } } = this.props,
        requests;

    try {
      requests = await endpointService.fetchRequests(params.uniqueId);
    } catch (e) {
      return this.setState({
        isLoading: false,
        error: true
      });
    }

    this.setState({
      isLoading: false,
      requests
    });
  }

  render() {
    let { endpointURL, requests, error } = this.state;

    return (
      <div>
        <div>
          <h5>Endpoint URL</h5>
          <input type="text" size="50" readOnly value={endpointURL} />
        </div>

        {error && <div>Error loading endpoint</div>}

        {requests && (<div>
          <h5>Requests:</h5>
          {requests.map((request, idx) => (
            <div key={idx}>{request.method} @ {request.createdAt}</div>
          ))}
        </div>)}
      </div>
    );
  }
}


export default ViewPage;