'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('loginCtrl', ['$location', 'loginServiceData', function ($location, loginServiceData) {

    var vm = this;
    vm.user = {};
    vm.errorMessage = '';

    console.log(loginServiceData.loginList);

    vm.login = function(){

      if(vm.user.username === loginServiceData.loginList.username && vm.user.password === loginServiceData.loginList.password){
        $location.path('/routes');
      }else{
        vm.errorMessage = "usuario o password incorrecto"
      }

      /*var user = {
        username: vm.user.username,
        password: vm.user.password
      };*/

      //this.userService.openMessageWindow = false;
      //this.userService.login(user);

    };

  }]);
