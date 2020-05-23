document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementsByClassName("header")[0]
    window.addEventListener('scroll', function (e) {
        if (document.documentElement.scrollTop > 80) {
            header.classList.add("headerWhite")
        }
        else header.classList.remove("headerWhite")
    })

}, false);

$(document).mouseup(function (e) {
    var container = $(".imgPopup");
    var popup = $(".popup")
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        popup.hide()
        container.hide();
    }
});

// scroll smooth
// handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function (e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top;
    // animated top scrolling
    $('body, html').animate({ scrollTop: pos });
});
// end scroll smooth



