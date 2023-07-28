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

      .when("/web", "web")

      .when("/login", "login")
      .when("/privacy_policy", "privacy_policy")
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
      .when("/schools/new_course", "schools.new_course")
      .when("/schools/edit_course", "schools.edit_course")
      .when("/schools/edit_course/:course_id", "schools.edit_course.course_id")

      .when("/profile", "profile")
      .when("/profile/edit_profile", "profile.edit_profile")
      .when("/profile/edit_profile/:profile_id", "profile.edit_profile.profile_id")

      .segment("web", {
        templateUrl: "views/web.html",
        controller: "webCtrl",
        controllerAs: "web",
      })

      .segment("login", {
        templateUrl: "views/login.html",
        controller: "loginCtrl",
        controllerAs: "login",
      })

      .segment("privacy_policy", {
        templateUrl: "views/privacy-policy.html",
        controller: "privacyCtrl",
        controllerAs: "privacy",
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
        templateUrl: "views/edit-route.html",
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
        templateUrl: "views/edit-challenge.html",
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
        templateUrl: "views/edit-post.html",
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
        templateUrl: "views/edit-user.html",
        controller: "editUserCtrl",
        controllerAs: "editUser",
        dependencies: ["user_id"],
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
        templateUrl: "views/edit-team.html",
        controller: "editTeamCtrl",
        controllerAs: "editTeam",
        dependencies: ["team_id"],
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
        templateUrl: "views/edit-medical_center.html",
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
        templateUrl: "views/edit-school.html",
        controller: "editSchoolCtrl",
        controllerAs: "editSchool",
        dependencies: ["school_id"],
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
        templateUrl: "views/edit-course.html",
        controller: "editCourseCtrl",
        controllerAs: "editCourse",
        dependencies: ["course_id"],
      })

      .up()
      .up()

      .segment("profile", {
        templateUrl: "views/profile.html",
        controller: "profileCtrl",
        controllerAs: "profile",
      })

      .within()

      .segment("edit_profile", {})

      .within()

      .segment("profile_id", {
        templateUrl: "views/edit-profile.html",
        controller: "editProfileCtrl",
        controllerAs: "editProfile",
        dependencies: ["profile_id"],
      });

    $routeProvider.otherwise({
      redirectTo: "web",
    });

  }
]);
