// add.js (tests)
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

// Testing a controller
describe('controllers', function() {
  // Specifically the add controller
  describe('add', function() {
    // And the GET /add endpoint on the add controller
    describe('GET /add', function() {
      // Make a request with two paramters and expect them to be summed in the response
      it('should accept two parameters', function(done) {
        request(server)
          .get('/add')
          .query({ numA: 1, numB: 2})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res){
            should.not.exist(err);

            res.body.should.eql('Result: 3');

            done();
          });
      });
      // Make a request with no paramaters and expect the default response
      it('should return a default string', function(done){
        request(server)
          .get('/add')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res){
            should.not.exist(err);

            res.body.should.eql('Result: 0');

            done();
          });
      });
    });
  });
});
