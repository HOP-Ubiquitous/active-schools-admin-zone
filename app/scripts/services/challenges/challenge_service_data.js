'use strict';

app.service('challengeServiceData', ['$cookies', function($cookies){

  var serviceChallenge = {};

  serviceChallenge.challengeList = [];
  serviceChallenge.challengeById = {};

 return serviceChallenge;

}]);
