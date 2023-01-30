'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('avatarService', ['avatarServiceApi', 'avatarServiceData', '$location', '$q',
  function(avatarServiceApi, avatarServiceData, $location, $q){

  var service = this;
  service.avatarLevelsLoaded = false;
  service.avatarLevelByIdLoaded = false;
  service.avatarAccessoriesLoaded = false;
  service.avatarAccessoryByIdLoaded = false;

  service.getAvatarLevels = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.get_avatar_levels().then(
      function (response) {
        service.avatarLevelsLoaded = true;
        avatarServiceData.avatarLevels = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Niveles del avatar cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los niveles del avatar! :_(');
      }
    );

    return promise;
  };

  service.getAvatarLevelById = function(avatar_level_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.get_avatar_level_by_id(avatar_level_id).then(
      function success (response) {
        avatarServiceData.avatarLevelById = response.data;
        service.avatarLevelByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El nivel del avatar ' + avatar_level_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el nivel del avatar ' + avatar_level_id + '! :_(');
      }
    );

    return promise;
  };

  service.addAvatarLevel = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.add_avatar_level(data).then(
      function success(response){
        service.getAvatarLevels();
        console.log('\x1b[32m%s\x1b[0m', 'Nivel del avatar añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear nivel del avatar! :_(');
      }
    );

    return promise;
  };

  service.editAvatarLevel = function (avatar_level_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.edit_avatar_level(avatar_level_id, data).then(
      function success(response){
        service.getAvatarLevels();
        console.log('\x1b[32m%s\x1b[0m', 'El nivel del avatar ' + avatar_level_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el nivel del avatar ' + avatar_level_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteAvatarLevel = function (avatar_level_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.delete_avatar_level(avatar_level_id).then(
      function success(response){
        service.getAvatarLevels();
        console.log('\x1b[32m%s\x1b[0m', 'El nivel del avatar ' + avatar_level_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el nivel del avatar ' + avatar_level_id + '! :_(');
      }
    );

    return promise;
  };

  //---- Accesories ----//

  service.getAvatarAccessories = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.get_avatar_accessories().then(
      function (response) {
        service.avatarAccessoriesLoaded = true;
        avatarServiceData.avatarAccessories = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Accesorios del avatar cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los accesorios del avatar! :_(');
      }
    );

    return promise;
  };

  service.getAvatarAccessoryById = function(avatar_accessory_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.get_avatar_accessory_by_id(avatar_accessory_id).then(
      function success (response) {
        avatarServiceData.avatarAccessoryById = response.data;
        service.avatarAccessoryByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El accesorio del avatar ' + avatar_accessory_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el accesorio del avatar ' + avatar_accessory_id + '! :_(');
      }
    );

    return promise;
  };

  service.addAvatarAccessory = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.add_avatar_accessory(data).then(
      function success(response){
        service.getAvatarAccessories();
        console.log('\x1b[32m%s\x1b[0m', 'Accesorio del avatar añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear accesorio del avatar! :_(');
      }
    );

    return promise;
  };

  service.editAvatarAccessory = function (avatar_accessory_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.edit_avatar_level(avatar_accessory_id, data).then(
      function success(response){
        service.getAvatarAccessories();
        console.log('\x1b[32m%s\x1b[0m', 'El accesorio del avatar ' + avatar_accessory_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el accesorio del avatar ' + avatar_accessory_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteAvatarAccessory = function (avatar_accessory_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    avatarServiceApi.delete_avatar_level(avatar_accessory_id).then(
      function success(response){
        service.getAvatarAccessories();
        console.log('\x1b[32m%s\x1b[0m', 'El accesorio del avatar ' + avatar_accessory_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el accesorio del avatar ' + avatar_accessory_id + '! :_(');
      }
    );

    return promise;
  };

}]);
