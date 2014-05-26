var q = require('q')
  , xmlrpc = require('xmlrpc');

var deferred = q.defer();

// create an XML-RPC client for feature extraction, and another for the ML predictions
// make the XML-RPC calls.
var featureExtractor = xmlrpc.createClient({ host: '143.167.8.76', port: 35722, path: '/' });
var predictor = xmlrpc.createClient({ host: '143.167.8.76', port: 35722, path: '/' });

// Quest returns a tsv line - source<tab>target<tab>feature1<tab>feature2<tab>...
// > Quest returned: this is a test	dies ist ein test	4.0	4.0	2.75	-13.90353...
// TODO: quest is currently more efficient with a single list of segments
var questClient = {
  features: function(srcLang, targetLang, source, target) {

    var segPair = source + "\t" + target;
    featureExtractor.methodCall('runQuest.getFeatures', [segPair], function (error, value) {
      if (error) {
        console.log(error);
        return error;
      }

      console.log('Quest returned: ' + value);
      deferred.resolve(value);
    });
    return deferred.promise;
  },
  // TODO: prediction cannot be chained with feature extraction yet
  // the Java implementation of predict() doesn't allow this
  prediction: function(srcLang, targetLang, source, target) {

//    var segPair = "this is a test\tdies ist ein test";
    var segPair = source + '\t' + target;
    featureExtractor.methodCall('runQuest.getPredictions', [segPair], function (error, value) {
      if (error) {
        console.log(error);
        return error;
      }
      console.log('Quest returned: ' + value);
      // should return:String all_pred =  src + "\t" + tgt + "\t" + pred;
      deferred.resolve(value);
    });

    return deferred.promise;
  }
}

module.exports = questClient;
