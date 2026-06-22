// Aspetta che la pagina sia completamente caricata
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startGameBtn') || document.getElementById('startGame');
    if (startBtn) {
        startBtn.onclick = startGame;
    }

    const startMatchBtn = document.getElementById('startMatch');
    if (startMatchBtn) {
        startMatchBtn.onclick = startMatchGara;
    }

    const endBtn = document.getElementById('endMatchBtn');
    if (endBtn) {
        endBtn.onclick = endMatch;
    }
});

function startGame() {
    const home = document.getElementById('homeContainer');
    const game = document.getElementById('gameContainer');
    if (home) home.style.display = 'none';
    if (game) game.style.display = 'flex';
}

function addPlayer(team) {
    const playerNameInput = team === 1 ? document.getElementById('playerName1') : document.getElementById('playerName2');
    const grid = team === 1 ? document.getElementById('team1Players') : document.getElementById('team2Players');

    if (!playerNameInput || !grid) return;

    if (!playerNameInput.value.trim()) {
        alert('Inserisci un nome per il giocatore!');
        return;
    }

    if (grid.children.length < 11) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = `${grid.children.length + 1}. ${playerNameInput.value}`;
        grid.appendChild(playerDiv);

        playerNameInput.value = '';

        const grid1 = document.getElementById('team1Players');
        const grid2 = document.getElementById('team2Players');
        const startMatchBtn = document.getElementById('startMatch');
        
        if (grid1 && grid2 && startMatchBtn) {
            if (grid1.children.length === 11 && grid2.children.length === 11) {
                startMatchBtn.disabled = false;
            }
        }
    } else {
        alert('Non puoi aggiungere più di 11 giocatori!');
    }
}

function startMatchGara() {
    const gameContainer = document.getElementById('gameContainer');
    const matchContainer = document.getElementById('matchContainer');
    if (gameContainer) gameContainer.style.display = 'none';
    if (matchContainer) matchContainer.style.display = 'flex';

    const p1Input = document.getElementById('playerName1');
    const p2Input = document.getElementById('playerName2');
    const team1Name = p1Input && p1Input.value ? p1Input.value : "Squadra Casa";
    const team2Name = p2Input && p2Input.value ? p2Input.value : "Squadra Ospiti";

    const t1Label = document.getElementById('team1Name');
    const t2Label = document.getElementById('team2Name');
    if (t1Label) t1Label.textContent = team1Name;
    if (t2Label) t2Label.textContent = team2Name;

    let matchLogText = '';
    for (let minute = 0; minute <= 90; minute++) {
        if (minute === 0) {
            matchLogText += `0' - Fischio d'inizio! Le squadre si studiano sul terreno di gioco.\n`;
        } else if (minute === 90) {
            matchLogText += `90' - Triplice fischio dell'arbitro! Tutti sotto la doccia.\n`;
        } else if (Math.random() < 0.3) {
            matchLogText += `${minute}' - ${getRandomEvent(team1Name, team2Name)}\n`;
        }
    }

    const logBox = document.getElementById('matchLog');
    if (logBox) {
        logBox.textContent = matchLogText;
    }
}

function endMatch() {
    const result = Math.random() < 0.5 ? 'Vittoria Epica in casa!' : 'Sconfitta di misura fuori casa...';
    const endContainer = document.getElementById('endMessageContainer');
    const endMsg = document.getElementById('endMessage');
    const matchContainer = document.getElementById('matchContainer');

    if (endContainer) endContainer.style.display = 'flex';
    if (endMsg) endMsg.textContent = `Partita Conclusa: ${result}`;
    if (matchContainer) matchContainer.style.display = 'none';
}

function resetGame() {
    const home = document.getElementById('homeContainer');
    const game = document.getElementById('gameContainer');
    const match = document.getElementById('matchContainer');
    const end = document.getElementById('endMessageContainer');

    if (home) home.style.display = 'flex';
    if (game) game.style.display = 'none';
    if (match) match.style.display = 'none';
    if (end) end.style.display = 'none';

    if (document.getElementById('playerName1')) document.getElementById('playerName1').value = '';
    if (document.getElementById('playerName2')) document.getElementById('playerName2').value = '';
    if (document.getElementById('team1Players')) document.getElementById('team1Players').innerHTML = '';
    if (document.getElementById('team2Players')) document.getElementById('team2Players').innerHTML = '';
    if (document.getElementById('matchLog')) document.getElementById('matchLog').textContent = '';
    if (document.getElementById('startMatch')) document.getElementById('startMatch').disabled = true;
}

function getRandomEvent(team1Name, team2Name) {
    const events = [
        `${team1Name} attacca pericolosamente sulla fascia destra!`,
        `GOOOOL! ${team1Name} si porta in avanti con una zampata sotto rete!`,
        `GOOOOL! ${team2Name} segna un gol incredibile da fuori area!`,
        `Ammonizione! Intervento duro a centrocampo contro la squadra ${team2Name}.`,
        `Parata miracolosa del portiere di ${team1Name}!`,
        `Fallo tattico! Il mister di ${team2Name} urla indicazioni infuriato dalla panchina.`,
        `Calcio di rigore assegnato! Tensione altissima in campo.`,
        `Il pallone finisce clamorosamente fuori oltre la recinzione dello stadio!`
    ];
    return events[Math.floor(Math.random() * events.length)];
}
