'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Job = mongoose.model('Job'),
    _ = require('lodash');

/**
 * Create a Job
 */
exports.create = function(req, res) {
	var job = new Job(req.body);

	job.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(job);
		}
	});
};

/**
 * Show the current Job
 */
exports.read = function(req, res) {
	res.json(req.job);
};

/**
 * Update a Job
 */
exports.update = function(req, res) {
	var job = req.job;

	job = _.extend(job, req.body);

	job.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(job);
		}
	});
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
	var job = req.job;

	job.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(job);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Job.find().sort('name').exec(function(err, jobs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(jobs);
		}
	});
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Job is invalid'
		});
	}

	Job.findById(id).exec(function(err, job) {
		if (err) return next(err);
		if (!job) {
			return res.status(404).send({
  				message: 'Job not found'
  			});
		}
		req.job = job;
		next();
	});
};
