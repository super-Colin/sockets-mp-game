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
  socket.emit('question', questionString);
  socket.emit('scoreboard', players);
  });
  // Remove entry in global players dictionary on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
  });
  

  socket.on('answer', (submittedAnswer) => {
    // check if player has already submitted an answer
    // console.log('recieved answer: ', submittedAnswer);
    if(players[socket.id].submittedAnswers > 3){return} //if more than 3 answers, do nothing


    if(submittedAnswer == answer){
      players[socket.id].score += 1;
      // console.log('answer was correct');
    }
  })

});


// Main Loop
setInterval(function() {
  numbers = newNumbersState(4); // {num1: 34, num2: 12}
  answer = numbers.num1 * numbers.num2;
  questionString = numbers.num1 + ' x ' + numbers.num2 + ' = ???';


  io.sockets.emit('question', questionString);
  io.sockets.emit('scoreboard', players);
  resetPlayersSubmittedAnswers();
}, 4000);





// Utility Functions
function numberUpTo(maxNum){
  return Math.floor(Math.random() * maxNum);
}
function newNumbersState(maxNum){
  return {
    num1 : numberUpTo(maxNum),
    num2 : numberUpTo(maxNum)
  }
}

function resetPlayersSubmittedAnswers(){
  for(let player in players){
    players[player].submittedAnswers = 0;
  }
}






// // Update and Emit State
// let answer = '';
// let lastUpdateTime = (new Date()).getTime();
// setInterval(function() {
//   var currentTime = (new Date()).getTime();
//   var timeDifference = currentTime - lastUpdateTime;
//   console.log(timeDifference);

//   let num1 = Math.floor(Math.random() * 50);
//   let num2 = Math.floor(Math.random() * 50);
//   let newQuestionString = num1 + ' x ' + num2 + ' = ???';
//   answer = num1 * num2;
//   lastUpdateTime = currentTime;
//   io.sockets.emit('question', newQuestionString);
// }, 10000);


