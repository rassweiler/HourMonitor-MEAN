'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pay = mongoose.model('Pay');

/**
 * Globals
 */
var user, pay;

/**
 * Unit tests
 */
describe('Pay Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      pay = new Pay({
        title: 'Pay Title',
        start: Date.now(),
        end: Date.now(),
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return pay.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without title', function (done) {
      pay.title = '';

      return pay.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without start date', function (done) {
      pay.start = null;

      return pay.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without end date', function (done) {
      pay.end = null;

      return pay.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Pay.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
