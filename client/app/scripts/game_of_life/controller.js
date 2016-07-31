'use strict';

angular.module('Game_of_life')
.controller('game_of_life', function ($scope, $interval) {

  $scope.controller_loaded = 'Game of life loaded!';

  $scope.matrix = [];
  $scope.live_cells = [];
  $scope.ranges = reset_ranges();

  $scope.initialize_matrix = function(options) {
    initialize_empty_matrix(options);
    initialize_live_cels(options);
  };

  // $scope.initialize_matrix({
  //   rows: 4,
  //   cols: 8,
  //   on_cells: [ { row: 1, col: 4 }, { row: 2, col: 3 }, { row: 2, col: 4 } ]
  // });

  // $scope.initialize_matrix({
  //   rows: 60,
  //   cols: 60,
  //   on_cells: [
  //     { row: 1, col: 3 },
  //     { row: 2, col: 1 },
  //     { row: 2, col: 3 },
  //     { row: 3, col: 2 },
  //     { row: 3, col: 3 },
  //   ]
  // });

  // $scope.initialize_matrix({ rows: 50, cols: 50, on_cells: 'random' });

  $scope.next_generation = function() {
    $scope.live_cells_reference = [];
    $scope.ranges = reset_ranges();

    $scope.live_cells.forEach(function(cell) {
      $scope.live_cells_reference.push(cell);
      adjust_ranges(cell);
    });

    $scope.live_cells = [];

    for(var row = $scope.ranges.min.row; row <= $scope.ranges.max.row; row ++) {
      for(var col = $scope.ranges.min.col; col <= $scope.ranges.max.col; col ++) {
        add_live_cells_next_generation(row, col);        
      }
    }
  };

  $scope.live_cell = function(row, col) {
    return ( $scope.live_cells.indexOf(row + ':' + col) !== -1 );
  };

  $scope.start_life = function() {
    $scope.life_event_interval = $interval($scope.next_generation, 600);
  };

  $scope.stop_life = function() {
    $interval.cancel($scope.life_event_interval);
  };

  // ---

  function reset_ranges() {
    return { min: { row: 0, col: 0 }, max: { row: 0, col: 0} };
  }

  function initialize_empty_matrix(options) {
    for(var row = 0; row < options.rows; row ++) {
      $scope.matrix[row] = [];
      for(var col = 0; col < options.cols; col ++) {
        $scope.matrix[row][col] = 0;
      }
    }
  }

  function initialize_live_cels(options) {
    $scope.live_cells = [];
    if(options.on_cells !== 'random') {
      options.on_cells.forEach(function(on_cell) {
        $scope.live_cells.push(on_cell.row + ':' + on_cell.col);
      });
    }

    if(options.on_cells === 'random') {
      for(var row = 0; row < $scope.matrix.length; row ++) {
        for(var col = 0; col < $scope.matrix[row].length; col ++) {
          var on_cell = Math.round(Math.random());
          if(on_cell) { $scope.live_cells.push(row + ':' + col); }
        }
      }
    }
  }

  function adjust_ranges(cell) {
    var cell_coordinates = get_cell_coordinates(cell);

    $scope.ranges.min.row = Math.min(cell_coordinates[0] - 1, $scope.ranges.min.row);
    $scope.ranges.min.col = Math.min(cell_coordinates[1] - 1, $scope.ranges.min.col);
    $scope.ranges.max.row = Math.max(cell_coordinates[0] + 1, $scope.ranges.max.row);
    $scope.ranges.max.col = Math.max(cell_coordinates[1] + 1, $scope.ranges.max.col);
  }

  function add_live_cells_next_generation(row, col) {
    var neighbors_alive = determine_neighboards_alive(row, col) ;
    
    var cell_alive_previous_generation = ($scope.live_cells_reference.indexOf(row + ':' + col) !== -1);
    if(neighbors_alive >= 2 && neighbors_alive <= 3 && cell_alive_previous_generation) {
      $scope.live_cells.push(row + ':' + col);
    }

    if(neighbors_alive === 3 && !cell_alive_previous_generation) {
      $scope.live_cells.push(row + ':' + col);
    }
  }

  function determine_neighboards_alive(row, col) {
    var neighbors_alive = 0;

    for(var row_offset = -1; row_offset < 2; row_offset ++) {
      for(var col_offset = -1; col_offset < 2; col_offset ++) {
        if(row_offset !== 0 || col_offset !== 0) {
          if($scope.live_cells_reference.indexOf((row + row_offset) + ':' + (col + col_offset)) !== -1) {
            neighbors_alive ++;
          }
        }
      }
    }

    return neighbors_alive;
  }

  function get_cell_coordinates(cell) {
    var coordinates = cell.split(':');

    coordinates[0] = Number(coordinates[0]);
    coordinates[1] = Number(coordinates[1]);

    return coordinates;
  }

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/game_of_life', {
    templateUrl: 'scripts/game_of_life/views/game_of_life.html',
    controller: 'game_of_life'
  });
});
