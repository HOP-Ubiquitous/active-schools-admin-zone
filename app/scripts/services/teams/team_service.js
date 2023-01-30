'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('teamService', ['teamServiceApi', 'teamServiceData', '$location', '$q',
  function(teamServiceApi, teamServiceData, $location, $q){

  var service = this;
  service.teamsLoaded = false;
  service.teamByIdLoaded = false;

  service.getTeams = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.get_teams().then(
      function (response) {
        service.teamsLoaded = true;
        teamServiceData.challengeList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Retos cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los retas! :_(');
      }
    );

    return promise;

  };

  service.getTeamById = function(id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.get_team_by_id(id).then(
      function success (response) {
        teamServiceData.challengeById = response.data;
        service.teamByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El reto ' + id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el reto ' + id + '! :_(');
      }
    );

    return promise;

  };

  service.addTeam = function (team) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.add_team(team).then(
      function success(response){
        service.getTeams();
        console.log('\x1b[32m%s\x1b[0m', 'Reto añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear reto! :_(');
      }
    );

    return promise;

  };

  service.deleteTeam = function (id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.delete_team(id).then(
      function success(response){
        service.getTeams();
        console.log('\x1b[32m%s\x1b[0m', 'El reto ' + id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el reto ' + id + '! :_(');
      }
    );

    return promise;
    
  };

}]);
