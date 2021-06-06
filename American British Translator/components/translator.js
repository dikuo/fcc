const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
const LOCALE = ['american-to-british', 'british-to-american']

class Translator {

  translateHelper(translation, dictionary, locale) {

    if (locale == LOCALE[0] || dictionary == britishOnly) {

      for (let key in dictionary) {

        let keyRE = new RegExp(key, 'ig')

        if (keyRE.test(translation)) {
          let newWord = `<span class="highlight">${dictionary[key]}</span>`
          translation = translation.replace(keyRE, newWord)
          
        }
      }

    }
    else if (locale == LOCALE[1]) {

      for (let key in dictionary) {

        let valueRE = new RegExp(dictionary[key], 'ig')

        if (valueRE.test(translation)) {
          
          let newWord = `<span class="highlight">${key}</span>`
          translation = translation.replace(valueRE, newWord)
        }
      }
    }

    return translation
  }

  timeTranslate(translation, locale) {
    
    if (locale == LOCALE[0]) {
      let timeRE = /\d+(:)\d+/g
      let replaceTime = '.'
      let matchResult = translation.match(timeRE)
     
      if (matchResult) {

        matchResult = String(matchResult).replace(/[:]/, replaceTime)
        
        matchResult = `<span class="highlight">${matchResult}</span>`

        return translation.replace(timeRE, matchResult)
      }

    }
    else if (locale == LOCALE[1]) {
      let timeRE = /\d+(.)\d+/g
      let replaceTime = ':'
      let matchResult = translation.match(timeRE)
     
      if (matchResult) {

        matchResult = String(matchResult).replace(/[.]/, replaceTime)
        
        matchResult = `<span class="highlight">${matchResult}</span>`

        return translation.replace(timeRE, matchResult)
      }

    }
      return translation
  }

  translate(text, locale) {

    let translation = text

    if (locale == LOCALE[0]) {

      translation = this.translateHelper(translation, americanOnly, locale)
      translation = this.translateHelper(translation, americanToBritishSpelling, locale)
      translation = this.translateHelper(translation, americanToBritishTitles, locale)
      translation = this.timeTranslate(translation, locale)
    }
    else if (locale == LOCALE[1]) {

      translation = this.translateHelper(translation, britishOnly, locale)
      translation = this.translateHelper(translation, americanToBritishSpelling, locale)
      translation = this.translateHelper(translation, americanToBritishTitles, locale)
      translation = this.timeTranslate(translation, locale)
    }

    return translation
  }
}

module.exports = Translator;