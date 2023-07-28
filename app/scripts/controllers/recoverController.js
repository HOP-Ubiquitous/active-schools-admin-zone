'use strict';

app.controller('recoverCtrl', ['$location', '$scope', 'ICONS', 'languageService',
  function ($location, $scope, ICONS, languageService) {


  var vm = this;
  vm.icons = ICONS;

  languageService.getSelectedLanguage();

  function updateLanguage() {
    vm.language = languageService.language;
    vm.countries = languageService.countries;
  }

  updateLanguage();
  
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

  function initWatchers() {

    vm.languageWatcher = $scope.$watch(
      function () {
        return languageService.languageUpdated;
      }, function (newValue) {
        if (newValue === true) {
          updateLanguage();
          languageService.languageUpdated = false;
        }
      }
    );

  }

  initWatchers();

}]);





