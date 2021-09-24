'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('challengeService', ['challengeServiceApi', 'challengeServiceData', '$location', 'cookies', 'timeout', '$q', function(challengeServiceApi, challengeServiceData, $location, $cookies, $timeout, $q){

  var service = this;
  service.challengeLoaded = false;

  service.addChallenge = function (coment){
    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.addChallenge(challenge)
      .then(
        function success(response){
          service.getChallenge()
          console.log('\x1b[32m%s\x1b[0m', 'challenge añadido con éxito! :)');
        }
      )

      .catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al crear challenge! :_(');
        }
      );
  }

  service.getChallenge = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    challengeServiceApi.get_login()
      .then(
        function succes(response){
          challengeServiceData.ChallengeList = response.data;
          service.challengeLoaded = true;
          console.log('\x1b[32m%s\x1b[0m', 'Cargados todos los datos del challenge! :)');

        }
      )
      .catch(
        function (){
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar todos los challenges! :_(')
        }
      );

    return promise;
  }
}]);
