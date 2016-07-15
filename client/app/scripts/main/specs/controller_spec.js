'use strict';

describe('Controller: Main', function () {

  beforeEach(module('App'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('Main', { $scope: scope });
  }));

  describe('On instance', function(){
    it('should set "loaded" variable in scope', function(){
      expect(scope.loaded).toBeDefined();
    });
  });

});
