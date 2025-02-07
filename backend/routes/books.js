const router = require('express').Router()
const multer = require('multer')
const Book = require('../models/Book')
const { upload } = require('../services')
const { adminAuthenticator } = require('../middlewares')
const fs = require('fs')
const path = require('path')


/* adding a book */
router.post('/add', adminAuthenticator, upload.single("bookFile"), async (req, res) => {
  const { title, author, description, year, genre, copies } = req.body
  const {fieldname, originalname, encoding, mimetype, destination, filename, path, size} = req.file

  // we should see if the book already exists on the database
  const bookExistes = await Book.findOne({title: title}) 
  if (bookExistes) {
    return res.status(400).send({
      message: "fail: book already exists"
    })
  }

  // we create a new book
  const newBook = new Book({
    title: title,
    author: author,
    description: description,
    year: year, 
    genre: genre,
    copies: copies,
    fieldname: fieldname,
    originalname: originalname,
    encoding: encoding,
    mimetype: mimetype,
    destination: destination,
    filename: filename,
    path: path,
    size: size,
  })

  // we save the book in the database
  const bookSaved = await newBook.save()

  if (!bookSaved) {
    return res.status(400).send({
      message: "fail: Book not saved"
    })
  }

  return res.status(201).send({
    message: "success: Book saved",
    book: bookSaved
  })
})


/* deleting the book */
router.delete('/delete/:id', adminAuthenticator, async (req, res) =>{
  // we get the id of the book to delete from req.params.id
  const idBook = req.params.id
  // we get the filename of the book to delete it locallly using fs
  const theBook = await Book.findById({_id: idBook})
  // check if the book existes on the database 
  if (!theBook) {
    return res.status(400).send({
      message: "no book matches the id"
    })
  }

  // get the filename of the book 
  const filename = theBook.filename

  // we delete the book from the database
  const bookDeletedDb = await Book.deleteOne({ _id: idBook })
  if (!bookDeletedDb) {
    return res.status(400).send({
      message: "fail: an error occured while deleting the book on the database"
    })
  }

  // check if the book existes on the server
  const bookExistServer = fs.existsSync(path.join(__dirname, `../uploads/${filename}`))

  if (!bookExistServer) {
    return res.status(201).send({
      message: "success: Book deleted",
      warning: "the book was not found on the server."
    })
  }
  // we delete the book from the server
  const bookDeletedServer = fs.unlinkSync(path.join(__dirname, `../uploads/${filename}`))
  if (!bookDeletedServer) {
    return res.status(400).send({
      message: "fail: an error occured while deleting the book on server"
    })
  }

  return res.status(201).send({
    message: "success: book deleted"
  })
})


/* this routes are accessible by all the roles : admins and user .. but for now we will just let the admin to work on it. */
// get all books
router.get('/all', adminAuthenticator, async (req, res) => {
  const books = await Book.find()
  
  return res.status(200).send({
    message: "success",
    data: books
  })
})

// we should let the user to check for the book and see it 
router.get('/:id', adminAuthenticator, async (req, res) => {
  const bookId = req.params.id

  // find the book 
  const bookFound = await Book.findOne({_id: bookId})

  // if there is no matching in id 
  if (!bookFound) {
    return res.status(400).send({
      message: "fail: no book matches the id"
    })
  }

  return res.status(200).send({
    message: "success",
    data: bookFound
  })
})
module.exports = router