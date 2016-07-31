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

    it('should have an empty array of live_cells', function() {
      expect(scope.live_cells).toEqual([]);
    });

    it('should have ranges for calculations', function() {
      expect(scope.ranges.min.row).toBe(0);
      expect(scope.ranges.min.col).toBe(0);
      expect(scope.ranges.max.row).toBe(0);
      expect(scope.ranges.max.col).toBe(0);
    });
  });

  describe('initialize_matrix function', function() {

    beforeEach(function() {
      scope.initialize_matrix({
        rows: 4,
        cols: 8,
        on_cells: [
          { row: -3, col: -10 },
          { row: 1, col: 4 },
          { row: 2, col: 3 },
          { row: 2, col: 4 }
        ]
      });
    });

    it('should initialize the matrix with a predifined size', function() {
      expect(scope.matrix).toEqual([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
      ]);

      scope.initialize_matrix({
        rows: 4,
        cols: 6,
        on_cells: [ { row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 4 } ]
      });

      expect(scope.matrix).toEqual([
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
      ]);
    });

    it('should set the live_cells to the initialized state', function() {
      expect(scope.live_cells).toContain('-3:-10');
      expect(scope.live_cells).toContain('1:4');
      expect(scope.live_cells).toContain('2:3');
      expect(scope.live_cells).toContain('2:4');
    });

    describe('Random start', function() {

      beforeEach(function() {
        scope.initialize_matrix({
          rows: 4,
          cols: 6,
          on_cells: 'random'
        });
      });

      it('should start with random live cells', function() {
        expect(scope.matrix).toEqual([
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
        ]);

        expect(scope.live_cells.length).not.toBe(0);
      });
    });

  });

  describe('live_cell Function', function() {

    beforeEach(function() {
      scope.live_cells = [ '4:3', '-1:10' ];
    });

    it('should return if coordinates are alive', function() {
      expect(scope.live_cell(4,3)).toBe(true);
      expect(scope.live_cell(-1,10)).toBe(true);
      expect(scope.live_cell(-2,10)).toBe(false);
    });
  });

  describe('Compute next generation', function() {

    beforeEach(function() {
      scope.initialize_matrix({
        rows: 4,
        cols: 8,
        on_cells: [
          { row: -3, col: -10 },
          { row: 1, col: 4 },
          { row: 2, col: 3 },
          { row: 2, col: 4 }
        ]
      });

      scope.next_generation();
    });

    it('should set the ranges to one row and col before to min and one row and col above max', function() {
      expect(scope.ranges.min.row).toBe(-4);
      expect(scope.ranges.min.col).toBe(-11);
      expect(scope.ranges.max.row).toBe(3);
      expect(scope.ranges.max.col).toBe(5);
    });

    it('should modify live_cells to show new generation', function() {
      expect(scope.live_cells.length).toBe(4);
      expect(scope.live_cells).toContain('1:3');
      expect(scope.live_cells).toContain('1:4');
      expect(scope.live_cells).toContain('2:3');
      expect(scope.live_cells).toContain('2:4');
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
      expect(scope.live_cells.length).toBe(3);
      expect(scope.live_cells).toContain('1:2');
      expect(scope.live_cells).toContain('2:2');
      expect(scope.live_cells).toContain('3:2');
    });
  });

  describe('Compute glider', function() {

    beforeEach(function() {
      scope.initialize_matrix({
        rows: 4,
        cols: 5,
        on_cells: [
          { row: 1, col: 3 },
          { row: 2, col: 1 },
          { row: 2, col: 3 },
          { row: 3, col: 2 },
          { row: 3, col: 3 },
        ]
      });

      scope.next_generation();
    });

    it('should modify matrix to show new life', function() {

      expect(scope.live_cells.length).toBe(5);
      expect(scope.live_cells).toContain('1:2');
      expect(scope.live_cells).toContain('2:3');
      expect(scope.live_cells).toContain('2:4');
      expect(scope.live_cells).toContain('3:2');
      expect(scope.live_cells).toContain('3:3');
    });

    it('should respect off-grid life', function() {
      scope.next_generation();
      scope.next_generation();
      scope.next_generation();

      expect(scope.live_cells).toContain('2:4');
      expect(scope.live_cells).toContain('3:2');
      expect(scope.live_cells).toContain('3:4');
      expect(scope.live_cells).toContain('4:3');
      expect(scope.live_cells).toContain('4:4');
    });
  });

  describe('start_life Function', function() {

    beforeEach(function() {
      spyOn(scope, 'next_generation');
    });

    it('should start an interval every 0.6 secs', inject(function($interval) {
      scope.start_life();
      $interval.flush(6000);
      expect(scope.next_generation.calls.length).toBe(10);
    }));
  });

  describe('stop_life Function', function() {

    beforeEach(function() {
      spyOn(scope, 'next_generation');
      scope.start_life();
    });

    it('should start an interval every 0.6 secs', inject(function($interval) {
      $interval.flush(3000);
      scope.stop_life();
      $interval.flush(3000);
      expect(scope.next_generation.calls.length).toBe(5);
    }));
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
