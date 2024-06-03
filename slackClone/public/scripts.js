const userName = prompt("What is your username");
const userPassword = prompt("What is your password");

const socket = io(`http://localhost:8000`)

socket.on('connect', () => {
  console.log("Connected");
  socket.emit('clientConnect')
})

socket.on('welcome', (data) => {
  console.log(data);
});

//Listen for the nsList event from the server, which gives us the namespaces
socket.on('nsList', (nsData) => {
  console.log(nsData);
  nsData.forEach(namespace => {
    document.querySelector('.namespaces').innerHTML += `<div class="namespace" ns="${namespace.name}"><img src="${namespace.image}"></div>`;
  });
});
