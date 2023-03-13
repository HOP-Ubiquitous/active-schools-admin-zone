'use strict';

app.controller('newChallengeCtrl', ['$scope', '$sce', '$location', 'challengeService', 'ICONS', 'COUNTRIES',
  function ($scope, $sce, $location, challengeService, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.newChallengeUpdated = challengeService.newChallengeUpdated;
    vm.videoTransformed = false;
    vm.categories = [
      {
        name: 'Aerobics',
        value: 'aerobics'
      },
      {
        name: 'Balance',
        value: 'balance'
      },
      {
        name: 'Mental',
        value: 'mental'
      },
      {
        name: 'Strength',
        value: 'strength'
      },
      {
        name: 'Stretch',
        value: 'stretch'
      }
    ];
    vm.units = [
      {
        name: 'Minutes',
        value: 'minutes'
      },
      {
        name: 'Seconds',
        value: 'seconds'
      },
      {
        name: 'Repeats',
        value: 'reps'
      }
    ];
    vm.challenge = {};

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.save = function(){

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
