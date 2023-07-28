'use strict';

app.service('languageService', ['EL', 'EN', 'ES', 'COUNTRIES', function(EL, EN, ES, COUNTRIES){

  var service = this;
  service.browserLanguage = navigator.language;
  service.languageUpdated = false;
  service.headerLanguageUpdated = false;
  service.formLanguageUpdated = false;
  service.countries = COUNTRIES.countries;
  service.language;
  service.selectedEnglish = true;
  service.selectedGreece = false;
  service.selectedSpanish = false;

  service.getSelectedLanguage = function(){

    if (service.browserLanguage === 'el') {
      service.language = EL;
      service.selectedEnglish = false;
      service.selectedGreece = true;
      service.selectedSpanish = false;
      COUNTRIES = setCountries(service.language.COUNTRIES);

      service.languageUpdated = true;
      service.headerLanguageUpdated = true;
      service.formLanguageUpdated = true;

    } else if (service.browserLanguage === 'en') {
      service.language = EN;
      service.selectedEnglish = true;
      service.selectedGreece = false;
      service.selectedSpanish = false;
      COUNTRIES = setCountries(service.language.COUNTRIES);

      service.languageUpdated = true;
      service.headerLanguageUpdated = true;
      service.formLanguageUpdated = true;

    } else if (service.browserLanguage === 'es') {
      service.language = ES;
      service.selectedEnglish = false;
      service.selectedGreece = false;
      service.selectedSpanish = true;
      COUNTRIES = setCountries(service.language.COUNTRIES);

      service.languageUpdated = true;
      service.headerLanguageUpdated = true;
      service.formLanguageUpdated = true;

    } else {
      service.language = EN;
      service.selectedEnglish = true;
      service.selectedGreece = false;
      service.selectedSpanish = false;
      COUNTRIES = setCountries(service.language.COUNTRIES);

      service.languageUpdated = true;
      service.headerLanguageUpdated = true;
      service.formLanguageUpdated = true;

    }

  }

  function setCountries (countries) {

    Object.keys(countries).forEach((key, value) => {
      service.countries[value].name = countries[key];
    });

    COUNTRIES = service.countries;
    return COUNTRIES;
  
  }

  service.setLanguage = function (language) {
    service.browserLanguage = language;
    service.getSelectedLanguage();
  }

}]);
