document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startGame').onclick = startGame;
    document.getElementById('startMatch').onclick = startMatch;
    document.getElementById('endMatchBtn').onclick = endMatch;
});

function startGame() {
    document.getElementById('homeContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
}

function addPlayer(team) {
    const playerNameInput = team === 1 ? document.getElementById('playerName1') : document.getElementById('playerName2');
    const grid = team === 1 ? document.querySelector('#team1Players') : document.querySelector('#team2Players');
    const playerCount = grid.children.length;

    if (playerCount < 11) {
        const playerName = playerNameInput.value;
        const playerNumber = playerCount + 1;

        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = `${playerNumber}: ${playerName}`;
        grid.appendChild(playerDiv);

        if (team === 1) {
            // Aggiungi logica per il modulo tattico e la posizione del giocatore
        }

        if (grid.children.length === 11) {
            document.getElementById('startMatch').disabled = false;
        }
    } else {
        alert('Non puoi aggiungere più di 11 giocatori!');
    }
}

function startMatch() {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('matchContainer').style.display = 'block';

    const team1Name = document.getElementById('playerName1').value;
    const team2Name = document.getElementById('playerName2').value;

    // Simulazione della partita
    let matchLog = '';
    for (let minute = 0; minute <= 90; minute++) {
        matchLog += `${minute}' - ${getRandomEvent(team1Name, team2Name)}\n`;
    }

    document.getElementById('matchLog').textContent = matchLog;
}

function endMatch() {
    const result = Math.random() < 0.5 ? 'Vittoria' : 'Sconfitta';
    document.getElementById('endMessageContainer').style.display = 'block';
    document.getElementById('endMessage').textContent = `Partita Conclusa: ${result}`;
    document.getElementById('matchContainer').style.display = 'none';
}

function resetGame() {
    document.getElementById('homeContainer').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('matchContainer').style.display = 'none';
    document.getElementById('endMessageContainer').style.display = 'none';

    // Resetta tutti i campi
    document.getElementById('playerName1').value = '';
    document.getElementById('playerName2').value = '';
    document.querySelector('#team1Players').innerHTML = '';
    document.querySelector('#team2Players').innerHTML = '';
    document.getElementById('startMatch').disabled = true;
}

function getRandomEvent(team1Name, team2Name) {
    const events = [
        `${team1Name} ha segnato un gol!`,
        `${team2Name} ha segnato un gol!`,
        'Fallimento del portiere!',
        'Assist del giocatore!',
        'Scontro violento!',
        'Penalità!',
        'Ricostruzione!'
    ];

    return events[Math.floor(Math.random() * events.length)];
}
