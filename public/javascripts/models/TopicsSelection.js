/**
 * Model containing currently selected topic
 */
define(['backbone'], function(Backbone) {
  var TopicsSelection = Backbone.Model.extend({
    selectedModel: null
  });

  return TopicsSelection;
});
