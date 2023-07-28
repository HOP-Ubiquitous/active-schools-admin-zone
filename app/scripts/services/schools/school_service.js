'use strict';

app.service('schoolService', ['schoolServiceApi', 'schoolServiceData', '$location', '$q', '$timeout',
  function(schoolServiceApi, schoolServiceData, $location, $q, $timeout){

  var service = this;
  service.schoolsLoaded = false;
  service.schoolByIdLoaded = false;
  service.coursesLoaded = false;
  service.courseByIdLoaded = false;
  service.studentsLoaded = false;
  service.studentByIdLoaded = false;

  service.newSchoolUpdated = false;
  service.schoolUpdated = false;
  service.deleteSchoolUpdated = false;
  service.newCourseUpdated = false;
  service.courseUpdated = false;
  service.deleteCourseUpdated = false;
  service.newStudentUpdated = false;
  service.studentUpdated = false;
  service.deleteStudentUpdated = false;

  service.getSchools = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_schools().then(
      function (response) {
        service.schoolsLoaded = true;
        schoolServiceData.schoolList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Colegios cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los colegios! :_(');
      }
    );

    return promise;
  };

  service.getSchoolById = function(school_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_school_by_id(school_id).then(
      function success (response) {
        schoolServiceData.schoolById = response.data;
        service.schoolByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El colegio ' + school_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  service.addSchool = function (data, type) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.add_school(data).then(
      function success(response){

        service.newSchoolUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.newSchoolUpdated = false;
        }, 4000);
        
        if(type === 'signin') {
          $location.path('/home');
        } else if (type === 'single') {
          userService.addSchool(response.data.id);
          service.getSchoolById(response.data.id)
        } else {
          service.getSchools();
        }
        
        console.log('\x1b[32m%s\x1b[0m', 'Colegio añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear colegio! :_(');
      }
    );

    return promise;
  };

  service.editSchool = function (school_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.edit_school(school_id, data).then(
      function success(response){

        service.schoolUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.schoolUpdated = false;
        }, 4000);

        service.getSchools();
        console.log('\x1b[32m%s\x1b[0m', 'El colegio ' + school_id + ' editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar colegio ' + school_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteSchool = function (school_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.delete_school(school_id).then(
      function success(response){

        service.deleteSchoolUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.deleteSchoolUpdated = false;
        }, 4000);

        service.getSchools();
        console.log('\x1b[32m%s\x1b[0m', 'El colegio ' + school_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  //---- COURSES ----//

  service.getCoursesBySchool = function (school_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_courses_by_school(school_id).then(
      function (response) {
        service.coursesLoaded = true;
        schoolServiceData.coursesBySchool = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Cursos del colegio ' + school_id + ' cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los cursos del colegio ' + school_id +'! :_(');
      }
    );

    return promise;
  };

  service.getCourseById = function(course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_course_by_id(course_id).then(
      function success (response) {
        schoolServiceData.courseById = response.data;
        service.courseByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.addCourse = function (school_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.add_course(school_id, data).then(
      function success(response){

        service.newCourseUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.newCourseUpdated = false;
        }, 4000);

        service.getCoursesBySchool(school_id);
        console.log('\x1b[32m%s\x1b[0m', 'Curso añadido con éxito al colegio ' + school_id + '! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear el curso al colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  service.editCourse = function (course_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.edit_course(course_id, data).then(
      function success(response){

        service.courseUpdated = false;

        $timeout(function(){
          $location.path('/schools')
          service.courseUpdated = false;
        }, 4000);

        service.getCourseById(course_id);
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteCourse = function (course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.delete_course(course_id).then(
      function success(response){

        service.deleteCourseUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.deleteCourseUpdated = false;
        }, 4000);

        service.getCourseById(course_id);
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  //---- STUDENTS ----//

  service.getStudentsByCourse = function (course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_students_by_course(course_id).then(
      function (response) {
        service.studentsLoaded = true;
        schoolServiceData.studentsByCourse = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Estudiantes del curso ' + course_id + ' cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los estudiantes del curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.getStudentById = function(course_id, student_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_student_by_id(course_id, student_id).then(
      function success (response) {
        schoolServiceData.studentById = response.data;
        service.studentByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el estudiante ' + student_id + ' curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.addStudent = function (course_id, student_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.add_student(course_id, student_id, data).then(
      function success(response){

        service.newStudentUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.newStudentUpdated = false;
        }, 4000);

        service.getStudentsByCourse(course_id);
        console.log('\x1b[32m%s\x1b[0m', 'Estudiante con id ' + student_id + ' añadido con éxito al curso ' + course_id + '! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al añadir estudiante ' + student_id + ' al curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.editStudent = function (course_id, student_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.edit_student(course_id, student_id, data).then(
      function success(response){

        service.studentUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.studentUpdated = false;
        }, 4000);

        service.getStudentById(course_id, student_id);
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el estudiante ' + student_id + ' del curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

  service.deleteStudent = function (course_id, student_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.delete_student(course_id, student_id).then(
      function success(response){

        service.deleteStudentUpdated = true;

        $timeout(function(){
          $location.path('/schools')
          service.deleteStudentUpdated = false;
        }, 4000);

        service.getStudentById(course_id, student_id);
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el estudiante ' + student_id + ' del curso ' + course_id + '! :_(');
      }
    );

    return promise;
  };

}]);
