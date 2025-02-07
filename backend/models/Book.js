const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  year: {
    type: Number,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  copies: {
    type: Number,
    default: 1,
    required: true
  },

  // we save the file informations in the database
  // the file will be stored in the server
  fieldname: {
    type: String,
    required: true
  },

  originalname: {
    type: String,
    required: true
  },  

  encoding: {
    type: String,
    required: true
  },

  mimetype: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  filename: {
    type: String,
    required: true
  },

  path: {
    type: String,
    required: true
  },

  size: {
    type: Number,
    required: true
  }
})



const Book = mongoose.model("Book", bookSchema)

module.exports = Book