'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('avatarServiceData', ['$cookies', function($cookies){

  var serviceAvatar = {};

  serviceAvatar.avatarLevels = [];
  serviceAvatar.avatarLevelById = {};
  serviceAvatar.avatarAccessories = [];
  serviceAvatar.avatarAccessoryById = {};

 return serviceAvatar;

}]);
