'use strict';

/**
 * @ngdoc overview
 * @name activeSchoolsAdminZoneApp
 * @description
 * # activeSchoolsAdminZoneApp
 *
 * Main module of the application.
 */
var app = angular.module('activeSchoolsAdminZoneApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'route-segment',
    'ngSanitize',
    'ngTouch',
    'view-segment'
  ]);

  app.config(['$routeSegmentProvider', '$routeProvider', '$locationProvider',function ($routeSegmentProvider, $routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: true,
      rewriteLinks: true
    }).hashPrefix('');

    $routeSegmentProvider
    //http://admin-zone.com/login
    .when('/login', 'login')
    //http://admin-zone.com/recover
    .when('/recover', 'recover')
    //http://admin-zone.com/routes
    .when('/routes', 'routes')
    //http://admin-zone.com/routes/new_route
    .when('/routes/new_route', 'routes.new_route')
    //http://admin-zone.com/routes/edit_route
    .when('/routes/edit_route', 'routes.edit_route')
    //http://admin-zone.com/routes/edit_route/1111-1111-111-1111
    .when('/routes/edit_route/:route_id', 'routes.edit_route.route_id')
    //http://admin-zone.com/challenges
    .when('/challenges', 'challenges')
    //http://admin-zone.com/challenges/new_challenge
    .when('/challenges/new_challenge', 'challenges.new_challenge')

    //http://admin-zone.com/routes/edit_challenge
    .when('/routes/edit_challenge', 'routes.edit_challenge')

    //http://admin-zone.com/challenges/edit_challenge/1111-1111-111-1111
    .when('/challenges/edit_challenge/:challenge_id', 'challenges.edit_challenge.challenge_id')
    //http://admin-zone.com/posts
    .when('/posts', 'posts')
    //http://admin-zone.com/posts/new_posts
    .when('/posts/new_post', 'posts.new_post')

    //http://admin-zone.com/posts/edit_post/1111-1111-111-1111
    .when('/posts/edit_post', 'posts.edit_post')


    //http://admin-zone.com/posts/edit_post/1111-1111-111-1111
    .when('/posts/edit_post/:post_id', 'posts.edit_post.post_id')


    .segment('login', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl',
      controllerAs:'login'
    })

    .segment('recover', {
      templateUrl: 'views/recover.html',
      controller: 'recoverCtrl',
      controllerAs:'recover'
    })

    .segment('routes', {
      templateUrl: 'views/routes.html',
      controller: 'routesCtrl',
      controllerAs:'routes'
    })

    .within()

    .segment('new_route', {
      templateUrl: 'views/new-route.html',
      controller: 'newRouteCtrl',
      controllerAs:'newRoute'
    })



    .segment('edit_route', {
    })



    .within()

    .segment('route_id', {
      templateUrl: 'views/new-route.html',
      controller: 'editRouteCtrl',
      controllerAs:'editRoute',
      dependencies: ['route_id']
    })

    .up()
    .up()

    .segment('challenges', {
      templateUrl: 'views/challenges.html',
      controller: 'challengesCtrl',
      controllerAs:'challenges'
    })

    .within()

    .segment('new_challenge', {
      templateUrl: 'views/new-challenge.html',
      controller: 'newChallengeCtrl',
      controllerAs:'newChallenge'
    })



    .segment('edit_challenge', {
    })

    .within()

    .segment('challenge_id', {
      templateUrl: 'views/new-challenge.html',
      controller: 'editChallengeCtrl',
      controllerAs:'editChallenge',
      dependencies: ['challenge_id']
    })


    .up()
    .up()

    .segment('posts', {
      templateUrl: 'views/posts.html',
      controller: 'postsCtrl',
      controllerAs:'posts'
    })

    .within()

    .segment('new_post', {
      templateUrl: 'views/new-post.html',
      controller: 'newPostCtrl',
      controllerAs:'newPost'
    })

    //.within()

    .segment('edit_post', {
    })

    .within()

    .segment('post_id', {
      templateUrl: 'views/new-post.html',
      controller: 'editPostCtrl',
      controllerAs:'editPost',
      dependencies: ['post_id']
    });

      $routeProvider.otherwise({
        redirectTo: 'login'
      });
  }]);
