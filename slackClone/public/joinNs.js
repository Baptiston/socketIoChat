
const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
  const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
  document.querySelector('.room-list').innerHTML = "";

  clickedNs.rooms.forEach(room => {
    document.querySelector('.room-list').innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });

  localStorage.setItem('lastNs', nsEndpoint);
};