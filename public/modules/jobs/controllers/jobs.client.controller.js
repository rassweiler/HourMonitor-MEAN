'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs', 'Pays',
	function($scope, $stateParams, $location, Authentication, Jobs, Pays) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

       // Page changed handler
       $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       };

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				name: this.name,
				description: this.description,
				title: this.title,
				company: this.company,
				rate: this.rate,
				frequency: this.frequency,
				paydate: this.paydate
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

		// Remove existing Job
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

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Categories
        $scope.find = function() {
            $scope.jobs = Jobs.query();
        };

        // Find existing Category
        $scope.findOne = function() {
            $scope.job = Jobs.get({ 
                jobId: $stateParams.jobId
            });
        }

        // Search for a category
        $scope.jobSearch = function(product) {
            $location.path('jobs/' + product._id);
        };
	}
]);