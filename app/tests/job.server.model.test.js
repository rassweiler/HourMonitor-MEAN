'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Job = mongoose.model('Job');

/**
 * Unit tests
 */
describe('Job Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var job = new Job({
                name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            job.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function(done) {   
            var job = new Job({
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            job.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 20 chars', function(done) {
            var job = new Job({
                name: 'Grains/Cereals/Chocolates/BananaHammock Apple Sitck'
            });

            job.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 20 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate job name', function(done) {
            var job = new Job({
                name: 'Beverages'
            });

            job.save(function(err) {
                should.not.exist(err);

                var duplicate = new Job({
                    name: 'Beverages'
                });

                duplicate.save(function(err) {
                    err.err.indexOf('$name').should.not.equal(-1);
                    err.err.indexOf('duplicate key error').should.not.equal(-1);
                    should.exist(err);
                    done();
                });
            });
        });
    });

    afterEach(function(done) { 
        // NB this deletes ALL categories (but is run against a test database)
        Job.remove().exec();
        done();
    });
});