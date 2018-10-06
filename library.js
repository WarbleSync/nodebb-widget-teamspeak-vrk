'use strict';

var async =  module.parent.require('async'),
fs = require('fs'),
path = require('path'),
templates = require('benchpressjs'),
TeamSpeakClient = require("node-teamspeak"),
util = require("util"),
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
        console.log('[teamspeak-vrk] - ' + err.message);
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
  console.log('[teamspeak-vrk] - Widget Rendering')
  //need to check for null before rendering!!!!
	var serverData = {
		'serverAddress': widget.data.address,
		'serverQueryAddress': widget.data.sqaddress,
		'serverQueryPort': widget.data.sqport || 10011,
		'serverVID': widget.data.sid || 1,
		'username': widget.data.username,
		'password': widget.data.password
	}
	var rep = {
		'serverName': widget.data.name || 'Teamspeak Server',
		'serverAddress': serverData.serverAddress,
		'clients': []
	};
	var cl = new TeamSpeakClient(serverData.serverAddress, serverData.serverQueryPort);
	cl.setTimeout(4000);

	cl.on('timeout', function(err){
		console.log('[teamspeak-vrk] - ' + err);
		widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
		callback(null, widget)
	})

	cl.on('error', function(err){
		console.log('[teamspeak-vrk] - ' + err);
		widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
		callback(null, widget)
	})

	cl.on('connect', function(res){
		cl.send(
			'login',
			{
				client_login_name: serverData.username,
				client_login_password: serverData.password
			},
			function(err, res){
				if(err) {
					console.log('[teamspeak-vrk] - ' + err);
					widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
					callback(null, widget)
				}
				cl.send('use',
				{ sid: serverData.serverVID },
				function(err,res){
					cl.send('clientlist', function(err, clients){
						if(err) {
							console.log('[teamspeak-vrk] - ' + err);
							widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
							callback(null, widget)
					 	}
						async.each(clients,function(client, callback){
							if(typeof client == 'object' && 'client_type' in client && client.client_type !== 1){
								rep.clients.push(client)
							}
							callback()
						},
						function(err){
							async.sortBy(rep.clients, function(x, callback) {
							    callback(null, x.client_nickname);
							}, function(err,result) {
							    rep.clients = result
									var pre = ""+fs.readFileSync(path.resolve(__dirname,'./public/templates/teamspeak.tpl'));
									templates.compileRender(pre,rep)
									.then(html => {
										widget.html = html;
										cl.send('logout',function(err,res){
											if(err) {
												console.log('[teamspeak-vrk] - ' + err);
												widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
												callback(null, widget)
											}
											cl.send('quit',function(err,res){
												if(err) {
													console.log('[teamspeak-vrk] - ' + err);
													widget.html = '<h4>An Error occurred:<h4><pre>' + JSON.stringify(err, null, 2) + '</pre>'
													callback(null, widget)
												}
												console.log('[teamspeak-vrk] - Render Complete')
												callback(null, widget);
											})
										})
									})
									.catch(err => {
										callback(err);
									});
							});
						})
					}) // end get clients
				})
			})
	})
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
