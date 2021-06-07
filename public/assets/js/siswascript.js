$(document).ready(function () {

    var ids = $('#ids').val();
    var kelas = $('#kelas').text();

    $.ajax({
        url: "http://localhost:3000/getkelasprofile/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_kelas_f.length > 0) {
                for (var i = 0; i < data.data_kelas_f.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += `<p for="" class="mt-2 ml-5">` + data.data_kelas_f[i].jenjang + ` ` + data.data_kelas_f[0].kelas + ` (` + data.data_kelas_f[i].paket + `)</p>`;
                    $("#kelas_profile").append(cols);
                }
            }
        }
    });

    var data2 = [];


    $.ajax({
        url: "http://localhost:3000/getjadwal/" + kelas,
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


    $.ajax({
        url: "http://localhost:3000/getjadwal/" + kelas,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data_jadwal.length > 0) {
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
                        a = `/getzoom/` + data.data_jadwal[i].id_zoom + ``;
                    } else if (data.data_jadwal[i].status == "2") {
                        status = `<span class="badge badge-success">Sedang Berlangsung</span>`;
                        a = `/getzoom/` + data.data_jadwal[i].id_zoom + ``;
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
            }
        }
    });
});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$('#picture_profile').change(function () {
    var filename = $('#picture_profile').val().replace(/.*(\/|\\)/, '');
    $('.text-img').text(filename)
})