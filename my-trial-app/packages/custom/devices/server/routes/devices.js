'use strict';

var devices = require('../controllers/devices');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};


module.exports = function(Devices, app, auth) {

  app.route('/devices')
    .get(devices.all)
    .post(auth.requiresLogin, devices.create);
  app.route('/devices/:deviceId')
    .get(auth.isMongoId, devices.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, devices.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, devices.destroy);

  // Finish with setting up the deviceId param
  app.param('deviceId', devices.device);
   
};
