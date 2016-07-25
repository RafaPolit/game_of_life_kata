'use strict';

describe('Controller: game_of_life', function () {

  beforeEach(module('Game_of_life'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('game_of_life', { $scope: scope });
  }));

  describe('On instance', function(){
    it('should set "controller_loaded" variable in scope', function() {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('should have matrix initialized with default values', function() {
      expect(scope.matrix).toEqual([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
      ]);
    });
  });

  describe('initialize_matrix function', function() {
    it('should initialize the matrix with a predifined state', function() {
      scope.initialize_matrix({
        rows: 4,
        cols: 8,
        on_cells: [ { row: 1, col: 4 }, { row: 2, col: 3 }, { row: 2, col: 4 } ]
      });

      expect(scope.matrix).toEqual([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
      ]);

      scope.initialize_matrix({
        rows: 4,
        cols: 6,
        on_cells: [ { row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 4 } ]
      });

      expect(scope.matrix).toEqual([
        [0,1,0,0,0,0],
        [0,0,1,0,0,0],
        [0,0,0,1,0,0],
        [0,0,0,0,1,0],
      ]);
    });
  });

  describe('Compute next generation', function() {
    it('should modify matrix to show new life', function() {
      scope.next_generation();
      expect(scope.matrix).toEqual([
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
      ]);
    });
  });

  describe('Compute oscilator 1', function() {

    beforeEach(function() {
      scope.initialize_matrix({
        rows: 5,
        cols: 5,
        on_cells: [ { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ]
      });
    });

    it('should modify matrix to show new life', function() {
      scope.next_generation();
      expect(scope.matrix).toEqual([
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
      ]);
    });
  });

  describe('when going to /game_of_life', function() {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function($route, $location, $rootScope, $httpBackend){
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/game_of_life/views/game_of_life.html').respond('<div></div>');
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use game_of_life.html and controller', function() {
      expect(route.current).toBeUndefined();

      location.path('/game_of_life');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/game_of_life/views/game_of_life.html');
      expect(route.current.controller).toBe('game_of_life');
    });
  });

});
