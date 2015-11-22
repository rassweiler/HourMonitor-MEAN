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
    required: 'Company cannot be blank'
  },
  pay: {
    type: String,
    default: ''
  },
  rate: {
    type: Number,
    required: 'Rate cannot be blank'
  },
  period: {
    type: Number,
    required: 'Period cannot be blank'
  },
  clocked: {
    type: Boolean,
    default: false
  },
  paydate:{
    type: Date,
    required: 'Paydate cannot be blank',
    validate: {
      validator: function(v) {
        var date = new Date();
        date.setHours(0,0,0,0);
        if(v>= date){
          return true;
        }else{
          return false;
        }
      },
      message: 'Next pay date must be after the current date'
    }
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
