const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: Date, 
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin