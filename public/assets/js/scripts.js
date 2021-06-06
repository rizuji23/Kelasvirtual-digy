$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/admin/fetchsiswa",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.result.length > 0) {
                var no = 1;
                for (var i = 0; i < data.result.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    cols += '<td> ' + no++ + '</td>';
                    cols += '<td> ' + data.result[i].nama + '</td>';
                    cols += '<td> ' + data.result[i].email + '</td>';
                    cols += '<td> ' + data.result[i].id_siswa + '</td>';
                    cols += '<td> ' + data.result[i].no_wa + '</td>';
                    cols += '<td> ' + data.result[i].jenjang + ' ' + data.result[i].kelas + '</td>';
                    cols += '<td> ' + data.result[i].paket + '</td>';
                    cols += `<td> <a href="/admin/edit/` + data.result[i].id_sis + `" class="btn btn-primary">Edit</a>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapus/` + data.result[i].id_sis + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#datasiswa").append(newRow);

                }

            }
        }
    });

    var ids = $('#ids').val();

    $.ajax({
        url: "http://localhost:3000/admin/getkelas/" + ids,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.data_kelas.length > 0) {
                var no = 1;
                for (var i = 0; i < data.data_kelas.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    cols += '<td> ' + data.data_kelas[i].jenjang + ' ' + data.data_kelas[i].kelas + '</td>';
                    cols += `<td> <button type="button" onclick="editkelas('` + data.data_kelas[i].id + `')" class="btn btn-primary btn-edit-kelas">Edit</button>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapuskelas/` + data.data_kelas[i].id + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#data_kelas").append(newRow);

                }

            }
        }
    })

    $.ajax({
        url: "http://localhost:3000/admin/getmapel/" + ids,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.data_mapel.length > 0) {
                var no = 1;
                for (var i = 0; i < data.data_mapel.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    cols += '<td> ' + data.data_mapel[i].mapel + '</td>';
                    cols += `<td> <button type="button" class="btn btn-primary btn-edit-mapel"onclick="editmapel('` + data.data_mapel[i].id + `')">Edit</button>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapus/` + data.data_mapel[i].id_guru + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#data_mapel").append(newRow);

                }

            }
        }
    })



    $.ajax({
        url: "http://localhost:3000/admin/fetchadmin",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.result.length > 0) {
                var no = 1;
                for (var i = 0; i < data.result.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";

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


    $.ajax({
        url: "http://localhost:3000/admin/fetchguru",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.result.length > 0) {
                var no = 1;
                for (var i = 0; i < data.result.length; i++) {
                    var newRow = $("<tr>");
                    var cols = "";

                    cols += '<td> ' + no++ + '</td>';
                    cols += '<td> ' + data.result[i].nama_guru + '</td>';
                    cols += '<td> ' + data.result[i].email + '</td>';
                    cols += '<td> ' + data.result[i].id_guru + '</td>';
                    cols += '<td> ' + data.result[i].no_wa + '</td>';
                    cols += `<td> <a href="/admin/editguru/` + data.result[i].id_gurus + `" class="btn btn-primary">Edit</a>
                    <button type="button" onclick="detailguru('` + data.result[i].id_gurus + `')"` + data.result[i].id_gurus + `" class="btn btn-info">Detail</button>
                    <a onclick="return confirm('Apakah ingin dihapus?')" href="/admin/hapusguru/` + data.result[i].id_gurus + `" class="btn btn-danger">Hapus</a> </td>`;
                    newRow.append(cols);
                    $("#dataguru").append(newRow);
                }

            }
        }
    })

    var max_fields = 5;
    var add_button = $('.add-button');
    var wrapperkelas = $('.form-kelas');
    var fieldshtml = `<div><div class="form-group">
    <label for="">Kelas</label>
    <div class="row">
        <div class="col-sm">
            <select name="jenjang[]" class="form-control" id="">
                <option value="">--- Pilih Jenjang ---</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA (IPA)">SMA (IPA)</option>
                <option value="SMA (IPS)">SMA (IPS)</option>
            </select>
        </div>
        <div class="col-sm">
            <select name="kelas[]" class="form-control" id="">
                <option value="">--- Pilih Kelas ---</option>
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
                <option value="1">7</option>
                <option value="1">8</option>
                <option value="1">9</option>
                <option value="1">10</option>
                <option value="1">11</option>
                <option value="1">12</option>
            </select>
            
        </div>
    </div>
    <button class="btn btn-danger remove-button float-right mt-2  mb-2">-</button>
</div>

</div>`;

    var xk = 1;

    $(add_button).click(function () {
        if (xk < max_fields) {
            xk++;
            $(wrapperkelas).append(fieldshtml);
        }
    });


    $(wrapperkelas).on('click', '.remove-button', function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        xk--;
    })

    var add_button = $('.add-button2');
    var wrappermapel = $('.form-mapel');
    var fieldshtml2 = `<div><div class="form-group">
    <label for="">Mata Pelajaran</label>
    <select name="mapel" class="form-control" id="">
        <option value="">--- Pilih Mata Pelajaran ---</option>
        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
        <option value="Bahasa Inggris">Bahasa Inggris</option>
        <option value="Matematika">Matematika</option>
        <option value="IPA">IPA</option>
        <option value="IPS">IPS</option>
        <option value="PKN">PKN</option>
        <option value="PAI">PAI</option>
        <option value="Fisika">Fisika</option>
        <option value="Biologi">Biologi</option>
        <option value="Kimia">Kimia</option>
        <option value="Sejarah">Sejarah</option>
        <option value="Sosiologi">Sosiologi</option>
        <option value="Geografi">Geografi</option>
        <option value="Ekonomi">Ekonomi</option>
    </select>

</div>
    <button class="btn btn-danger remove-button2 float-right mt-2  mb-2">-</button>
</div>
`;

    var xm = 1;

    $(add_button).click(function () {
        if (xm < max_fields) {
            xm++;
            $(wrappermapel).append(fieldshtml2);
        }
    });


    $(wrappermapel).on('click', '.remove-button2', function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        xm--;
    })


});

