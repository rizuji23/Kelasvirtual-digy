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