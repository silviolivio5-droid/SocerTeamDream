let team1 = [];
let team2 = [];
let ballPosition = { x: 400, y: 300 };
let isGameRunning = false;
let interval;

function startGame(mode) {
    document.getElementById('home').hidden = true;
    document.getElementById('game').hidden = false;

    if (mode === 'single') {
        document.querySelector('.btn-primary').classList.add('btn-disabled');
        document.querySelector('.btn-disabled').classList.remove('btn-disabled', 'bg-green-500', 'text-white');
        document.querySelector('.btn-disabled').innerText = 'In progress...';
    }
}

function addPlayer(slot, team) {
    const playerName = prompt(`Inserisci il nome del giocatore per la posizione ${slot}`);
    if (playerName) {
        const playerLogo = prompt(`Inserisci l'URL dell'immagine del giocatore o URL Google Immagini`);
        const logoElement = playerLogo ? `<img src="${playerLogo}" class="object-cover rounded-full w-8 h-8" alt="${playerName}">` : `<span class="bg-red-500 text-white font-bold">?</span>`;
        document.getElementById(`${team}Player${slot}`).innerHTML = `${logoElement}<br>${playerName}`;
        if (team === 'team1') {
            team1[slot - 1] = { name: playerName, logo: playerLogo };
        } else {
            team2[slot - 1] = { name: playerName, logo: playerLogo };
        }
        checkAllPlayersAdded();
    }
}

function checkAllPlayersAdded() {
    const team1Input = document.getElementById('team1Name');
    const team2Input = document.getElementById('team2Name');

    if (team1Input.value !== '' && team2Input.value !== '') {
        document.getElementById('startMatch').hidden = false;
    } else {
        document.getElementById('startMatch').hidden = true;
    }
}

document.getElementById('startMatch').addEventListener('click', () => {
    document.getElementById('game').hidden = true;
    document.getElementById('match').hidden = false;
    startMatchSimulation();
});

function startMatchSimulation() {
    isGameRunning = true;
    interval = setInterval(simulateGame, 100);
}

function simulateGame() {
    if (!isGameRunning) return;

    const matchLog = document.getElementById('matchLog');

    // Simulate ball movement
    const ballElement = document.getElementById('ball');
    const direction = Math.random() < 0.5 ? -1 : 1;
    ballPosition.x += direction * Math.random() * 2;
    ballPosition.y += (Math.random() - 0.5) * 2;

    if (ballPosition.x < 50 || ballPosition.x > 790) {
        ballPosition.x = Math.min(740, Math.max(60, ballPosition.x));
        direction *= -1;
    }

    ballElement.style.left = `${ballPosition.x}px`;
    ballElement.style.top = `${ballPosition.y}px`;

    // Check for goal
    if (ballPosition.x < 50) {
        matchLog.innerHTML += `<p class="goal-animation">GOAL! ${getRandomPlayer(team2)} ha segnato un gol!!!</p>`;
        clearInterval(interval);
        endMatch('team1');
        return;
    }

    if (ballPosition.x > 790) {
        matchLog.innerHTML += `<p class="goal-animation">GOAL! ${getRandomPlayer(team1)} ha segnato un gol!!!</p>`;
        clearInterval(interval);
        endMatch('team2');
        return;
    }

    // Simulate player movement and actions
    team1.forEach((player, index) => {
        const playerElement = document.getElementById(`team1Player${index + 1}`);
        const dx = Math.random() * 4 - 2;
        ballPosition.x += dx;

        if (ballPosition.x < 50 || ballPosition.x > 790) {
            ballPosition.x -= dx;
        }

        playerElement.style.left = `${ballPosition.x}px`;
    });

    team2.forEach((player, index) => {
        const playerElement = document.getElementById(`team2Player${index + 1}`);
        const dx = Math.random() * 4 - 2;
        ballPosition.x += dx;

        if (ballPosition.x < 50 || ballPosition.x > 790) {
            ballPosition.x -= dx;
        }

        playerElement.style.left = `${ballPosition.x}px`;
    });

    // Random actions
    const randomAction = Math.random();
    if (randomAction < 0.1) {
        matchLog.innerHTML += `<p>${getRandomPlayer(team1)} ha lisciato il pallone ed è inciampato sulla bandierina!`;
    } else if (randomAction < 0.2) {
        matchLog.innerHTML += `<p>${getRandomPlayer(team2)} ha lisciato il pallone ed è inciampato sulla bandierina!`;
    } else if (randomAction < 0.3) {
        const player = getRandomPlayer(team1);
        matchLog.innerHTML += `<p>${player} ha segnato un penalti!!!</p>`;
    }
}

function endMatch(winningTeam) {
    isGameRunning = false;
    clearInterval(interval);
    document.getElementById('match').hidden = true;
    document.getElementById('endMessage').innerText = winningTeam === 'team1' ? 'Vittoria della Squadra Giocatore!' : 'Sconfitta! La Squadra Avversaria ha vinto!';
    document.getElementById('endMessage').hidden = false;
}

function getRandomPlayer(team) {
    const playerIndex = Math.floor(Math.random() * team.length);
    return team[playerIndex].name;
}
