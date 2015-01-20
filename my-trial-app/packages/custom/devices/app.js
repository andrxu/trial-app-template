'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Devices = new Module('devices');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Devices.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Devices.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Devices.menus.add({
    roles: ['authenticated'],
    title: 'Devices',
    link: 'all devices',
    menu: 'main'  // ???
  });

  Devices.menus.add({
    roles: ['authenticated'],
    title: 'Create New Device',
    link: 'create device',
    menu: 'main' // ???
  });
  
  Devices.aggregateAsset('css', 'devices.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Devices.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Devices.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Devices.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Devices;
});
