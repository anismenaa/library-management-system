const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');


// signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  // try to find if the email exists in the database
  const emailExists = await Admin.findOne({ email: email })
  if (!emailExists) {
    return res.status(400).send({
      message: "Email does not exist"
    })
  }

  // check if the password matches the email 
  if (emailExists.password !== password) {
    return res.status(400).send({
      message: "email or password is not correct"
    })
  }

  // create a token and store it in a session
  const token = jwt.sign({ 
    name: emailExists.name,
    dateOfBirth: emailExists.dateOfBirth,
    email: emailExists.email,
    role: emailExists.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  })

  return res.status(200).send({
    message: "Signin successful",
    token: token
  })

})




// signout
router.post('/signout', (req, res) => {
  try {
    res.clearCookie('token')
    return res.status(200).send({
      message: "Signout successful"
    })
  } catch (error) {
    console.log("signout error: ", error)
    return res.status(500).send({
      message: "Signout failed"
    })
  }
})

module.exports = router