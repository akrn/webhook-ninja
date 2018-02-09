import React from 'react';
import { Link } from 'react-router-dom';

import { getBackendURL } from '../utils/config';
import endpointService from '../services/endpoint';
import './ViewPage.css';


class ViewPage extends React.Component {
  constructor(props) {
    super(props);

    let { match: { params } } = props;

    this.state = {
      endpointURL: `${getBackendURL()}/${params.uniqueId}`,
      loading: true,
      requests: []
    };
  }

  async componentDidMount() {
    let { match: { params } } = this.props,
        requests;

    try {
      requests = await endpointService.fetchRequests(params.uniqueId);
    } catch (e) {
      return this.setState({
        loading: false,
        error: true,
        requests: []
      });
    }

    this.setState({
      loading: false,
      requests
    });
  }

  render() {
    let { endpointURL, requests, error } = this.state;

    return (
      <main className="App-ViewPage">
        <div className="container-fluid">
          <div className="row justify-content-md-center mt-4">
            <div className="col col-md-6 text-center">
              <div className="input-group">
                <input className="App-ViewPage-url-input form-control form-control-lg text-center" type="text" type="text" size="50" readOnly value={endpointURL} onClick={e => e.target.setSelectionRange(0, e.target.value.length)} />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">Copy</button>
                </div>
              </div>
            </div>
          </div>

          {error && <div>Error loading endpoint</div>}

          {requests.length > 0 && (
            <div className="App-ViewPage-RequestContainer list-group mt-4">
              {requests.map((request, idx) => (
                <div key={idx} className="list-group-item list-group-item-action flex-column align-items-start">
                  <strong>{request.method} /</strong><br />
                  <span className="text-muted">{request.createdAt}</span>
                </div>
              ))}
            </div>
          )}

          {!requests.length && (
            <div className="App-ViewPage-RequestContainer-empty row justify-content-md-center mt-3">
              <div className="col col-md-6 align-self-center text-center">
                <p>Requests will appear here</p>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }
}


export default ViewPage;