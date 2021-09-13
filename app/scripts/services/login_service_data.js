'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('loginServiceData', ['$cookies', function($cookies){

  var loginService = {};
  loginService.loginList = {
    username: 'ruben',
    password: '1234'
  };
  return loginService;

}]);
