const express = require('express');
const mongoose = require('mongoose');
// const Meter = require('./models/Meter');
const authRoutes = require('./routes/authroutes');
const appRoutes = require('./routes/appRoutes');
const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');
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
app.use(appRoutes);

// auth routes
app.use(authRoutes);
