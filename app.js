const express = require('express');
const mongoose = require('mongoose');
const Meter = require('./models/Meter');
const authRoutes = require('./routes/authroutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .then(console.log('Connected to db and listening on port 3000'))
  .catch((err) => console.log(err));

//meter routes
app.get('/', (req, res) => {
  res.send(
    'welcome to the smart power API. Available routes 1: /login_post 2: signup_post 3: addmeter_post '
  );
});

app.post('/addmeter', requireAuth, checkUser, async (req, res) => {
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

// auth routes
app.use(authRoutes);
