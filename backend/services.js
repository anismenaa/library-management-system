const mongoose = require("mongoose")


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