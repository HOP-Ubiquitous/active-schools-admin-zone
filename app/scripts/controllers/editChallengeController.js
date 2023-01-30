'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('editChallengeCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
  function ($scope, $location, challengeService, challengeServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
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
    vm.id = $routeParams.challenge_id;

    challengeService.getChallengeById(vm.id);

    function getChallenge () {
      vm.challenge = challengeServiceData.challengeById;
    }

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.edit = function () {

      let challenge =  {
        name: vm.challenge.name,
        period: vm.challenge.period,
        unit: vm.challenge.unit,
        bonus: vm.challenge.bonus,
        video: vm.challenge.video,
        images: ['image1', 'image2']
      };

      challengeService.editChallenge(vm.id, challenge);

  };

    function initWatchers() {

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

    }

    initWatchers();

  }]);
