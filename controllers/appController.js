const User = require('../models/User.js');
const mongoose = require('mongoose');
const Meter = require('../models/Meter.js');
const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('../middleware/authMiddleware.js');
// const { requireAuth, checkUser } = require('..middleware/authMiddleware.js');

module.exports.home_get = (req, res) => {
  res.send(
    'welcome to the smart power API. Available routes 1: /login_post 2: signup_post 3: addmeter_post '
  );
};

module.exports.addmeter_post =
  (requireAuth,
  checkUser,
  async (req, res) => {
    const { meterName, meterNumber, meterLocation, meterUser } = req.body;

    try {
      const meter = await Meter.create({
        meterName,
        meterNumber,
        meterLocation,
        meterUser,
      });
      // const token = createToken(user._id);
      const confirmationMessage = 'Meter added successfully';
      res.status(201).json({ confirmationMessage, meterId: meter._id });
    } catch (err) {
      const error = err.message;
      const errorAction = 'Kindly check details and try again';
      res.status(400).json({ error, errorAction });
    }
  });

module.exports.purchasetokens_post =
  (requireAuth,
  checkUser,
  async (req, res) => {
    const { meterNumber, amount } = req.body;
    try {
      const validMeter = await Meter.exists({ meterNumber });
      if (validMeter) {
        parseInt(meterNumber, amount);
        let token = meterNumber * amount * Math.random() + 9000000000000000;
        res.send(`Your recharge token is ${token}`);
      } else {
        res.send('Meter number not recognized');
      }
    } catch (err) {
      console.log(err);
    }
  });
