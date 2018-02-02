const express = require('express');
const winston = require('winston');
const router = express.Router();
const asyncMiddleware = require('../utils/asyncMiddleware');

const DB = require('../db');


router.post('/endpoints', asyncMiddleware(async (req, res, next) => {
  try {
    const endpoint = await DB.createEndpoint();
    return res.json(endpoint);
  } catch (err) {
    winston.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}));


router.get('/endpoints/:id', asyncMiddleware(async (req, res, next) => {
  let endpoint;

  try {
    endpoint = await DB.getEndpoint(req.params.id);
  } catch (err) {
    winston.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  if (!endpoint) {
    return res.status(404).send();
  }

  return res.json({
    uniqueId: endpoint.uniqueId,
    createdAt: endpoint.createdAt
  });
}));


module.exports = router;