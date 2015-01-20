'use strict';

angular.module('mean.devices').controller('DevicesController', ['$scope', '$stateParams', '$location', 'Global', 'Devices',
  function($scope, $stateParams, $location, Global, Devices) {
    $scope.global = Global;

    $scope.hasAuthorization = function(device) {
      if (!device || !device.user) return false;
      return $scope.global.isAdmin || device.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var device = new Devices({
          name: this.name,
          period: this.period
        });
        device.$save(function(response) {
          $location.path('devices/' + response._id);
        });

        this.name = '';
        this.period = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(device) {
      if (device) {
        device.$remove(function(response) {
          for (var i in $scope.devices) {
            if ($scope.devices[i] === device) {
              $scope.devices.splice(i, 1);
            }
          }
          $location.path('devices');
        });
      } else {
        $scope.devices.$remove(function(response) {
          $location.path('devices');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var device = $scope.device;
        if (!device.updated) {
          device.updated = [];
        }
        device.updated.push(new Date().getTime());

        device.$update(function() {
          $location.path('devices/' + device._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Devices.query(function(devices) {
        $scope.devices = devices;
      });
    };

    $scope.findOne = function() {
      Devices.get({
        deviceId: $stateParams.deviceId
      }, function(device) {
        $scope.device = device;
      });
    };
  }
]);
