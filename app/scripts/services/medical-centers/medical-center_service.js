'use strict';

app.service('medicalCenterService', ['medicalCenterServiceApi', 'medicalCenterServiceData', '$location', '$q',
  function(medicalCenterServiceApi, medicalCenterServiceData, $location, $q){

  var service = this;
  service.medicalCentersLoaded = false;
  service.medicalCenterByIdLoaded = false;
  service.doctorsLoaded = false;
  service.doctorByIdLoaded = false;

  service.getMedicalCenters = function () {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.get_medical_centers().then(
      function (response) {
        service.medicalCentersLoaded = true;
        medicalCenterServiceData.medicalCenterList = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Centros médicos cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los centros médicos! :_(');
      }
    );

    return promise;
  };

  service.getMedicalCenterById = function(medical_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.get_medical_center_by_id(medical_id).then(
      function success (response) {
        medicalCenterServiceData.medicalCenterById = response.data;
        service.medicalCenterByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El centro médico ' + medical_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el centro médico ' + medical_id + '! :_(');
      }
    );

    return promise;
  };

  service.addMedicalCenter = function (data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.add_medical_center(data).then(
      function success(response){
        service.getMedicalCenters();
        medicalCenterServiceData.medicalCenterCreated = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Centros médicos añadido con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear centro médico! :_(');
      }
    );

    return promise;
  };

  service.editMedicalCenter = function (medical_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.edit_medical_center(medical_id, data).then(
      function success(response){
        service.getMedicalCenters();
        console.log('\x1b[32m%s\x1b[0m', 'El centro médico ' + medical_id + ' editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar centro médico ' + medical_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteMedicalCenter = function (medical_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.delete_medical_center(medical_id).then(
      function success(response){
        service.getMedicalCenters();
        console.log('\x1b[32m%s\x1b[0m', 'El centro médico ' + medical_id + ' borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el centro médico ' + medical_id + '! :_(');
      }
    );

    return promise;
  };




  service.getDoctorsByCenter = function (medical_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.get_doctors_by_center(medical_id).then(
      function (response) {
        service.doctorsLoaded = true;
        medicalCenterServiceData.doctorByMedicalCenter = response.data;
        console.log('\x1b[32m%s\x1b[0m', 'Doctores del centros médico ' + medical_id + ' cargados con éxito! :)');
      }
    ).catch(
      function (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar los doctores el centro médico ' + medical_id +'! :_(');
      }
    );

    return promise;
  };

  service.getDoctorById = function(medical_id, doctor_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.get_doctor_by_id(medical_id, doctor_id).then(
      function success (response) {
        medicalCenterServiceData.doctorById = response.data;
        service.doctorByIdLoaded = true;
        console.log('\x1b[32m%s\x1b[0m', 'El doctor ' + doctor_id + ' cargado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al cargar el doctor ' + doctor_id + '! :_(');
      }
    );

    return promise;
  };

  service.addDoctor = function (medical_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.add_doctor(medical_id, data).then(
      function success(response){
        service.getDoctorsByCenter(medical_id);
        console.log('\x1b[32m%s\x1b[0m', 'Doctor añadido con éxito al centro médico ' + medical_id + '! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al crear el doctor al centro médico ' + medical_id + '! :_(');
      }
    );

    return promise;
  };

  service.editDoctor = function (medical_id, doctor_id, data) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.edit_doctor(medical_id, doctor_id, data).then(
      function success(response){
        service.getDoctorsByCenter(medical_id);
        console.log('\x1b[32m%s\x1b[0m', 'El doctor ' + doctor_id + ' del centro médico ' + medical_id + ' editado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al editar el doctor ' + doctor_id + ' del centro médico ' + medical_id +'! :_(');
      }
    );

    return promise;
  };

  service.deleteDoctor = function (medical_id, doctor_id) {

    var deferred = $q.defer();
    var promise = deferred.promise;

    medicalCenterServiceApi.delete_doctor(medical_id, doctor_id).then(
      function success(response){
        service.getDoctorsByCenter(medical_id);
        console.log('\x1b[32m%s\x1b[0m', 'El doctor ' + doctor_id + ' del centro médico ' + medical_id + ' ha sido borrado con éxito! :)');
      }
    ).catch(
      function () {
        console.log('\x1b[31m%s\x1b[0m', 'Error al borrar el doctor ' + doctor_id + ' del centro médico ' + medical_id + '! :_(');
      }
    );

    return promise;
  };

}]);
