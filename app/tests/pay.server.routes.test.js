'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pay = mongoose.model('Pay'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pay;

/**
 * Pay routes tests
 */
describe('Pay CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Pay
		user.save(function() {
			pay = {
				name: 'Pay Name'
			};

			done();
		});
	});

	it('should be able to save Pay instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pay
				agent.post('/pays')
					.send(pay)
					.expect(200)
					.end(function(paySaveErr, paySaveRes) {
						// Handle Pay save error
						if (paySaveErr) done(paySaveErr);

						// Get a list of Pays
						agent.get('/pays')
							.end(function(paysGetErr, paysGetRes) {
								// Handle Pay save error
								if (paysGetErr) done(paysGetErr);

								// Get Pays list
								var pays = paysGetRes.body;

								// Set assertions
								(pays[0].user._id).should.equal(userId);
								(pays[0].name).should.match('Pay Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pay instance if not logged in', function(done) {
		agent.post('/pays')
			.send(pay)
			.expect(401)
			.end(function(paySaveErr, paySaveRes) {
				// Call the assertion callback
				done(paySaveErr);
			});
	});

	it('should not be able to save Pay instance if no name is provided', function(done) {
		// Invalidate name field
		pay.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pay
				agent.post('/pays')
					.send(pay)
					.expect(400)
					.end(function(paySaveErr, paySaveRes) {
						// Set message assertion
						(paySaveRes.body.message).should.match('Please fill Pay name');
						
						// Handle Pay save error
						done(paySaveErr);
					});
			});
	});

	it('should be able to update Pay instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pay
				agent.post('/pays')
					.send(pay)
					.expect(200)
					.end(function(paySaveErr, paySaveRes) {
						// Handle Pay save error
						if (paySaveErr) done(paySaveErr);

						// Update Pay name
						pay.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pay
						agent.put('/pays/' + paySaveRes.body._id)
							.send(pay)
							.expect(200)
							.end(function(payUpdateErr, payUpdateRes) {
								// Handle Pay update error
								if (payUpdateErr) done(payUpdateErr);

								// Set assertions
								(payUpdateRes.body._id).should.equal(paySaveRes.body._id);
								(payUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pays if not signed in', function(done) {
		// Create new Pay model instance
		var payObj = new Pay(pay);

		// Save the Pay
		payObj.save(function() {
			// Request Pays
			request(app).get('/pays')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pay if not signed in', function(done) {
		// Create new Pay model instance
		var payObj = new Pay(pay);

		// Save the Pay
		payObj.save(function() {
			request(app).get('/pays/' + payObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pay.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pay instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pay
				agent.post('/pays')
					.send(pay)
					.expect(200)
					.end(function(paySaveErr, paySaveRes) {
						// Handle Pay save error
						if (paySaveErr) done(paySaveErr);

						// Delete existing Pay
						agent.delete('/pays/' + paySaveRes.body._id)
							.send(pay)
							.expect(200)
							.end(function(payDeleteErr, payDeleteRes) {
								// Handle Pay error error
								if (payDeleteErr) done(payDeleteErr);

								// Set assertions
								(payDeleteRes.body._id).should.equal(paySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pay instance if not signed in', function(done) {
		// Set Pay user 
		pay.user = user;

		// Create new Pay model instance
		var payObj = new Pay(pay);

		// Save the Pay
		payObj.save(function() {
			// Try deleting Pay
			request(app).delete('/pays/' + payObj._id)
			.expect(401)
			.end(function(payDeleteErr, payDeleteRes) {
				// Set message assertion
				(payDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pay error error
				done(payDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pay.remove().exec();
		done();
	});
});