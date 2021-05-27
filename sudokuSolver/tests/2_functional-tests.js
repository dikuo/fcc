const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('POST solve fn', () => {

    test('Solve a puzzle with valid puzzle string', done => {

      chai.request(server)
          .post('/api/solve')
          .send({puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.solution, '218396745753284196496157832531672984649831257827549613962415378185763429374928561')

            done()
          })
    })

    test('Solve a puzzle with missing puzzle string', done => {

      chai.request(server)
          .post('/api/solve')
          .send({})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Required field missing')

            done()
          })
    })

    test('Solve a puzzle with invalid characters:', done => {

      chai.request(server)
          .post('/api/solve')
          .send({puzzle: '..83bbc.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Invalid characters in puzzle')

            done()
          })
    })

    test('Solve a puzzle with incorrect length', done => {

      chai.request(server)
          .post('/api/solve')
          .send({puzzle: '1234'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')

            done()
          })
    })

    test('Solve a puzzle that cannot be solved', done => {

      chai.request(server)
          .post('/api/solve')
          .send({puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....622.5.78.8...3.2...492...1'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Puzzle cannot be solved')

            done()
          })
    })
  })

  suite('POST check fn', () => {

    test('Check a puzzle placement with all fields', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '21.396745753284196496157832531672984649831257827549613962415378185763429374928561', 
          coordinate: 'A3',
          value: '8'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.valid, true)
            
            done()
          })
    })

    test('Check a puzzle placement with single placement conflict', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '5689137243.2687519194254386685479231219538467734162895926345178473891652851726943', 
          coordinate: 'B2',
          value: '4'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.valid, false)
            assert.deepEqual(res.body.conflict, ['region'])

            done()
          })
    })

    test('Check a puzzle placement with multiple placement conflicts', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'B3',
          value: '8'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.valid, false)
            assert.deepEqual(res.body.conflict, ['column', 'region'])
            
            done()
          })
    })

    test('Check a puzzle placement with all placement conflicts', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '..839.7.575....8964.81.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'B3',
          value: '8'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.valid, false)
            assert.deepEqual(res.body.conflict, ['row', 'column', 'region'])

            done()
          })
    })

    test('Check a puzzle placement with missing required fields', done => {

      chai.request(server)
          .post('/api/check')
          .send({})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Required field(s) missing')

            done()
          })
    })

    test('Check a puzzle placement with invalid characters', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '..abc.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'C3',
          value: '7'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Invalid characters in puzzle')

            done()
          })
    })

    test('Check a puzzle placement with incorrect length', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '...7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'C3',
          value: '7'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
            
            done()
          })
    })

    test('Check a puzzle placement with invalid placement coordinate:', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'C12',
          value: '7'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Invalid coordinate')

            done()
          })
    })

    test('Check a puzzle placement with invalid placement value', done => {

      chai.request(server)
          .post('/api/check')
          .send({puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1', 
          coordinate: 'C4',
          value: '17'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'Invalid value')

            done()
          })
    })
  })
});

