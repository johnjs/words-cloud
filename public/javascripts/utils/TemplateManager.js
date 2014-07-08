/**
 * Class returning templates for the views.
 */

define(['jquery'], function($) {

  var TemplateManager = function() {};

  TemplateManager.prototype = {
    _templates: {},

    /**
     * Method running given callback argument with a template object when its accessible. If a given template is
     * already cached in _templates attribute, it's retrieved from the cache. Otherwise request to server is sent.
     *
     * @method getTemplate
     * @param {String} tplPath. Url to template
     * @param {Function} cbk. Callback function which will be invoked with template argument when it will
     * be accessible
     */
    getTemplate: function(tplPath, cbk) {
      if (this._templates[tplPath]) {
        cbk(this._templates[tplPath]);
      } else {
        this._getTemplateFromServer(tplPath, cbk);
      }
    },

    /**
     * Method sends request to server to retrieve template with given path.
     * When it's fetched, it's added to the _templates cache.
     *
     * @method _getTemplateFromServer
     * @param {String} tplPath. Url to template
     * @param {Function} cbk. Callback function which will be invoked with template argument when it will
     * be accessible
     */
    _getTemplateFromServer: function(tplPath, cbk) {
      var that = this;
      $.ajax({
        url: tplPath
      }).success(function(data) {
        that._templates[tplPath] = data;
        cbk(data);
      });
    }
  };

  return new TemplateManager();

});
