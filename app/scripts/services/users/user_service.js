'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('userService', ['userServiceApi', 'userServiceData', '$location', '$q',
  function(userServiceApi, userServiceData, $location, $q){

  var service = this;
  service.usersLoaded = false;
  service.userByIdLoaded = false;
  service.userLoadedAfterLogin = false;

  service.getUsers = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.get_users().then(
      function (response) {
        service.usersLoaded = true;
        userServiceData.userList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Usuarios cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los usuarios! :_(');
      }
    );

    return promise;

  };

  service.getUserById = function(user_id, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.get_user_by_id(user_id).then(
      function success (response) {
        userServiceData.userById = response.data;

        if (type === 'addUser' || type === 'loggedUser') {
          userServiceData.loggedUser = response.data;
        } else if (type === 'redirect') {
          userServiceData.loggedUser = response.data;
          $location.path('/home');
        }


        service.userByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;

  };

  service.addUser = function (data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.add_user(data).then(
      function success(response){
        service.getUsers();
        
        if (type === 'addUser') {
          service.getUserById(response.data.id, type);
          service.userLoadedAfterLogin = true;
        }

        console.log('\x1b[32m%s\x1b[0m', 'Usuario añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear usuario! :_(');
      }
    );

    return promise;

  };

  service.editUser = function (user_id, data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.edit_user(user_id, data).then(
      function success(response){
        
        if (type !== undefined) {
          service.getUserById(response.data, type);
        }

        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteUser = function (user_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.delete_user(user_id).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El usuario ' + user_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.successRoute = function (user_id, route_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.success_route(user_id, route_id, data).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El estado de la ruta ' + route_id + ' para el usuario ' + user_id + ' ha sido modificado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el estado del reto ' + route_id + ' para el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

  service.successChallenge = function (user_id, route_id, challenge_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    userServiceApi.success_challenge(user_id, route_id, challenge_id, data).then(
      function success(response){
        service.getUsers();
        console.log('\x1b[32m%s\x1b[0m', 'El estado del challenge ' + challenge_id + ' la ruta ' + route_id + ' para el usuario ' + user_id + ' ha sido modificado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el estado del challenge ' + challenge_id + ' del reto ' + route_id + ' para el usuario ' + user_id + '! :_(');
      }
    );

    return promise;
  };

}]);
