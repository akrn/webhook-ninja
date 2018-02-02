require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const DB = require('./db');


const app = express();

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/endpoint'));

DB.connect().then(() => {
  app.listen(app.get('port'), err => {
    if (err) {
      winston.error(err);
      return process.exit(1);
    }

    winston.info('API server has started on: ' + app.get('port'));
  });
}).catch(err => {
  winston.error(err);
  return process.exit(1);
});
