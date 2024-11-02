var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Index
var indexRouter = require('../routes/index');

// Routes
var userRouter = require('../routes/user');
var contactRouter = require('../routes/contact');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Send the error message
  res.status(err.status || 500);
  res.json({ 
    success: false,
    message: err.message
  });
});

module.exports = app;
