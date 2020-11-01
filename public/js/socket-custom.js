var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

// Listen
socket.on('disconnect', function() {

    console.log('We lost connection with the server');

});


// Send information
socket.emit('sendMessage', {
    usuario: 'Martín',
    mensaje: 'Hello world'
}, function(resp) {
    console.log('Server response: ', resp);
});

// listen information
socket.on('sendMessage', function(message) {

    console.log('Server:', message);

});