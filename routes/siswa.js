var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('siswa/index.ejs');
});

router.get('/zoom', function (req, res, next) {
    res.render('siswa/zoom.ejs')
})

module.exports = router;