'use strict';

app.service('challengeService', ['challengeServiceApi', 'challengeServiceData', '$location', '$q', '$timeout',
  function(challengeServiceApi, challengeServiceData, $location, $q, $timeout){

  var service = this;
  service.allChallengesLoaded = false;
  service.newRouteChallengesLoaded = false;
  service.editRouteChallengesLoaded = false;
  service.challengeByIdLoaded = false;
  service.newChallengeUpdated = false;
  service.challengeUpdated = false;

  service.getChallenges = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.get_challenges().then(
      function (response) {
        service.allChallengesLoaded = true;
        service.newRouteChallengesLoaded = true;
        service.editRouteChallengesLoaded = true;
        challengeServiceData.challengeList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Retos cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los retas! :_(');
      }
    );

    return promise;
  };

  service.getChallengeById = function(challenge_id, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.get_challenge_by_id(challenge_id).then(
      function success (response) {

        challengeServiceData.challengeById = response.data;
        service.challengeByIdLoaded = true;

        console.log('\x1b[32m%s\x1b[0m', 'El reto ' + challenge_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el reto ' + challenge_id + '! :_(');
      }
    );

    return promise;
  };

  service.addChallenge = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.add_challenge(data).then(
      function success(response){

        service.newChallengeUpdated = true;
          
        $timeout(function(){
          $location.path('/challenges')
          service.newChallengeUpdated = false;
        }, 4000);

        service.getChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'Reto añadido con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear reto! :_( - ' + error);
      }
    );

    return promise;
  };

  service.editChallenge = function (challenge_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.edit_challenge(challenge_id, data).then(
      function success(response){

        service.challengeUpdated = true;
          
        $timeout(function(){
          $location.path('/challenges')
          service.challengeUpdated = false;
        }, 4000);

        service.getChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'El reto ' + challenge_id + ' editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar reto ' + challenge_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteChallenge = function (challenge_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.delete_challenge(challenge_id).then(
      function success(response){
        service.getChallenges();
        console.log('\x1b[32m%s\x1b[0m', 'El reto ' + challenge_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el reto ' + challenge_id + '! :_(');
      }
    );

    return promise;
  };

}]);
