// Props to:
// https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(__dirname + '/static') );


// Send Index File
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'indexLobbies.html'));
})


server.listen(app.get('port'), ()=>{
  console.log('Server listening on port ' + app.get('port'));
})



// Global Vars
let clients = {};
let lobbies = {};

// With Connections
io.on('connection', (socket) => {

  // Create entry in global clients dictionary for new connection
  socket.on('new_client', () => {
    clients[socket.id] = {
      lobby: '',
    };
  });
  // Remove entry in global clients dictionary on disconnect
  socket.on('disconnect', () => {
    delete clients[socket.id];
  });



  socket.on('join_lobby', (lobbyNum)=>{
    // Check if there is a lobby with the given lobbyNum
    if( lobbies[lobbyNum]){
      lobbies[lobbyNum].clients ++;
    }else{
      lobbies[lobbyNum] = {
        clients: 1,
        msgs: {}
      }
    }
    console.log( `Lobby joined, lobbies: `, lobbies);

    clients[socket.id].lobby = lobbyNum; // set lobby number for client
    socket.emit('lobby_joined', 'Successfully joined lobby ' + lobbyNum); // send confirmation to client
    // socket.emit('lobby_joined', 'Failed :(');
  });
  
  


});


// Main Loop
setInterval(function() {

}, 1000 / 60);





// Utility Functions



