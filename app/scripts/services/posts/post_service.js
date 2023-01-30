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

    service.getPosts = function () {

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.get_posts().then(
        function success(response){
          postServiceData.postsList = response.data;
          service.postsLoaded = true;
          console.log('\x1b[32m%s\x1b[0m', 'Noticias cargadas con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al cargar las noticias! :_(');
        }
      );

      return promise;
    };

    service.getPostById = function (post_id){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.get_post_by_id(post_id).then(
        function success(response){
          postServiceData.postById = response.data;
          service.postByIdLoaded = true;
          console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + post_id + ' cargada con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al carga las noticia con id ' + post_id +'! :_(');
        }
      );

      return promise;
    };

    service.addPost = function (data){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.add_post(data).then(
        function success(response){
          service.getPosts();
          console.log('\x1b[32m%s\x1b[0m', 'Noticia añadida con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al añadir una noticia! :_(');
        }
      );

      return promise;
    };

    service.editPost = function (post_id, data){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.edit_post(post_id, data).then(
        function success(response){
          service.getPosts();
          console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + post_id + ' editada con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al editar la noticia con id ' + post_id + '! :_(');
        }
      );

      return promise;
    };

    service.deletePost = function (post_id){

      var deferred = $q.defer();
      var promise = deferred.promise;

      postServiceApi.delete_post(post_id).then(
        function success(response){
          console.log('\x1b[32m%s\x1b[0m', 'Noticia con id ' + post_id + ' borrada con éxito! :)');
        }
      ).catch(
        function () {
          console.log('\x1b[31m%s\x1b[0m', 'Error al borrar la noticia con id ' + post_id + '! :_(');
        }
      );

      return promise;
    };

  }]);
