"use strict";

var async = require('async');
var user = module.parent.require('./user');
var preferFullname = {};

preferFullname.getFullname = function (data, callback) {
	if (data.uid === 0) {
		callback(null, data);
	} else {
		let uids = [];
		for (let i=0; i < data.teasers.length; i++) {
			uids.push(data.teasers[i].uid);
		}
		async.waterfall([
			function(next) {
				user.getUsersFields(uids, ['fullname'], next);
			},
			function(userData, next) {
				for (let i=0; i < data.teasers.length; i++) {
					data.teasers[i].user.fullname = userData[i].fullname;
				}
				next();
			}
		], function() {
			callback(null, data);
		});
	}
}

module.exports = preferFullname;