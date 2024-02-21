const User = require('../models/User.js');
const Meter = require('../models/Meter.js');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    fullName: 'valid',
    phoneNumber: 'valid',
    email: 'valid',
    password: 'valid',
  };

  // incorrect login details
  if ((err.message === 'incorrect email') | 'incorrect password') {
    errors = 'invalid user credentials';
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  //   validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'gordons the badass coder', {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { fullName, phoneNumber, email, password } = req.body;

  try {
    const user = await User.create({
      fullName,
      phoneNumber,
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    const confirmationMessage = 'User created successfully';
    res.status(201).json({ confirmationMessage, user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
