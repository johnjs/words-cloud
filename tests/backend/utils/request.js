var supertest = require('supertest').agent;


module.exports = function(app) {
  var request = supertest(app);

  return {
    get: function(address, expectedCode, callback) {
      request.get(address)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(expectedCode, callback);
    }
  };
};
