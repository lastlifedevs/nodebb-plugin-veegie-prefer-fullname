"use strict";

var user = module.parent.require('./user');
var controllers = require('./lib/controllers');
var preferFullname = {};

preferFullname.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/preferfullname', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/preferfullname', controllers.renderAdminPage);

	callback();
};

preferFullname.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/preferfullname',
		icon: 'fa-tint',
		name: 'Prefer Full Name'
	});

	callback(null, header);
};


preferFullname.getFullname = function (data, callback) {
	if (data.uid === 0) {
		callback(null, data);
	} else {
		console.log(data);
		callback();
	}
}

module.exports = preferFullname;