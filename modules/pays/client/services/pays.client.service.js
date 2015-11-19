'use strict';

//Pays service used for communicating with the pays REST endpoints
angular.module('pays').factory('Pays', ['$resource',
  function ($resource) {
    return $resource('api/pays/:payId', {
      payId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
