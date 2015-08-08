'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length
  return v.length <= 20;
}

/**
 * Job Schema
 */
var JobSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,     
        unique : true,
        required: 'name cannot be blank',
        validate: [validateLength, 'name must be 20 chars in length or less'] // wires into our custom validator function - http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
    },
	created: {          // the property name
        type: Date,     // types are defined e.g. String, Date, Number - http://mongoosejs.com/docs/guide.html
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true      // types have specific functions e.g. trim, lowercase, uppercase - http://mongoosejs.com/docs/api.html#schema-string-js
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    rate: {
        type: Number,
        default: 0.0,
    }
});

mongoose.model('Job', JobSchema);