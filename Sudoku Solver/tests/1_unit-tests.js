const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  suite('test validate function', () => {

    test('Logic handles a valid puzzle string of 81 characters' , done => {

      const puzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

      assert.equal(solver.validate(puzzle), true)

      done()
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', done => {

      const puzzle = 'abc5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

      assert.equal(solver.validate(puzzle), 'Invalid characters in puzzle')

      done()
    })

    test('Logic handles a puzzle string that is not 81 characters in length', done => {

      const puzzle = '123'

      assert.equal(solver.validate(puzzle), 'Expected puzzle to be 81 characters long')

      done()
    })

  })

  suite('test checkRowPlacement fn', () => {

    test('Logic handles a valid row placemen', done => {

      const puzzleRow = '123.56789'

      assert.equal(solver.checkRowPlacement(puzzleRow, 0, 0, 4), true)

      done()
    })

    test('Logic handles an invalid row placement', done => {

      const puzzleRow = '123.56789'

      assert.equal(solver.checkRowPlacement(puzzleRow, 0, 0, 3), false)

      done()
    })
  })

  suite('test checkColPlacement fn', () => {

    test('Logic handles a valid column placement', done => {

      const puzzleCol = '123.56789987654.21'

      assert.equal(solver.checkColPlacement(puzzleCol, 3, 1, 3), true)

      done()
    })

    test('Logic handles an invalid column placement', done => {

      const puzzleCol = '123.56789987654.21'

      assert.equal(solver.checkColPlacement(puzzleCol, 3, 1, 8), false)

      done()
    })
  })

  suite('test checkRegionPlacement fn', () => {

    test('Logic handles a valid region (3x3 grid) placement', done => {

      const puzzleBox = '123.56789987654.214.6789123'
      
      assert.equal(solver.checkRegionPlacement(puzzleBox, 2, 2, 5), true)

      done()
    })

    test('Logic handles an invalid region (3x3 grid) placement', done => {

      const puzzleBox = '123.56789987654.214.6789123'

      assert.equal(solver.checkRegionPlacement(puzzleBox, 2, 2, 8), false)

      done()
    })
  })

  suite('test solve fn', () => {

    test('Valid puzzle strings pass the solver', done => {

      const puzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

      assert.equal(solver.solve(puzzle) ? true : false, true)

      done()
    })

    test('Invalid puzzle strings fail the solver', done => {

      const puzzle = '5..91372.3...8.5.9.9.25..8.68.47723...95..46.7.4.....5.2.......4..8916..85572...3'

      assert.equal(solver.solve(puzzle), false)

      done()
    })

    test('Solver returns the the expected solution for an incomplete puzzle', done => {

      var puzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
      const answerKey = '568913724342687519197254386685479231219538467734162895926345178473891652851726943'

      puzzle = solver.solve(puzzle)
      assert.equal(puzzle, answerKey)

      done()
    })
  })
});
