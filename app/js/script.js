'use strict';

$(document).ready(function () {

    // ====== toggle navigation ======= //
    $(".navigation__hamburger").click(function () {
        const $this = $(this);


        $this.toggleClass("active");
        $this.next().slideToggle();

        setTimeout(function () {
            $this.parent().next().toggleClass("active");
        }, 200);
    });
    // ================================ //


    // ====== fixed navigation ======= //
        $(window).scroll(function() {
            if($(this).scrollTop() >= 350) {
                $(".page__first-fictures").children().eq(0).addClass('stickyTop');
            }
            else{
                $(".page__first-fictures").children().eq(0).removeClass('stickyTop');
            }
        });
    // ================================ //


    // ====== scroll down ======= //
    $(".first-fictures__btn-scroll").on("click", function(event) {
        event.preventDefault();

        const id = $(this).attr('href'),
            top = $(id).offset().top,
            heightHeader = $("header").height(),
            currentScrollTop = $(window).scrollTop();
        if(currentScrollTop == 0) {
            $("body, html").animate({scrollTop: top-heightHeader}, 500);
        } else {
            $("body, html").animate({scrollTop: 0}, 500);
        }
    });
    // ================================ //


    // ====== slider ======= //
    var autoplay;

    function slider(numVis_max767, numVis_max991, numVis_max1199, numVis_min1200, boolAutoplay) {

        var windowWidth = $(window).width(),
            numVis;

        if(windowWidth <= 767) {
            numVis = numVis_max767;
        } else if (windowWidth > 767 && windowWidth <= 991) {
            numVis = numVis_max991;
        } else if (windowWidth > 991 && windowWidth <= 1199) {
            numVis = numVis_max1199;
        } else {
            numVis = numVis_min1200;
        }

        if(numVis <= $(".slider__item").length) {
            numVis = numVis;
        } else {
            numVis = $(".slider__item").length;
        }

        var widthOne = 100/numVis,
            widthAll = ($(".slider__item").length*widthOne),
            marginLeft = 0;

        $(".slider__items").width(widthAll + "%");
        $(".slider__item").width(widthOne + "%");

        $("#arrow-left").on("click", function() {
            if((-marginLeft).toFixed(2) == (widthAll - 100).toFixed(2)) {
                marginLeft = 0;
            } else {
                marginLeft = marginLeft - widthOne;
            }

            $(".slider__items").css({"margin-left": marginLeft + "%"});
        });

        $("#arrow-right").on('click', function () {
            if(marginLeft >= 0) {
                marginLeft = -widthAll + 100;
            } else {
                marginLeft = marginLeft + widthOne;
            }

            $(".slider__items").css({"margin-left": marginLeft + "%"});
        });

        autoplay = boolAutoplay ? setInterval("$('#arrow-left').trigger('click')", 2000) : null;
    }

    slider(1, 2, 3, 4, true);
    $(window).on("resize", function () {
        clearInterval(autoplay);
        slider(1, 2, 3, 4, true);
    });
    // ================================ //

});

