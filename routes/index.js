var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();



router.get('/', function (req, res, next) {
    res.render('index.ejs');
});



module.exports = router;