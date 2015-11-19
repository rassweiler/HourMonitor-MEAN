'use strict';

(function () {
  // Pays Controller Spec
  describe('Pays Controller Tests', function () {
    // Initialize global variables
    var PaysController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Pays,
      mockPay;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Pays_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Pays = _Pays_;

      // create mock pay
      mockPay = new Pays({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Pay about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Pays controller.
      PaysController = $controller('PaysController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one pay object fetched from XHR', inject(function (Pays) {
      // Create a sample pays array that includes the new pay
      var samplePays = [mockPay];

      // Set GET response
      $httpBackend.expectGET('api/pays').respond(samplePays);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.pays).toEqualData(samplePays);
    }));

    it('$scope.findOne() should create an array with one pay object fetched from XHR using a payId URL parameter', inject(function (Pays) {
      // Set the URL parameter
      $stateParams.payId = mockPay._id;

      // Set GET response
      $httpBackend.expectGET(/api\/pays\/([0-9a-fA-F]{24})$/).respond(mockPay);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.pay).toEqualData(mockPay);
    }));

    describe('$scope.create()', function () {
      var samplePayPostData;

      beforeEach(function () {
        // Create a sample pay object
        samplePayPostData = new Pays({
          title: 'An Pay about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Pay about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Pays) {
        // Set POST response
        $httpBackend.expectPOST('api/pays', samplePayPostData).respond(mockPay);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the pay was created
        expect($location.path.calls.mostRecent().args[0]).toBe('pays/' + mockPay._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/pays', samplePayPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock pay in scope
        scope.pay = mockPay;
      });

      it('should update a valid pay', inject(function (Pays) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/pays\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/pays/' + mockPay._id);
      }));

      it('should set scope.error to error response message', inject(function (Pays) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/pays\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(pay)', function () {
      beforeEach(function () {
        // Create new pays array and include the pay
        scope.pays = [mockPay, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/pays\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockPay);
      });

      it('should send a DELETE request with a valid payId and remove the pay from the scope', inject(function (Pays) {
        expect(scope.pays.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.pay = mockPay;

        $httpBackend.expectDELETE(/api\/pays\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to pays', function () {
        expect($location.path).toHaveBeenCalledWith('pays');
      });
    });
  });
}());
