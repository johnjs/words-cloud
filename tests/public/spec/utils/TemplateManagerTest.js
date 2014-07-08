define(['jquery', 'utils/TemplateManager'], function($, TemplateManager) {
  describe('Template manager', function() {
    var cut;
    var server;

    beforeEach(function() {
      cut = TemplateManager;
    });

    it('should send request to the server when a given template has not been downloaded yet', function() {
      //given
      var expectedTemplate = "<h4>Test1<h4>";
      spyOn($, 'ajax').andCallFake(function(req) {
        return {
          success: function(cbk) {
            cbk(expectedTemplate);
          }
        };
      });
      var cbk = sinon.spy();

      var templateName = '/views/partials/test';
      var expectedRequestParameters = {
        url: templateName
      };

      //when
      cut.getTemplate(templateName, cbk);

      //then
      expect(cbk.calledWith(expectedTemplate)).toBe(true);
      expect($.ajax).toHaveBeenCalledWith(expectedRequestParameters);
    });

    it('should not send the request to the server when a given template has been already downloaded ', function() {
      //given
      var templateName = '/views/partials/test';
      var expectedTemplate = "<h4>Test1<h4>";

      spyOn($, 'ajax').andCallFake(function(req) {
        return {
          success: function(cbk) {
            cbk();
          }
        };
      });
      cut._templates = {
        '/views/partials/test': expectedTemplate
      };
      var cbk = sinon.spy();

      //when
      cut.getTemplate(templateName, cbk);

      //then
      expect($.ajax).not.toHaveBeenCalled();
      expect(cbk.calledWith(expectedTemplate)).toBe(true);
    });


  });
});
