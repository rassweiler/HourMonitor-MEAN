'use strict';

module.exports = function(app) {
	var jobs = require('../../app/controllers/jobs.server.controller');
	var users = require('../../app/controllers/users.server.controller');

    app.route('/jobs')
      .get(users.requiresLogin,jobs.list)
      .post(users.requiresLogin,jobs.create);

    app.route('/jobs/:jobId')
    .get(users.requiresLogin,jobs.read)
    .delete(users.requiresLogin, jobs.delete);
};