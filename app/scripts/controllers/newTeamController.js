'use strict';

app.controller('newTeamCtrl', ['$location', 'challengeService', 'ICONS', 'COUNTRIES',
  function ($location, challengeService, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
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

    vm.goToTeams = function(){
      $location.path('teams');
    };

  }]);
