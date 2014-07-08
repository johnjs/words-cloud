require.config({
  baseUrl: '/javascripts',
  paths: {
    'backbone': '../libs/backbone/backbone',
    '_': '../libs/underscore/underscore',
    'jquery': '../libs/jquery/dist/jquery.min',
    'd3': '../libs/d3/d3',
    'd3-cloud': './utils/d3-layout-cloud/d3.layout.cloud'
  },

  shim: {
    'd3': {
      exports: 'd3'
    },
    'd3-cloud': {
      deps: ['d3']
    },
    'jquery': {
      'exports': 'jquery'
    },
    '_': {
      'exports': '_'
    },
    'backbone': {
      deps: ['_', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['run'], function() {});
