/* eslint-disable no-console */
const express = require('express');
// app setup
const app = express();

const socket = require('socket.io');
// const http = require('http').createServer(app);

const path = require('path');

const PORT = 4000;
const server = app.listen(PORT, function() {
  console.log(`I am listenning on ${PORT}`);
});

// static files
app.use(express.static('public'));

// socket set up
const io = socket(server);

io.on('connection', function(someSocket) {
  console.log(`${someSocket.id} has connected to io`);

  someSocket.on('chatmessage', function(data) {
    io.sockets.emit('chatmessage', data);
  });
});
