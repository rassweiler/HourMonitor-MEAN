'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  company: {
    type: String,
    default: '',
    trim: true,     
    // make this a required field
    required: 'company cannot be blank'
  },
  pay: {
    type: String,
    default: ''
  },
  rate: {
    type: Number,
    required: 'rate cannot be blank'
  },
  period: {
    type: Number,
    required: 'frequency cannot be blank'
  },
  clocked: {
    type: Boolean,
    default: false
  },
  paydate:{
    type: Date,
    required: 'First pay day cannot be blank'
  },
  payfiles:[{ 
    type: Schema.ObjectId,
    ref: 'Pay'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Job', JobSchema);
