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
	name: {
		type: String,
		default: '',
		required: 'Please fill Pay name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	job: {
		type: String,
		default: '',
		required: 'Please assign a job',
		trim: true
	},
	start: {
		type: Date,
		required: 'Please assign a start'
	},
	end: {
		type: Date,
		required: 'Please assign a start'
	}
});

mongoose.model('Pay', PaySchema);