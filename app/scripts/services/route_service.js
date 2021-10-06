'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
 app.service('routeService', ['routeServiceApi', 'routeServiceData', '$location', 'cookies', 'timeout', '$q', function(routeServiceApi, routeServiceData, $location, $cookies, $timeout, $q){

  var service = this;
  service.routeLoaded = false;

  service.addroute = function (coment){
    var deferred = $q.defer();
    var promise = deferred.promise;

    routeServiceApi.addroute(route)
      .then(
        function success(response){
          service.getRoute()
          console.log('\x1b[32m%s\x1b[0m', 'Rutas añadidas con éxito! :)');
        }
      )

      .catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al crear las rutas! :_(');
        }
      );
  }

  service.getRoute = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    routeServiceApi.get_login()
      .then(
        function succes(response){
          routeServiceData.routeList = response.data;
          service.routeLoaded = true;
          console.log('\x1b[32m%s\x1b[0m', 'Cargados todos las rutas! :)');

        }
      )
      .catch(
        function (){
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar las rutas! :_(')
        }
      );

    return promise;
  }


            vm.routeServiceData = routeServiceData;
             vm.routes = vm.routeServiceData;
             console.log(vm.routes);


}]);
