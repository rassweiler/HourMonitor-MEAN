'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
  function ($scope, $stateParams, $location, Authentication, Jobs, Pays) {
    $scope.authentication = Authentication;

    // Create new Job
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'jobForm');

        return false;
      }

      // Create new Job object
      var job = new Jobs({
        title: this.title,
        description: this.description,
        company: this.company,
        rate: this.rate,
        period: this.period,
        paydate: this.paydate
      });

      // Redirect after save
      job.$save(function (response) {
        $location.path('jobs/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.description = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Job
    $scope.remove = function (job) {
      if (job) {
        job.$remove();

        for (var i in $scope.jobs) {
          if ($scope.jobs[i] === job) {
            $scope.jobs.splice(i, 1);
          }
        }
      } else {
        $scope.job.$remove(function () {
          $location.path('jobs');
        });
      }
    };

    // Update existing Job
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'jobForm');

        return false;
      }

      var job = $scope.job;

      job.$update(function () {
        $location.path('jobs/' + job._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Jobs
    $scope.find = function () {
      $scope.jobs = Jobs.query();
    };

    // Find existing Job
    $scope.findOne = function () {
      $scope.job = Jobs.get({
        jobId: $stateParams.jobId
      });
    };
  }
]);
