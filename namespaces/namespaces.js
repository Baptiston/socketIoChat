const express = require('express');
const app = express();
const socketIo = require('socket.io');

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(8001);

const io = socketIo(expressServer);

io.of("/").on('connection', (socket) => {
  
  socket.join('chat');
  socket.join('adminChat');

  io.of('/').to('chat').emit('welcomeToChatRoom', {});
  io.of('/').to('chat').to('chat1').to('chat2').emit('welcomeToChatRoom', {});
  io.of('/admin').emit('welcomeToAdminChatRoom', {});
  
  console.log(socket.id, "has connected !");
  
  socket.on('newMessageToServer', (dataFromClient) => {
    console.log(dataFromClient);
    io.of("/").emit('newMessageToClients', {text:dataFromClient.text})
  });
});

io.of("/admin").on('connection', (socket) => {
  console.log(socket.id, "has connected to admin !");
  io.of("/admin").emit('newMessageToClientsFromAdmin', {})
});
