'use strict';

jQuery(function($) {
    function pluginRow() {
        if (window.innerWidth < 500) {
            $('.plugins__item').unwrap('.plugins__row');
        } else if($(window).width() >= 500 && !$('.plugins__row').length) {
            $('.plugins').html(pluginRowInitial);
        }
    }

    var pluginRowInitial = $('.plugins').html();
    $(window).on('resize', pluginRow);
    pluginRow();

    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();

        var icon = $(this).children('.fa');

        $('.nav').toggleClass('nav--active');

        if ($('.nav--active').length) {
            icon.addClass('fa-close').removeClass('fa-bars');
        } else {
            icon.removeClass('fa-close').addClass('fa-bars');
        }
    });

    var onePageLinks = $('.nav a[href*="#"]:not([href="#"]):not([href*="="])');

    onePageLinks.on('click', function(e) {
        var href = $(this).attr('href');

        var target = $($(this).attr('href'));
        var offset = 0; /* Desired spacing */

        if (href === '#demos') {
            offset = 30;
        }

        if (target.length) {
            var targetoffset = target.offset().top - offset;

            $('html, body').animate({
                scrollTop: targetoffset
            }, 1000, function () {
                history.pushState(null, null, href);
            });

            return false;
        }
    });

    /* Analytics */

    $('.demos__item--link').on('click', function (e) {
        if( typeof ga !== 'undefined' ) {
            var url = $(this).attr('href');

            ga('send', 'event', 'Demos', url);
        }
    });

    $('[data-purchase]').on('click', function (e) {
        //e.preventDefault();

        if( typeof ga !== 'undefined' ) {
            var url = $(this).attr('href');
            var type = $(this).data('purchase');

            ga('send', 'event', 'Purchase link', type, {
                //'hitCallback': function(){ window.top.location = url; }
            });
        }
    });

    $.scrollDepth({
        elements: ['#demos', '#header-options', '#theme-options', '#visual-composer', '#revolution-slider', '#features', '#testimonials', '#elite-author'],
    });

    /* Testimonials */

    $(window).on('load', function() {
        var reviews = $('.reviews').masonry({
          itemSelector: '.review',
        });
    });
});
