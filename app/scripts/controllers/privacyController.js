'use strict';

app.controller('privacyCtrl', ['$location', '$scope', 'ICONS', 'languageService',
  function ($location, $scope, ICONS, languageService) {

  var vm = this;
  vm.icons = ICONS;

  languageService.getSelectedLanguage();

  function updateLanguage() {
    vm.language = languageService.language;
    vm.countries = languageService.countries;
    vm.english = languageService.selectedEnglish;
    vm.greece = languageService.selectedGreece;
    vm.spanish = languageService.selectedSpanish;
  }

  updateLanguage();

  vm.setLanguage = function (language) {
    languageService.setLanguage(language);
  }

  vm.goToLogin = () => {
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





