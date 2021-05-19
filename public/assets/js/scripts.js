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