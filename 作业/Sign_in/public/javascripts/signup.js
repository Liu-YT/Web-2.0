window.onload = function() {
    
    $('.passwordTwice').hide();

    $('input').blur(function () {
        var self = this;
        if (validator.isFieldValid(this.id, $(this).val())) {
            $(self).parent().find('.status').removeClass('false');
            $(self).parent().find('.status').addClass('true');
            $(self).parent().find('.inputError').text("");
            if (self.id == "userpassword") {
                $('.passwordTwice').show();
            }
        } else {
            $(self).parent().find('.inputError').text(validator.form[this.id].errorMessage);
            $(self).parent().find('.status').removeClass('true');
            $(self).parent().find('.status').addClass('false');
            if (self.id == "userpassword") {
                $('.passwordTwice').hide();
                $('#passwordTwice').val("");
                $('.passwordTwice').find('.status').removeClass('false');
                $('.passwordTwice').find('.status').removeClass('true');
                $('.passwordTwice').find('.inputError').text("");
            }
        }
        if (validator.isFormValid()) {
            $('.submit').addClass('ableClick');
        } else {
            $('.reset').addClass('ableClick');
        }
    });

    $('.submit').click(function () {
        $('input').blur();
        if (validator.isFormValid()) document.forms[0].submit();
    });

    $('.reset').click(reset);
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
    $('#passwordTwice').hide();
    $('.buf').removeClass('ableClick');
}