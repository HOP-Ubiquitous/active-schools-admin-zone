'use strict';

app.service('teamService', ['teamServiceApi', 'teamServiceData', '$location', '$q', '$timeout',
  function(teamServiceApi, teamServiceData, $location, $q, $timeout){

  var service = this;
  service.teamsLoaded = false;
  service.teamByIdLoaded = false;
  service.teamUpdated = false;

  service.getTeams = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.get_teams().then(
      function (response) {
        service.teamsLoaded = true;
        teamServiceData.teamList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Equipos cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los equipos! :_(');
      }
    );

    return promise;

  };

  service.getTeamById = function(id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.get_team_by_id(id).then(
      function success (response) {
        teamServiceData.teamById = response.data;
        service.teamByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El equipo ' + id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el equipo ' + id + '! :_(');
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
        console.log('\x1b[32m%s\x1b[0m', 'Equipo añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear un equipo! :_(');
      }
    );

    return promise;

  };

  service.editTeam = function (team, team_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    teamServiceApi.edit_team(team, team_id).then(
      function success(response){

        service.teamUpdated = true;

        $timeout(function(){
          $location.path('/teams')
          service.teamUpdated = false;
        }, 4000);

        service.getTeams();
        console.log('\x1b[32m%s\x1b[0m', 'Equipo actualizado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al actualizar un equipo! :_(');
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
        console.log('\x1b[32m%s\x1b[0m', 'El equipo ' + id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el equipo ' + id + '! :_(');
      }
    );

    return promise;
    
  };

}]);
