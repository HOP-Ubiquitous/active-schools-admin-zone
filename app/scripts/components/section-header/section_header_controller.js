app.controller('sectionHeaderCtrl', ['$location', '$routeParams', '$scope', 'ICONS', 'languageService',
    function ($location, $routeParams, $scope, ICONS, languageService) {

      var vm = this;

      vm.icons = ICONS;

      languageService.getSelectedLanguage();

      function updateLanguage() {
        vm.language = languageService.language;
        vm.english = languageService.selectedEnglish;
        vm.greece = languageService.selectedGreece;
        vm.spanish = languageService.selectedSpanish;
      }

      updateLanguage();

      vm.setLanguage = function (language) {
        languageService.setLanguage(language);
      }

      function initWatchers() {

        vm.languageWatcher = $scope.$watch(
          function () {
            return languageService.headerLanguageUpdated;
          }, function (newValue) {
            if (newValue === true) {
              updateLanguage();
              languageService.headerLanguageUpdated = false;
            }
          }
        );
    
      }
    
      initWatchers();

    }
  ]
);
