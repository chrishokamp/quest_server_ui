'use strict';

var App = window.App = angular.module('questServerApp',
  [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'controllers',
    'directives',
    'services',
    'ui.bootstrap',
    'angularFileUpload',
    'ngAnimate'
  ]
)
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: 'views/setup.html'

    });
  $urlRouterProvider
    .otherwise('/setup');
});
//.constant('baseUrl', 'http://protected-crag-2517.herokuapp.com/glossary');
//// Allow CORS
//  .config(['$httpProvider', function($httpProvider) {
//    $httpProvider.defaults.useXDomain = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//  }]);
