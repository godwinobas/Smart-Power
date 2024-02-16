const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if json web token exists & can be verified
  if (token) {
    jwt.verify(token, 'gordons the badass coder', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    const authMessage = 'Kindly signup or login if you already have an account';
    res.status(401).json({ authMessage });
  }
};
module.exports = { requireAuth };
