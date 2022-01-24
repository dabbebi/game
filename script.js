var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;
var back = new Audio('./music/back.wav');
var playing = false;

function jump(){
    if(character.classList == "animate"){return}
    var jumping = new Audio('./music/jump.wav');
    jumping.play();
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },1000);
}

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<100 && blockLeft>0 && characterTop>=420){
        playing = false;
        back.pause();
        var fail = new Audio('./music/fail.wav');
        fail.play();
        block.style.animation = "none";
        document.getElementById("gameover").innerHTML = "GAME OVER";
        document.getElementById("cont").innerHTML = "Score : " +  Math.floor(counter/100);
        document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
        viewPopup();
        checkDead.pause();
        return;
        
    }else{
        if(!document.getElementById("popup-1").classList.contains("active")){
            playing = true;
            back.play();
            counter++;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        }
    }
}, 10);



function viewPopup(){
    playing = false;
    document.getElementById("popup-1").classList.add("active");
}

function hidePopup(){
    playing = true;
    document.getElementById("popup-1").classList.remove("active");
}

function start(){
    if(playing == false){
        playing = true;
        counter=0;
    }
    back.play();
    hidePopup();
    document.getElementById("anim").style.backgroundImage = "url('./img/back3.gif')";
    block.style.animation = "block 5s infinite linear";
    checkDead.resume();
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        jump();
    }
} 

window.onload = function() {
    document.getElementById("scoreSpan").innerHTML = 0;
    document.getElementById("cont").innerHTML = "Welcome";
    document.getElementById("popup-1").classList.add("active");
    document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
    var block = document.getElementById("block");
    block.style.animation = "none";
};