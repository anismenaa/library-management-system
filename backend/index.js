const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const services = require("./services")
const authRoutes = require("./routes/authentification")
const booksRoutes = require("./routes/books")
const cookieParser = require("cookie-parser")

// Load env variables
dotenv.config()

// port listening to the server
const PORT = process.env.PORT || 5000

const app = express()


// middleware
app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/books", booksRoutes)




const initApp = () =>{
  services.connectDB()
  app.listen(PORT, async() => {
    console.log(`Library management system is running on port ${PORT}`)
  })
}

initApp()





