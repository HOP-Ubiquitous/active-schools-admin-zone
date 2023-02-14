'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('recoverService', ['recoverServiceApi', 'recoverServiceData', '$location', 'cookies', 'timeout', '$q', function(recoverServiceApi, recoverServiceData, $location, $cookies, $timeout, $q){

  var service = this;
  service.recoverLoaded = false;

  service.addRecover = function (coment){
    var deferred = $q.defer();
    var promise = deferred.promise;

    recoverServiceApi.addRecover(recover).then(
      function success(response){
        service.getRecover()
        console.log('\x1b[32m%s\x1b[0m', 'Recover añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear el recover! :_(');
      }
    );

  return promise;

  }

  service.getRecover = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    recoverServiceApi.getRecover().then(
      function success(response){
        recoverServiceData.recoverList = response.data;
        service.recoverLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'Cargados todos los datos del recover! :)');
      }
    ).catch(
      function (){
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar todos los recover! :_(')
      }
    );

  return promise;

  }

}]);
