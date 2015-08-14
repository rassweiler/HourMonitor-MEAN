'use strict';

//Pays service used to communicate Pays REST endpoints
angular.module('pays').factory('Pays', ['$resource',
	function($resource) {
		return $resource('pays/:payId', { payId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);