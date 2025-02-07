const jwt = require('jsonwebtoken');


// I need to create a validaor middleware that will check if the user is authenticated before accessing the routes.
exports.adminAuthenticator = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
  // verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send({
        message: "Forbidden"
      });
    }
    if (user.role !== "admin") {
      return res.status(403).send({
        message: "Forbidden"
      });
    }
    req.user = user;
    next();
  })
}

