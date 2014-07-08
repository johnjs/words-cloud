define(['backbone', 'utils/TemplateManager'], function(Backbone, TemplateManager) {

  var TopicDetailedView = Backbone.View.extend({
    topicsSelection: null,

    el: '.topic-detailed-view',
    template: '/views/partials/topicDetailedView',


    /**
     * Initialization of the view. View should be re-rendered when current topics changes.
     *
     * @method initialize
     * @param {Object} topicsSelection. Backbone model responsible for containing currently selected topic.
     */
    initialize: function(opts, topicsSelection) {
      var that = this;
      this.topicsSelection = topicsSelection;
      this.topicsSelection.on('change:selectedTopic', function() {
        that.render();
      });
    },
    /**
     * Method retrieve the template html from TemplateManager and renders the view.
     * @method render
     */
    render: function() {
      TemplateManager.getTemplate(this.template, function(tpl) {
        var selectedTopic = this.topicsSelection.get('selectedTopic');

        var html = _.template(tpl, {
          name: selectedTopic.get('name'),
          label: selectedTopic.get('label'),
          volume: selectedTopic.get('volume'),
          sentiment: selectedTopic.get('sentiment')
        });

        this.$el.html(html);

      }.bind(this));
    }
  });

  return TopicDetailedView;

});
