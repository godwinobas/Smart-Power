const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AUTHMESSAGE = 'Kindly signup or login if you already have an account';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if json web token exists & can be verified
  if (token) {
    jwt.verify(token, 'gordons the badass coder', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ AUTHMESSAGE });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ AUTHMESSAGE });
  }
};

//  check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'gordons the badass coder', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        next();
      }
    });
    console.log(err.message);
    next();
  }
};

module.exports = { requireAuth };
