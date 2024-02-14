const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter a phone number'],
    minLength: [10, 'please enter a valid phone number'],
    // validate: [isMobilePhone, 'please enter a valid phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  passwordHash: {
    type: String,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
