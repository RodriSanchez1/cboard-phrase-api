//express app file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
var logger = require('morgan');
const dbConnect = require('./config/db');

var createError = require('http-errors');

const userRoutes = require('./api/api-services/User/routes');
const categoryRoutes = require('./api/api-services/Category/routes');
const communicatorRoutes = require('./api/api-services/Communicator/routes');
const reportRoutes = require('./api/api-services/Report/routes');

const app = express();

dbConnect();
app.use(cors());
app.use(logger('dev')); //http logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/communicator', communicatorRoutes);
app.use('/reports', reportRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
