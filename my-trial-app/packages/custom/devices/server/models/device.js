'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Device Schema
 */
var DeviceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: Number,
    min: 1,
    max: 3600,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
DeviceSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

DeviceSchema.path('period').validate(function(period) {
  return !!period;
}, 'Period cannot be blank');

/**
 * Statics
 */
DeviceSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Device', DeviceSchema);
