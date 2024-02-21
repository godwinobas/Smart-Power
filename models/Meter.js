const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
  meterName: {
    type: String,
    required: [true, 'Please enter meter-name'],
    lowercase: true,
  },
  meterNumber: {
    type: Number,
    required: [true, 'Please enter a meter number'],
  },
  meterLocation: {
    type: String,
    lowercase: true,
    required: [true, 'Please enter meter location'],
  },
  meterUser: {
    type: mongoose.ObjectId,
  },
});

const Meter = mongoose.model('meter', meterSchema);

module.exports = Meter;
