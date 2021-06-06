/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI

module.exports = function (app) {

  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) { return console.error(err)}
    console.log('db ok!')
  })
  const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    comments: [String]
  })
  const Book = mongoose.model('Book', bookSchema)

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      let arrayOfBooks = []
      Book.find({}, (err, results) => {
        if (err) { return res.send(err) }  
        results.forEach(result => {
          let book = result.toJSON()
          book['commentcount'] = book.comments.length
          arrayOfBooks.push(book)
        })

        return res.json(arrayOfBooks)
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title) {
        return res.send('missing required field title')
      }
      else {

        let newBook = new Book({
          title,
          comments: []
        })

        newBook.save((err, saved) => {
          if (err) { return res.send(err) }

          return res.json(saved)
        })
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'

      Book.deleteMany({}, (err, result) => {
        if (err) { return res.send(err)}
        return res.send('complete delete successful')
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      Book.findById(bookid, (err, result) => {
        
        if (!result) {
            return res.send('no book exists')
        }
        else if (err) {
          return res.send(err)
        }
        else {
          return res.json(result)
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) { return res.send('missing required field comment')}
      
      Book.findByIdAndUpdate(bookid, {$push: {comments: comment}}, {new: true}, (err, updated) => {

        if (!err && updated) {
          return res.json(updated)
        }    
        else if (!updated){
          return res.send('no book exists')
        }
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      Book.findByIdAndRemove(bookid, (err, deleted) => {
        
        if (!err && deleted) {
          return res.send('delete successful')
        }
        else if (!deleted) {
          return res.send('no book exists')
        }
      })
    });
  
};
