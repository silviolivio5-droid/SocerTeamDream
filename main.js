<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gioco Calcistica Sandbox</title>
    <link rel="stylesheet" href="style.css">
    <script src="Main.js" defer></script>
</head>
<body>
    <div class="home-container" id="homeContainer">
        <h1 class="title">Gioco Calcistica Sandbox</h1>
        <div class="btn-container">
            <button class="btn btn-primary" id="startGameBtn">Partita Singola</button>
            <button class="btn btn-disabled" disabled> Torneo </button>
            <button class="btn btn-disabled" disabled> Amichevole </button>
        </div>
    </div>

    <div class="game-container" id="gameContainer" style="display: none;">
        <h2>Crea la Squadra Giocatore</h2>
        <div class="team-editor">
            <label for="playerName1">Nome Squadra:</label>
            <input type="text" id="playerName1" required placeholder="Es. AC Campagnola">
            <button onclick="addPlayer(1)">Aggiungi Giocatore</button>
            <div id="team1Players" class="player-grid"></div>
        </div>

        <h2>Crea la Squadra Avversaria</h2>
        <div class="team-editor">
            <label for="playerName2">Nome Squadra:</label>
            <input type="text" id="playerName2" required placeholder="Es. Real Sbronzi">
            <button onclick="addPlayer(2)">Aggiungi Giocatore</button>
            <div id="team2Players" class="player-grid"></div>
        </div>

        <button id="startMatch" disabled>Inizia Partita</button>
    </div>

    <div class="match-container" id="matchContainer" style="display: none;">
        <h2>Squadre in Corso:</h2>
        <div class="team">
            <label>Squadra 1:</label>
            <span id="team1Name"></span>
        </div>
        <div class="team">
            <label>Squadra 2:</label>
            <span id="team2Name"></span>
        </div>
        
        <div class="field">
            <img src="https://i.imgur.com/7SxZkQ3.jpg" alt="Campo da Calcio">
        </div>
        
        <pre id="matchLog" style="background: #222; color: #fff; padding: 10px; border-radius: 5px; max-height: 250px; overflow-y: auto; width: 100%; font-family: monospace; text-align: left;"></pre>
        
        <button id="endMatchBtn" class="btn btn-primary">Fine Partita (Vedi Risultato)</button>
    </div>

    <div class="end-message-container" id="endMessageContainer" style="display: none;">
        <h2 id="endMessage"></h2>
        <button onclick="resetGame()">Nuova Partita</button>
    </div>
</body>
</html>
