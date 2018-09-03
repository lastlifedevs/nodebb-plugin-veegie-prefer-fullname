"use strict";

var async = require('async');

var user = module.parent.require('./user');
var controllers = require('./lib/controllers');
var preferFullname = {};

preferFullname.init = function(params, callback) {
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
		async.each(data, function(teaser, callback) {
			teaser.user.fullname = user.getUserField(teaser.user.uid, 'fullname', callback);
		}, callback);
	}
}

module.exports = preferFullname;