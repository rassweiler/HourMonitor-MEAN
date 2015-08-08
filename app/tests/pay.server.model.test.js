'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Pay = mongoose.model('Pay');

/**
 * Unit tests
 */
describe('Pay Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var pay = new Pay({
                name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            pay.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function(done) {   
            var pay = new Pay({
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            pay.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 20 chars', function(done) {
            var pay = new Pay({
                name: 'Grains/Cereals/Chocolates/BananaHammock Apple Sitck'
            });

            pay.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 20 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate pay name', function(done) {
            var pay = new Pay({
                name: 'Beverages'
            });

            pay.save(function(err) {
                should.not.exist(err);

                var duplicate = new Pay({
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
        Pay.remove().exec();
        done();
    });
});