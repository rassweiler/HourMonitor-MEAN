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

	pay.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(pay);
		}
	});
};

/**
 * Show the current Pay
 */
exports.read = function(req, res) {
	res.json(req.pay);
};

/**
 * Update a Pay
 */
exports.update = function(req, res) {
	var pay = req.pay;

	pay = _.extend(pay, req.body);

	pay.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pay);
		}
	});
};

/**
 * Delete an Pay
 */
exports.delete = function(req, res) {
	var pay = req.pay;

	pay.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pay);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Pay.find().sort('name').exec(function(err, pays) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pays);
		}
	});
};

/**
 * Pay middleware
 */
exports.payByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Pay is invalid'
		});
	}

	Pay.findById(id).exec(function(err, pay) {
		if (err) return next(err);
		if (!pay) {
			return res.status(404).send({
  				message: 'Pay not found'
  			});
		}
		req.pay = pay;
		next();
	});
};
