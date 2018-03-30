/*
* initial = false                    not start or wait to restart
* initial = true  && finish = false  playing
* initial = true  && finish = true   end
*/
var initial = false;
var finish = false;
var positionOfSpace = 15; //Record the location of the current blank cell
var orderOfBlank = 15;    //the blank cell 's div order  
var numOfChange = 0;

window.onload = function() {
    var position = document.getElementById("gameBlock");
    for (var i = 0; i <= 15; i++) {
        var _div = document.createElement("div");
        _div.className = "section_" + i;
        _div.classList.add("background_0");
        _div.id = "position_"+i;
        _div.value = i;
        position.appendChild(_div);
    }

    totalSection = document.getElementById("gameBlock").childNodes;

    for (var i = 0; i <= 15; i++)
        totalSection[i].onclick = move;

    document.getElementById("but").onclick = function() {
        document.getElementById("but").innerText = "重新开始";
        startGame();
    }

    document.getElementById("changeBackground").onclick = function() {
        var _tmp = numOfChange % 4;
        ++numOfChange;
        var tmp = numOfChange %  4;
        document.getElementById("template").className = "background_" + tmp;
        document.getElementById("but").innerText = "开始游戏";
        document.getElementById("result").innerText = "Waiting to start";
        for(var i = 0; i <= 15; i++) {
            totalSection[i].className = "section_" + i;
            totalSection[i].classList.add("background_"+tmp);
            totalSection[i].id = "position_" + i;
        }
        initial = false;
    }
}

function move() {
    if(initial && !finish) {
        if(this.value == positionOfSpace)  return;
        else {
            if(Math.abs(this.value-positionOfSpace) == 4) {
                var tmp = this.id;
                var _tmp = this.value;
                this.id = totalSection[orderOfBlank].id;
                totalSection[orderOfBlank].id = tmp;
                this.value = totalSection[orderOfBlank].value;
                totalSection[orderOfBlank].value = _tmp;
                positionOfSpace = _tmp;
            }
            else if (Math.abs(this.value - positionOfSpace) == 1) {
                if (parseInt(this.value / 4) == parseInt(positionOfSpace / 4) || parseInt(this.value / 4) == parseInt(positionOfSpace / 4)) {
                    var tmp = this.id;
                    var _tmp = this.value;
                    this.id = totalSection[orderOfBlank].id;
                    totalSection[orderOfBlank].id = tmp;
                    this.value = totalSection[orderOfBlank].value;
                    totalSection[orderOfBlank].value = _tmp;
                    positionOfSpace = _tmp;
                }
            }
        }
        for(var i = 0; i <= 15; i++) {
            var tmp = "position_" + i;
            if(tmp != totalSection[i].id)  break;
            else if(tmp == totalSection[i].id && i == 15) {
                finish = true;
                endGame();
            }
        }
    }
}
//initial data
function reset() {
    positionOfSpace = 15;
    for(var i = 0; i <= 15; i++) {
        totalSection[i].value = i;
        totalSection[i].className = "section_" + i;
        totalSection[i].id = "position_" + i;
        totalSection[i].classList.add("background_"+numOfChange%4);
    }
    initial = true;
    finish = false;
}

function endGame() {
    initial = false;
    document.getElementById("result").innerText = "Congratulation!\nYou win!";
}

function startGame() {
    reset();
    document.getElementById("result").innerText = "Playing!";
    changeLayout();
}
//打乱是靠随机次数移动空白的格子
function changeLayout() {
    var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //record the order of each div
    var frequency =  parseInt(Math.random() * 100) + 100;
    while (--frequency) {
        //move direction
        var ans = parseInt(Math.random() * 10) % 4;
        //left
        if (ans == 0 && positionOfSpace % 4 != 0) {
            var tmp = totalSection[order[positionOfSpace - 1]].id;
            var _tmp = order[positionOfSpace - 1];
            var ans = totalSection[order[positionOfSpace-1]].value;
            totalSection[order[positionOfSpace - 1]].id = totalSection[order[positionOfSpace]].id;
            totalSection[order[positionOfSpace]].id = tmp;
            totalSection[order[positionOfSpace - 1]].value = totalSection[order[positionOfSpace]].value;
            totalSection[order[positionOfSpace]].value = ans;
            order[positionOfSpace - 1] = order[positionOfSpace];
            order[positionOfSpace] = _tmp;
            --positionOfSpace;
        }
        //right
        else if(ans == 1 && positionOfSpace % 4 != 3) {
            var tmp = totalSection[order[positionOfSpace + 1]].id;
            var _tmp = order[positionOfSpace + 1];
            var ans = totalSection[order[positionOfSpace + 1]].value;
            totalSection[order[positionOfSpace + 1]].id = totalSection[order[positionOfSpace]].id;
            totalSection[order[positionOfSpace]].id = tmp;
            totalSection[order[positionOfSpace + 1]].value = totalSection[order[positionOfSpace]].value;
            totalSection[order[positionOfSpace]].value = ans;
            order[positionOfSpace + 1] = order[positionOfSpace];
            order[positionOfSpace] = _tmp;
            ++positionOfSpace;
        }
        //up
        else if(ans == 2 && parseInt(positionOfSpace / 4) != 0) {
            var tmp = totalSection[order[positionOfSpace - 4]].id;
            var _tmp = order[positionOfSpace - 4];
            var ans = totalSection[order[positionOfSpace - 4]].value;
            totalSection[order[positionOfSpace - 4]].id = totalSection[order[positionOfSpace]].id;
            totalSection[order[positionOfSpace]].id = tmp;
            totalSection[order[positionOfSpace - 4]].value = totalSection[order[positionOfSpace]].value;
            totalSection[order[positionOfSpace]].value = ans;
            order[positionOfSpace - 4] = order[positionOfSpace];
            order[positionOfSpace] = _tmp;
            positionOfSpace -= 4; 
        }
        //dowm
        else if(ans == 3 && parseInt(positionOfSpace / 4) != 3) {
            var tmp = totalSection[order[positionOfSpace + 4]].id;
            var _tmp = order[positionOfSpace + 4];
            var ans = totalSection[order[positionOfSpace + 4]].value;
            totalSection[order[positionOfSpace + 4]].id = totalSection[order[positionOfSpace]].id;
            totalSection[order[positionOfSpace]].id = tmp;
            totalSection[order[positionOfSpace + 4]].value = totalSection[order[positionOfSpace]].value;
            totalSection[order[positionOfSpace]].value = ans;
            order[positionOfSpace + 4] = order[positionOfSpace];
            order[positionOfSpace] = _tmp;
            positionOfSpace += 4;
        }
    }
}