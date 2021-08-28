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
  res.sendFile(path.join(__dirname, 'index.html'));
})


server.listen(app.get('port'), ()=>{
  console.log('Server listening on port ' + app.get('port'));
})



// Global Vars
let players = {};
let numbers = newNumbersState(3); // {num1: 34, num2: 12}
let answer = numbers.num1 * numbers.num2;
let questionString = numbers.num1 + ' x ' + numbers.num2 + ' = ???';


// With Connections
io.on('connection', (socket) => {

  // Create entry in global players dictionary for new connection
  socket.on('new player', () => {
    players[socket.id] = {
      answer: '',
      score: 0,
      submittedAnswers: 0,
    };
  });
  // Remove entry in global players dictionary on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
  });
  



});


// Main Loop
setInterval(function() {

}, 1000 / 60);





// Utility Functions



