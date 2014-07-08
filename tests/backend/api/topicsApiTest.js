var app = require('../../../app_test');
var requestUtils = require('../utils/request');
var expect = require('chai').expect;

describe('Topics API test', function() {

  var request;

  before(function(done) {
    request = requestUtils(app.app);
    app.start().on('listening', function() {
      done();
    });
  });

  describe('Topics', function() {
    it('should get all topics', function(done) {
      //when
      request.get('/topics', 200, function(err, res) {
        //then
        var topics = res.body;
        expect(topics.length).to.be.above(0);
        done();
      });
    });

  });

  after(function(done) {
    app.shutdown(done);
  });

});
