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
  // a custom validation function for checking string length to be used by the model
  return v.length <= 15;
}

/**
 * Job Schema
 */
var JobSchema = new Schema({
    // the property name
    created: {         
        // types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
        type: Date,   
        // default values can be set
        default: Date.now 
    },
    name: {
        type: String,
        default: '',
        trim: true,     
        unique : true,
        // make this a required field
        required: 'name cannot be blank',
        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
        validate: [validateLength, 'name must be 15 chars in length or less']
    },
    description: {
        type: String,
        default: '',
        // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
        trim: true
    },
    title: {
        type: String,
        default: '',
        trim: true,     
        // make this a required field
        required: 'title cannot be blank'
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
    frequency: {
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
        type: String,
        default: ''
    }]
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Job', JobSchema);