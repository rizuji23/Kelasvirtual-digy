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
});

$('#thumbnail_file').change(function () {
    var filename = $('#thumbnail_file').val().replace(/.*(\/|\\)/, '');
    $('.namefile-thumb').text("Nama File : " + filename)
})

$('#materi_file').change(function () {
    var filename = $('#materi_file').val().replace(/.*(\/|\\)/, '');
    $('.namefile-materi').text("Nama File : " + filename)
})