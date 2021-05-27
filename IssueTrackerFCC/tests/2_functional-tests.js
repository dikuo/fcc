const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
let id

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('POST test', () =>{

    test('Create an issue with every field', done => {

      chai.request(server)
          .post('/api/issues/apitest')
          .send({
            issue_title: 'Title',
            issue_text: 'Text',
            created_by: 'admin',
            assigned_to: 'guest',
            status_text: 'in QA'
          })
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.issue_title, 'Title')
            assert.equal(res.body.issue_text, 'Text')
            assert.equal(res.body.created_by, 'admin')
            assert.equal(res.body.assigned_to, 'guest')
            assert.equal(res.body.status_text, 'in QA')
            assert.isBoolean(res.body.open)

            id = res.body._id

            done()
          })
    })

    test('Create an issue with only required fields', done => {
      
      chai.request(server)
          .post('/api/issues/apitest')
          .send({
            issue_title: 'Title',
            issue_text: 'Text',
            created_by: 'admin'
          })
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.issue_title, 'Title')
            assert.equal(res.body.issue_text, 'Text')
            assert.equal(res.body.created_by, 'admin')
            assert.equal(res.body.assigned_to, '')
            assert.equal(res.body.status_text, '')
            assert.isBoolean(res.body.open)

            done()
          })
    })

    test('Create an issue with missing required fields', done => {

      chai.request(server)
          .post('/api/issues/apitest')
          .send({issue_title: 'Title',
                 issue_text: 'Text'})
          .end((err, res) => {

              assert.equal(res.status, 200)
              assert.equal(res.body.error, 'required field(s) missing')

              done()
          } )
    })
  })

  suite('GET test', () => {

    test('View issues on a project', done => {

      chai.request(server)
          .get('/api/issues/apitest')
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.isArray(res.body)
            assert.property(res.body[0], 'issue_title')
            assert.property(res.body[0], 'issue_text')
            assert.property(res.body[0], 'created_by')
            assert.property(res.body[0], 'assigned_to')
            assert.property(res.body[0], 'status_text')
            assert.property(res.body[0], 'created_on')
            assert.property(res.body[0], 'updated_on')
            assert.property(res.body[0], 'open')
            assert.property(res.body[0], '_id')

            done()
          })
    })

    test('View issues on a project with one filter', done => {

      chai.request(server)
          .get('/api/issues/apitest')
          .query({created_by: 'admin'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.isArray(res.body)
            assert.property(res.body[0], 'issue_title')
            assert.property(res.body[0], 'issue_text')
            assert.property(res.body[0], 'created_by')
            assert.property(res.body[0], 'assigned_to')
            assert.property(res.body[0], 'status_text')
            assert.property(res.body[0], 'created_on')
            assert.property(res.body[0], 'updated_on')
            assert.property(res.body[0], 'open')
            assert.property(res.body[0], '_id')

            assert.equal(res.body[0].created_by, 'admin')

            done()
          })
    })

    test('View issues on a project with multiple filters', done => {

      chai.request(server)
          .get('/api/issues/apitest')
          .query({created_by: 'admin', issue_title: 'Title'})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.isArray(res.body)
            assert.property(res.body[0], 'issue_title')
            assert.property(res.body[0], 'issue_text')
            assert.property(res.body[0], 'created_by')
            assert.property(res.body[0], 'assigned_to')
            assert.property(res.body[0], 'status_text')
            assert.property(res.body[0], 'created_on')
            assert.property(res.body[0], 'updated_on')
            assert.property(res.body[0], 'open')
            assert.property(res.body[0], '_id')

            assert.equal(res.body[0].created_by, 'admin')
            assert.equal(res.body[0].issue_title, 'Title')

            done()
          })
    })
  })

  suite('PUT test' , () => {

    test('Update one field on an issue', done => {

      chai.request(server)
          .put('/api/issues/apitest')
          .send({_id: id, issue_title: 'New Title'})
          .end((err, res) => {
            
            assert.equal(res.status, 200)
            assert.equal(res.body.result, 'successfully updated')
            assert.equal(res.body._id, id)

            done()
          })

    })

    test('Update multiple fields on an issue', done => {

      chai.request(server)
          .put('/api/issues/apitest')
          .send({_id: id, issue_title: 'Next Title', issue_text: 'Next Text'})
          .end((err, res) => {
            
            assert.equal(res.status, 200)
            assert.equal(res.body.result, 'successfully updated')
            assert.equal(res.body._id, id)

            done()
          })

    })

    test('Update an issue with missing _id', done => {

      chai.request(server)
          .put('/api/issues/apitest')
          .send({})
          .end((err, res) => {
            
            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'missing _id')

            done()
          })

    })

    test('Update an issue with no fields to update', done => {

      chai.request(server)
          .put('/api/issues/apitest')
          .send({_id: id})
          .end((err, res) => {
   
            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'no update field(s) sent')
            assert.equal(res.body._id, id)
            
            done()
          })

    })

    test('Update an issue with an invalid _id', done => {

      chai.request(server)
          .put('/api/issues/apitest')
          .send({_id: 'abc', issue_title: 'invalid ID'})
          .end((err, res) => {
            
            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'could not update')
            assert.equal(res.body._id, 'abc')

            done()
          })

    })
  })

  suite('DELETE test', () => {

    test('Delete an issue', done => {

      chai.request(server)
          .delete('/api/issues/apitest')
          .send({_id: id})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.result, 'successfully deleted')
            assert.equal(res.body._id, id)

            done()
            
          })
    })

    test('Delete an issue with an invalid _id', done => {

      chai.request(server)
          .delete('/api/issues/apitest')
          .send({_id: id})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'could not delete')
            assert.equal(res.body._id, id)

            done()
          })
    })

    test('Delete an issue with missing _id', done => {

      chai.request(server)
          .delete('/api/issues/apitest')
          .send({})
          .end((err, res) => {

            assert.equal(res.status, 200)
            assert.equal(res.body.error, 'missing _id')

            done()
          })
    })
  })
});
