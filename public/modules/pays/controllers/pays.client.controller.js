'use strict';

// Pays controller
angular.module('pays').controller('PaysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pays',
    function($scope, $stateParams, $location, Authentication, Pays) {
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
            var pay = new Pays ({
                name: this.name,
                description: this.description
            });

            // Redirect after save
            pay.$save(function(response) {
                $location.path('pays/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Category
        $scope.remove = function(pay) {
            if ( pay ) { 
                pay.$remove();

                for (var i in $scope.pays) {
                    if ($scope.pays [i] === pay) {
                        $scope.pays.splice(i, 1);
                    }
                }
            } else {
                $scope.pay.$remove(function() {
                    $location.path('pays');
                });
            }
        };

        // Update existing Category
        $scope.update = function() {
            var pay = $scope.pay;

            pay.$update(function() {
                $location.path('pays/' + pay._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Pays
        $scope.find = function() {
            $scope.pays = Pays.query();
        };

        // Find existing Category
        $scope.findOne = function() {
            $scope.pay = Pays.get({ 
                payId: $stateParams.payId
            });
        };

        // Search for a pay
        $scope.paySearch = function(product) {
            $location.path('pays/' + product._id);
        };
    }
]);