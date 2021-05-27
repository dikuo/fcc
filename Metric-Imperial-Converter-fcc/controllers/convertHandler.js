function ConvertHandler() {
  
  this.getNum = function(input) {
    var slashRE = /\//g
    var slashMatch = input.match(slashRE)
    if (slashMatch && slashMatch.length > 1) return null

    var numRE = /([\d.\/])+/gi
    var numMatch = input.match(numRE)
    if (numMatch == null) return 1

    return eval(numMatch[0])
  };
  
  this.getUnit = function(input) {
    var RE = /[a-z]/i
    var unitIndex = input.search(RE)
    var unitMatch = input.slice(unitIndex)

    if (unitMatch == 'l' || unitMatch == 'L') return 'L'
    else {
      var unitMatch = unitMatch.toLowerCase()
      var unit = ['km', 'mi', 'kg', 'lbs', 'gal']
      return unit.includes(unitMatch) ? unitMatch : null
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    
    switch (initUnit.toLowerCase()) {

      case 'km': return 'mi'
      case 'mi': return 'km'
      case 'kg': return 'lbs'
      case 'lbs': return 'kg'
      case 'gal': return 'L'
      case 'l': return 'gal'
      default: return null
    }
  };

  this.spellOutUnit = function(unit) {
    
    switch(unit.toLowerCase()) {

      case 'km': return 'kilometers'
      case 'mi': return 'miles'
      case 'kg': return 'kilograms'
      case 'lbs': return 'pounds'
      case 'gal': return 'gallons'
      case 'l': return 'liters'
      default: return null
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch (initUnit.toLowerCase()) {

      case 'gal': return parseFloat((initNum * galToL).toFixed(5))
      case 'l': return parseFloat((initNum * (1 / galToL)).toFixed(5))
      case 'lbs': return parseFloat((initNum * lbsToKg).toFixed(5))
      case 'kg': return parseFloat((initNum * (1 / lbsToKg)).toFixed(5))
      case 'mi': return parseFloat((initNum * miToKm).toFixed(5))
      case 'km': return parseFloat((initNum * (1 / miToKm)).toFixed(5))
      default: return null
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum.toFixed(5) + ' ' + this.spellOutUnit(returnUnit);
    
    return {initNum, initUnit, returnNum, returnUnit, string: result};
  };
  
}

module.exports = ConvertHandler;
