// console.log('game script loaded');

var socket = io();
socket.emit('new player'); //emit that a new player has joined



socket.on ('question', updateQuestion);
socket.on ('scoreboard', updateScoreboard);


function updateQuestion(question){
  document.getElementById('question').innerHTML = question;
}
function updateScoreboard(scoreboardScores){
  let scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  for(const player in scoreboardScores){
    scoreboard.innerHTML += `<p>${player}: ${scoreboardScores[player].score}</p>`;
  }
}


function submitAnswer(){
  let answer = document.getElementById('answer').value;
  console.log(answer);
  document.getElementById('submittedAnswer').innerHTML = 'Submitted answer:' + answer;
  socket.emit('answer', answer);
}