'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Pay = mongoose.model('Pay'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a pay
 */
exports.create = function (req, res) {
  var pay = new Pay(req.body);
  pay.job = req.job;

  pay.save(function (err) {
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
 * Show the current pay
 */
exports.read = function (req, res) {
  res.json(req.pay);
};

/**
 * Update a pay
 */
exports.update = function (req, res) {
  var pay = req.pay;

  pay.title = req.body.title;
  pay.content = req.body.content;

  pay.save(function (err) {
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
 * Delete an pay
 */
exports.delete = function (req, res) {
  var pay = req.pay;

  pay.remove(function (err) {
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
 * List of Pays
 */
exports.list = function (req, res) {
  Pay.find({ 'user':req.user }).sort('-created').populate('user', 'displayName').exec(function (err, pays) {
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
exports.payByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Pay is invalid'
    });
  }

  Pay.findById(id).populate('user', 'displayName').exec(function (err, pay) {
    if (err) {
      return next(err);
    } else if (!pay) {
      return res.status(404).send({
        message: 'No pay with that identifier has been found'
      });
    }
    req.pay = pay;
    next();
  });
};
