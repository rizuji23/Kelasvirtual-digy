$(document).ready(function () {

    var ids = $('#ids').val();

    $.ajax({
        url: "http://localhost:3000/guru/getmapel/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {

            if (data.data_mapel.length > 0) {
                for (var i = 0; i < data.data_mapel.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += data.data_mapel[i].mapel + ', ';
                    $("#mapel").append(cols);
                }
            }
        }
    });

    $.ajax({
        url: "http://localhost:3000/guru/getmapel/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_mapel.length > 0) {
                for (var i = 0; i < data.data_mapel.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += '<option value="' + data.data_mapel[i].mapel + '">' + data.data_mapel[i].mapel + '</option>';
                    $("#optionmapel").append(cols);
                }
            }
        }
    });

    $.ajax({
        url: "http://localhost:3000/guru/getkelas/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_kelas.length > 0) {
                for (var i = 0; i < data.data_kelas.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += '<option value="' + data.data_kelas[i].jenjang + ' ' + data.data_kelas[i].kelas + '">' + data.data_kelas[i].jenjang + ' ' + data.data_kelas[i].kelas + '</option>';
                    $("#optionkelas").append(cols);
                }
            }
        }
    });


    $.ajax({
        url: "http://localhost:3000/guru/getjadwal/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_jadwal.length > 0) {
                $('.empty-jadwal').hide();
                for (var i = 0; i < data.data_jadwal.length; i++) {
                    var cols = "";
                    var no = 1;
                    var status;
                    var a;
                    if (data.data_jadwal[i].status == "0") {
                        status = `<span class="badge badge-danger">Berakhir</span>`;
                        a = `#`;
                    } else if (data.data_jadwal[i].status == "1") {
                        status = `<span class="badge badge-info">Agenda</span>`;
                        a = `/guru/getzoom/` + data.data_jadwal[i].id_zoom + ``;
                    } else if (data.data_jadwal[i].status == "2") {
                        status = `<span class="badge badge-success">Sedang Berlangsung</span>`;
                        a = `/guru/getzoom/` + data.data_jadwal[i].id_zoom + ``;
                    } else {
                        status = `<span class="badge badge-danger">Error</span>`;
                        a = `#`;
                    }
                    cols += `<div class="col">
                    <a href='` + a + `' ><div class="box-jadwal">
                        <img class="card-img-top card-img" src="../assets/img/thumbnail/` + data.data_jadwal[i].thumbnail + `"
                            alt="Img-background">
                        <div class="img-user-fix">
                            <img class="rounded-circle img-user-s" src="../assets/img/foto_guru/` + data.data_jadwal[i].dir_image + `"
                                alt="Img-User">
                        </div>
                        <div class="jadwal-content">
                            <div class="col p-0">
                                <div class="detail-nama">
                                    <p>` + data.data_jadwal[i].nama_guru + ` <b>` + data.data_jadwal[i].kelas + `</b></p>
                                </div>
                                <div class="detail-judul">
                                    <h3>` + data.data_jadwal[i].judul_pertemuan + ` (` + data.data_jadwal[i].mapel + `)</h3>
                                </div>
                                <div class="detail-jadwal">
                                    <h5>` + data.data_jadwal[i].tanggal_pertemuan + `</h5>
                                </div>
                                ` + status + `
                            </div>
                        </div>
                    </div></a>
                </div>`;
                    $("#jadwalguru").append(cols);
                }
            } else {
                $('.empty-jadwal').show();
            }
        }
    });


    $.ajax({
        url: "http://localhost:3000/guru/getkelasprofile/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_kelas_f.length > 0) {
                for (var i = 0; i < data.data_kelas_f.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += `<p for="" class="mt-2 ml-5">` + data.data_kelas_f[i].jenjang + ` ` + data.data_kelas_f[0].kelas + `</p>`;
                    $("#kelas_profile").append(cols);
                }
            }
        }
    });

    var data2 = [];

    $.ajax({
        url: "http://localhost:3000/guru/getjadwal/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_jadwal.length > 0) {
                for (var i2 = 0; i2 < data.data_jadwal.length; i2++) {
                    var obj = {
                        'startDate': data.data_jadwal[i2].tanggal_pertemuan,
                        'endDate': data.data_jadwal[i2].tanggal_pertemuan,
                        'summary': 'Kelas Zoom Pelajaran ' + data.data_jadwal[i2].mapel + ' dengan ' + data.data_jadwal[i2].nama_guru + ''
                    };
                    data2.push(obj)
                }
            }
        }
    });

    $('#calendars').simpleCalendar({
        displayEvent: true,
        events: data2
    });


    $.ajax({
        url: "http://localhost:3000/guru/getmurid",
        method: "POST",
        dataType: 'json',
        success: function (data) {
            $('#jumlahsiswa').text(data.countsiswa);
        }
    })


    $.ajax({
        url: "http://localhost:3000/guru/getclassonline",
        method: "POST",
        dataType: 'json',
        success: function (data) {
            $('#onlines').text(data.countclass);
        }
    })

});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(document).ready(function () {

    $(function () {
        $('#datepicker').datetimepicker({
            disabledDates: datesForDisable,
            disabledTimeIntervals: [
                [moment({
                    h: 0
                }), moment({
                    h: 8
                })],
                [moment({
                    h: 18
                }), moment({
                    h: 24
                })]
            ],
            sideBySide: true,
        });
    });
});

$('#thumbnail_file').change(function () {
    var filename = $('#thumbnail_file').val().replace(/.*(\/|\\)/, '');
    $('.namefile-thumb').text("Nama File : " + filename)
})

$('#materi_file').change(function () {
    var filename = $('#materi_file').val().replace(/.*(\/|\\)/, '');
    $('.namefile-materi').text("Nama File : " + filename)
})

$('#upload_jadwal').click(function () {
    $('#form_upload').submit();
})