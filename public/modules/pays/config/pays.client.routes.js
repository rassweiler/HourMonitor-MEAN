'use strict';

//Setting up route
angular.module('pays').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('listPays', {
			url: '/pays',
			templateUrl: 'modules/pays/views/pays.client.view.html'
		}).
		state('createPay', {
			url: '/pays/create',
			templateUrl: 'modules/pays/views/create-pay.client.view.html'
		}).
		state('viewPay', {
			url: '/pays/:payId',
			templateUrl: 'modules/pays/views/view-pay.client.view.html'
		}).
		state('editPay', {
			url: '/pays/:payId/edit',
			templateUrl: 'modules/pays/views/edit-pay.client.view.html'
		});
	}
]);