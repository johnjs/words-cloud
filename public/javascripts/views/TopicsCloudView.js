define(['backbone', 'd3', 'd3-cloud'], function(Backbone, d3) {

  var TopicsCloudView = Backbone.View.extend({

    topicsSelection: null,
    el: ".words-cloud",

    DEFAULT_FONT_SIZE: 20,
    POSITIVE_SENTIMENT_COLOR: "#47A347",
    NEUTRAL_SENTIMENT_COLOR: "#669999",
    NEGATIVE_SENTIMENT_COLOR: "#E68080",

    /**
     * Initialization of the view. View should be re-rendered when topics are fetched.
     *
     * @method initialize
     * @param {Object} topicsSelection. Backbone model responsible for containing currently selected topic.
     */
    initialize: function(opts, topicsSelection) {
      var that = this;
      this.topicsSelection = topicsSelection;
      this.collection.on('reset', function() {
        that.render();
      });
    },

    /**
     * Methods returns font size for a given topic basing on its popularity.
     *
     * @method _getFontSizeOfTopic
     * @param {Topic} topic. Instance of Topic (Backbone model)
     */
    _getFontSizeOfTopic: function(topic) {
      return this.DEFAULT_FONT_SIZE + topic.get('popularity') * 5;
    },

    /**
     * Methods returns color of the topic basing on its sentiment score.
     *
     * @method _getColorOfTopic
     * @param {Topic} topic. Instance of Topic (Backbone model)
     */
    _getColorOfTopic: function(topic) {
      if (topic.get('sentimentScore') > 60) {
        return this.POSITIVE_SENTIMENT_COLOR;
      }
      if (topic.get('sentimentScore') < 40) {
        return this.NEGATIVE_SENTIMENT_COLOR;
      }
      return this.NEUTRAL_SENTIMENT_COLOR;
    },

    render: function() {
      var that = this;
      var fill = d3.scale.category20();

      function draw(words) {
        d3.select(this.el).append("svg")
          .attr("width", 600)
          .attr("height", 600)
          .append("g")
          .attr("transform", "translate(300,300)")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) {
            return d.size + "px";
          })
          .style("font-family", "Trebuchet MS")
          .style("fill", that._getColorOfTopic.bind(that))
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(t) {
            return t.get('label');
          }).on('click', function(t) {
            that.topicsSelection.set('selectedTopic', t);
          });
      }

      d3.layout.cloud().size([600, 600])
        .words(this.collection.models)
        .padding(5)
        .text(function(t) {
          return t.get('label');
        })
        .rotate(function() {
          return 0;
        })
        .font("Trebuchet MS")
        .fontSize(this._getFontSizeOfTopic.bind(this))
        .on("end", draw.bind(this))
        .start();
    }
  });

  return TopicsCloudView;
});
