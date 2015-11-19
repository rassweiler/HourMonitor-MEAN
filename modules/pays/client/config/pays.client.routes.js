'use strict';

// Setting up route
angular.module('pays').config(['$stateProvider',
  function ($stateProvider) {
    // Pays state routing
    $stateProvider
      .state('pays', {
        abstract: true,
        url: '/pays',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pays.list', {
        url: '',
        templateUrl: 'modules/pays/client/views/list-pays.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pays.create', {
        url: '/create',
        templateUrl: 'modules/pays/client/views/create-pay.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pays.view', {
        url: '/:payId',
        templateUrl: 'modules/pays/client/views/view-pay.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pays.edit', {
        url: '/:payId/edit',
        templateUrl: 'modules/pays/client/views/edit-pay.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
