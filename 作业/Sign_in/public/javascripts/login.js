window.onload =  function() {

    $('input').blur(function () {
        var self = this;
        if (validator.isFieldValid(this.id, $(this).val())) {
            $(self).parent().find('.status').removeClass('false');
            $(self).parent().find('.status').addClass('true');
            $(self).parent().find('.inputError').text("");
        } else {
            $(self).parent().find('.inputError').text(validator.form[this.id].errorMessage);
            $(self).parent().find('.status').removeClass('true');
            $(self).parent().find('.status').addClass('false');
        }
        if (validator.isLoginFormValid()) {
            $('.signin').addClass('ableClick');
        } 
    });

    $('.signin').click(function () {
        $('input').blur();
        if (validator.isLoginFormValid()) document.forms[0].submit();
    });

}

function reset() {
    $('input').each(function () {
        $(this).parent().find('.status').removeClass('false');
        $(this).parent().find('.status').removeClass('true');
        $(this).val("");
    });
    $('.inputError').each(function () {
        $(this).text("");
    });
    $('.signin').removeClass('ableClick');
}