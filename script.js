var character = document.getElementById("character");
var block = document.getElementById("block");
var counter = 0;
var back = new Audio('./music/back.wav');
back.loop = true;
var playing = false;
var gameLoop = null;

function jump() {
    if (character.classList.contains("animate")) { return; }
    document.getElementById("man").src = "./img/manjump.png";
    var jumping = new Audio('./music/jump.wav');
    jumping.play();
    character.classList.add("animate");
    setTimeout(function () {
        character.classList.remove("animate");
        document.getElementById("man").src = "./img/man.gif";
    }, 1000);
}

function checkCollision() {
    if (character.classList.contains("animate")) { return false; }

    var characterBounds = character.getBoundingClientRect();
    var blockBounds = block.getBoundingClientRect();

    return characterBounds.left < blockBounds.right &&
        characterBounds.right > blockBounds.left &&
        characterBounds.top < blockBounds.bottom &&
        characterBounds.bottom > blockBounds.top;
}

function endGame() {
    playing = false;
    back.pause();
    var fail = new Audio('./music/fail.wav');
    fail.play();
    block.style.animation = "none";
    document.getElementById("gameover").innerHTML = "GAME OVER";
    document.getElementById("cont").innerHTML = "Score : " + Math.floor(counter / 100);
    document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
    viewPopup();
    window.clearInterval(gameLoop);
    gameLoop = null;
}

function startGameLoop() {
    if (gameLoop !== null) { return; }

    gameLoop = window.setInterval(function () {
        if (!playing) { return; }

        if (checkCollision()) {
            endGame();
            return;
        }

        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
    }, 10);
}

function viewPopup() {
    playing = false;
    document.getElementById("popup-1").classList.add("active");
}

function hidePopup() {
    playing = true;
    document.getElementById("popup-1").classList.remove("active");
}

function start() {
    if (playing == false) {
        playing = true;
        counter = 0;
    }
    back.play();
    hidePopup();
    document.getElementById("anim").style.backgroundImage = "url('./img/back3.gif')";
    block.style.animation = "block 5s infinite linear";
    startGameLoop();
}

document.body.onkeyup = function (e) {
    if (e.code === "Space") {
        e.preventDefault();
        jump();
    }
};

window.onload = function () {
    document.getElementById("scoreSpan").innerHTML = 0;
    document.getElementById("cont").innerHTML = "Welcome";
    document.getElementById("popup-1").classList.add("active");
    document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
    block.style.animation = "none";
};