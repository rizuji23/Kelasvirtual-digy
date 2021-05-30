'use strict';

var createError = require('http-errors');
var os = require('os');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');

var mysql = require('mysql');
var koneksi = require('./models/connect');
// var io = require("socket.io");
var indexRouter = require('./routes/index');
var guruRouter = require('./routes/guru');
var siswaRouter = require('./routes/siswa');
var adminRouter = require('./routes/admin');

var adminModels = require('./models/adminModels');

app.use(express.static('public'));
app.use(bodyParser({
    defer: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: 'sukses1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));


app.use(flash());
app.use(expressValidator());
app.use(busboy());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/siswa', siswaRouter);
app.use('/guru', guruRouter);
app.use('/admin', adminRouter);

app.use(function (req, res, next) {
    next(createError(404))
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;