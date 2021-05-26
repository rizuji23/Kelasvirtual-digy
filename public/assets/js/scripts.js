$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(function () {
    $('#calendars').simpleCalendar({
        displayEvent: true,
        events: [{
                startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
                endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
                summary: 'Kelas Zoom Pelajaran Matematika dengan ibu Aye Shabira'
            },
            {
                startDate: "2021-05-14 09:00",
                endDate: "2021-05-14",
                summary: 'Kelas Zoom Pelajaran IPA dengan ibu Aye Shabir'

            }
        ]
    })
})

console.log(new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime())

$('#filecsv').change(function () {
    var filename = $('#filecsv').val().replace(/.*(\/|\\)/, '');
    $('.namefiles').text(filename)

})

$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/admin/fetchsiswa",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var no = 1;
                    cols += '<td> ' + no++ + '</td>';
                    cols += '<td> ' + data.result[i].nama + '</td>';
                    cols += '<td> ' + data.result[i].email + '</td>';
                    cols += '<td> ' + data.result[i].id_siswa + '</td>';
                    cols += '<td> ' + data.result[i].no_wa + '</td>';
                    cols += '<td> ' + data.result[i].jenjang + ' ' + data.result[i].kelas + '</td>';
                    cols += `<td> <a href="/admin/edit/` + data.result[i].id_sis + `" class="btn btn-primary">Edit</a>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapus/` + data.result[i].id_sis + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#datasiswa").append(newRow);

                }

            }
        }
    });


    $.ajax({
        url: "http://localhost:3000/admin/fetchadmin",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var no = 1;
                    cols += '<td> ' + no++ + '</td>';
                    cols += '<td> ' + data.result[i].nama_admin + '</td>';
                    cols += '<td> ' + data.result[i].username + '</td>';
                    cols += '<td> ' + data.result[i].tanggal + '</td>';
                    cols += `<td> <a href="/admin/editadmin/` + data.result[i].id + `" class="btn btn-primary">Edit</a>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapusadmin/` + data.result[i].id + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#dataadmin").append(newRow);

                }

            }
        }
    })
})