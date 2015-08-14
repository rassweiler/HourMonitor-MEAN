'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pays = require('../../app/controllers/pays.server.controller');

	// Pays Routes
	app.route('/pays')
		.get(pays.list)
		.post(users.requiresLogin, pays.create);

	app.route('/pays/:payId')
		.get(pays.read)
		.put(users.requiresLogin, pays.update)
		.delete(users.requiresLogin, pays.delete);

	// Finish by binding the Pay middleware
	app.param('payId', pays.payByID);
};
