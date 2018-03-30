/*
*   class: handPointer  未被点击过,可以接受点击
*   class: worked       点击过
*   class：disable      暂时灭活
*/

window.onload = function () {
    $('#button').on('mouseenter', reset);
    $('#button').mouseout(function () {
        console.log("hide");
        $('#clickOrder').hide().text("");
    });
}

function getNum(event) {
    var counter = event.data.index + 1;
    var clickOrder = event.data.order;
    console.log(this.innerText);
    $(".button").off('click');
    var xmlhttp = new XMLHttpRequest();
    
    $('#button').on('mouseleave', function () {
        xmlhttp.abort();
    });
    
    var _this = this;
    $(this).find('.numPosition').show();
    $(this).find('.numPosition').text('...');
    //console.log(xmlhttp.readyState);
    xmlhttp.open("GET", "ajax" + _this.innerText, true);
    xmlhttp.send();
    $(".button").not('.worked').not(this).addClass('disable');
    $(".button").not('.worked').not(this).removeClass('handPointer');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            $(_this).find('.numPosition').text(xmlhttp.responseText);
            $(_this).removeClass('handPointer');
            $(_this).addClass('worked');
            $(".button").not('.worked').removeClass('disable');
            $(".button").not('.worked').addClass('handPointer');
            $(".button").not('.worked').off('click').on('click', { order: clickOrder, index: counter }, getNum);
            $('#button').off('mouseleave');
            if($('.worked').length <= 4)
                robotClick(clickOrder,counter);
            check();
        }
    }
}

function getAnswer() {
    var answer = 0;
    $(".button").each(function () {
        answer += Number($(this).find('.numPosition').text());
    });
    $('.answerBlock').text(answer);
    $('#info-bar').removeClass('able');
    $('#info-bar').addClass('disable');
    $('#info-bar').removeClass('handPointer');
}

function check() {
    if ($(".worked").length == 5) {
        $('#info-bar').addClass('handPointer');
        $('#info-bar').removeClass('disable');
        $('#info-bar').addClass('able');
        $('#info-bar').off('click');
        $('#info-bar').on('click', getAnswer);
        clickAnswer();
    }
}

function reset() {
    counter = 0;
    console.log('reset');
    $('.numPosition').hide();
    $(".button").off('click').each(function () {
        $(this).find('.numPosition').text("");
        $(this).removeClass('disable');
        $(this).removeClass('worked');
        $(this).addClass('handPointer');
    });
    $('.answerBlock').text("");
    $('#info-bar').off('click');
    $('#info-bar').addClass('disable');
    $('#info-bar').removeClass('able');
    $('#clickOrder').hide();
    $('.icon').off('click').on('click', function () {
        $('.icon').off('click')
        $(".button").off('click').on('click', getNum);
        getRobotClickOrder();
    });
}

function getRobotClickOrder() {
    var buf = ['A','B','C','D','E'];
    var clickOrder = [];
    var order = "";
    while(clickOrder.length < 5) {
        var tmp = getRandomNumber(4);
        if(clickOrder.indexOf(tmp) == -1) {
            clickOrder.push(tmp);
            order += buf[tmp];
            if (clickOrder.length != 5) order += "->";
        }
    }
    $('#clickOrder').show().text(order);
    var counter = 0;
    $('.button').off('click').on('click',{order:clickOrder, index:counter},getNum);
    robotClick(clickOrder,0);
    
}

function getRandomNumber(limit) {
    return Math.round(Math.random() * limit);
}

function robotClick(clickOrder,index) {
    $(".button").eq(clickOrder[index]).click();
}

function clickAnswer() {
    $('#info-bar').click();
}