$(document).ready(function () {
    $(".chat-boxs").html('');
    update_jadwal();

    setInterval(function () {
        $(".chat-boxs").html('');
        update_jadwal()
    }, 3000);

    function update_jadwal() {
        $.ajax({
            url: 'http://localhost:3000/guru/getupdatejadwal',
            method: 'POST',
            success: function (data) {
                if (data.result.length > 0) {
                    for (var i = 0; i < data.result.length; i++) {
                        var cols = "";
                        var no = 1;
                        cols += `<div class="sender" data-aos="fade-up" data-aos-duration="1200">
                        <div class="box-chat-isi">
                            <p>` + data.result[i].nama_guru + ` - ` + data.result[i].mapel + ` - ` + data.result[i].kelas + `</p>
                            <!-- <div class="kerucut"></div> -->
                            <div class="chat-box">
                                ` + data.result[i].judul_pertemuan + ` ` + data.result[i].tanggal_pertemuan + `
                            </div>
                        </div>
                    </div>`;
                        $(".chat-boxs").append(cols);
                    }
                }
            }
        })
    }

})