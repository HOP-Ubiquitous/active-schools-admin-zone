"use strict";

/**
 * @ngdoc overview
 * @name activeSchoolsAdminZoneApp
 * @description
 * # activeSchoolsAdminZoneApp
 *
 * Main module of the application.
 */
var app = angular.module("activeSchoolsAdminZoneApp", [
  "ngAnimate",
  "ngAria",
  "ngCookies",
  "ngMessages",
  "ngResource",
  "ngRoute",
  "route-segment",
  "ngSanitize",
  "ngTouch",
  "view-segment",
]);

app.config([
  "$routeSegmentProvider",
  "$routeProvider",
  "$locationProvider",
  function ($routeSegmentProvider, $routeProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: false,
        requireBase: true,
        rewriteLinks: true,
      })
      .hashPrefix("");

    $routeSegmentProvider

      .when("/login", "login")
      .when("/recover", "recover")
      .when("/home", "home")
      .when("/routes", "routes")
      .when("/routes/new_route", "routes.new_route")
      .when("/routes/edit_route", "routes.edit_route")
      .when("/routes/edit_route/:route_id", "routes.edit_route.route_id")
      .when("/challenges", "challenges")
      .when("/challenges/new_challenge", "challenges.new_challenge")
      .when("/routes/edit_challenge", "routes.edit_challenge")
      .when("/challenges/edit_challenge/:challenge_id", "challenges.edit_challenge.challenge_id")
      .when("/posts", "posts")
      .when("/posts/new_post", "posts.new_post")
      .when("/posts/edit_post", "posts.edit_post")
      .when("/posts/edit_post/:post_id", "posts.edit_post.post_id")
      .when("/users", "users")
      .when("/users/new_user", "users.new_user")
      .when("/users/edit_user", "users.edit_user")
      .when("/users/edit_user/:user_id", "users.edit_user.user_id")
      .when("/users/new_course", "users.new_course")
      .when("/users/edit_course", "users.edit_course")
      .when("/users/edit_course/:course_id", "users.edit_course.course_id")
      .when("/teams", "teams")
      .when("/teams/new_team", "teams.new_team")
      .when("/teams/edit_team", "teams.edit_team")
      .when("/teams/edit_team/:team_id", "teams.edit_team.team_id")
      .when("/medical_centers", "medical_centers")
      .when("/medical_centers/new_medical_center", "medical_centers.new_medical_center")
      .when("/medical_centers/edit_medical_center", "medical_centers.edit_medical_center")
      .when("/medical_centers/edit_medical_center/:medical_center_id", "medical_centers.edit_medical_center.medical_center_id")
      .when("/schools", "schools")
      .when("/schools/new_school", "schools.new_school")
      .when("/schools/edit_school", "schools.edit_school")
      .when("/schools/edit_school/:school_id", "schools.edit_school.school_id")

      .segment("login", {
        templateUrl: "views/login.html",
        controller: "loginCtrl",
        controllerAs: "login",
      })

      .segment("recover", {
        templateUrl: "views/recover.html",
        controller: "recoverCtrl",
        controllerAs: "recover",
      })

      .segment("home", {
        templateUrl: "views/home.html",
        controller: "homeCtrl",
        controllerAs: "home",
      })

      .segment("routes", {
        templateUrl: "views/routes.html",
        controller: "routesCtrl",
        controllerAs: "routes",
      })

      .within()

      .segment("new_route", {
        templateUrl: "views/new-route.html",
        controller: "newRouteCtrl",
        controllerAs: "newRoute",
      })

      .segment("edit_route", {})

      .within()

      .segment("route_id", {
        templateUrl: "views/new-route.html",
        controller: "editRouteCtrl",
        controllerAs: "editRoute",
        dependencies: ["route_id"],
      })

      .up()
      .up()

      .segment("challenges", {
        templateUrl: "views/challenges.html",
        controller: "challengesCtrl",
        controllerAs: "challenges",
      })

      .within()

      .segment("new_challenge", {
        templateUrl: "views/new-challenge.html",
        controller: "newChallengeCtrl",
        controllerAs: "newChallenge",
      })

      .segment("edit_challenge", {})

      .within()

      .segment("challenge_id", {
        templateUrl: "views/new-challenge.html",
        controller: "editChallengeCtrl",
        controllerAs: "editChallenge",
        dependencies: ["challenge_id"],
      })

      .up()
      .up()

      .segment("posts", {
        templateUrl: "views/posts.html",
        controller: "postsCtrl",
        controllerAs: "posts",
      })

      .within()

      .segment("new_post", {
        templateUrl: "views/new-post.html",
        controller: "newPostCtrl",
        controllerAs: "newPost",
      })

      .segment("edit_post", {})

      .within()

      .segment("post_id", {
        templateUrl: "views/new-post.html",
        controller: "editPostCtrl",
        controllerAs: "editPost",
        dependencies: ["post_id"],
      })

      .up()
      .up()

      .segment("users", {
        templateUrl: "views/users.html",
        controller: "usersCtrl",
        controllerAs: "users",
      })

      .within()

      .segment("new_user", {
        templateUrl: "views/new-user.html",
        controller: "newUserCtrl",
        controllerAs: "newUser",
      })

      .segment("edit_user", {})

      .within()

      .segment("user_id", {
        templateUrl: "views/new-user.html",
        controller: "editUserCtrl",
        controllerAs: "editUser",
        dependencies: ["user_id"],
      })

      .up()

      .segment("new_course", {
        templateUrl: "views/new-course.html",
        controller: "newCourseCtrl",
        controllerAs: "newCourse",
      })

      .segment("edit_course", {})

      .within()

      .segment("course_id", {
        templateUrl: "views/new-course.html",
        controller: "editCourseCtrl",
        controllerAs: "editCourse",
        dependencies: ["course_id"],
      })

      .up()
      .up()

      .segment("medical_centers", {
        templateUrl: "views/medical_centers.html",
        controller: "medicalCentersCtrl",
        controllerAs: "medicalCenters",
      })

      .within()

      .segment("new_medical_center", {
        templateUrl: "views/new-medical_center.html",
        controller: "newMedicalCenterCtrl",
        controllerAs: "newMedicalCenter",
      })

      .segment("edit_medical_center", {})

      .within()

      .segment("medical_center_id", {
        templateUrl: "views/new-medical_center.html",
        controller: "editMedicalCenterCtrl",
        controllerAs: "editMedicalCenter",
        dependencies: ["medical_center_id"],
      })

      .up()
      .up()

      .segment("schools", {
        templateUrl: "views/schools.html",
        controller: "schoolsCtrl",
        controllerAs: "schools",
      })

      .within()

      .segment("new_school", {
        templateUrl: "views/new-school.html",
        controller: "newSchoolCtrl",
        controllerAs: "newSchool",
      })

      .segment("edit_school", {})

      .within()

      .segment("school_id", {
        templateUrl: "views/new-school.html",
        controller: "editSchoolCtrl",
        controllerAs: "editSchool",
        dependencies: ["school_id"],
      })

      .up()
      .up()

      .segment("teams", {
        templateUrl: "views/teams.html",
        controller: "teamsCtrl",
        controllerAs: "teams",
      })

      .within()

      .segment("new_team", {
        templateUrl: "views/new-team.html",
        controller: "newTeamCtrl",
        controllerAs: "newTeam",
      })

      .segment("edit_team", {})

      .within()

      .segment("team_id", {
        templateUrl: "views/new-team.html",
        controller: "editTeamCtrl",
        controllerAs: "editTeam",
        dependencies: ["team_id"],
      });

    $routeProvider.otherwise({
      redirectTo: "login",
    });

  }
]);
