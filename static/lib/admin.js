'use strict';
/* globals $, app, socket */

define('admin/plugins/preferfullname', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('preferfullname', $('.preferfullname-settings'));

		$('#save').on('click', function() {
			Settings.save('preferfullname', $('.preferfullname-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'preferfullname-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});