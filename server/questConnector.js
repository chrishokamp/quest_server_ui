var q = require('q')
  , xmlrpc = require('xmlrpc');

var deferred = q.defer();

 // Creates an XML-RPC client. Passes the host information on where to
  // make the XML-RPC calls.
var client = xmlrpc.createClient({ host: '143.167.8.76', port: 35722, path: '/' });

// TODO: use a nice wrapper of node http lib

// Quest returns a tsv line - source<tab>target<tab>feature1<tab>feature2<tab>...
// > Quest returned: this is a test	dies ist ein test	4.0	4.0	2.75	-13.90353...
var questClient = {
  features: function(srcLang, targetLang, source, target) {

    var segPair = "this is a test\tdies ist ein test";
    client.methodCall('runQuest.getFeatures', [segPair], function (error, value) {
      if (error) {
        console.log(error);
        return error;
      }

      console.log('Quest returned: ' + value);
      deferred.resolve(value);
    });
    return deferred.promise;
  }
}

module.exports = questClient;
