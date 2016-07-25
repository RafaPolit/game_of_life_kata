'use strict';

angular.module('Game_of_life')
.controller('game_of_life', function ($scope) {

  $scope.controller_loaded = 'Game of life loaded!';

  $scope.matrix = [];

  $scope.initialize_matrix = function(options) {
    initialize_empty_matrix(options);
    initialize_on_cels(options);
  };

  $scope.initialize_matrix({
    rows: 4,
    cols: 8,
    on_cells: [ { row: 1, col: 4 }, { row: 2, col: 3 }, { row: 2, col: 4 } ]
  });

  $scope.next_generation = function() {
    $scope.matrix_reference = clone_matrix();

    for(var row = 0; row < $scope.matrix.length; row ++) {
      for(var col=0; col < $scope.matrix[row].length; col ++) {
        var neighbors_alive = get_neighbors_alive(row, col);
        determine_cell_next_generation(row, col, neighbors_alive);
      }
    }
  };

  // ---

  function initialize_empty_matrix(options) {
    for(var row = 0; row < options.rows; row ++) {
      $scope.matrix[row] = [];
      for(var col = 0; col < options.cols; col ++) {
        $scope.matrix[row][col] = 0;
      }
    }
  }

  function initialize_on_cels(options) {
    options.on_cells.forEach(function(on_cell) {
      $scope.matrix[on_cell.row][on_cell.col] = 1;
    });
  }

  function clone_matrix() {
    var clone = [];
    for(var row = 0; row < $scope.matrix.length; row ++) {
      clone[row] = [];
      for(var col = 0; col < $scope.matrix[row].length; col ++) {
        clone[row][col] = $scope.matrix[row][col];
      }
    }

    return clone;
  }

  function get_neighbors_alive(row, col) {
    var neighbors_alive = 0;

    for(var row_offset = -1; row_offset < 2; row_offset ++) {
      for(var col_offset = -1; col_offset < 2; col_offset ++) {
        if(row_offset !== 0 || col_offset !== 0) {
          neighbors_alive = get_offest_neighbor_alive(row, row_offset, col, col_offset, neighbors_alive);
        }
      }
    }

    return neighbors_alive;
  }

  function get_offest_neighbor_alive(row, row_offset, col, col_offset, neighbors_alive) {
    try {
      if($scope.matrix_reference[row+row_offset][col+col_offset]) {
        neighbors_alive ++;
      }
    }
    catch(error) {}
    return neighbors_alive;
  }

  function determine_cell_next_generation(row, col, neighbors_alive) {
    if(neighbors_alive < 2) { $scope.matrix[row][col] = 0; }
    if(neighbors_alive > 3) { $scope.matrix[row][col] = 0; }
    if(neighbors_alive === 3) { $scope.matrix[row][col] = 1; }
  }
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/game_of_life', {
    templateUrl: 'scripts/game_of_life/views/game_of_life.html',
    controller: 'game_of_life'
  });
});
