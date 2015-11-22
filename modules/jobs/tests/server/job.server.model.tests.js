'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Job = mongoose.model('Job');

/**
 * Globals
 */
var user, job;

/**
 * Unit tests
 */
describe('Job Model Unit Tests:', function () {

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
      job = new Job({
        title: 'Job Title',
        description: 'Job description',
        company: 'razorsnatch',
        rate: 20,
        period: 10,
        paydate: Date.now(),
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return job.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without title', function (done) {
      job.title = '';

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without company', function (done) {
      job.company = '';

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without rate', function (done) {
      job.rate = null;

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without period', function (done) {
      job.period = null;

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save without paydate', function (done) {
      job.paydate = null;

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when trying to save with paydate less than current date', function (done) {
      var date = new Date(new Date().setDate(new Date().getDate()-2));
      job.paydate = date;

      return job.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Job.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
