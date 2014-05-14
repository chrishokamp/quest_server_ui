//angular.module('controllers').controller('UploadCtrl', ['$scope', 'fileReader', '$timeout', 'XliffParser', 'Document', '$state', '$log', function($scope, fileReader, $timeout, XliffParser, Document, $state, $log) {
  angular.module('controllers').controller('UploadCtrl', ['$scope', '$timeout', '$state', '$log', function($scope, $timeout, $state, $log) {

// TODO: remember that different file types will require different parsers

  // does the browser support drag n drop?
  $scope.fileAdded = false;
  $scope.dropSupported = false;
  $scope.selectedFiles = [];

  $scope.$watch(
    function() {
      return $scope.dropSupported;
    },
    function() {
      $log.log('UploadCtrl: dropSupported changed to: ' + $scope.dropSupported);
    }
  )

// TODO: check file type
  $scope.onFileSelect = function ($files) {
    $log.log("inside file select");
    $scope.fileAdded = true;

    // show the user what the selected files are
    // assume this is a single file for now
    $scope.selectedFiles = $files;

    //$files: an array of files selected, each file has name, size, and type.
// TODO: support multiple files?
//    for (var i = 0; i < $files.length; i++) {
//      $scope.progress = 0;
//      var file = $files[i];
//      //$log.log("Logging the file:")
//      //$log.log(file);
//
//    }
  };

// TODO: implement fileProgress
  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

}]);
