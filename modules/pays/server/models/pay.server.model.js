'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Pay Schema
 */
var PaySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  job: {
    type: Schema.ObjectId,
    ref: 'Job'
  },
  start: {
    type: Date,
    required: 'Please assign a start'
  },
  end: {
    type: Date,
    required: 'Please assign a end'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Pay', PaySchema);
