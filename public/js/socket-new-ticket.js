//Command to establish communication

var socket = io();

var label = $('#lblNewTicket');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('discoonnected to server');
});

// on 'currentStatus'
socket.on('currentStatus', function(resp) {
    label.text(resp.current);
});

$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {

        label.text(nextTicket);
    });
});