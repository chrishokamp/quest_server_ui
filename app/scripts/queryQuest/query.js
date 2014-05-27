angular.module('controllers')
.controller('QueryCtrl', ['$scope', '$log', 'questEndpoints', 'features', function($scope, $log, questEndpoints, features) {
  $scope.sourceQuery = 'Er wohnt in Berlin';

  // working - make source lang and target lang properties on the parent controller
  $scope.askQuest = function(sourceQuery) {
    $scope.loading = true;

    var questPromise = questEndpoints.getPrediction('de', 'en', sourceQuery);

    questPromise.then(
      function(result) {
        $log.log('the result from quest: ');
        $log.log(result);
        var resData = result.data;
        // parse and map the features to their names
        var featureValues = resData.features;
        var featureList = featureValues.map(function(val, index) {
          return [ features.allFeatures[index], val ];
        });

        $scope.result = {
          source: resData.source,
          target: resData.translation,
          prediction: resData.prediction,
          features: featureList
        };
        $scope.loading = false;

      },
      function(err) {
        console.log("there was an error asking quest: " + err);
        $scope.loading = false;
      }
    );
  }

}]);

