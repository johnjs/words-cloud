var expect = require('chai').expect;
var cut = require('../../app/Topics');

describe('Topics test', function() {

  describe('Topics', function(done) {
    it('should return minimal values of volume for popularity classes', function(done) {
      //given
      var expected = [3, 30, 57, 84, 111, 138];

      //when
      var actual = cut._getVolumeRangesForPopularityClasses(165, 3);

      //then
      expect(actual).to.deep.equal(expected);
      done();
    });

    it('should return popularity class for a given volume', function(done) {
      //given
      var rangesOfPopularityClasses = [3, 30, 57, 84, 111, 138];
      var expectedClass = 1;
      var volume = 30;

      //when
      var actualClass = cut._getPopularityClass(volume, rangesOfPopularityClasses);

      //then
      expect(actualClass).to.deep.equal(expectedClass);
      done();
    });

    it('should return the topics with popularity classes', function(done) {
      //given
      var topics = [{
        label: "a",
        volume: 1
      }, {
        label: "b",
        volume: 15
      }, {
        label: "c",
        volume: 72
      }];

      var expectedTopics = [{
        label: "a",
        volume: 1,
        popularity: 0

      }, {
        label: "b",
        volume: 15,
        popularity: 1
      }, {
        label: "c",
        volume: 72,
        popularity: 5
      }];

      //when
      var actualTopics = cut._getTopicsWithPopularityClass(topics);

      //then
      expect(actualTopics).to.deep.equal(expectedTopics);
      done();
    });

  });

});
