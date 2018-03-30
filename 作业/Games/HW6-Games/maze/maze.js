/*
*    initial--true && flag--true 代表游戏开始并且正常进行，没有作弊
*    initial--false && flag--false 代表游戏还没开始
*    initial--true && flag--false 代表游戏暂停
*    initial--false && flag--true 代表触碰墙壁，游戏结束
*/


var flag = 1; //1代表正规操作，0代表出界
var initial = false; //true为开始游戏，false为未开始
var touchS = false;

window.onload = function() {
    document.getElementById('start').onmouseover = startGame;
    document.getElementById('end').onmouseover = function () {
        if (!touchS) document.getElementById('result').innerText = "Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!";
        if (!initial) return;
        else resultOfGame();
    };
} 

function startGame() {
    document.body.classList.add("gaming");
    touchS = true;
    flag = 1;
    initial = true;
    document.getElementById('result').innerText = "";
    document.getElementById('maze').onmouseleave = function () { flag = 0; };
    document.getElementById('maze').onmouseenter = function () { flag = 1; };
    var totalObstacle = document.getElementsByClassName('obstacle');
    for (var i = 0; i < totalObstacle.length; i++) {
        totalObstacle[i].onmouseover = getResult;
        totalObstacle[i].onmouseout = reset;
    } 
}

function reset() {        
    this.className = 'obstacle';
}

function getResult() {
    if (initial){
        flag = 1;
        this.className = 'new_obstacle';
        document.getElementById('result').innerText = "You Lose!";
        initial = false;
        document.body.classList.remove("gaming");
        touchS = false;
    }
}


function resultOfGame() {
    if (flag === 0)
        document.getElementById('result').innerText = "Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!";
    else
        document.getElementById('result').innerText = "You Win!";    
    initial = false;
    touchS = false;
    document.body.classList.remove("gaming");
}