//Command to establish conecction

var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesk1 = $('#lblDesk1');
var lblDesk2 = $('#lblDesk2');
var lblDesk3 = $('#lblDesk3');
var lblDesk4 = $('#lblDesk4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('currentStatus', function(data) {
    //console.log(data);
    updateHTML(data.last4);
});

socket.on('last4', function(data) {
    //console.log(data);

    var audio = new Audio('../audio/new-ticket.mp3');
    //audio.play();
    document.getElementById('audio').innerHTML = `<audio src="audio/new-ticket.mp3" autoplay ></audio>`;


    updateHTML(data.last4);
});

function updateHTML(last4) {
    for (var i = 0; i <= last4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblDesks[i].text('Desk ' + last4[i].desk);
    }
}