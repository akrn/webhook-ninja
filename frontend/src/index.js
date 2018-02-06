import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.scss';
import App from './App';
import { getBackendURL } from './utils/config';
import registerServiceWorker from './registerServiceWorker';


// Set up default prefix for every axios request
axios.defaults.baseURL = getBackendURL();


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
