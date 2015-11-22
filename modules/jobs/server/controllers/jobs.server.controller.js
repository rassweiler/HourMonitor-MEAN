'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Pay = mongoose.model('Pay'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a job
 */
exports.create = function (req, res) {
  var pay = new Pay();
  var job = new Job(req.body);
  job.user = req.user;
  if(job.paydate){
    var payday = job.paydate.getDay();
    var lastDay = job.paydate - ((payday+1)*24*60*60*1000);
    var firstDay = lastDay - ((job.period-1)*24*60*60*1000);
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    pay.title=''+req.body.title+year+'-'+month+'-'+day;
    job.pay=pay.id;
    pay.job = job;
    pay.start = firstDay;
    pay.end = lastDay;
    pay.user = req.user;
  }
  pay.save(function(err) {
    //console.log(pay);
    if (err) {
      //return res.status(400).send({
      //  message: errorHandler.getErrorMessage(err)
      //});
    }else{
      
    }
  });
  job.payfiles.push(pay);
  job.save(function (err) {
    //console.log(job);
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
 * Show the current job
 */
exports.read = function (req, res) {
  res.json(req.job);
};

/**
 * Update a job
 */
exports.update = function (req, res) {
  var job = req.job;

  job.rate = req.body.rate;
  job.description = req.body.description;

  job.save(function (err) {
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
 * Delete an job
 */
exports.delete = function (req, res) {
  var job = req.job;

  job.remove(function (err) {
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
 * List of Jobs
 */
exports.list = function (req, res) {
  Job.find({ 'user':req.user }).sort('-created').populate('user', 'displayName').exec(function (err, jobs) {
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
exports.jobByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Job is invalid'
    });
  }

  Job.findById(id).populate('user', 'displayName').exec(function (err, job) {
    if (err) {
      return next(err);
    } else if (!job) {
      return res.status(404).send({
        message: 'No job with that identifier has been found'
      });
    }
    req.job = job;
    next();
  });
};
