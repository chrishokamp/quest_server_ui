angular.module('controllers')
.controller('QueryCtrl', ['$scope', '$log', 'questEndpoints', function($scope, $log, questEndpoints) {
  $scope.sourceQuery = 'dies ist ein Test Satz'

  // working - make source lang and target lang properties on the parent controller
  $scope.askQuest = function(sourceQuery) {
    $scope.loading = true;

    var questPromise = questEndpoints.getPrediction('de', 'en', sourceQuery);

    questPromise.then(
      function(result) {
        $log.log('the result from quest: ');
        $log.log(result);
        var resData = result.data;
        $scope.result = resData;
        $scope.loading = false;

      },
      function(err) {
        console.log("there was an error asking quest: " + err);
        $scope.loading = false;
      }
    );
  }

}]);

