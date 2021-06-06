'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      
      const text = req.body.text
      const locale = req.body.locale

      if ((!text || !locale) && text !== '') {
        return res.json( {error: 'Required field(s) missing' })
      }
      else if (text.trim() == '') {
        return res.json({ error: 'No text to translate' })
      }
      else if (locale !== 'british-to-american' && locale !== 'american-to-british') {

        return res.json({ error: 'Invalid value for locale field' })
      }
      else {

        let translation = translator.translate(text, locale)

        if (text == translation) {
          return res.json({text, translation: 'Everything looks good to me!'})
        }
        else {
          return res.json({text, translation})
        }
      }
    });
};
