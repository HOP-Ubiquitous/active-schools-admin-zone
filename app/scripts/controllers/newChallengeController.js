'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('newChallengeCtrl', ['$location', 'challengeService',
  function ($location, challengeService) {

    var vm = this;

    vm.challenge = {};

    vm.getUnit = function (unit) {
      vm.challenge.unit = unit;
    };

    vm.save = function(){

      let challenge =  {
        name: vm.challenge.name,
        period: vm.challenge.period,
        unit: vm.challenge.unit,
        bonus: vm.challenge.bonus,
        video: vm.challenge.video,
        images: ['image1', 'image2']
      };

      challengeService.addChallenge(challenge);
    };

  }]);
