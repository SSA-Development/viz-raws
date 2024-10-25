var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var readRouter = require('./routes/read');
var searchRouter = require('./routes/search');
var seriesRouter = require('./routes/series');
var categoriesRouter = require('./routes/categories');


var api = require('./routes/api');

var app = express();

app.use(session({
  name: 'session',
  secret: 'n-dQ"=+C$A3JnRc_x:"j',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 36000000000000000 * 1000
  }
}));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'series')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', readRouter);
app.use('/', searchRouter);
app.use('/', seriesRouter);
app.use('/', categoriesRouter);

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; 
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
