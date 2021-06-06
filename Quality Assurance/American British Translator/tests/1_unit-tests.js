const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {

  const translator = new Translator()

  suite('translate to British English', () => {

    let locale = 'american-to-british'
    
    test('Mangoes are my favorite fruit.', done => {

      const text = 'Mangoes are my favorite fruit.'
      const translation = `Mangoes are my <span class="highlight">favourite</span> fruit.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('I ate yogurt for breakfast.', done => {

      const text = 'I ate yogurt for breakfast.'
      const translation = `I ate <span class="highlight">yoghurt</span> for breakfast.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test("We had a party at my friend's condo.", done => {

      const text = "We had a party at my friend's condo."
      const translation = `We had a party at my friend's <span class="highlight">flat</span>.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Can you toss this in the trashcan for me?', done => {

      const text = "Can you toss this in the trashcan for me?"
      const translation = `Can you toss this in the <span class="highlight">rubbish</span>can for me?`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('The parking lot was full.', done => {

      const text = "The parking lot was full."
      const translation = `The <span class="highlight">car park</span> was full.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Like a high tech Rube Goldberg machine.', done => {

      const text = "Like a high tech Rube Goldberg machine."
      const translation = `Like a high tech <span class="highlight">Heath Robinson device</span>.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('To play hooky means to skip class or work.', done => {

      const text = "To play hooky means to skip class or work."
      const translation = `To <span class="highlight">bunk off</span> means to skip class or work.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('No Mr. Bond, I expect you to die.', done => {

      const text = "No Mr. Bond, I expect you to die."
      const translation = `No <span class="highlight">Mr</span> Bond, I expect you to die.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Dr. Grosh will see you now.', done => {

      const text = "Dr. Grosh will see you now."
      const translation = `<span class="highlight">Dr</span> Grosh will see you now.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Lunch is at 12:15 today.', done => {

      const text = "Lunch is at 12:15 today."
      const translation = `Lunch is at <span class="highlight">12.15</span> today.`

      assert.equal(translator.translate(text, locale), translation)

      done()
    })
  })

  suite('translate to American English', () => {

    let locale = 'british-to-american'

    test('We watched the footie match for a while.', done => {

      const text = "We watched the footie match for a while."
      const translation = `We watched the <span class="highlight">soccer</span> match for a while.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Paracetamol takes up to an hour to work.', done => {

      const text = "Paracetamol takes up to an hour to work."
      const translation = `<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('First, caramelise the onions.', done => {

      const text = "First, caramelise the onions."
      const translation = `First, <span class="highlight">caramelize</span> the onions.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('I spent the bank holiday at the funfair.', done => {

      const text = "I spent the bank holiday at the funfair."
      const translation = `I spent the <span class="highlight"><span class="highlight">bar</span>lic holiday</span> at the <span class="highlight">carnival</span>.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('I had a bicky then went to the chippy.', done => {

      const text = "I had a bicky then went to the chippy."
      const translation = `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test("I've just got bits and bobs in my bum bag.", done => {

      const text = "I've just got bits and bobs in my bum bag."
      const translation = `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('The car boot sale at Boxted Airfield was called off.', done => {

      const text = "The car boot sale at Boxted Airfield was called off."
      const translation = `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Have you met Mrs Kalyani?', done => {

      const text = "Have you met Mrs Kalyani?"
      const translation = `Have you met <span class="highlight">Mr.</span>s Kalyani?`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test("Prof Joyner of King's College, London.", done => {

      const text = "Prof Joyner of King's College, London."
      const translation = `<span class="highlight">Prof.</span> Joyner of King's College, London.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })

    test('Tea time is usually around 4 or 4.30.', done => {

      const text = "Tea time is usually around 4 or 4.30."
      const translation = `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
      
      assert.equal(translator.translate(text, locale), translation)

      done()
    })
  })

  suite('Highlight translation', () => {

    let locale1 = 'american-to-british'

    test('Mangoes are my favorite fruit.', done => {

      const text = 'Mangoes are my favorite fruit.'
      const translation = `Mangoes are my <span class="highlight">favourite</span> fruit.`

      assert.equal(translator.translate(text, locale1), translation)

      done()
    })

    test('I ate yogurt for breakfast.', done => {

      const text = 'I ate yogurt for breakfast.'
      const translation = `I ate <span class="highlight">yoghurt</span> for breakfast.`

      assert.equal(translator.translate(text, locale1), translation)

      done()
    })

    let locale2 = 'british-to-american'

    test('We watched the footie match for a while.', done => {

      const text = 'We watched the footie match for a while.'
      const translation = `We watched the <span class="highlight">soccer</span> match for a while.`

      assert.equal(translator.translate(text, locale2), translation)

      done()
    })

    test('Paracetamol takes up to an hour to work.', done => {

      const text = 'Paracetamol takes up to an hour to work.'
      const translation = `<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work.`

      assert.equal(translator.translate(text, locale2), translation)

      done()
    })
  })
});
