'use strict';

app.controller('editChallengeCtrl', ['$scope', '$location', '$sce', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'languageService',
  function ($scope, $location, $sce, challengeService, challengeServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.challengeUpdated = challengeService.challengeUpdated;
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
    vm.id = $routeParams.challenge_id;

    challengeService.getChallengeById(vm.id);

    function getChallenge () {
      vm.challenge = challengeServiceData.challengeById;
      vm.challenge.video = 'https://www.youtube.com/watch?v=' + vm.challenge.video;

      vm.getEmbedUrl(vm.challenge.video);
      getVideoTransformed();
    }

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.edit = function () {

      let challenge =  {
        title: vm.challenge.title,
        category: vm.challenge.category,
        description: vm.challenge.description,
        target: vm.challenge.target,
        unit: vm.challenge.unit,
        instructions: vm.challenge.instructions,
        reward: vm.challenge.reward,
        video: vm.videoId
      };

      challengeService.editChallenge(vm.id, challenge);

  };

  vm.goToChallenges = function(){
    $location.path('challenges');
  };

  vm.getEmbedUrl = function(event) {
    vm.embedUrl = '';
    vm.videoId = '';

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = event.currentTarget === undefined ? event.match(regExp) : event.currentTarget.value.match(regExp);
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

      vm.postWatcher = $scope.$watch(
        function () {
          return challengeService.challengeByIdLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallenge();
            challengeService.challengeByIdLoaded = false;
          }
        }
      );

      vm.videoWatcher = $scope.$watch(
        function () {
          return vm.videoTransformed;
        }, function (newValue) {
          if (newValue === true) {
            getVideoTransformed();
            vm.videoTransformed = false;
          }
        }
      );

      vm.challengeUpdatedWatcher = $scope.$watch(
        function () {
          return challengeService.challengeUpdated;
        }, function (newValue) {
          //TODO Revisar mostrar notificaciones
          vm.challengeUpdated = newValue;
        }
      );

    }

    initWatchers();

  }]);
