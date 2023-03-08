'use strict';

app.controller('recoverCtrl', ['$location', 'ICONS', 'COUNTRIES',
  function ($location, ICONS, COUNTRIES) {


  var vm = this;
  vm.icons = ICONS;
  vm.countries = COUNTRIES.countries;
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





