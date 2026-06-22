document.addEventListener('DOMContentLoaded', () => {
    // Corretti i selettori degli ID per combaciare perfettamente con l'HTML
    document.getElementById('startGameBtn').onclick = startGame;
    document.getElementById('startMatch').onclick = startMatchGara;
    document.getElementById('endMatchBtn').onclick = endMatch;
});

function startGame() {
    document.getElementById('homeContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex'; // Usiamo flex per seguire il tuo CSS
}

function addPlayer(team) {
    const playerNameInput = team === 1 ? document.getElementById('playerName1') : document.getElementById('playerName2');
    const grid = team === 1 ? document.getElementById('team1Players') : document.getElementById('team2Players');

    if (!playerNameInput.value.trim()) {
        alert('Inserisci un nome per il giocatore!');
        return;
    }

    if (grid.children.length < 11) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.textContent = `${grid.children.length + 1}. ${playerNameInput.value}`;
        grid.appendChild(playerDiv);

        // Pulisce l'input per il prossimo inserimento
        playerNameInput.value = '';

        // Controlla se entrambe le squadre hanno raggiunto gli 11 titolari
        const grid1 = document.getElementById('team1Players');
        const grid2 = document.getElementById('team2Players');
        if (grid1.children.length === 11 && grid2.children.length === 11) {
            document.getElementById('startMatch').disabled = false;
        }
    } else {
        alert('Non puoi aggiungere più di 11 giocatori!');
    }
}

function startMatchGara() {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('matchContainer').style.display = 'flex';

    // Recupera i valori inseriti, se vuoti mette un default
    const team1Name = document.getElementById('playerName1').value || "Squadra Casa";
    const team2Name = document.getElementById('playerName2').value || "Squadra Ospiti";

    document.getElementById('team1Name').textContent = team1Name;
    document.getElementById('team2Name').textContent = team2Name;

    // Simulazione testuale della partita minuto per minuto
    let matchLogText = '';
    for (let minute = 0; minute <= 90; minute++) {
        // Ogni tanto succede un evento interessante (circa il 30% delle volte) o nei minuti salienti
        if (minute === 0) {
            matchLogText += `0' - Fischio d'inizio! Le squadre si studiano sul terreno di gioco.\n`;
        } else if (minute === 90) {
            matchLogText += `90' - Triplice fischio dell'arbitro! Tutti sotto la doccia.\n`;
        } else if (Math.random() < 0.3) {
            matchLogText += `${minute}' - ${getRandomEvent(team1Name, team2Name)}\n`;
        }
    }

    document.getElementById('matchLog').textContent = matchLogText;
}

function endMatch() {
    const result = Math.random() < 0.5 ? 'Vittoria Epica in casa!' : 'Sconfitta di misura fuori casa...';
    document.getElementById('endMessageContainer').style.display = 'flex';
    document.getElementById('endMessage').textContent = `Partita Conclusa: ${result}`;
    document.getElementById('matchContainer').style.display = 'none';
}

function resetGame() {
    document.getElementById('homeContainer').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('matchContainer').style.display = 'none';
    document.getElementById('endMessageContainer').style.display = 'none';

    // Reset completo
    document.getElementById('playerName1').value = '';
    document.getElementById('playerName2').value = '';
    document.getElementById('team1Players').innerHTML = '';
    document.getElementById('team2Players').innerHTML = '';
    document.getElementById('matchLog').textContent = '';
    document.getElementById('startMatch').disabled = true;
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
