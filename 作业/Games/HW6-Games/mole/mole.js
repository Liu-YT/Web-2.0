/*
*    initial--true && flag--true 代表游戏开始并且正在进行
*    initial--false && flag--false 代表游戏还没开始
*    initial--true && flag--false 代表游戏暂停
*    initial--false && flag--true 代表游戏结束
*/
var initial = false; 
var flag = false; 
var score = 0;
var time = 30;
var nodes;   //array of button
var n_time;
var mole = false; //judge wheather there is a mole exist

var functionButton = document.getElementById("functionButton");

window.onload = function() {
    var buttonPosition = document.getElementById("gameBlock");
    for(var i = 0; i < 60; i++){
            var _button = document.createElement("button");
            _button.id = "oldStyle";
            buttonPosition.appendChild(_button);
    }
    nodes = document.getElementsByTagName("button");
    document.getElementById("functionButton").onclick = function() {
        //开始游戏
        if(!initial && !flag || initial && !flag || !initial && flag) {
            if (!initial && !flag || !initial && flag) {
                time = 30;
                score = 0;
                mole = false;
                document.getElementById('time').innerText = time;
                document.getElementById('score').innerText = score;
                for(var i = 1; i <= 60; i++)  nodes[i].id = "oldStyle";
            }
            document.getElementById("game_status").innerText = "Playing";
            initial = flag = true;
            n_timer = timer();
            if(!mole) startGame();
        }
        //暂停游戏
        else if (initial && flag) {
            document.getElementById("game_status").innerText = "Stop";
            pause();
            flag = false;
        }
    }                          
    for(var i = 1; i <= 60; i++) {
        nodes[i].onclick = eventHanding;
    }
}

function eventHanding() {
    if(this.id === "newStyle" && initial && flag) {
        ++score;
        this.id = "oldStyle";
        var num = parseInt(Math.random()*100) % 60 + 1;
        nodes[num].id = "newStyle";
        mole = true;
    }
    else if(initial && flag) 
        if(score > 0)   --score;
    document.getElementById("score").innerText = score;
}

function timer() {
    return setInterval(function () {
        if (time > 0)   --time;
        else {
            initial = false;
            document.getElementById("game_status").innerText = "Game Over";
            clearInterval(n_timer);
            alert("Game Over!\nYour score is: " + score);
        }
        document.getElementById('time').innerText = time;
    }, 1000);
}

function pause() {
    clearInterval(n_timer);
}

function startGame() {
    var num = parseInt(Math.random()*100) % 60 + 1;
    nodes[num].id = "newStyle";
    mole = true;
}
