'use strict';

app.service('teamServiceData', ['$cookies', function($cookies){

  var serviceTeam = {};

  serviceTeam.teamList = [];
  serviceTeam.teamById = {};

 return serviceTeam;

}]);
