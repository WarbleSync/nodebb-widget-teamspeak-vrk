'use strict';

var async = require('async'),
fs = require('fs'),
path = require('path'),
templates = module.parent.require('templates.js'),
app;

var Widget = {
	templates: {}
};

Widget.init = function(params, callback) {
  app = params.app;
  var templatesToLoad = [
    'widget.tpl',
    'teamspeak.tpl'
  ];

  function loadTemplate(template, next){
    fs.readFile(path.resolve(__dirname,'./public/templates/' + template), function(err,data){
      if(err){
        console.log(err.message);
        return next(err);
      }
      Widget.templates[template] = data.toString();
      next(null);
    });
  }

  async.each(templatesToLoad, loadTemplate);

  callback();
};

Widget.renderTeamspeakWidget = function(widget, callback) {
  console.log('[[[[[[[[[[[[[ RENDERING ]]]]]]]]]]]]]')
  var data = widget.data
  //mock data for users
  data['user-list'] = [{ 'name' :'user 1' }, {'name' :'user 2' } , {'name' :'user 3' }];
  data['users-online'] = data['user-list'].length
  // end mock data
  console.log(data)
  var pre = ""+fs.readFileSync(path.resolve(__dirname,'./public/templates/teamspeak.tpl'));
	var rep = {};
  callback(null, templates.parse(pre, data));
};

Widget.defineWidgets = function(widgets, callback) {
  widgets = widgets.concat([
  		{
  			widget: "teamspeak-vrk",
  			name: "teamspeak-vrk",
  			description: "description",
  			content: Widget.templates['widget.tpl']
  		}
  	]);
    callback(null, widgets);
};

module.exports = Widget;
