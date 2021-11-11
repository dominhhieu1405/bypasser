$(function (){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        $("#auto-sort").val(url);
    });
    setTimeout(function () {
        let url = $("#auto-sort").val();
        $.post(
            "https://k6api.xyz/bypass/v1.php",
            {url: url},
            function (bypass) {
                if (bypass.status) {
                    $("#auto-url").val(bypass.result);
                    $("#auto-msg").html("<div class=\"text-success\">" + bypass.msg + "</div>").show();
                    $("#auto-btn").attr("href", bypass.result).attr("disabled", false).show();
                    $("#auto-success").show();
                } else {
                    $("#auto-msg").html("<div class=\"text-danger\">" + bypass.msg + "</div>").show();
                    $("#auto-btn").attr("disabled", true).hide();
                    $("#auto-success").hide();
                }
            },
            'json'
        );

        /*$.ajax({
            type: "post",
            url: "https://api.bypass.vip/",
            data: {url: url},
            success: function (data, status) {

            },
            error: function (request, status, error) {

            }
        });*/
    },33);

    var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function() {
        alert('Copied!');
    });

    $("#bypass").on("click", function () {
        $("#get-msg").hide();
        let link = $("#get-sort").val();
        if (link.length > 0) {
            $.post(
                "https://k6api.xyz/bypass/v1.php",
                {url: link},
                function (bypass) {
                    if (bypass.status) {
                        $("#get-success").show();
                        $("#get-btn").attr("disabled", false).attr("href", bypass.result).show();
                        $("#get-url").val(bypass.result);
                        $("#get-msg").html("<div class=\"text-danger\">" + bypass.msg + "</div>").show();
                    } else {
                        $("#get-btn").hide().attr("disabled", true).attr("href", "#");
                        $("#get-url").val(null);
                        $("#get-msg").html("<div class=\"text-danger\">" + bypass.msg + "</div>").show();
                    }
                },
                'json'
            );
            /*$.ajax({
                type: "post",
                url: "https://api.bypass.vip/",
                data: {url: link},
                success: function (data, status) {
                },
                error: function (request, status, error) {
                }
            });*/
        } else {
            $("#get-success").hide();
            $("#get-btn").hide().attr("disabled", true).attr("href", "#");
            $("#get-url").val(null);
            $("#get-msg").html("<div class=\"text-danger\">Bạn chưa nhập link</div>").show();
        }
    });
});