'use strict';
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) { return res.send(err)}
  console.log('db ok!')
})
const issue = new mongoose.Schema({
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: String,
  status_text: String,
  created_on: {type: Date, required: true},
  updated_on: {type: Date, required: true},
  open: {type: Boolean, required: true, default: true},
  projectname: String

})
const Issue = mongoose.model('Issue', issue)

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let query = req.query
      query['projectname'] = project
      
      Issue.find(query, (err, result) => {

        if (err) { return res.send(err)}
        return res.json(result)
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      const {issue_title, issue_text, created_by} = req.body

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' })
      }
      else {

        const newIssue = new Issue({
          issue_title,
          issue_text,
          created_by,
          assigned_to: req.body.assigned_to || '',
          status_text: req.body.status_text || '',
          created_on: new Date(),
          updated_on: new Date(),
          projectname: project
        })

        newIssue.save((err, saved) => {
          if (err) { return res.send(err) }
          return res.json(saved)
        })
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      const id = req.body._id

      if (!id) { return res.json({ error: 'missing _id' })}

      function cleanEmptyQuery(myObj) {
        Object.keys(myObj).forEach(key => myObj[key] == '' && delete myObj[key])
        delete myObj['_id']

        return myObj
      }

      const updatedIssue = cleanEmptyQuery(req.body)

      if (!Object.keys(updatedIssue).length) {
        return res.json({ error: 'no update field(s) sent', '_id': id })
      }
      
      updatedIssue['updated_on'] = new Date()

      Issue.findByIdAndUpdate(id, updatedIssue, (err, updated) =>{
        
        if (!err && updated) {
          return res.json({ result: 'successfully updated', '_id': updated._id })
        }
        else {
          return res.json({ error: 'could not update', '_id': id })
        }
      })
    })
    
    .delete(function (req, res){
      let project = req.params.project;     
      const id = req.body._id

      if (!id) {
        return res.json({ error: 'missing _id' })
      }

      Issue.findByIdAndRemove(id, (err, deleted) =>{

        if (!err && deleted) {
          return res.json({ result: 'successfully deleted', '_id': id })
        }
        else {
          return res.json({ error: 'could not delete', '_id': id })
        }
      })
    });
    
};
