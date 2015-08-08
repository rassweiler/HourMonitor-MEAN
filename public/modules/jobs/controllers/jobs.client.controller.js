'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
    function($scope, $stateParams, $location, Authentication, Jobs) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

       // Page changed handler
       $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       };

        // Create new Category
        $scope.create = function() {
            // Create new Category object
            var job = new Jobs ({
                name: this.name,
                description: this.description
            });

            // Redirect after save
            job.$save(function(response) {
                $location.path('jobs/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Category
        $scope.remove = function(job) {
            if ( job ) { 
                job.$remove();

                for (var i in $scope.jobs) {
                    if ($scope.jobs [i] === job) {
                        $scope.jobs.splice(i, 1);
                    }
                }
            } else {
                $scope.job.$remove(function() {
                    $location.path('jobs');
                });
            }
        };

        // Update existing Category
        $scope.update = function() {
            var job = $scope.job;

            job.$update(function() {
                $location.path('jobs/' + job._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Jobs
        $scope.find = function() {
            $scope.jobs = Jobs.query();
        };

        // Find existing Category
        $scope.findOne = function() {
            $scope.job = Jobs.get({ 
                jobId: $stateParams.jobId
            });
        };

        // Search for a job
        $scope.jobSearch = function(product) {
            $location.path('jobs/' + product._id);
        };
    }
]);