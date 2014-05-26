angular.module('services').factory('Morphology', [ '$http','$log', function($http, $log) {

  // quest server express backend
  // functionalities
  // translate(?)
  //

  // current quest XMLRPC endpoint
  var routePrefix = 'http://143.167.8.76:35722';
  var default_lang = 'en';

  return {
    // these functions return promises
    getFeatures: function(segment) {


//      $http
    }


//    : function (phrase, lang) {
//      var morphologyRoute = '';
//      lang ? morphologyRoute = routePrefix + lang : morphologyRoute = routePrefix + default_lang;
//
//      var data = { "phrase": phrase, "change_type": 'rfNumber' };
//      return $http.post(morphologyRoute, data, { timeout: 10000 });
//    },
//    // Change the gender of a word or phrase - in general, we can only change the number of adjectives, articles, and pronouns
//    changeGender: function(phrase, lang) {
//      $log.log('changeGender call: ' + phrase);
//      var morphologyRoute = '';
//      lang ? morphologyRoute = routePrefix + lang : morphologyRoute = routePrefix + default_lang;
//
//      var data = { "phrase": phrase, "change_type": 'rfGender' };
//      return $http.post(morphologyRoute, data, { timeout: 10000 });
//    },
//    changeCase: function(phrase, lang) {
//      $log.log('changeCase call: ' + phrase);
//      var morphologyRoute = '';
//      lang ? morphologyRoute = routePrefix + lang : morphologyRoute = routePrefix + default_lang;
//
//      var data = { "phrase": phrase, "change_type": 'rfCase' };
//      return $http.post(morphologyRoute, data, { timeout: 10000 });
//    }

  };

}]);