'use strict';

app.controller('privacyCtrl', ['$location', 'ICONS', 'COUNTRIES',
  function ($location, ICONS, COUNTRIES) {

  var vm = this;
  vm.icons = ICONS;
  vm.countries = COUNTRIES.countries;

  vm.goToLogin = () => {
    $location.path('/login');
  }

}]);





