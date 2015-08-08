'use strict';

module.exports = function(app) {
	var pays = require('../../app/controllers/pays.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/pays')
        .get(users.requiresLogin, pays.list)
        .post(users.requiresLogin, pays.create);

    app.route('/pays/:payId')
        .get(users.requiresLogin, pays.read)
        .put(users.requiresLogin, pays.update)
        .delete(users.requiresLogin, pays.delete);

    // Finish by binding the article middleware
    app.param('payId', pays.payByID);
};