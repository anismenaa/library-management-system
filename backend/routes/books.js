const router = require('express').Router()
const multer = require('multer')
const Book = require('../models/Book')
const { upload } = require('../services')
const { adminAuthenticator } = require('../middlewares')


/* adding a book */
router.post('/add', adminAuthenticator, upload.single("bookFile"), async (req, res) => {
  const { title, author, year, genre, copies } = req.body
  const {fieldname, originalname, encoding, mimetype, destination, filename, path, size} = req.file

  // we create a new book
  const newBook = new Book({
    title: title,
    author: author,
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
      message: "Book not saved"
    })
  }

  return res.status(201).send({
    message: "Book saved",
    book: bookSaved
  })
})


module.exports = router