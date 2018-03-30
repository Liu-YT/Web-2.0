/*
*   class: handPointer  未被点击过,可以接受点击
*   class: worked       点击过
*   class：disable      暂时灭活
*/

window.onload = function () {
    $('#button').on('mouseenter', reset);
}

function getNum() {
    var _this = this;
    setTimeout(function(){
        ask(_this);
    },0);
}

function ask(_this) {
    $(".button").off('click');
    console.log(_this.innerText);
    var xmlhttp = new XMLHttpRequest();

    $('#button').one('mouseleave',function () {
        xmlhttp.abort();
    });
    $(_this).find('.numPosition').show();
    $(_this).find('.numPosition').text('...');
    //console.log(xmlhttp.readyState);
    xmlhttp.open("GET", "ajax"+_this.innerText, true);
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
            $(".button").not('.worked').off('click').on('click', getNum);
            check();
        }
    };
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
    $(".button").off('click').on('click', getNum).each(function () {
        $(this).find('.numPosition').text("");
        $(this).removeClass('disable');
        $(this).removeClass('worked');
        $(this).addClass('handPointer');
    });
    $('.answerBlock').text("");
    $('#info-bar').off('click');
    $('#info-bar').addClass('disable');
    $('#info-bar').removeClass('able');
    $('.icon').off('click').on('click', function () {
        $('.icon').off('click')
        $(".button").off('click').on('click', getNum);
        robotClick();
    });
}

function robotClick() {
    $(".button").click();
}

function clickAnswer() {
    $('#info-bar').click();
}