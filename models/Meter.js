const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
  meterName: {
    type: String,
    required: [true, 'Please enter meter-name'],
    lowercase: true,
  },
  meterUser: {
    type: Number,
    required: [true, 'Please enter a meter number'],
  },
  meterNumber: {
    type: Number,
    required: [true, 'Please enter a meter number'],
  },
  meterLocation: {
    type: String,
    lowercase: true,
  },
  transactionHistory: {
    type: String,
    lowercase: true,
  },
});

const Meter = mongoose.model('meter', meterSchema);

module.exports = Meter;
