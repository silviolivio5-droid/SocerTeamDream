let team1 = [];
let team2 = [];

function startGame() {
    document.getElementById('home').hidden = true;
    document.getElementById('game').hidden = false;
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
    if (team1.length === 11 && team2.length === 11) {
        document.getElementById('startMatch').hidden = false;
    }
}

document.getElementById('startMatch').addEventListener('click', () => {
    document.getElementById('game').hidden = true;
    document.getElementById('match').hidden = false;
    startMatchSimulation();
});

function startMatchSimulation() {
    const matchLog = document.getElementById('matchLog');
    let time = 0;

    function simulateGame() {
        if (time > 90) {
            clearInterval(interval);
            endMatch();
            return;
        }

        const action = getAction();
        const logElement = document.createElement('p');
        logElement.textContent = `${time}' ${action}`;
        matchLog.appendChild(logElement);

        if (action.includes('gol')) {
            logElement.classList.add('goal-animation');
        }

        time++;
    }

    const interval = setInterval(simulateGame, 1000);
}

function getAction() {
    const actions = [
        `${getRandomPlayer(team1)} ha lisciato il pallone ed è inciampato sulla bandierina!`,
        `Il portiere di ${getRandomTeam()} ha fatto un tiro perfetto!`,
        `La ballonata di ${getRandomPlayer(team2)} è stata bloccata da ${getRandomPlayer(team1)}!`,
        `${getRandomPlayer(team1)} ha segnato un gol!!!`,
        `${getRandomPlayer(team2)} ha segnato un gol!!!`
    ];

    return actions[Math.floor(Math.random() * actions.length)];
}

function getRandomTeam() {
    return Math.random() < 0.5 ? 'Squadra Giocatore' : 'Squadra Avversaria';
}

function getRandomPlayer(team) {
    const playerIndex = Math.floor(Math.random() * team.length);
    return team[playerIndex].name;
}
