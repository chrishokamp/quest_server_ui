angular.module('services').factory('questEndpoints', [ '$http','$log', function($http, $log) {

  // quest server express backend
  // functionalities
  // translate(?)
  //

  // current quest XMLRPC endpoint
//   'http://143.167.8.76:35722';
  // DEV MODE node endpoint
  var routePrefix = 'http://0.0.0.0:3333/';
  var default_lang = 'en';

  return {
    // these functions return promises
    getFeatures: function(segment) {
//      $http
    },
    getPrediction: function(from, to, source, target) {
      var predictionRoute = routePrefix + 'predict'
      $log.log('getting predictions for: ' + source);
      if (target) {
        $log.log('user supplied target');
      } else {
        var params = {
          from: from,
          to: to,
          source: source,
          target: target
        };

        // return a promise
        var questPromise = $http({
          url: predictionRoute,
          method: 'GET',
          params: params
        });

        return questPromise;
      }
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