'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pay = mongoose.model('Pay'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, pay;

/**
 * Pay routes tests
 */
describe('Pay CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
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

    // Save a user to the test db and create new pay
    user.save(function () {
      pay = {
        title: 'Pay Title',
        start: Date.now(),
        end: Date.now(),
        user: user
      };

      done();
    });
  });

  it('should be able to save an pay if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pay
        agent.post('/api/pays')
          .send(pay)
          .expect(200)
          .end(function (paySaveErr, paySaveRes) {
            // Handle pay save error
            if (paySaveErr) {
              return done(paySaveErr);
            }

            // Get a list of pays
            agent.get('/api/pays')
              .end(function (paysGetErr, paysGetRes) {
                // Handle pay save error
                if (paysGetErr) {
                  return done(paysGetErr);
                }

                // Get pays list
                var pays = paysGetRes.body;

                // Set assertions
                (pays[0].user._id).should.equal(userId);
                (pays[0].title).should.match('Pay Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an pay if not logged in', function (done) {
    agent.post('/api/pays')
      .send(pay)
      .expect(403)
      .end(function (paySaveErr, paySaveRes) {
        // Call the assertion callback
        done(paySaveErr);
      });
  });

  it('should not be able to save an pay if no title is provided', function (done) {
    // Invalidate title field
    pay.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pay
        agent.post('/api/pays')
          .send(pay)
          .expect(400)
          .end(function (paySaveErr, paySaveRes) {
            // Set message assertion
            (paySaveRes.body.message).should.match('Title cannot be blank');

            // Handle pay save error
            done(paySaveErr);
          });
      });
  });

  it('should be able to update an pay if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pay
        agent.post('/api/pays')
          .send(pay)
          .expect(200)
          .end(function (paySaveErr, paySaveRes) {
            // Handle pay save error
            if (paySaveErr) {
              return done(paySaveErr);
            }

            // Update pay title
            pay.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing pay
            agent.put('/api/pays/' + paySaveRes.body._id)
              .send(pay)
              .expect(200)
              .end(function (payUpdateErr, payUpdateRes) {
                // Handle pay update error
                if (payUpdateErr) {
                  return done(payUpdateErr);
                }

                // Set assertions
                (payUpdateRes.body._id).should.equal(paySaveRes.body._id);
                (payUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of pays if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;
        var payObj = new Pay(pay);
        // Save a new job
        agent.post('/api/pays')
          .send(payObj)
          .expect(200)
          .end(function (paySaveErr, paySaveRes) {
            // Handle job save error
            if (paySaveErr) {
              return done(paySaveErr);
            }

            // Delete an existing job
            agent.get('/api/pays')
              .send(pay)
              .expect(200)
              .end(function (payDeleteErr, payDeleteRes) {
                // Handle job error error
                if (payDeleteErr) {
                  return done(payDeleteErr);
                }

                // Set assertions
                payDeleteRes.body.should.be.instanceof(Array).and.have.lengthOf(1);

                // Call the assertion callback
                done();
              });
          });
      });
  });


  it('should be able to get a single pay if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;
        var payObj = new Pay(pay);
        // Save a new job
        agent.post('/api/pays')
          .send(payObj)
          .expect(200)
          .end(function (paySaveErr, paySaveRes) {
            // Handle job save error
            if (paySaveErr) {
              return done(paySaveErr);
            }

            // Delete an existing job
            agent.get('/api/pays/' + paySaveRes.body._id)
              .send(pay)
              .expect(200)
              .end(function (payDeleteErr, payDeleteRes) {
                // Handle job error error
                if (payDeleteErr) {
                  return done(payDeleteErr);
                }

                // Set assertions
                payDeleteRes.body.should.be.instanceof(Object).and.have.property('title', pay.title);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to get a list of pays if not signed in', function (done) {
    // Create new pay model instance
    var payObj = new Pay(pay);

    // Save the pay
    payObj.save(function () {
      // Request pays
      request(app).get('/api/pays')
        .expect(403)
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });

    });
  });

  it('should not be able to get a single pay if not signed in', function (done) {
    // Create new pay model instance
    var payObj = new Pay(pay);

    // Save the pay
    payObj.save(function () {
      request(app).get('/api/pays/' + payObj._id)
        .expect(403)
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single pay with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/pays/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Pay is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single pay which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent pay
    request(app).get('/api/pays/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No pay with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an pay if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new pay
        agent.post('/api/pays')
          .send(pay)
          .expect(200)
          .end(function (paySaveErr, paySaveRes) {
            // Handle pay save error
            if (paySaveErr) {
              return done(paySaveErr);
            }

            // Delete an existing pay
            agent.delete('/api/pays/' + paySaveRes.body._id)
              .send(pay)
              .expect(200)
              .end(function (payDeleteErr, payDeleteRes) {
                // Handle pay error error
                if (payDeleteErr) {
                  return done(payDeleteErr);
                }

                // Set assertions
                (payDeleteRes.body._id).should.equal(paySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an pay if not signed in', function (done) {
    // Set pay user
    pay.user = user;

    // Create new pay model instance
    var payObj = new Pay(pay);

    // Save the pay
    payObj.save(function () {
      // Try deleting pay
      request(app).delete('/api/pays/' + payObj._id)
        .expect(403)
        .end(function (payDeleteErr, payDeleteRes) {
          // Set message assertion
          (payDeleteRes.body.message).should.match('User is not authorized');

          // Handle pay error error
          done(payDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Pay.remove().exec(done);
    });
  });
});
