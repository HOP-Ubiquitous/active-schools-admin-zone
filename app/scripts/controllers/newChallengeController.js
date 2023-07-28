'use strict';

app.controller('newChallengeCtrl', ['$scope', '$sce', '$location', 'challengeService', 'ICONS', 'languageService',
  function ($scope, $sce, $location, challengeService, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.newChallengeUpdated = challengeService.newChallengeUpdated;
    vm.videoTransformed = false;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    vm.categories = [
      {
        name: languageService.language.ROUTES.aerobics,
        value: 'aerobics'
      },
      {
        name: languageService.language.ROUTES.balance,
        value: 'balance'
      },
      {
        name: languageService.language.ROUTES.mental,
        value: 'mental'
      },
      {
        name: languageService.language.ROUTES.strength,
        value: 'strength'
      },
      {
        name: languageService.language.ROUTES.stretch,
        value: 'stretch'
      }
    ];
    vm.units = [
      {
        name: languageService.language.ROUTES.minutes,
        value: 'minutes'
      },
      {
        name: languageService.language.ROUTES.seconds,
        value: 'seconds'
      },
      {
        name: languageService.language.ROUTES.repeats,
        value: 'reps'
      }
    ];
    vm.challenge = {};

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.save = function () {

      //TODO Añadir condicionales para filtrado de datos

      let challenge =  {
        title: vm.challenge.title,
        category: vm.challenge.category,
        description: vm.challenge.description,
        target: vm.challenge.target,
        unit: vm.challenge.unit,
        instructions: 'instructions',
        reward: vm.challenge.reward,
        video: vm.videoId
      };

      challengeService.addChallenge(challenge);
    };

    vm.goToChallenges = function(){
      $location.path('challenges');
    };

    vm.getEmbedUrl = function(event) {
      vm.embedUrl = '';
      vm.videoId = '';
  
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = event.currentTarget.value.match(regExp);
      vm.videoId = (match&&match[7].length==11)? match[7] : false;
  
      vm.videoTransformed = true;
  
    }
  
    function getVideoTransformed () {
      vm.embedUrl = vm.videoId;
    }
  
    vm.trustSrc = (url) => {
      return $sce.trustAsResourceUrl(url);
    }

    function initWatchers() {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.formLanguageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.formLanguageUpdated = false;
          }
        }
      );

      vm.newVideoWatcher = $scope.$watch(
        function () {
          return vm.videoTransformed;
        }, function (newValue) {
          if (newValue === true) {
            getVideoTransformed();
            vm.videoTransformed = false;
          }
        }
      );

      vm.newChallengeUpdatedWathcher = $scope.$watch(
        function () {
          return challengeService.newChallengeUpdated;
        }, function (newValue) {
          //TODO Revisar mostrar notificaciones
          vm.newChallengeUpdated = newValue;
        }
      );

    }

    initWatchers();

  }]);
