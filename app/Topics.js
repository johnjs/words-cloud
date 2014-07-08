var topicsInput = require('../fixtures/topics.json');
var _ = require('underscore');

var NUMBER_OF_POPULARITY_CLASSES = 6;

/**
 * Method takes topics from the input file and return their data
 *
 * @method _getTopicsFromInputFile
 * @return {Array} Returns list of topics
 */
var _getTopicsFromInputFile = function() {
  return topicsInput['topics'].map(function(topic) {
    return {
      "label": topic.label,
      "volume": topic.volume,
      "sentiment": topic.sentiment,
      "sentimentScore": topic.sentimentScore
    };
  });
};

/**
 * Method returns minimal volumes for priority classes.
 *
 * @method _getVolumeRangesForPopularityClasses
 * @param {Integer} maxVolume Maximal volume for all the topics
 * @param {Integer} minVolume Minimal volume for all the topics

 * @return {Array} Returns list of integers. For given index (popularity class) it contains min volume.
 */
var _getVolumeRangesForPopularityClasses = function(maxVolume, minVolume) {
  var range = maxVolume - minVolume;
  var stepBetweenClasses = Math.ceil(range / NUMBER_OF_POPULARITY_CLASSES);
  return _.range(minVolume, maxVolume, stepBetweenClasses);
};
exports._getVolumeRangesForPopularityClasses = _getVolumeRangesForPopularityClasses;

/**
 * Method returns popularity class for a given volume
 *
 * @method getPopularity
 * @param {Integer} volume The volume for which popularity is calculated
 * @param {Array} minimal volume ranges for popularity classes

 * @return {Integer} Returns popularity class
 */
var _getPopularityClass = function(volume, minVolumesOfPopularityClasses) {
  var i;
  for (i = minVolumesOfPopularityClasses.length - 1; i >= 0; i--) {
    if (volume >= minVolumesOfPopularityClasses[i]) {
      return i;
    }
  }
};
exports._getPopularityClass = _getPopularityClass;

/**
 * Method returns list of topics with their popularity classes
 *
 * @method _getTopicsWithPopularityClass
 * @return {Array} Returns list of topics
 */
var _getTopicsWithPopularityClass = function(topics) {
  var sortedVolumes = _.sortBy(_.pluck(topics, 'volume'), function(volume) {
    return volume;
  });

  var minVolume = _.first(sortedVolumes);
  var maxVolume = _.last(sortedVolumes);

  var volumeRangesForPopularityClasses = _getVolumeRangesForPopularityClasses(maxVolume, minVolume);

  return topics.map(function(topic) {
    topic["popularity"] = _getPopularityClass(topic.volume, volumeRangesForPopularityClasses);
    return topic;
  });
};
exports._getTopicsWithPopularityClass = _getTopicsWithPopularityClass;

/**
 * Method returns list of topics with their popularity classes
 *
 * @method getTopics
 * @return {Array} Returns list of topics
 */
exports.getTopics = function() {
  var topics = _getTopicsFromInputFile();
  return _getTopicsWithPopularityClass(topics);
};
