const express = require('express');
const winston = require('winston');
const cors = require('cors');
const router = express.Router();

const apiMiddleware = require('../utils/apiMiddleware');
const DB = require('../utils/db');


if (process.env.NODE_ENV !== 'production') {
  // Enable CORS headers for non-production environments
  router.use(cors());
}


router.post('/endpoints', apiMiddleware(async (req, res, next) => {
  const endpoint = await DB.createEndpoint();
  return res.json(endpoint);
}));


router.get('/endpoints/:id', apiMiddleware(async (req, res, next) => {
  let endpoint = await DB.getEndpoint(req.params.id);

  if (!endpoint) {
    return res.sendNotFoundError();
  }

  return res.json({
    uniqueId: endpoint.uniqueId,
    createdAt: endpoint.createdAt,
    requestsCount: endpoint.requestsCount
  });
}));


router.get('/endpoints/:id/requests', apiMiddleware(async (req, res, next) => {
  let endpoint = await DB.getEndpoint(req.params.id);

  if (!endpoint) {
    return res.sendNotFoundError();
  }

  let requests = await DB.getEndpointRequests(endpoint);

  requests = requests.map(request => ({
    createdAt: request.createdAt,
    method: request.method,
    query: request.query,
    headers: request.headers
  }));

  return res.json(requests);
}));


module.exports = router;