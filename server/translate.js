var MsTranslator = require('mstranslator')
  , q = require('q')
  , localConfig = require('./localConfig.js');

var deferred = q.defer();

// localConfig contains bingId and bingSecret
var client = new MsTranslator({client_id:localConfig.bingId, client_secret: localConfig.bingSecret});

// this sets a timeout that will keep reinitializing the token when it times out
// TODO: not clean async because translate() may get called before the token is ready
client.initialize_token(function(keys){
  // console.log(keys.access_token);
  console.log('microsoft translator token initialized');
});

var translator = {
  translate: function(params) {
    client.translate(params,
      function(err, data) {
        console.log(data);
        // returns a string
//        callback(data);
        deferred.resolve(data);
      }
    );
    return deferred.promise;
  }
};

module.exports = translator;
