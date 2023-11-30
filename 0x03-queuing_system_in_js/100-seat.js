const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');

const client = redis.createClient();
const queue = kue.createQueue();
const app = express();
const port = 1245;
let reservationEnabled = true;


const reserveSeat = async (number) => {
    await promisify(client.set).bind(client)('available_seats', number);
}
// reserveSeat(50);
const getCurrentAvailableSeats = async() => {
    const numSeats = await promisify(client.get).bind(client)('available_seats');
    return numSeats;
}

app.get('/available_seats', async (req, res) =>{
    const numSeats = await getCurrentAvailableSeats();
    const response = {"numberOfAvailableSeats":numSeats};
    res.json(response);
    return;
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        res.json({ "status": "Reservation are blocked" });
        return;
    }
    const job = queue.create('reserve_seat', {});
    job
        .on('complete', () => {
            console.log(`Seat reservation job ${job.id} completed`);
        })
        .on('failed', (err) => {
            console.log(`Seat reservation job ${job.id} failed: ${err}`);
        });
    job.save((error) => {
        if (error) {
            return res.json({ "status": "Reservation failed" });
        }
        return res.json({ status: 'Reservation in process' });
    });
});

app.get('/process', async (req, res) => {
    res.json({ "status": "Queue processing" })
    
    queue.process('reserve_seat', async (job, done) => {
        const availableSeats = await getCurrentAvailableSeats();
        const newAvailableSeats = availableSeats - 1;
        if (newAvailableSeats === 0) {
            reservationEnabled = false;
        }
        
        if (newAvailableSeats >= 0) {
            await reserveSeat(newAvailableSeats);
            done();
        } else {
            done(new Error('Not enough seats available'));
        }
    });
});

app.listen(port);
