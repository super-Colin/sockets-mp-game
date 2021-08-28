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

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'indexExample.html'));
})



// Send Index File
server.listen(app.get('port'), ()=>{
  console.log('Server listening on port ' + app.get('port'));
})



//Sockets
// Add the WebSocket handlers
io.on('connection', function(socket) {
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);





// Players
var players = {};
io.on('connection', (socket) => {

  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });

  socket.on('disconnect', function() {
    // remove disconnected player
    // players = omit(players, socket.id);
    delete players[socket.id];
  });


  socket.on('movement', (data) =>{
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });


  // var lastUpdateTime = (new Date()).getTime();
  // setInterval(function() {
  //   // code ...
  //   var currentTime = (new Date()).getTime();
  //   var timeDifference = currentTime - lastUpdateTime;
  //   player.x += 5 * timeDifference;
  //   lastUpdateTime = currentTime;
  // }, 1000 / 60);

});



setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);