'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      let {puzzle, coordinate, value } = req.body

      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing'})
      }
      
      let validateResult = solver.validate(puzzle)
      if (validateResult == 'Invalid characters in puzzle') {
          return res.json({ error: 'Invalid characters in puzzle' })
        }
      else if (validateResult == 'Expected puzzle to be 81 characters long') {
        return res.json({ error: 'Expected puzzle to be 81 characters long'})
      }

      let row = coordinate.charCodeAt(0) - 65
      let col = parseInt(coordinate.charAt(1)) - 1

      if (coordinate.length !== 2 || row < 0 || row > 8 || col < 0 || col > 8) {
        return res.json({ error: 'Invalid coordinate'})
      }

      value = parseInt(value)
      if (!value || value < 1 || value > 9) {
        return res.json({ error: 'Invalid value' })
      }

      let conflict = []
      if (!solver.checkRowPlacement(puzzle, row, col, value)) {
        conflict.push('row')
      }
      if (!solver.checkColPlacement(puzzle, row, col, value)) {
        conflict.push('column')
      }
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
        conflict.push('region')
      }

      if (conflict.length) {
        return res.json({valid: false, conflict})
      }
      
      return res.json({valid: true})
    })

  app.route('/api/solve')
    .post((req, res) => {

      const puzzle = req.body.puzzle
      
      if (!puzzle) {
        return res.json({ error: 'Required field missing' })
      }
      else {

        let validateResult = solver.validate(puzzle)
          
        if (validateResult == 'Invalid characters in puzzle') {
          return res.json({ error: 'Invalid characters in puzzle' })
        }
        else if (validateResult == 'Expected puzzle to be 81 characters long') {
          return res.json({ error: 'Expected puzzle to be 81 characters long'})
        }
        else {
          
          let solution = solver.solve(puzzle)

          if (!solution) {
            return res.json({ error: 'Puzzle cannot be solved'})
          }
          else {
            return res.json({solution})
          }
        }

      }

    });
};
