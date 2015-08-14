'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Job = mongoose.model('Job'),
	Pay = mongoose.model('Pay'),
    _ = require('lodash');
/**
 * Create a Job
 */
exports.create = function(req, res) {
    var pay = new Pay();
	var job = new Job(req.body);
    var payday = job.paydate.getDay();
    var lastDay = job.paydate - ((payday+1)*24*60*60*1000);
    var firstDay = lastDay - ((job.frequency-1)*24*60*60*1000);
    var day = Date.now().getDate();
    var month = Date.now().getMonth()+1;
    var year = Date.now().getFullYear();
    pay.name=''+req.body.name+year+'-'+month+'-'+day;
    job.pay=pay.id;
    pay.job = job.id;
    pay.start = firstDay;
    pay.end = lastDay;
    pay.save(function(err) {
        console.log(pay);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });
    job.payfiles = [pay.id,];
    job.save(function(err) {
    	console.log(job);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).jsonp(job);
        }
    });
};

/**
 * Show the current Job
 */
exports.read = function(req, res) {
	Job.findById(req.params.jobId).exec(function(err, job) {
        if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
         if (!job) {
                return res.status(404).send({
                    message: 'Job not found'
                });
            }
            res.jsonp(job);
      }
    });
};

/**
 * Update a Job
 */
exports.update = function(req, res) {
    var job = req.job ;

    job = _.extend(job , req.body);

    job.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(job);
        }
    });
};

/**
 * Delete an Pay
 */
exports.delete = function(req, res) {
    var job = req.job ;

    job.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(job);
        }
    });
};
/**
 * List of Jobs
 */
exports.list = function(req, res) {
	Job.find().exec(function(err, jobs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(jobs);
        }
    });
};