'use strict';

app.service('achievementsService', ['achievementsServiceApi', 'achievementsServiceData', '$location', '$q',
  function(achievementsServiceApi, achievementsServiceData, $location, $q){

  var service = this;
  service.achievementsLoaded = false;
  service.achievementByIdLoaded = false;

  service.getAchievements = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    achievementsServiceApi.get_achievements().then(
      function (response) {
        service.achievementsLoaded = true;
        achievementsServiceData.achievementsList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Logros cargados con éxtito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los logros! :_(');
      }
    );

    return promise;
  };

  service.getAchievementById = function(achievement_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    achievementsServiceApi.get_achievement_by_id(achievement_id).then(
      function success (response) {
        challengeServiceData.achievementById = response.data;
        service.achievementByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El logro ' + id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el logro ' + id + '! :_(');
      }
    );

    return promise;
  };

  service.addAchievement = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    achievementsServiceApi.add_achievement(data).then(
      function success(response){
        service.getAchievements();
        console.log('\x1b[32m%s\x1b[0m', 'Logro añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear logro! :_(');
      }
    );

    return promise;
  };

  service.editAchievement = function (achievement_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    achievementsServiceApi.edit_achievement(achievement_id, data).then(
      function success(response){
        service.getAchievements();
        console.log('\x1b[32m%s\x1b[0m', 'El logro ' + achievement_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el logro ' + achievement_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteAchievement = function (achievement_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    achievementsServiceApi.delete_achievement(achievement_id).then(
      function success(response){
        service.getAchievements();
        console.log('\x1b[32m%s\x1b[0m', 'El logro ' + achievement_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el logro ' + achievement_id + '! :_(');
      }
    );

    return promise;
  };

}]);
