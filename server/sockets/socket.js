const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.next();
        console.log(next);

        callback(next);
    });

    //cast an event "current status"
    client.emit('currentStatus', {
        current: ticketControl.getLatestTicket(),
        last4: ticketControl.getLast4()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is required'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);

        callback(attendTicket);

        // update changes in last 4
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        });
    });


});