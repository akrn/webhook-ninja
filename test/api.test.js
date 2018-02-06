const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server');


describe('API Server', function() {
  
  describe('POST /api/endpoints', function() {
    it('returns status code 200', function(done) {
      request(app)
        .post('/api/endpoints')
        .expect(200)
        .end(done);
    });

    it('returns endpoint object with uniqueId', function(done) {
      request(app)
        .post('/api/endpoints')
        .end((err, res) => {
          expect(res.body).to.have.property('uniqueId').to.be.a('string');
          done(err);
        });
    });
  });



});
