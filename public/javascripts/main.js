$(function () {

    // scroll top button
    $("#myBtn").click(function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })

    // navigation color change && scroll top button popup
    var scroll;
    $(window).scroll(function () {
        scroll = $(window).scrollTop();
        width = $(window).width();

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $("#myBtn").css("display", "block");
        } else {
            $("#myBtn").css("display", "none");
        }

        if (width > 767) {
            if (scroll > 100) {
                $(".navbar").css("background-color", "rgba(20, 2, 0, 0.8)");
            } else {
                $(".navbar").css("background-color", "rgba(0, 0, 0, 0)");
            }
        }
    })

    // Gets the video src from the data-src on each button
    var videoSrc;
    $(".video-btn").click(function () {
        videoSrc = $(this).data("src");
    })

    // when the modal is opened autoplay it  
    $("#myModal").on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', videoSrc);
    })

    //review counter
    $(".count").counterUp({
        delay: 10,
        time: 1000
    })


    // document ready  
});