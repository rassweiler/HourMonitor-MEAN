'use strict';

module.exports = function(app) {
	var jobs = require('../../app/controllers/jobs.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/jobs')
        .get(users.requiresLogin, jobs.list)
        .post(users.requiresLogin, jobs.create);

    app.route('/jobs/:jobId')
        .get(users.requiresLogin, jobs.read)
        .put(users.requiresLogin, jobs.update)
        .delete(users.requiresLogin, jobs.delete);

    // Finish by binding the article middleware
    app.param('jobId', jobs.jobByID);
};