'use-strict';

jQuery(function($) {
    /* Open/close color picker */
    $('.anps-cp-toggle').on('click', function() {
        $('body').toggleClass('anps-cp-open');
        $(this).blur();
    });

    /* Disable when verticla menu is active */
    if( $('.vertical-menu').length ) {
        $('#boxed, #sticky, [name="pattern"]').prop('disabled', 'disabled');
    }

    /*-----------------------------------------------------------------------------------*/
	/*	Demos
	/*-----------------------------------------------------------------------------------*/

    var currentDemo = window.location.href.match(/demo-(.)/)[0];

    if( currentDemo !== sessionStorage.getItem('currentDemo') ) {
        var options = ['style', 'boxed', 'sticky', 'pattern']

        /* Clear all options when switching demos */
        options.forEach(function(option) {
            sessionStorage.removeItem(option);
        });
    }

    sessionStorage.setItem('currentDemo', currentDemo);

    /*-----------------------------------------------------------------------------------*/
	/*	Sticky
	/*-----------------------------------------------------------------------------------*/

    /* Initial */
    if( sessionStorage.getItem('sticky') === 'false' ) {
        $('#sticky').prop('checked', null);
    } else if( $('.stickyheader').length || sessionStorage.getItem('sticky') === 'true' ) {
        $('#sticky').prop('checked', 'checked');
        sessionStorage.setItem('sticky', true);
    }

    function setSticky() {
        if( sessionStorage.getItem('sticky') === 'true' ) {
            $('body').addClass('stickyheader');
            if( $(window).scrollTop() > 100 ) {
                window.addSticky();
            }
        } else {
            $('body').removeClass('stickyheader');
            window.removeSticky();
        }
    }

    $('#sticky').on('change', function() {
        sessionStorage.setItem('sticky', $(this).is(':checked'));
        setSticky();
    });

    setSticky();

    /*-----------------------------------------------------------------------------------*/
	/*	Boxed
	/*-----------------------------------------------------------------------------------*/

    function changePattern() {
        if( $('body').hasClass('boxed') ) {
            /* Remove old pattens */
            for(var i=1; i<=6; i++) {
                $('body').removeClass('pattern-' + i);
            }

            var stored = sessionStorage.getItem('pattern');
            var pattern = stored !== null ? stored : 'pattern-1';

            /* Set new pattern */
            $('body').addClass(pattern);
        }
    }

    /* Change layout */
    function changeLayout() {
        if( sessionStorage.getItem('boxed') !== null ) {
            if( sessionStorage.getItem('boxed') === 'true' ) {
                $('body').addClass('boxed');
            } else {
                $('body').removeClass('boxed');
            }

            $(window).trigger('resize');

            changePattern();
        }
    }

    /* Set Initial Values */
    if( sessionStorage.getItem('boxed') === 'false' ) {
        $('#boxed').prop('checked', null);
    } else if( $('body.boxed').length || sessionStorage.getItem('boxed') === 'true' ) {
        $('#boxed').prop('checked', 'checked')
    }

    if( sessionStorage.getItem('pattern') !== null ) {
        $('#' + sessionStorage.getItem('pattern')).prop('checked', 'checked');
    } else if( $('[class*="pattern"]').length ) {
        $('#' + $('body').attr('class').match(/pattern-(.)/)[0]).prop('checked', 'checked');
    }

    /* On layout & pattern change */
    $('#boxed, [name="pattern"]').on('change', function() {
        sessionStorage.setItem('boxed', $('#boxed').is(':checked'));
        sessionStorage.setItem('pattern', $('[name="pattern"]:checked').attr('id'))
        changeLayout();
    });

    /* Change layout on load */
    changeLayout();

    /*-----------------------------------------------------------------------------------*/
	/*	Styles (colors)
	/*-----------------------------------------------------------------------------------*/

    var old = 'style-1';
    if( $('#theme_wordpress_style-inline-css').html().indexOf('fc9732') > -1 ) {
        old = 'style-2';
        $('#style-2').prop('checked', 'checked')
    }
    if( currentDemo == 'demo-9' ) {
        old = 'style-5';
        $('#style-5').prop('checked', 'checked');
    }

    if( sessionStorage.getItem('style') !== null ) {
        $('#' + sessionStorage.getItem('style')).prop('checked', 'checked')
    }

    function changeLogos(id) {
        if( $('.above-nav-style-2').length ) {
            $('.logo-wrap img').attr('src', $('#plugin-path').val() + '/img/footer-logos/' + id + '.png');
        } else if( $('.logo-background').length ) {
            $('.logo-wrap img').attr('src', $('#plugin-path').val() + '/img/light-logos/' + id + '.png');
        } else {
            $('.logo-wrap img').attr('src', $('#plugin-path').val() + '/img/logos/' + id + '.png');
        }

        $('.logo-sticky img').attr('src', $('#plugin-path').val() + '/img/logos/' + id + '.png');

        $('.widget_anpsimages img').attr('src', $('#plugin-path').val() + '/img/footer-logos/' + id + '.png');
    }

    function changeMarkers(id) {
        if( typeof window.anpsMarkers === 'undefined' ) return false;

        if( typeof id === 'undefined' ) {
            id = sessionStorage.getItem('style');
        }

        window.anpsMarkers.forEach(function(marker) {
            marker.setIcon($('#plugin-path').val() + '/img/markers/' + id + '.png');
        });
    }

    window.anpsMapsLoaded = changeMarkers;

    function changeCode(el, schemes, id, addRev) {
        $(el).each(function() {
            var code = $(this).html();

            for(var i=0; i<schemes['style-1'].length; i++) {
                code = code.replace(new RegExp(schemes[old][i], 'g'), schemes[id][i]);
            }

            if( addRev ) {
                if( currentDemo === 'demo-9' ) {
                    code += '#slide-5-layer-5, #slide-2-layer-5, #slide-6-layer-5 { color: #' + schemes[id][0] + ' !important; } ';
                }
                code += '.anps-cp-rev { background-color: #' + schemes[id][0] + ' !important; } .anps-cp-rev:hover { background-color:  #' + schemes[id][1] + ' !important; }';
            }

            $(this).html(code);
        });
    }

    function changeRS(schemes, id) {
        if( !$('.rev-btn').length ) return false;

        // var str = $('.rev-btn').attr('data-style_hover');
        // var strColor = str.substring(str.lastIndexOf(':') + 1, str.lastIndexOf(';'));

        $('.rev-btn').each(function() {
            var bg = $(this).css('background-color');
            if( bg === 'rgb(255, 255, 255)' || bg === 'rgb(105, 205, 114)' ) return true;

            $(this).addClass('anps-cp-rev');
        });
    }

    function changeStyle(fallback) {
        var id = $(this).attr('id') ? $(this).attr('id') : fallback;
        var schemes = {
            // primary, hovers, Text on top of primary color,
            'style-1': ['3498db', '2a76a9', '3daaf3', '2f4d60'],
            'style-2': ['fc9732', 'f27a03', 'f2881d', '7d3f00'],
            'style-3': ['89c218', '64910a', '92d40f', '3d5c00'],
            'style-4': ['e82a2a', 'ba0000', 'f23535', '630000'],
            'style-5': ['f7c51e', 'ffc400', 'f7c51e', '755a02'],
        }

        /* Change Google Maps Markers */
        changeMarkers(id);

        /* Revolution Slider */
        changeRS(schemes, id);

        /* Change Logos */
        changeLogos(id);

        /* Theme Colors */
        changeCode('#theme_wordpress_style-inline-css', schemes, id, true);

        if( $('.download').length ) {
            changeCode('.download', schemes, id);
        }

        if( $('.contact-cards').length ) {
            changeCode('.contact-cards', schemes, id);
        }

        if( $('.widget_anpstext').length ) {
            changeCode('.widget_anpstext', schemes, id);
        }

        /* Visual Composer */
        if( $('[data-type="vc_shortcodes-custom-css"]').length ) {
            changeCode('[data-type="vc_shortcodes-custom-css"]', schemes, id);
        }

        /* Store current style */
        old = id;
        sessionStorage.setItem('style', id);
    }

    $('[name="style"]').on('change', changeStyle);
    changeStyle(sessionStorage.getItem('style') ? sessionStorage.getItem('style'): old);

    /*-----------------------------------------------------------------------------------*/
	/*	Analytics
	/*-----------------------------------------------------------------------------------*/
    /* Toggle */
    $('.anps-cp-toggle').on('click', function() {
        if( typeof ga !== 'undefined' ) {
            ga('send', 'event', 'Color picker', 'Toggle');
        }
    });

    /* Style & Pattern */
    $('.anps-cp-select label').on('click', function() {
        if( typeof ga !== 'undefined' ) {
            var eventValue = $(this).attr('for').replace(/\-/g, ' ');
            eventValue = eventValue.charAt(0).toUpperCase() + eventValue.slice(1);

            var eventLabel = 'Style';
            if( $(this).attr('for').indexOf('pattern') > -1 ) {
                eventLabel = 'Pattern';
            }

            ga('send', 'event', 'Color picker', eventLabel, eventValue);
        }
    });

    /* Sticky & Boxed */
    $('#boxed, #sticky').on('change', function() {
        $el = $(this).next();

        var eventLabel = $el.attr('for');
        eventLabel = eventLabel.charAt(0).toUpperCase() + eventLabel.slice(1);

        var eventValue = 'OFF';
        if( $el.prev().is(':checked') ) {
            eventValue = 'ON';
        }

        if( typeof ga !== 'undefined' ) {
            ga('send', 'event', 'Color picker', eventLabel, eventValue);
        }
    });

    /* Demos */
    $('.anps-cp-demos').on('click', function() {
        if( typeof ga !== 'undefined' ) {
            ga('send', 'event', 'Color picker', 'Demos change', $(this).find('img').attr('alt'));
        }
    });
});
