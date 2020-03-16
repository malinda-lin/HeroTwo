/* eslint-disable no-console */
const express = require('express');
// app setup
const app = express();

const socket = require('socket.io');
// const http = require('http').createServer(app);

const path = require('path');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function() {
  console.log(`I am listenning on ${PORT}`);
});

// static files
app.use(express.static('public'));

// socket set up
const io = socket(server);

io.on('connection', function(socket) {
  console.log(`${socket.id} has connected to io`);
  // client data packages are sent here to be emitted to all/single sockets
  socket.on('chatmessage', function(data) {
    io.sockets.emit('chatmessage', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });

});
