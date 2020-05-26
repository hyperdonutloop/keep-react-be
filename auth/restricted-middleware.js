const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || 'cookies';
  if (authorization) {
    jwt.verify(authorization, secret, function(error, decodedToken) {
      if (error) {
        res.status(401).json({ message: 'YOU SHALL NOT PASS 🧙🏻‍♂️'})
      } else {
        req.token = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'Please login and try again!'})
  }
}