require('dotenv').config()
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(8000);

const io = socketIo(expressServer);

io.on('connection', (socket) => {
  socket.emit("welcome", "Welcome to the server !");
  socket.on("clientConnect", (data) => {
    console.log(socket.id, "has connected");
    socket.emit('nsList', namespaces)
  })
});

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    console.log(`${socket.id} has connected to ${namespace.endpoint}`);
  })
});