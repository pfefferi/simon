let stage = 0;
let gameSeq = [];
let playerSeq = [];

function startGame() {
    const $panel = document.querySelectorAll('.cuadro');
    $panel.forEach(function ($panel) {
        $panel.style.opacity = 0.5;
    });
    console.log('Empieza el juego');
    turnHandler();
}

document.querySelector('#button').onclick = function () {
    restartGame();
    startGame();
};

function restartGame() {
    stage = 0;
    gameSeq = [];
    playerSeq = [];
}

function turnHandler() {
    blockUserInput();

    gameTurnStatus();
    gameTurn();

    playerSeq = [];
    stage++;
    updateStage(stage);

    playerTurnDelay();
}

function resaltarPanel($panel) {
    $panel.style.opacity = 1;
    setTimeout(function () {
        $panel.style.opacity = 0.5;
    }, 500);
}

function gameTurn() {
    const $newPanel = randomPanel();
    gameSeq.push($newPanel);

    gameSeq.forEach(function ($panel, index) {
        const delay = (index + 1) * 1000;
        setTimeout(() => {
            resaltarPanel($panel);
            //selectPanel($panel);
        }, delay);
    });
}

function randomPanel() {
    const $panel = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $panel.length);
    return $panel[indice];
}

function gameTurnStatus() {
    const $alert = document.querySelector('#alert');
    $alert.textContent = 'Turno de la máquina.';
    $alert.classList.remove('alert-danger');
    $alert.classList.add('alert-primary');
}

function updateStage() {
    const $stage = document.querySelector('#stage');
    $stage.textContent = stage;
}

function playerTurnDelay() {
    const delayPlayer = (gameSeq.length + 1) * 1000;
    setTimeout(() => {
        playerTurnStatus();
        unlockUserInput();
    }, delayPlayer);
}

function blockUserInput() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = function () {};
    });
}

function playerTurnStatus() {
    const $alert = document.querySelector('#alert');
    $alert.textContent = 'Tu turno maquinola.';
}

function unlockUserInput() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = playerTurn;
    });
}

function playerTurn(e) {
    const $playerPanel = e.target;
    resaltarPanel($playerPanel);
    //selectPanel($playerPanel);
    playerSeq.push($playerPanel);

    const $gamePanel = gameSeq[playerSeq.length - 1];
    if ($gamePanel.id !== $playerPanel.id) {
        gameOver();
        return;
    }
    if (playerSeq.length === gameSeq.length) {
        setTimeout(() => {
            turnHandler();
        }, 1000);
    }
}

function selectPanel($panel) {
    setTimeout(() => {
        $panel.classList.add('select');
    }, 0);
    setTimeout(() => {
        $panel.classList.remove('select');
    }, 250);
}

function gameOver() {
    gameOverAlert();
    gameOverAnimation();
}

function gameOverAlert() {
    blockUserInput();
    const $alert = document.querySelector('#alert');
    $alert.classList.remove('alert-primary');
    $alert.classList.add('alert-danger');
    $alert.textContent =
        'Alpiste perdiste. Que triste. Clickea el botón para volver a jugar.';
    return;
}

function gameOverAnimation() {
    setTimeout(() => {
        animationOff();
    }, 500);
    setTimeout(() => {
        animationOn();
    }, 750);
    setTimeout(() => {
        animationOff();
    }, 1000);
    setTimeout(() => {
        animationOn();
    }, 1250);
    setTimeout(() => {
        animationOff();
    }, 1500);
    setTimeout(() => {
        animationOn();
    }, 1750);
}

function animationOn() {
    const $panel = document.querySelectorAll('.cuadro');
    $panel.forEach(function ($panel) {
        $panel.style.opacity = 1;
    });
}

function animationOff() {
    const $panel = document.querySelectorAll('.cuadro');
    $panel.forEach(function ($panel) {
        $panel.style.opacity = 0.5;
    });
}
