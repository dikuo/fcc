const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

const URI = process.env.URI
mongoose.connect(URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, (err) => {
  if (err) { return console.error(err)}
  console.log('db ok!')
})
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  exercises: [{
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: Date
  }]
})
const User = mongoose.model('User', userSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {

  const {username} = req.body
  
  User.findOneAndUpdate({username}, {}, {upsert: true, new: true}, (err, found) => {

    if (err) { return console.error(err)}
    return res.json({username: found.username, _id: found._id})
  })
})

app.get('/api/users', (req, res) => {

  User.find({}, (err, found) => {

    if (err) { return console.error(err)}
    return res.json(found)
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {

  let {description, duration, date} = req.body
  const id = req.params._id

  if (date && new Date(date) !== 'Invalid Date') {
    date = new Date(date)
  }
  else {
    date = new Date()
  }

  User.findByIdAndUpdate(id, {$push: {exercises: {description,duration, date}}}, {upsert: true, new: true}, (err, found) => {

    if (err) { return console.error(err)}
    
    return res.json({
    _id: found._id, 
    username: found.username, 
    description: description, 
    duration: parseInt(duration), 
    date: date.toDateString()})
  })
})

app.get('/api/users/:_id/logs', (req, res) => {

  const id = req.params._id
  const {from, to, limit} = req.query

  User.findById(id, (err, found) => {
    if (err) { return console.error(err)}

    let exercises = found.exercises
    if (from) {
      let fromDate = new Date(from)  
      exercises.filter(exercise => {
        exercise.date >= fromDate
      })
    }
    if (to) {
      let toDate = new Date(to)
      exercises.filter(exercise => {
        exercise.date <= toDate
      })   
    }
    if (limit) { 
      exercises = exercises.slice(0, limit)
    }

    return res.json({
      _id: found._id,
      username: found.username,
      count: found.exercises.length,
      log: exercises.map((exercise) => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      }))
    })
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
