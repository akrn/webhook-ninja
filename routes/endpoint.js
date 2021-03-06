const express = require('express');
const cors = require('cors');
const router = express.Router();

const apiMiddleware = require('../utils/apiMiddleware');
const DB = require('../utils/db');


router.all('/:id', cors(), apiMiddleware(async (req, res, next) => {
  let endpoint = await DB.getEndpoint(req.params.id);

  if (!endpoint) {
    return res.sendNotFoundError();
  }

  let headersArray = Object.keys(req.headers).map(key => [key, req.headers[key]].join(': '));

  await DB.createRequest(endpoint, req.method, req.query, headersArray);

  return res.json({
    ok: 1
  });
}));


module.exports = router;