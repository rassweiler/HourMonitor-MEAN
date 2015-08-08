'use strict';

//Setting up route
angular.module('jobs').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('listJobs', {
			url: '/jobs',
			templateUrl: 'modules/jobs/views/jobs.client.view.html'
		}).
		state('createJob', {
			url: '/jobs/create',
			templateUrl: 'modules/jobs/views/create-job.client.view.html'
		}).
		state('viewJob', {
			url: '/jobs/:jobId',
			templateUrl: 'modules/jobs/views/view-job.client.view.html'
		}).
		state('editJob', {
			url: '/jobs/:jobId/edit',
			templateUrl: 'modules/jobs/views/edit-job.client.view.html'
		});
	}
]);