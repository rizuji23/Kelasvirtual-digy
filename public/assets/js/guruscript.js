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
        url: "http://localhost:3000/guru/getjadwal",
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_jadwal.length > 0) {
                for (var i = 0; i < data.data_jadwal.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += `<div class="col">
                    <div class="box-jadwal">
                        <img class="card-img-top card-img" src="../assets/img/thumbnail/` + data.data_jadwal[i].thumbnail + `"
                            alt="Img-background">
                        <div class="img-user-fix">
                            <img class="rounded-circle img-user-s" src="../assets/img/user.jpg"
                                alt="Img-User">
                        </div>
                        <div class="jadwal-content">
                            <div class="col p-0">
                                <div class="detail-nama">
                                    <p>` + data.data_jadwal[i].nama_guru + `</p>
                                </div>
                                <div class="detail-judul">
                                    <h3>` + data.data_jadwal[i].judul_pertemuan + `</h3>
                                </div>
                                <div class="detail-jadwal">
                                    <h5>` + data.data_jadwal[i].tanggal_pertemuan + `</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                    $("#jadwalguru").append(cols);
                }
            }
        }
    });
});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


$(function () {

    var data2 = [];

    $.ajax({
        url: "http://localhost:3000/guru/getjadwal",
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

    console.log(data2)

    $('#calendars').simpleCalendar({
        displayEvent: true,
        events: data2
    })
})

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