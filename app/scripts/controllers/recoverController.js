'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('recoverCtrl', ['$location', function ($location) {


  var vm = this;
//vm.userService = userService;
//vm.rootService = rootService;

  vm.recover = function(){
    debugger;
/*
  var email = {
    useremail: vm.email.username,

  };
  console.log(email);
*/
  //this.userService.openMessageWindow = false;
  //this.userService.login(user);

  $location.path('/login');


}



  }]);





