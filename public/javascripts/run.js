/**
 * Module creates instances of models and views. Also triggers initial loading of topics.
 */

define(['collections/Topics', 'models/TopicsSelection', 'views/TopicsCloudView', 'views/TopicDetailedView'],
  function(Topics, TopicsSelection, TopicsCloudView, TopicDetailedView) {

    //collection & models
    var topics = new Topics();
    var topicsSelection = new TopicsSelection();

    //views
    var mainView = new TopicsCloudView({
      collection: topics
    }, topicsSelection);
    var topicDetailedView = new TopicDetailedView({}, topicsSelection);

    //initial fetch of data
    topics.fetch({
      reset: true
    });
  });
