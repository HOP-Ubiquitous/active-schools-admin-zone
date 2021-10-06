'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('editPostCtrl', ['$location', 'postServiceData', function ($location, postServiceData) {

    var vm = this;
    vm.goToPost = function(){
      $location.path('/posts');
    }

    vm.mostrarPopUp = function(status){
      debugger;
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }

    vm.deleteRow = function(){

      debugger;
      vm.postServiceData.splice(vm.deleteIndex, 1);
    }

    vm.save = function(){
      debugger;
      postServiceData.push({
             date: new Date(),
             name:vm.name,
             bonus:vm.bonus,
             minTime:vm.minTime,

             video:vm.video
           });
         }

    vm.postServiceData = postServiceData;
    vm.posts = vm.postServiceData;
    console.log(vm.posts);


  }]);
