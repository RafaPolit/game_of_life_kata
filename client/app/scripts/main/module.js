'use strict';

angular.module('App', [
  'ngRoute',
  'Game_of_life'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/main/views/dashboard.html',
  });
});
