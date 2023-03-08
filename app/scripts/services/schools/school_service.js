'use strict';

app.service('schoolService', ['schoolServiceApi', 'schoolServiceData', '$location', '$q',
  function(schoolServiceApi, schoolServiceData, $location, $q){

  var service = this;
  service.schoolsLoaded = false;
  service.schoolByIdLoaded = false;
  service.coursesLoaded = false;
  service.courseByIdLoaded = false;
  service.studentsLoaded = false;
  service.studentByIdLoaded = false;

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
        
        if(type === 'signin') {
          $location.path('/home');
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

  service.getCourseById = function(school_id, course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_course_by_id(school_id, course_id).then(
      function success (response) {
        schoolServiceData.courseById = response.data;
        service.courseByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' del colegio ' + school_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el curso ' + course_id + ' del colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  service.addCourse = function (school_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.add_course(school_id, data).then(
      function success(response){
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

  service.editCourse = function (school_id, course_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.edit_course(school_id, course_id, data).then(
      function success(response){
        service.getCourseById(school_id, course_id);
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' del colegio ' + school_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el curso ' + course_id + ' del colegio ' + school_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteCourse = function (school_id, course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.delete_course(school_id, course_id).then(
      function success(response){
        service.getCourseById(school_id, course_id);
        console.log('\x1b[32m%s\x1b[0m', 'El curso ' + course_id + ' del colegio ' + school_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el curso ' + course_id + ' del colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  //---- STUDENTS ----//

  service.getStudentsByCourse = function (school_id, course_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_students_by_course(school_id, course_id).then(
      function (response) {
        service.studentsLoaded = true;
        schoolServiceData.studentsByCourse = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Estudiantes del curso ' + course_id + ' del colegio ' + school_id + ' cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los estudiantes del curso ' + course_id + ' del colegio ' + school_id +'! :_(');
      }
    );

    return promise;
  };

  service.getStudentById = function(school_id, course_id, student_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.get_student_by_id(school_id, course_id, student_id).then(
      function success (response) {
        schoolServiceData.studentById = response.data;
        service.studentByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' del colegio ' + school_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el estudiante ' + student_id + ' curso ' + course_id + ' del colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  service.addStudent = function (school_id, course_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.add_student(school_id, course_id, data).then(
      function success(response){
        service.getStudentsByCourse(school_id, course_id);
        console.log('\x1b[32m%s\x1b[0m', 'Estudiante añadido con éxito al curso ' + course_id + ' del colegio ' + school_id + '! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear el estudiante al curso ' + course_id + ' del colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

  service.editStudent = function (school_id, course_id, student_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.edit_student(school_id, course_id, student_id, data).then(
      function success(response){
        service.getStudentById(school_id, course_id, student_id);
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' del colegio ' + school_id + ' ha sido editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el estudiante ' + student_id + ' del curso ' + course_id + ' del colegio ' + school_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteStudent = function (school_id, course_id, student_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    schoolServiceApi.delete_student(school_id, course_id, student_id).then(
      function success(response){
        service.getStudentById(school_id, course_id, student_id);
        console.log('\x1b[32m%s\x1b[0m', 'El estudiante ' + student_id + ' del curso ' + course_id + ' del colegio ' + school_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el estudiante ' + student_id + ' del curso ' + course_id + ' del colegio ' + school_id + '! :_(');
      }
    );

    return promise;
  };

}]);
