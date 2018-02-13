import React from 'react';
import { Link } from 'react-router-dom';
import Clipboard from 'clipboard';
import TimeAgo from 'react-timeago';

import { getBackendURL } from '../utils/config';
import endpointService from '../services/endpoint';
import './ViewPage.css';


class ViewPage extends React.Component {
  constructor(props) {
    super(props);

    let { match: { params } } = props;

    this.state = {
      endpointURL: `${getBackendURL()}/${params.uniqueId}`,
      endpointUniqueId: params.uniqueId,
      loading: true,
      requests: []
    };
  }

  async componentDidMount() {
    this.clipboard = new Clipboard(this.copyButton, { target: () => this.copyInput });

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

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    let { endpointURL, requests, error, endpointUniqueId } = this.state;

    return (
      <main className="App-ViewPage">
        <div className="container-fluid">
          <div className="row justify-content-center mt-4">
            <div className="col col-sm-8 align-self-center text-center">
              <div className="input-group">
                <input className="App-ViewPage-url-input form-control form-control-lg text-center" type="text" type="text" size="50" readOnly value={endpointURL} ref={el => this.copyInput = el} />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button" ref={el => this.copyButton = el}>Copy</button>
                </div>
              </div>
            </div>
          </div>

          {error && <div>Error loading endpoint</div>}

          {requests.length > 0 && (
            <div className="App-ViewPage-RequestContainer list-group mt-4">
              {requests.map((request, idx) => (
                <div key={idx} className="App-ViewPage-RequestContainer-item list-group-item list-group-item-action flex-column align-items-start">
                  <strong>{request.method} <span className="text-muted">/{endpointUniqueId}</span></strong><br />
                  <span className="text-muted"><TimeAgo date={request.createdAt} /></span>
                </div>
              ))}
            </div>
          )}

          {!requests.length && (
            <div className="App-ViewPage-RequestContainer-empty row justify-content-center mt-3">
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