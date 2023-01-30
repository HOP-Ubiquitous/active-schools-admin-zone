'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('loginService', ['loginServiceApi', 'loginServiceData', '$location', 'cookies', 'timeout', '$q',
  function(loginServiceApi, loginServiceData, $location, $cookies, $timeout, $q){

  var service = this;
  service.loginLoaded = false;

  service.addLogin = function (coment){
    var deferred = $q.defer();
    var promise = deferred.promise;

    loginServiceApi.addLogin(login).then(
      function success(response){
        service.getLogin()
        console.log('\x1b[32m%s\x1b[0m', 'Login añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear el login! :_(');
      }
    );

    return promise;
  }

  service.getLogin = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    loginServiceApi.getlogin().then(
      function succes(response){
        loginServiceData.loginList = response.data;
        service.loginLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'Cargados todos los datos del login! :)');
      }
    ).catch(
      function (){
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar todos los comentarios! :_(')
      }
    );

    return promise;
  }


}]);
