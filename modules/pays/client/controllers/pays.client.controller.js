'use strict';

// Pays controller
angular.module('pays').controller('PaysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pays',
  function ($scope, $stateParams, $location, Authentication, Pays) {
    $scope.authentication = Authentication;

    // Create new Pay
    $scope.create = function (isValid) {
      $scope.error = null;

      //if (!isValid) {
        //$scope.$broadcast('show-errors-check-validity', 'payForm');

        //return false;
      //}

      // Create new Pay object
      var pay = new Pays({
        title: this.title,
      });

      // Redirect after save
      pay.$save(function (response) {
        $location.path('pays/' + response._id);

        // Clear form fields
        $scope.title = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Pay
    $scope.remove = function (pay) {
      if (pay) {
        pay.$remove();

        for (var i in $scope.pays) {
          if ($scope.pays[i] === pay) {
            $scope.pays.splice(i, 1);
          }
        }
      } else {
        $scope.pay.$remove(function () {
          $location.path('pays');
        });
      }
    };

    // Update existing Pay
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'payForm');

        return false;
      }

      var pay = $scope.pay;

      pay.$update(function () {
        $location.path('pays/' + pay._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Pays
    $scope.find = function () {
      $scope.pays = Pays.query({ 'user':$scope.user });
    };

    // Find existing Pay
    $scope.findOne = function () {
      $scope.pay = Pays.get({
        payId: $stateParams.payId
      });
    };
  }
]);
