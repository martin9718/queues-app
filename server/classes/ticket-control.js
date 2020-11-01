const fs = require('fs');

class Ticket {
    constructor(number, desk) {

        this.number = number;
        this.desk = desk;
    }
}



class TicketControl {

    constructor() {

        this.latest = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.latest = data.latest;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.restartCount();
        }
    }

    next() {
        this.latest += 1;

        let ticket = new Ticket(this.latest, null);
        this.tickets.push(ticket);

        this.burnFile();

        return `Ticket ${ this.latest }`;


    }

    getLatestTicket() {
        return `Ticket ${ this.latest }`;
    }

    getLast4() {
        return this.last4;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'There aren\'t tickets';
        }

        let numberTicket = this.tickets[0].number;
        //shift() deletes the first element of the array
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desk);

        //unshif() inserts a element in the first position of the array
        this.last4.unshift(attendTicket);


        if (this.last4.length > 4) {
            this.last4.splice(-1, 1); //This deletes the array last element 
        }

        console.log('Last 4');
        console.log(this.last4);

        this.burnFile();

        return attendTicket;

    }

    restartCount() {
        this.latest = 0;
        this.tickets = [];
        this.last4 = [];

        console.log('The system has been initialized');
        this.burnFile();

    }

    burnFile() {

        let jsonData = {
            latest: this.latest,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }



}




module.exports = {
    TicketControl
}