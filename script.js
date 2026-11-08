var character = document.getElementById("character");
var block = document.getElementById("block");
var counter = 0;
var back = new Audio('./music/back.wav');
var jumping = new Audio('./music/jump.wav');
var fail = new Audio('./music/fail.wav');
back.loop = true;
var playing = false;
var gameLoop = null;
var assetsReady = false;

function jump() {
    if (!assetsReady) { return; }
    if (character.classList.contains("animate")) { return; }
    document.getElementById("man").src = "./img/manjump.png";
    jumping.currentTime = 0;
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
    fail.currentTime = 0;
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
    if (!assetsReady) { return; }
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

function preloadImage(src) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = function () {
            reject(new Error("Unable to load " + src));
        };
        image.src = src;
    });
}

function preloadAudio(audio) {
    audio.preload = "auto";
    return new Promise(function (resolve, reject) {
        if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
            resolve();
            return;
        }

        audio.addEventListener("canplaythrough", resolve, { once: true });
        audio.addEventListener("error", function () {
            reject(new Error("Unable to load " + audio.src));
        }, { once: true });
        audio.load();
    });
}

function preloadAssets() {
    var loader = document.getElementById("loader");
    var message = document.getElementById("loading-message");
    var progress = document.getElementById("loading-progress");
    var assets = [
        preloadImage("./img/back.png"),
        preloadImage("./img/back3.gif"),
        preloadImage("./img/b1.png"),
        preloadImage("./img/man.gif"),
        preloadImage("./img/manjump.png"),
        preloadImage("./img/pause.JPG"),
        preloadAudio(back),
        preloadAudio(jumping),
        preloadAudio(fail)
    ];
    var loaded = 0;

    Promise.all(assets.map(function (asset) {
        return asset.then(function () {
            loaded++;
            progress.value = Math.round(loaded / assets.length * 100);
        });
    })).then(function () {
        assetsReady = true;
        loader.hidden = true;
        document.getElementById("popup-1").classList.add("active");
    }).catch(function () {
        message.textContent = "Some game assets could not be loaded. Check your connection and reload the page.";
        progress.hidden = true;
    });
}

function initializeGame() {
    document.getElementById("scoreSpan").innerHTML = 0;
    document.getElementById("cont").innerHTML = "Welcome";
    document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
    block.style.animation = "none";
    preloadAssets();
}

initializeGame();