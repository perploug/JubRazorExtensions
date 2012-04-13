/// <reference path="jquery-1.7.1.min.js" />

//DOM Ready
$(function () {
    //Hover popover for employee grid
    $("a[rel=popover]").popover({ placement: 'left' }).click(function (e) {
        //If we click link we just prevent it
        e.preventDefault();
    })

    //Wireup fancybox to our images
    $(".fancybox").fancybox({
        prevEffect: 'fade',
        nextEffect: 'fade'
    });


    //For each comment reply - hide it
    $(".comment-replies").each(function (e) {
        if ($(this).find(".comment").length > 0) {
            $(this).find("div.comment-reply").hide();
        } else {
            $(this).hide();
        }
    });

    //Toggle comment link
    $("a.toggle-comment").click(function (e) {
        if ($(this).parent().next(".comment-replies").find(".comment").length > 0) {
            $(this).parent().next(".comment-replies").find(".comment-reply").fadeToggle("fast");
        }
        else {
            $(this).parent().next(".comment-replies").fadeToggle("fast");
        }
        e.preventDefault();
    });

    //Toggle File Upload
    $("a.toggle-upload").click(function (e) {
        $(this).next(".status-upload").slideToggle("fast");
        e.preventDefault();
    });

    //Like a post
    $("a.post-like").click(function (e) {
        var link = $(this);
        var status = {};
        status.statusId = link.attr("rel");

        /* Task 3 */
        $.getJSON("/Likes/LikeStatus", status, function (data) {
            link.find("span").html(data.likes);
        });
        

        /* Task 9
        $.getJSON("/Relations/Like", status, function (data) {
            link.find("span").html(data.likes);
        });*/

        e.preventDefault();
    });


    //Validate form & add CSS class to parent element on validation
    if ($('.validate-form').length > 0) {
        var supportFormValidateSettings = $.data($('.validate-form')[0], 'validator').settings;

        console.log(supportFormValidateSettings);

        supportFormValidateSettings.errorClass = "error";
        supportFormValidateSettings.validClass = "success";

        supportFormValidateSettings.highlight = function (element, errorClass, validClass) {
            console.log(element);
            $(element).next('span').addClass('help-inline');

            //We add the error class and remove the valid class to the parent <div>
            $(element).parents(".control-group").addClass(errorClass).removeClass(validClass);
        }

        supportFormValidateSettings.unhighlight = function (element, errorClass, validClass) {
            //We remove the error class and add the valid class to the parent <div>
            $(element).parents(".control-group").removeClass(errorClass).addClass(validClass);
        }
    }

});



