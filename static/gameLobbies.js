// console.log('game script loaded');

var socket = io();
socket.emit('new_client'); //emit that a new player has joined



socket.on('lobby_joined', (status)=>{
  document.getElementById('lobbyStatus').innerHTML =  status;
});


function submitLobbyNumber(){
  let lobbyNumber = document.getElementById('lobbyNumber').value;
  socket.emit('join_lobby', lobbyNumber);
}