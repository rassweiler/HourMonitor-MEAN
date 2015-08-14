'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('jobs').factory('Jobs', ['$resource',
    function($resource) {
        return $resource('jobs/:jobId', { jobId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);