function detailguru(ids) {

    $('#mapel').html('');
    $.ajax({
        url: "http://localhost:3000/admin/detailguru/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data.length > 0) {
                for (var i = 0; i < data.data.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += '<li> ' + data.data[i].mapel + '</li>';
                    $("#mapel").append(cols);
                }

            }

        }
    })
    $('#kelas').html('');

    $.ajax({
        url: "http://localhost:3000/admin/detailguru2/" + ids,
        method: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.data2.length > 0) {
                for (var i = 0; i < data.data2.length; i++) {
                    var cols = "";
                    var no = 1;
                    cols += '<li> ' + data.data2[i].jenjang + ' ' + data.data2[i].kelas + '</li>';
                    $("#kelas").append(cols);
                }
            }
        }
    });

    $('#detailguru').modal('show');

}

function editkelas(ids) {
    $('#loading-ajax-e').show();
    $.ajax({
        url: "http://localhost:3000/admin/geteditkelas/" + ids,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#loading-ajax-e').hide();
            var html = `
            <form method="POST" action="/admin/editkelasprosess">
            <input type="hidden" name="ids" value="` + data.data_kelas[0].id + `">
            <input type="hidden" name="id_guru" value="` + data.data_kelas[0].id_guru + `">
            <div class="modal-body">
                <div class="form-group">
                    <label for="">Jenjang</label>
                         <select name="jenjang" class="form-control" id="jenjang" required>
                            <option value="` + data.data_kelas[0].jenjang + `">` + data.data_kelas[0].jenjang + `</option>
                                                    <option value="">--- Pilih Jenjang ---</option>
                                                    <option value="SD">SD</option>
                                                    <option value="SMP">SMP</option>
                                                    <option value="SMA (IPA)">SMA (IPA)</option>
                                                    <option value="SMA (IPS)">SMA (IPS)</option>
                            </select>
        </div>
        <div class="form-group">
            <label for="">Kelas</label>
            <select name="kelas" class="form-control" id="kelas" required>
            <option value="` + data.data_kelas[0].kelas + `">` + data.data_kelas[0].kelas + `</option>
                                    <option value="">--- Pilih Kelas ---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary btn_edit_kelas">Edit</button>
                </div>
            </form>
            `;
            $('#data_edit_km').html(html);
            $('#editkm').modal('show');
        }
    })
}

