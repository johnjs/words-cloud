module.exports = function() {
  return {
    index: function(req, res) {
      res.render('index.jade');
    },
    view: function(req, res) {
      var view = req.params.view;
      res.render('../views/partials/' + view);
    }
  };
};
