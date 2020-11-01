//Command to establish communication

var socket = io();


var serchParams = new URLSearchParams(window.location.search);

if (!serchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk is required');
}

var desk = serchParams.get('desk');
var label = $('small');

console.log(desk);
$('h1').text('Desk ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {

        if (resp === 'There aren\'t tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.number);
    });
});