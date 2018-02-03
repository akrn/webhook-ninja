const express = require('express');
const winston = require('winston');
const router = express.Router();

const apiMiddleware = require('../utils/apiMiddleware');
const DB = require('../db');


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

  // TODO: instead use a cursor
  let requests = await (await DB.getEndpointRequests(endpoint)).toArray();

  requests = requests.map(request => ({
    createdAt: request.createdAt,
    headers: request.headers
  }));

  return res.json(requests);
}));


module.exports = router;