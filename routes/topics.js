var Response = require('../app/utils/Response');
var Topics = require('../app/Topics');

module.exports = function() {
  return {
    getTopics: function(req, res) {
      Response.okJson(Topics.getTopics(), res);
    }
  };
};
