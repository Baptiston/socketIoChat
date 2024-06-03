//const userName = prompt("What is your username");
//const userPassword = prompt("What is your password");

const userName = "Felipe";
const userPassword = "1234";

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
  document.querySelector('.namespaces').innerHTML = "";
  nsData.forEach(namespace => {
    document.querySelector('.namespaces').innerHTML += `<div class="namespace" ns="${namespace.endpoint}"><img src="${namespace.image}"></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', () => {
      joinNs(element, nsData);
    });
  });

  if(!localStorage.getItem('lastNs')) 
    localStorage.setItem('lastNs', document.getElementsByClassName('namespace')[0].getAttribute('ns'));

  Array.from(document.getElementsByClassName('namespace')).find(row => row.getAttribute('ns') === localStorage.getItem('lastNs')).click();
  //joinNs(document.getElementsByClassName('namespace')).find(row => row.getAttribute('ns') === localStorage.getItem('lastNs'), nsData); // Do the same
});
