'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('editChallengeCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams',
  function ($scope, $location, challengeService, challengeServiceData, $routeParams) {

    var vm = this;

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
