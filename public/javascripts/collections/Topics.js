define(['backbone', 'models/Topic'], function(Backbone, Topic) {
  var Topics = Backbone.Collection.extend({
    model: Topic,
    url: '/topics'
  });

  return Topics;
});
