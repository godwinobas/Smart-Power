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

// // static method to login user
// userSchema.statics.meterExists = async function (email, meterNumber) {
//   const user = await this.findOne({ meterNumber });
//   console.log(user);
// return;

//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email');
// };

module.exports = Meter;
