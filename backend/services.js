const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const fs = require("fs")


// connection to mongodb database
exports.connectDB = connectDB = async () => {
  await mongoose.connect(process.env.URI)
    .then(() => {
      console.log("success : connected to database")
    }) 
    .catch((err) => {
      console.log(`failed : ${err}`)
    })
}

// this function is used to upload a file to the server to add the file of the book

const storage = multer.diskStorage({
  // we have to create a directory called uploads in the root of the project
  destination: function (req, file, cb) {
    // check if the file is a pdf
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("The file is not a pdf"))
    }

    const uploadsDir = path.join(__dirname, "uploads")

    // if the directory does not exist, we create it
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true }, (err) => {
        cb(err, uploadsDir)
      })
    }
    cb(null, uploadsDir)
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

exports.upload = multer({ storage: storage })