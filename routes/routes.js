var views = require('./views')();
var topics = require('./topics')();

module.exports = function(app) {
  app.get('/', views.index);
  app.get('/views/partials/:view', views.view);
  app.get('/topics', topics.getTopics);

};
