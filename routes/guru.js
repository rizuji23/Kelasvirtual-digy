var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var formidable = require('formidable');
var koneksi = require('../models/connect');
var fs = require('fs')
var swall = require('sweetalert');
// var io = require("socket.io")(http);
var shortid = require('shortid');

const jwt = require('jsonwebtoken');
const config = require('../config');
const rp = require('request-promise');
const {
    default: swal
} = require('sweetalert');

const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};

const token = jwt.sign(payload, config.APISecret);

router.get('/', function (req, res, next) {
    res.render('guru/index.ejs');
});

router.get('/jadwal', function (req, res, next) {
    if (req.session.loggedin2) {
        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [req.session.id_guru], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/jadwal.ejs', {
                id_guru: req.session.id_guru,
                nama_guru: req.session.nama_guru,
                ids: req.session.ids,
            });
        });

    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }
});

router.post('/getmapel/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM mapel WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data_mapel': result
        });
    });

});

router.get('/buatjadwal', function (req, res, next) {
    if (req.session.loggedin2) {
        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [req.session.id_guru], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/buatjadwal.ejs', {
                id_guru: req.session.id_guru,
                nama_guru: req.session.nama_guru,
                ids: req.session.ids,
                id_zoom: shortid.generate()
            });
        });

    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }

    // res.render('guru/buatjadwal.ejs');
});

router.post('/getkelas/:ids', function (req, res, next) {
    var ids = req.params.ids;

    koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [ids], function (err, result, fields) {
        res.send({
            'data_kelas': result
        });
    });
})

router.post('/getjadwal', function (req, res, next) {
    koneksi.query("SELECT * FROM jadwal_zoom ", function (err, result, fields) {
        res.send({
            'data_jadwal': result
        });
    });
})

router.post('/authguru', function (req, res, next) {
    var id_guru = req.body.id_guru;
    var password = req.body.password;

    if (id_guru === "" || password === "") {
        req.flash('error', "ID Guru dan password harus diisi!!");
        res.redirect('/admin');
    } else {

        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [id_guru], function (err, rows, fields) {
            if (err) throw err;

            if (rows.length <= 0) {
                req.flash('error', "ID Guru atau password salah!!");
                res.redirect('/guru');
            } else {
                // req.session.loggedin = true;
                // req.session.username = username;
                // res.redirect('/admin/dashboard');
                bcrypt.compare(password, rows[0].password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        req.session.loggedin2 = true;
                        req.session.id_guru = id_guru;
                        req.session.ids = rows[0].id_gurus;
                        req.session.nama_guru = rows[0].nama_guru;
                        res.redirect('/guru/jadwal');
                    } else {
                        req.flash('error', "Username atau password salah!!");
                        res.redirect('/guru');
                    }
                })
            }
        });
    }
});

// io.on('connection', function (socket) {
//     console.log('user terkonek');
//     socket.on('jadwal added', function (status) {
//         add_jadwal(status, function (res) {
//             if (res) {
//                 io.emit('refresh jadwal', status);
//             } else {
//                 io.emit('error');
//             }
//         })
//     })
// })

router.post('/addpertemuan', function (req, res, next) {

    res.setHeader("Content-Type", "text/html");
    var form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {

        var nama_guru = fields.nama_guru;
        var judul_pertemuan = fields.judul_pertemuan;
        var kelas = fields.kelas;
        var tanggal_pertemuan = fields.tanggal_pertemuan;
        var mapel = fields.mapel;
        var tanggal = new Date();
        var id_zoom = shortid.generate();
        var id_guru = fields.ids;
        var id_zoom_meeting = shortid.generate();

        fs.rename(files.thumbnail_file.path, './public/assets/img/thumbnail/' + files.thumbnail_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        fs.rename(files.materi_file.path, './dokumen/materi/' + files.materi_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        koneksi.query("SELECT * FROM jadwal_zoom WHERE tanggal_pertemuan = ?", [tanggal_pertemuan], function (err, result, fields) {
            if (err) throw err;

            if (!result.length > 0) {
                koneksi.query("INSERT INTO jadwal_zoom VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_zoom, id_guru, nama_guru, kelas, mapel, judul_pertemuan, tanggal_pertemuan, files.thumbnail_file.name, files.materi_file.name, tanggal, tanggal], function (err, result, fields) {
                    if (err) throw err;

                    koneksi.query("SELECT * FROM guru WHERE id_gurus = ?", [id_guru], function (err, result, fields) {
                        if (err) throw err;

                        var options = {
                            method: "POST",
                            uri: "https://api.zoom.us/v2/users/" + result[0].email + "/meetings",
                            body: {
                                topic: judul_pertemuan,
                                type: 1,
                                start_time: tanggal_pertemuan,
                                duration: 60,
                                timezone: 'Asia/Jakarta',
                                settings: {
                                    host_video: "true",
                                    participant_video: "true"
                                }
                            },
                            auth: {
                                bearer: token
                            },
                            headers: {
                                "User-Agent": "Zoom-api-Jwt-Request",
                                "content-type": "application/json"
                            },
                            json: true
                        };

                        rp(options).then(function (response) {
                            console.log("response is: ", response);
                            koneksi.query("INSERT INTO zoom_meetings VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_zoom_meeting, id_zoom, id_guru, response.start_url, response.join_url, response.id, response.password, tanggal, tanggal], function (err, result, fields) {
                                req.flash('success', 'Jadwal sudah dibuat...');
                                res.redirect('/guru/jadwal');
                            });

                        }).catch(function (err) {
                            console.log("API call failed, reason ", err);
                        });
                    })


                });
            } else {
                req.flash('error', "Tanggal sudah dipilih oleh guru lain...");
                res.redirect('/guru/buatjadwal');
            }
        });
    });
});

router.post('/getupdatejadwal', function (req, res, next) {
    koneksi.query("SELECT * FROM jadwal_zoom", function (err, result, fields) {
        res.send({
            'result': result
        })
    });
});

router.get('/logout', function (req, res, next) {

    req.session.destroy();
    res.redirect('/guru');

});

router.get('/getzoom/:id_zoom', function (req, res, next) {

    var id_zoom = req.params.id_zoom;

    if (req.session.loggedin2) {

        koneksi.query("SELECT g.email, jz.*, zm.* FROM jadwal_zoom AS jz INNER JOIN zoom_meetings AS zm ON jz.id_zoom = zm.id_zoom INNER JOIN guru AS g ON jz.id_guru = g.id_gurus WHERE jz.id_zoom = ?", [id_zoom], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/beforestart.ejs', {
                id_guru: req.session.id_guru,
                nama_guru: req.session.nama_guru,
                ids: req.session.ids,
                email: result[0].email,
                number_meeting: result[0].id_meeting,
                password: result[0].password,
                host: "Host"
            });
        })
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }




})

module.exports = router;