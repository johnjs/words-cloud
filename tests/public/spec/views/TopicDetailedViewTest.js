define(['models/TopicsSelection', 'views/TopicDetailedView', 'models/Topic'], function(TopicsSelection, TopicDetailedView, Topic) {
  describe('Topic detailed view', function() {
    var cut;
    var topicsSelection;

    beforeEach(function() {
      topicsSelection = new TopicsSelection();
      cut = new TopicDetailedView({}, topicsSelection);
    });

    it('should run render function when selected topic changes', function() {
      //given
      cut.render = sinon.spy();
      var newlySelectedTopic = new Topic();

      //when
      topicsSelection.set('selectedTopic', newlySelectedTopic);

      //then
      expect(cut.render.calledOnce).toBe(true);
    });

  });
});
