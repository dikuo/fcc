let solution

class SudokuSolver {

  // check if input is valid
  validate(puzzleString) {
    let puzzleRe = /[^1-9.]/g
    
    if (puzzleRe.test(puzzleString)) {
      return 'Invalid characters in puzzle'
    }
    else if (puzzleString.length !== 81 ) {
      return 'Expected puzzle to be 81 characters long'
    }
    else {
      return true
    }

  }

  // check if row placement valid
  checkRowPlacement(puzzleString, row, column, value) {

    let index = row * 9 + column

    for (let i = row * 9; i < row * 9 + 9; i++) {

      if (puzzleString.charAt(i) == value && index !== i) {
        return false
      }
    }

    return true
  }

  // check if col placement valid
  checkColPlacement(puzzleString, row, column, value) {

    let index = row * 9 + column

    for (let i = column; i < 9 * 9; i += 9 ) {
      if (puzzleString.charAt(i) == value && index !== i) {
        return false
      }
    }

    return true
  }

  // check box placement valid
  checkRegionPlacement(puzzleString, row, column, value){
    let startRow = row - row % 3
    let startCol = column - column % 3
    let index = row * 9 + column

    for (let row = startRow * 9; row < 9 * (startRow + 3); row += 9) {
      for (let col = startCol; col < startCol + 3; col++) {
        
        if (puzzleString.charAt(row + col) == value && index !== row + col) {
          return false
        }
      }
    }

    return true
  }

  isSafe(puzzleString, row, column, value) {
    return this.validate(puzzleString) &&
           this.checkRowPlacement(puzzleString, row, column, value) &&
           this.checkColPlacement(puzzleString, row, column, value) &&
           this.checkRegionPlacement(puzzleString, row, column, value)
  }

  findEmptySpot(puzzleString, l) {

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {

        if (puzzleString.charAt(row * 9 + col) == '.') {
          l[0] = row
          l[1] = col
          return true
        }
      }
    }

    return false
  }

  solveHelper(puzzleString) {
    
    // current position
    let l = [0, 0]

    // no more empty spot, finished
    if (!this.findEmptySpot(puzzleString, l)) {
      solution = puzzleString
      return true
    }
    
    // assign row, col
    let row = l[0]
    let col = l[1]

    // try numbers
    for (let i = 1; i <= 9; i++) {

      if (this.isSafe(puzzleString, row, col, i)) {
        let index = row * 9 + col
        let oldStr = puzzleString
        puzzleString = puzzleString.substr(0, index) + i + puzzleString.substr(index + 1)

        if (this.solveHelper(puzzleString)) {

          return true
        }

        // if fails, set it back
        puzzleString = oldStr
      }
    }
    
    return false
  }

  solve(puzzleString) {
    return this.solveHelper(puzzleString) && solution
  }
}

module.exports = SudokuSolver;

