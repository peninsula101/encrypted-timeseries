const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const data = require('./data.json');


function generateRandomMessage() {
  const randomIndex = Math.floor(Math.random() * data.length);
  const { name, origin, destination } = data[randomIndex];

  
  const message = {
    name,
    origin,
    destination,
    secret_key: crypto.createHash('sha256').update(JSON.stringify({ name, origin, destination })).digest('hex'),
  };

  return JSON.stringify(message);
}


setInterval(() => {
  const numMessages = Math.floor(Math.random() * (499 - 49 + 1)) + 49;
  const messages = [];

  for (let i = 0; i < numMessages; i++) {
    messages.push(generateRandomMessage());
  }

  io.emit('dataStream', messages.join('|'));
}, 10000);


server.listen(3000, () => {
  console.log('Emitter service is running on port 3000');
});
