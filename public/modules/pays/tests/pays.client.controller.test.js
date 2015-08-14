'use strict';

(function() {
	// Pays Controller Spec
	describe('Pays Controller Tests', function() {
		// Initialize global variables
		var PaysController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
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
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Pays controller.
			PaysController = $controller('PaysController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pay object fetched from XHR', inject(function(Pays) {
			// Create sample Pay using the Pays service
			var samplePay = new Pays({
				name: 'New Pay'
			});

			// Create a sample Pays array that includes the new Pay
			var samplePays = [samplePay];

			// Set GET response
			$httpBackend.expectGET('pays').respond(samplePays);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pays).toEqualData(samplePays);
		}));

		it('$scope.findOne() should create an array with one Pay object fetched from XHR using a payId URL parameter', inject(function(Pays) {
			// Define a sample Pay object
			var samplePay = new Pays({
				name: 'New Pay'
			});

			// Set the URL parameter
			$stateParams.payId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pays\/([0-9a-fA-F]{24})$/).respond(samplePay);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pay).toEqualData(samplePay);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pays) {
			// Create a sample Pay object
			var samplePayPostData = new Pays({
				name: 'New Pay'
			});

			// Create a sample Pay response
			var samplePayResponse = new Pays({
				_id: '525cf20451979dea2c000001',
				name: 'New Pay'
			});

			// Fixture mock form input values
			scope.name = 'New Pay';

			// Set POST response
			$httpBackend.expectPOST('pays', samplePayPostData).respond(samplePayResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pay was created
			expect($location.path()).toBe('/pays/' + samplePayResponse._id);
		}));

		it('$scope.update() should update a valid Pay', inject(function(Pays) {
			// Define a sample Pay put data
			var samplePayPutData = new Pays({
				_id: '525cf20451979dea2c000001',
				name: 'New Pay'
			});

			// Mock Pay in scope
			scope.pay = samplePayPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pays\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pays/' + samplePayPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid payId and remove the Pay from the scope', inject(function(Pays) {
			// Create new Pay object
			var samplePay = new Pays({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pays array and include the Pay
			scope.pays = [samplePay];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pays\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePay);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pays.length).toBe(0);
		}));
	});
}());