(function(module) {
  'use strict';
  var async = require('async'),
  fs = require('fs'),
	path = require('path'),
	http = require('https'),
	templates = module.parent.require('templates.js'),
	app;

  var Widget = {
		templates: {}
	};

  Widget.init = function(params, callback) {

  };

  Widget.renderTeamspeakWidget = function(widget, callback) {

  };

  Widget.defineWidget = function(widgets, callback) {
    widgets.push({
    			widget: 'teamspeak-vrk',
    			name: 'Teamspeak',
    			description: 'Shows who is currently online in Teamspeak.',
    			content: fs.readFileSync(path.resolve(__dirname, './public/templates/widget.tpl')),
    		});
    
    		callback(null, widgets);
  };

}(module));
