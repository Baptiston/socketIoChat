const express = require('express');
const app = express();
const socketIo = require('socket.io');

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(8001);

const io = socketIo(expressServer);

io.on('connection', (socket) => {
  socket.on('newMessageToServer', (dataFromClient) => {
    console.log(dataFromClient);
    io.emit('newMessageToClients', {text:dataFromClient.text})
  });
});