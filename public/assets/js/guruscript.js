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
                    cols += data.data_mapel[i].mapel;
                    $("#mapel").append(cols);
                }
            }
        }
    });
})