var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;

function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },1000);
}

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<100 && blockLeft>0 && characterTop>=420){
        block.style.animation = "none";
        document.getElementById("cont").innerHTML = Math.floor(counter/100);
        document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
        viewPopup();
        clearInterval(checkDead);
        return;
        
    }else{
        if(!document.getElementById("popup-1").classList.contains("active")){
            counter++;
            document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        }
    }
}, 10);



function viewPopup(){
    document.getElementById("popup-1").classList.add("active");
}

function hidePopup(){
    document.getElementById("popup-1").classList.remove("active");
}

function start(){
    hidePopup();
    document.getElementById("anim").style.backgroundImage = "url('./img/back3.gif')";
    counter=0;
    block.style.animation = "block 5s infinite linear";
    checkDead = setInterval(function() {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        if(blockLeft<100 && blockLeft>0 && characterTop>=420){
            block.style.animation = "none";
            document.getElementById("cont").innerHTML = Math.floor(counter/100);
            document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
            viewPopup();
            clearInterval(checkDead);
            return;
            
        }else{
            if(!document.getElementById("popup-1").classList.contains("active")){
                counter++;
                document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
            }
            
        }
    }, 10);
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        jump();
    }
} 

window.onload = function() {
    document.getElementById("cont").innerHTML = 0;
    document.getElementById("popup-1").classList.add("active");
    document.getElementById("anim").style.backgroundImage = "url('./img/pause.JPG')";
    var block = document.getElementById("block");
    block.style.animation = "none";
};