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
                dir_image: result[0].dir_image,
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

router.post('/getjadwal/:id_guru', function (req, res, next) {

    var id_guru = req.params.id_guru;

    koneksi.query("SELECT * FROM jadwal_zoom INNER JOIN guru ON jadwal_zoom.id_guru = guru.id_gurus WHERE jadwal_zoom.id_guru = ? ORDER BY jadwal_zoom.id DESC", [id_guru], function (err, result, fields) {
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
        // var materi = 'dawd';
        // var thumbnail = 'adaw';

        fs.rename(files.thumbnail_file.path, './public/assets/img/thumbnail/' + files.thumbnail_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        fs.rename(files.materi_file.path, './public/dokumen/materi/' + files.materi_file.name, function (err) {
            if (err)
                throw err;
            console.log('renamed complete');
        });

        koneksi.query("SELECT * FROM jadwal_zoom WHERE tanggal_pertemuan = ?", [tanggal_pertemuan], function (err, result, fields) {
            if (err) throw err;

            if (!result.length > 0) {
                koneksi.query("INSERT INTO jadwal_zoom VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_zoom, id_guru, nama_guru, kelas, mapel, judul_pertemuan, tanggal_pertemuan, files.thumbnail_file.name, files.materi_file.name, '1', tanggal, tanggal], function (err, result, fields) {
                    if (err) throw err;

                    koneksi.query("SELECT * FROM guru WHERE id_gurus = ?", [id_guru], function (err, result, fields) {
                        if (err) throw err;

                        var options = {
                            method: "POST",
                            uri: "https://api.zoom.us/v2/users/" + 'mypcfauzi2@gmail.com' + "/meetings",
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
                host: "Host",
                materi: result[0].materi,
                id_zoom: id_zoom,
                start_url: result[0].start_url
            });
        })
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }




});

router.get('/meeting/:id_zoom', function (req, res, next) {
    var id_zoom = req.params.id_zoom;
    if (req.session.loggedin2) {

        koneksi.query("SELECT g.email, jz.*, zm.* FROM jadwal_zoom AS jz INNER JOIN zoom_meetings AS zm ON jz.id_zoom = zm.id_zoom INNER JOIN guru AS g ON jz.id_guru = g.id_gurus WHERE jz.id_zoom = ?", [id_zoom], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/meeting.ejs', {
                id_guru: req.session.id_guru,
                nama_guru: req.session.nama_guru,
                ids: req.session.ids,
                id_zoom: id_zoom
            });
        })
    } else {
        req.flash('error', 'Silahkan login terlebih dahulu');
        res.redirect('/guru');
    }
});

router.get('/editprofil', function (req, res, next) {
    if (req.session.loggedin2) {
        koneksi.query("SELECT * FROM guru WHERE id_guru = ?", [req.session.id_guru], function (err, result, fields) {
            if (err) throw err;
            res.render('guru/edit-profile.ejs', {
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

router.post('/getkelasprofile/:id_guru', function (req, res, next) {
    var id_guru = req.params.id_guru;

    koneksi.query("SELECT * FROM kelas_guru WHERE id_guru = ?", [id_guru], function (err, result, fields) {
        res.send({
            'data_kelas_f': result
        });
    });

})

router.post('/getmurid', function (req, res, next) {
    koneksi.query("SELECT count(*) AS countsiswa FROM siswa", function (err, result, fields) {
        if (err) throw err;
        res.send({
            'countsiswa': result[0].countsiswa
        })
    })
})

router.post('/resetpassword', function (req, res, next) {
    var ids = req.body.ids;
    var password_old = req.body.password_old;
    var password_new = req.body.password_new;
    var password_repeat = req.body.password_repeat;

    koneksi.query("SELECT (password) FROM guru WHERE id_gurus = ?", [ids], function (err, result, fields) {
        if (err) throw err;
        bcrypt.compare(password_old, result[0].password, function (err, result2) {
            if (err) throw err;
            if (result2) {
                if (password_repeat === password_new) {
                    var new_pass = bcrypt.hashSync(password_new, 10)
                    koneksi.query("UPDATE guru SET password = ? WHERE id_gurus = ?", [new_pass, ids], function (err, result, fields) {
                        if (err) throw err;
                        req.flash('success', "Password sudah diubah...");
                        res.redirect('/guru/editprofil');
                    })
                }
            } else {
                req.flash('error', "Password dulu tidak cocok!!");
                res.redirect('/guru/editprofil');
            }
        })
    })
})

router.post('/changestatus/:id_guru/:id_zoom', function (req, res, next) {
    var id_guru = req.params.id_guru;
    var id_zoom = req.params.id_zoom;
    var tanggal = new Date();

    koneksi.query("UPDATE jadwal_zoom SET status = 2, tanggal_update = ? WHERE id_zoom = ? AND id_guru = ?", [tanggal, id_zoom, id_guru], function (err, result, fields) {
        if (err) throw err;
        var id_zoom_in = shortid.generate();
        koneksi.query("INSERT INTO tmp_zoom_in VALUES(NULL, ?, ?, ?, 'IN', '1', ?, ?)", [id_zoom_in, id_zoom, id_guru, tanggal, tanggal], function (err, result, fields) {
            if (err) throw err;
            res.send(true);
        });
    });
});

router.post('/changestatus2/:id_guru/:id_zoom/:status', function (req, res, next) {
    var id_guru = req.params.id_guru;
    var id_zoom = req.params.id_zoom;
    var status = req.params.status;
    var tanggal = new Date();

    if (status == 3) {
        koneksi.query("UPDATE jadwal_zoom SET status = 0, tanggal_update = ? WHERE id_zoom = ? AND id_guru = ?", [tanggal, id_zoom, id_guru], function (err, result, fields) {
            if (err) throw err;
            var id_zoom_in = shortid.generate();
            koneksi.query("INSERT INTO tmp_zoom_in VALUES(NULL, ?, ?, ?, 'OUT', '0', ?, ?)", [id_zoom_in, id_zoom, id_guru, tanggal, tanggal], function (err, result, fields) {
                if (err) throw err;
                res.send(true);
            });
        });
    }
});

router.post('/getclassonline', function (req, res, next) {
    koneksi.query("SELECT count(*) AS countclass FROM jadwal_zoom WHERE status = '2'", function (err, result, fields) {
        if (err) throw err;
        res.send({
            'countclass': result[0].countclass
        })
    })
})

module.exports = router;