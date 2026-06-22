let homeScreen = document.getElementById('home');
let gameScreen = document.getElementById('gameScreen');
let resultScreen = document.getElementById('resultScreen');

let teamNameInput = document.getElementById('teamName');
let opponentTeamNameInput = document.getElementById('opponentTeamName');

let matchCommentElement = document.getElementById('matchComment');
let goalsListElement = document.getElementById('goalsList');
let finalResultElement = document.getElementById('finalResult');

function startGame() {
  homeScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  let teamName = teamNameInput.value || 'Squadra Proproia';
  let opponentTeamName = opponentTeamNameInput.value || 'Squadra Avversaria';

  matchCommentElement.textContent = `La partita tra ${teamName} e ${opponentTeamName} stia iniziando!`;
  goalsListElement.innerHTML = '';
}

function endGame() {
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  let teamName = teamNameInput.value || 'Squadra Proproia';
  let opponentTeamName = opponentTeamNameInput.value || 'Squadra Avversaria';

  // Simulate goals
  let goals = [
    { scorer: 'Giocatore 1', minute: 20 },
    { scorer: 'Giocatore 3', minute: 45 },
    { scorer: 'Giocatore 6', minute: 78 }
  ];

  goals.forEach(goal => {
    let li = document.createElement('li');
    li.textContent = `${goal.scorer} ha segnato il goal alla minuto ${goal.minute}`;
    goalsListElement.appendChild(li);
  });

  // Simulate result
  let homeGoals = Math.floor(Math.random() * 5) + 1;
  let awayGoals = Math.floor(Math.random() * 5) + 1;

  if (homeGoals > awayGoals) {
    finalResultElement.textContent = `${teamName} vince con ${homeGoals}-${awayGoals}`;
  } else if (homeGoals < awayGoals) {
    finalResultElement.textContent = `${opponentTeamName} vince con ${awayGoals}-${homeGoals}`;
  } else {
    finalResultElement.textContent = 'Pareggio!';
  }
}

function goBackToHome() {
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'none';
  homeScreen.style.display = 'block';
}
