var domReport = function (msg, isError) {
    var $div = $('<div>').text(msg);

    if (!!isError) {
        $div.addClass('error');
    }

    $("#output-inner").append($div);
}

if (Vessel) {
    Vessel.onReport = domReport;
}

if (Planet) {
    Planet.onReport = domReport;
}

jQuery(function ($) {
    $('#clear-code').on('click', function (e) {
        var $textarea = $("#code textarea");

        if (!!$textarea.val() && confirm('Вы точно хотите стереть весь код?')) {
            $textarea.val("");
        }
    });

    $('#clear-output').on('click', function (e) {
        $("#output-inner").empty();
    });

    $('#execute').on('click', function (e) {
        var code = $("#code textarea").val();

        try {
            eval(code);
        }
        catch (ex) {
            domReport(ex.message, true);
        }
    });

})




