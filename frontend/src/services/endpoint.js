import axios from 'axios';


const endpointService = {
  create,
  fetch,
  fetchRequests
};


async function create() {
  let resp = await axios.post('/api/endpoints');
  return resp.data;
}


async function fetch(uniqueId) {
  let resp = await axios.get(`/api/endpoints/${uniqueId}`);
  return resp.data;
}


async function fetchRequests(uniqueId) {
  let resp = await axios.get(`/api/endpoints/${uniqueId}/requests`);
  return resp.data;
}


export default endpointService;