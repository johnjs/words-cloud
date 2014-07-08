define(['views/TopicsCloudView', 'collections/Topics', 'models/TopicsSelection', 'models/Topic'], function(TopicsCloudView, Topics, TopicsSelection, Topic) {
  describe('Topics cloud view', function() {
    var cut;
    var topicsSelection;
    var topics;

    beforeEach(function() {
      topicsSelection = new TopicsSelection();
      topics = new Topics();

      cut = new TopicsCloudView({
        collection: topics
      }, topicsSelection);
    });

    it('should run render function when collections is fetched from the server', function() {
      //given
      cut.render = sinon.spy();

      //when
      topics.trigger('reset');

      //then
      expect(cut.render.calledOnce).toBe(true);
    });

    it('should return proper font size for a topic with given popularity', function() {
      //given
      var expectedFontSize = 40;
      var topic = new Topic();
      topic.set('popularity', 4);

      //when
      var actualFontSize = cut._getFontSizeOfTopic(topic);

      //then
      expect(expectedFontSize).toBe(actualFontSize);
    });

    it('should return a proper font color for the topic with a given sentiment score', function() {
      //given
      var topic = new Topic();
      var actualColor;
      var expectedColor;

      //when
      topic.set('sentimentScore', 1);
      actualColor = cut._getColorOfTopic(topic);

      //then
      expect(actualColor).toBe(cut.NEGATIVE_SENTIMENT_COLOR);


      //when
      topic.set('sentimentScore', 45);
      actualColor = cut._getColorOfTopic(topic);

      //then
      expect(actualColor).toBe(cut.NEUTRAL_SENTIMENT_COLOR);


      //when
      topic.set('sentimentScore', 65);
      actualColor = cut._getColorOfTopic(topic);

      //then
      expect(actualColor).toBe(cut.POSITIVE_SENTIMENT_COLOR);
    });
  });
});
