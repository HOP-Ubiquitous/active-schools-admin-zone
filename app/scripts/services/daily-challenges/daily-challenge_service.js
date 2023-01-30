'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('dailyChallengeService', ['dailyChallengeServiceApi', 'dailyChallengeServiceData', '$location', '$q',
  function(dailyChallengeServiceApi, dailyChallengeServiceData, $location, $q){

  var service = this;
  service.dailyChallengesLoaded = false;
  service.dailyChallengeByIdLoaded = false;

  service.getDailyChallenges = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    dailyChallengeServiceApi.get_daily_challenges().then(
      function (response) {
        service.dailyChallengesLoaded = true;
        dailyChallengeServiceData.dailyChallengeList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Retos diarios cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los retos diarios! :_(');
      }
    );

    return promise;
  };

  service.getDailyChallengeById = function(daily_challenge_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    dailyChallengeServiceApi.get_daily_challenge_by_id(daily_challenge_id).then(
      function success (response) {
        dailyChallengeServiceData.dailyChallengeById = response.data;
        service.dailyChallengeByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El reto diario ' + daily_challenge_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el reto diario ' + daily_challenge_id + '! :_(');
      }
    );

    return promise;
  };

  service.addDailyChallenge = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    dailyChallengeServiceApi.add_daily_challenge(data).then(
      function success(response){
        service.getDailyChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'Reto diario añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear reto diario! :_(');
      }
    );

    return promise;
  };

  service.editDailyChallenge = function (daily_challenge_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    dailyChallengeServiceApi.edit_daily_challenge(daily_challenge_id, data).then(
      function success(response){
        service.getDailyChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'El reto diario ' + daily_challenge_id + ' editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar reto diario ' + daily_challenge_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteChallenge = function (daily_challenge_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    dailyChallengeServiceApi.delete_daily_challenge(daily_challenge_id).then(
      function success(response){
        service.getDailyChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'El reto diario ' + daily_challenge_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el reto diario ' + daily_challenge_id + '! :_(');
      }
    );

    return promise;
  };

}]);
