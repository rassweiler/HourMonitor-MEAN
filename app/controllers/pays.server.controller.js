'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pay = mongoose.model('Pay'),
	_ = require('lodash');

/**
 * Create a Pay
 */
exports.create = function(req, res) {
	var pay = new Pay(req.body);
	pay.job = req.job;

	pay.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pay);
		}
	});
};

/**
 * Show the current Pay
 */
exports.read = function(req, res) {
	res.jsonp(req.pay);
};

/**
 * Update a Pay
 */
exports.update = function(req, res) {
	var pay = req.pay ;

	pay = _.extend(pay , req.body);

	pay.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pay);
		}
	});
};

/**
 * Delete an Pay
 */
exports.delete = function(req, res) {
	var pay = req.pay ;

	pay.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pay);
		}
	});
};

/**
 * List of Pays
 */
exports.list = function(req, res) { 
	Pay.find().sort('-created').populate('user', 'displayName').exec(function(err, pays) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pays);
		}
	});
};

/**
 * Pay middleware
 */
exports.payByID = function(req, res, next, id) { 
	Pay.findById(id).populate('user', 'displayName').exec(function(err, pay) {
		if (err) return next(err);
		if (! pay) return next(new Error('Failed to load Pay ' + id));
		req.pay = pay ;
		next();
	});
};

/**
 * Pay authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pay.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
