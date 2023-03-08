'use strict';

app.service('dailyChallengeServiceData', ['$cookies', function($cookies){

  var serviceDailyChallenge = {};

  serviceDailyChallenge.dailyChallengeList = [];
  serviceDailyChallenge.dailyChallengeById = {};

 return serviceDailyChallenge;

}]);
