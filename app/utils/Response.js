var logger = require("./Logger");

var prepareResponseWithJson = function(res, code, obj) {
  res.writeHead(code, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(obj));
};

exports.okJson = function(obj, res) {
  prepareResponseWithJson(res, 200, obj);
};
