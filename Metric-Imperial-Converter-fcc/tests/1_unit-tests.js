const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('get correct number input', () => {

    test('read a whole number input', done => {

      const input = '3L'
      assert.equal(convertHandler.getNum(input), 3)
      done()
    })

    test('read a decimal number input', done => {

      const input = '1.2L'
      assert.equal(convertHandler.getNum(input), 1.2)
      done()
    })

    test('read a fractional input', done => {

      const input = '1/2L'
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })

    test('read a fractional input w/ a decimal', done => {

      const input = '2.2/2L'
      assert.equal(convertHandler.getNum(input), 1.1)
      done()
    })

    test('read a double-fraction number input', done => {

      const input = '3/2/3L'
      assert.equal(convertHandler.getNum(input), null)
      done()
    })

    test('read a no numberical input', done => {

      const input = 'L'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })

  suite('get correct unit', () => {

    test('read valid input unit', done => {

      const input = ['gal','mi','km','lbs','kg','GAL','MI','KM','LBS','KG']
      input.forEach(ele => {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
      })
        done()
    })

    test('unknown unit', done => {

      const input = '3kl'
      assert.equal(convertHandler.getUnit(input), null)
      done()
    })
  })

  suite('get correct return unit', () => {

    test('return correct input unit', done => {

      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']

      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expected[i])
      })
        done()
    })
  })

  suite('get correct spell unit', () => {

    test('return correct spell unit', done => {

      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
      const spell = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']

      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), spell[i])
      })

      done()
    })
  })

  suite('convert', () => {

    test('Gal to L', done => {

      const input = [5, 'gal']
      const expected = 18.9271
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('L to Gal', done => {

      const input = [2.5, 'L']
      const expected = 0.6604304
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('L to Gal', done => {

      const input = [2.5, 'L']
      const expected = 0.6604304
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('mi to km', done => {

      const input = [1.43, 'mi']
      const expected = 2.3013562
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('km to mi', done => {

      const input = [0.698, 'km']
      const expected = 0.43371817
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('lbs to kg', done => {

      const input = [3.27, 'lbs']
      const expected = 1.48324584
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })

    test('kg to lbs', done => {

      const input = [7.234, 'kg']
      const expected = 15.948253
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done()
    })
  })
});