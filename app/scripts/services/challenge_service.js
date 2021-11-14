'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('challengeService', ['challengeServiceApi', 'challengeServiceData', '$location', '$q',
  function(challengeServiceApi, challengeServiceData, $location, $q){

  var service = this;
  service.challengesLoaded = false;

  service.getChallenges = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.get_challenges().then(function (response) {
      service.challengesLoaded = true;
      challengeServiceData.challengeList = response.data;
      console.log('\x1b[32m%s\x1b[0m', 'Retos cargados con éxtito! :)');
    }).catch(function (error) {
      console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los retas! :_(');
    });

    return promise;
  };

  service.getChallengeById = function(id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.get_challenge_by_id(id).then(function succes(response) {
      challengeServiceData.ChallengeList = response.data;
      service.challengeLoaded = true;
      console.log('\x1b[32m%s\x1b[0m', 'El reto ' + id + ' cargado con éxito! :)');
    }).catch(function () {
      console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el reto ' + id + '! :_(');
    });

    return promise;
  };

  service.addChallenge = function (challenge) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.add_challenge(challenge).then(function success(response){
      service.getChallenges();
      console.log('\x1b[32m%s\x1b[0m', 'Reto añadido con éxito! :)');
    }).catch(function () {
      console.log('\x1b[31m%s\x1b[0m', 'Error al crear reto! :_(');
    });

    return promise;
  };

  service.deleteChallenge = function (id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.delete_challenge(id).then(function success(response){
      service.getChallenges();
      console.log('\x1b[32m%s\x1b[0m', 'El reto ' + id + ' borrado con éxito! :)');
    }).catch(function () {
      console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el reto ' + id + '! :_(');
    });

    return promise;
  };

}]);
