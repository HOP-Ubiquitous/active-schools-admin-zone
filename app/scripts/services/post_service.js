'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('postService', ['postServiceApi', 'postServiceData', '$location', 'cookies', 'timeout', '$q', function(postServiceApi, postServiceData, $location, $cookies, $timeout, $q){

  var service = this;
  service.postLoaded = false;

  service.addPost = function (coment){
    var deferred = $q.defer();
    var promise = deferred.promise;

    postServiceApi.addPost(post)
      .then(
        function success(response){
          service.getPost()
          console.log('\x1b[32m%s\x1b[0m', 'Login añadido con éxito! :)');
        }
      )

      .catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al crear el login! :_(');
        }
      );
  }

  service.getPost = function(){
    var deferred = $q.defer();
    var promise = deferred.promise;

    postServiceApi.getPost()
      .then(
        function succes(response){
          postServiceData.postList = response.data;
          service.postLoaded = true;
          console.log('\x1b[32m%s\x1b[0m', 'Cargados todos los datos del login! :)');

        }
      )
      .catch(
        function (){
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar todos los comentarios! :_(')
        }
      );

    return promise;
  }

}]);
