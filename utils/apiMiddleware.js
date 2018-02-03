const winston = require('winston');


function sendNotFoundError(message) {
  this.status(404);
  if (message) {
    return this.json({ error: message });
  }

  this.send();
}

function sendInternalServerError(err, message) {
  winston.error(err);

  this.status(500);
  if (message) {
    return this.json({ error: message });
  }

  this.send();
}


module.exports = function asyncMiddleware(fn) {
  return (req, res, next) => {
    res.sendNotFoundError = sendNotFoundError.bind(res);
    res.sendInternalServerError = sendInternalServerError.bind(res);

    Promise.resolve(fn(req, res, next)).catch(err => sendInternalServerError.call(res, err));
  }
};
