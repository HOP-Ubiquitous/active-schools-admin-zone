'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('postService', ['postServiceApi', 'postServiceData','$q',
  function(postServiceApi, postServiceData, $q){

    var service = this;
    service.postsLoaded = false;
    service.postByIdLoaded = false;

    service.getPosts = function (){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.get_posts().then(function success(response){
        postServiceData.postsList = [];
        postServiceData.postsList = response.data;
        service.postsLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'Noticias cargadas con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar las noticias! :_(');
      });

      return promise;
    };

    service.getPostById = function (id){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.get_post_by_id(id).then(function success(response){
        postServiceData.postById = {};
        postServiceData.postById = response.data;
        service.postByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + id + ' cargada con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al carga las noticia con id ' + id +'! :_(');
      });

      return promise;
    };

    service.addPost = function (post){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.add_post(post).then(function success(response){
        service.getPosts();
        console.log('\x1b[32m%s\x1b[0m', 'Noticia añadida con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al añadir una noticia! :_(');
      });

      return promise;
    };

    service.editPost = function (id, post){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.edit_post(id, post).then(function success(response){
        service.getPosts();
        console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + id + ' editada con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar la noticia con id ' + id + '! :_(');
      });

      return promise;
    };

    service.deletePost = function (id){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.delete_post(id).then(function success(response){
        console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + id + ' borrada con éxito! :)');
      }).catch(function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar la noticia con id ' + id + '! :_(');
      });

      return promise;
    };

  }]);