function editmapel(ids) {
    $('#loading-ajax-e').show();
    $.ajax({
        url: "http://localhost:3000/admin/geteditmapel/" + ids,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#loading-ajax-e').hide();
            var html = `
            <form method="POST" action="/admin/editmapelprosess">
            <input type="hidden" name="ids" value="` + data.data_mapel[0].id + `">
            <input type="hidden" name="id_guru" value="` + data.data_mapel[0].id_guru + `">
            <div class="modal-body">
            <div class="form-group">
                <label for="">Mata Pelajaran</label>
                <select name="mapel" class="form-control" id="mapel" required>
                <option value="` + data.data_mapel[0].mapel + `">` + data.data_mapel[0].mapel + `</option>
                                <option value="">--- Pilih Mata Pelajaran ---</option>
                                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                                <option value="Bahasa Inggris">Bahasa Inggris</option>
                                <option value="Matematika">Matematika</option>
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="PKN">PKN</option>
                                <option value="PAI">PAI</option>
                                <option value="Fisika">Fisika</option>
                                <option value="Biologi">Biologi</option>
                                <option value="Kimia">Kimia</option>
                                <option value="Sejarah">Sejarah</option>
                                <option value="Sosiologi">Sosiologi</option>
                                <option value="Geografi">Geografi</option>
                                <option value="Ekonomi">Ekonomi</option>
                            </select>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary btn_edit_mapel">Edit</button>
        </div>
        </form>
            `;
            $('#data_edit_km').html(html);
            $('#editkm').modal('show');
        }
    })
}

$('#tambahkelas').click(function () {
    $('#loading-ajax-e').hide();
    var ids = $('#ids').val();
    var html = `
    <form method="POST" action="/admin/tambahkelase">
            <input type="hidden" name="ids" value="` + ids + `">
            <div class="modal-body">
                <div class="form-group">
                    <label for="">Jenjang</label>
                         <select name="jenjang" class="form-control" id="jenjang" required>
                                                    <option value="">--- Pilih Jenjang ---</option>
                                                    <option value="SD">SD</option>
                                                    <option value="SMP">SMP</option>
                                                    <option value="SMA (IPA)">SMA (IPA)</option>
                                                    <option value="SMA (IPS)">SMA (IPS)</option>
                            </select>
        </div>
        <div class="form-group">
            <label for="">Kelas</label>
            <select name="kelas" class="form-control" id="kelas" required>
                                    <option value="">--- Pilih Kelas ---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary btn_edit_kelas">Tambah</button>
                </div>
            </form>
    `;
    $('#data_tambah_km').html(html);
    $('#tambah').modal('show');
})

$('#tambahmapel').click(function () {
    $('#loading-ajax-e').hide();
    var ids = $('#ids').val();
    var html = `
    <form method="POST" action="/admin/tambahmapele">
    <input type="hidden" name="ids" value="` + ids + `">
    <div class="modal-body">
    <div class="form-group">
        <label for="">Mata Pelajaran</label>
        <select name="mapel" class="form-control" id="mapel" required>
                        <option value="">--- Pilih Mata Pelajaran ---</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                        <option value="Matematika">Matematika</option>
                        <option value="IPA">IPA</option>
                        <option value="IPS">IPS</option>
                        <option value="PKN">PKN</option>
                        <option value="PAI">PAI</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Biologi">Biologi</option>
                        <option value="Kimia">Kimia</option>
                        <option value="Sejarah">Sejarah</option>
                        <option value="Sosiologi">Sosiologi</option>
                        <option value="Geografi">Geografi</option>
                        <option value="Ekonomi">Ekonomi</option>
                    </select>
    </div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary btn_edit_mapel">Tambah</button>
</div>
</form>
    `;
    $('#data_tambah_km').html(html);
    $('#tambah').modal('show');
})

// $('#data_edit_km').on('click', '.btn_edit_mapel', function () {
//     var ids = $('.btn_edit_mapel').attr('id');

//     var mapel = $('#data_edit_km').find('#mapel').val();

//     $.ajax({
//         url: 'http://localhost:3000/admin/editmapelprosess',
//         method: 'POST',
//         data: {
//             'ids': ids,
//             'mapel': mapel
//         },
//         success: function (data) {
//             if (data) {
//                 alert('Berhasil diedit...');
//                 window.location.reload()
//             } else {
//                 alert('Gagal diedit...');
//             }
//         }
//     })
// })

// $('#data_edit_km').on('click', '.btn_edit_kelas', function () {
//     var ids = $('.btn_edit_mapel').attr('id');

//     var kelas = $('#data_edit_km').find('#kelas');
//     var jenjang = $('#data_edit_km').find('#jenjang');

//     console.log(kelas)

//     $.ajax({
//         url: 'http://localhost:3000/admin/editkelasprosess',
//         method: 'POST',
//         data: {
//             'ids': ids,
//             'kelas': kelas,
//             'jenjang': jenjang
//         },
//         success: function (data) {
//             // if (data) {
//             //     alert('Berhasil diedit...');
//             //     window.location.reload()
//             // } else {
//             //     alert('Gagal diedit...');
//             // }
//             console.log(data.kelas)
//         }
//     })
// })