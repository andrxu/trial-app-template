'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Device = mongoose.model('Device'),
  _ = require('lodash');


/**
 * Find device by id
 */
exports.device = function(req, res, next, id) {
  Device.load(id, function(err, device) {
    if (err) return next(err);
    if (!device) return next(new Error('Failed to load device ' + id));
    req.device = device;
    next();
  });
};

/**
 * Create a device
 */
exports.create = function(req, res) {
  var device = new Device(req.body);
  device.user = req.user;

  device.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the device' + req
      });
    }
    res.json(device);

  });
};

/**
 * Update a device
 */
exports.update = function(req, res) {
  var device = req.device;

  device = _.extend(device, req.body);

  device.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the device'
      });
    }
    res.json(device);

  });
};

/**
 * Delete a device
 */
exports.destroy = function(req, res) {
  var device = req.device;

  device.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the device'
      });
    }
    res.json(device);

  });
};

/**
 * Show a device
 */
exports.show = function(req, res) {
  res.json(req.device);
};

/**
 * List of Devices
 */
exports.all = function(req, res) {
  Device.find().sort('-created').populate('user', 'name username').exec(function(err, devices) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the devices'
      });
    }
    res.json(devices);

  });
};
