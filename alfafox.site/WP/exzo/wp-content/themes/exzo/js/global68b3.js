/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: "EX ZO"*/
/* Version: 1.0 Initial Release*/
/* Build Date: 06-02-2016*/
/* Author: UnionAgency*/
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

jQuery(function() {

    "use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
    var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
    _functions.pageCalculations = function(){
        winW = jQuery(window).width();
        winH = jQuery(window).height();
        headerH = jQuery('.header-empty-space').height();
        jQuery('.page-height').css({'height':(winH-headerH<=500)?500:(winH-headerH)});
    };
    _functions.initSelect = function(){
        if(!jQuery('.SlectBox').length) return false;
        jQuery('.SlectBox').SumoSelect({ csvDispCount: 3, search: true, searchText:'Search', noMatch:'No matches for "{0}"', floatWidth: 0 });
    };
    _functions.initCounter = function(){
        if(!jQuery('.countdown').length) return false;
        jQuery('.countdown').not('.initialized').each(function(){
            jQuery(this).addClass('initialized').ClassyCountdown({
                theme: (jQuery(this).hasClass('light'))?'light':((jQuery(this).hasClass('light-green'))?'light-green':''),
                end: (new Date(jQuery(this).data('end'))).getTime()
            });
        });
    };

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
    if(_ismobile) jQuery('body').addClass('mobile');
    _functions.pageCalculations();
    _functions.initSelect();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
    jQuery(window).load(function(){
        _functions.initSwiper();
        _functions.initCounter();
        jQuery('body').addClass('loaded');
        jQuery('#loader-wrapper').fadeOut();
    });

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
    _functions.resizeCall = function(){
        _functions.pageCalculations();
    };
    if(!_ismobile){
        jQuery(window).resize(function(){
            _functions.resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            _functions.resizeCall();
        }, false);
    }

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	if(exzo_obj.exzo_sticky_header == 1) {
        jQuery(window).scroll(function () {
            _functions.scrollCall();
        });
    }

    _functions.scrollCall = function(){
        winScr = jQuery(window).scrollTop();
        if(winScr>300) jQuery('header').addClass('scrolled');
        else jQuery('header').removeClass('scrolled');
    };

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
    var initIterator = 0;
    _functions.initSwiper = function(){
        jQuery('.swiper-container').not('.initialized').each(function(){
            var jQueryt = jQuery(this);

            var index = 'swiper-unique-id-'+initIterator;

            jQueryt.addClass('swiper-'+index+' initialized').attr('id', index);
            jQueryt.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
            // jQueryt.find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
            // jQueryt.find('>.swiper-button-next').addClass('swiper-button-next-'+index);
            if(jQueryt.find('>.swiper-button-prev').length){
                jQueryt.find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
                jQueryt.find('>.swiper-button-next').addClass('swiper-button-next-'+index);
            }
            else{
                jQueryt.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
                jQueryt.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);
            }

            var slidesPerViewVar = (jQueryt.data('slides-per-view'))?jQueryt.data('slides-per-view'):1,
                loopVar = (jQueryt.data('loop'))?parseInt(jQueryt.data('loop'), 10):0;
            if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
                pagination: '.swiper-pagination-'+index,
                paginationClickable: true,
                nextButton: '.swiper-button-next-'+index,
                prevButton: '.swiper-button-prev-'+index,
                slidesPerView: slidesPerViewVar,
                autoHeight: (jQueryt.is('[data-auto-height]'))?parseInt(jQueryt.data('auto-height'), 10):0,
                loop: loopVar,
                autoplay: (jQueryt.is('[data-autoplay]'))?parseInt(jQueryt.data('autoplay'), 10):0,
                centeredSlides: (jQueryt.is('[data-center]'))?parseInt(jQueryt.data('center'), 10):0,
                breakpoints: (jQueryt.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt(jQueryt.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt(jQueryt.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt(jQueryt.attr('data-md-slides'), 10) }, 1370: { slidesPerView: parseInt(jQueryt.attr('data-lt-slides'), 10) } } : {},
                initialSlide: (jQueryt.is('[data-ini]'))?parseInt(jQueryt.data('ini'), 10):0,
                watchSlidesProgress: true,
                speed: (jQueryt.is('[data-speed]'))?parseInt(jQueryt.data('speed'), 10):500,
                parallax: (jQueryt.is('[data-parallax]'))?parseInt(jQueryt.data('parallax'), 10):0,
                slideToClickedSlide: (jQueryt.is('[data-click]'))?parseInt(jQueryt.data('click'), 10):0,
                keyboardControl: true,
                mousewheelControl: (jQueryt.data('mousewheel'))?parseInt(jQueryt.data('mousewheel'), 10):0,
                mousewheelReleaseOnEdges: false,
                direction: (jQueryt.is('[data-direction]'))?jQueryt.data('direction'):'horizontal',
                preloadImages: false,
                lazyLoading: true,
                lazyLoadingInPrevNext: (jQueryt.data('direction')=='vertical')?true:false,
                lazyLoadingInPrevNextAmount: (jQueryt.data('direction')=='vertical')?100:1,
                spaceBetween: (jQueryt.is('[data-space]'))?jQueryt.data('space'):0,
                touchEventsTarget:(jQueryt.is('[data-touch]'))?'wrapper':'container'

            });
            swipers['swiper-'+index].update();
            initIterator++;
        });
        jQuery('.swiper-container.swiper-control-top').each(function(){
            swipers['swiper-'+jQuery(this).attr('id')].params.control = swipers['swiper-'+jQuery(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom').attr('id')];
        });
        jQuery('.swiper-container.swiper-control-bottom').each(function(){
            swipers['swiper-'+jQuery(this).attr('id')].params.control = swipers['swiper-'+jQuery(this).closest('.swipers-couple-wrapper').find('.swiper-control-top').attr('id')];
        });

    };

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

    //open and close responsive menu
    jQuery('.hamburger-icon, .nav-close-layer').on('click', function(){
        jQuery('.nav-wrapper').toggleClass('active');
    });

    //toggle menu in responsive mode
    jQuery('.menu-toggle').on('click', function(){
        jQuery(this).toggleClass('active').next().slideToggle();
    });

    //toggle geader search
    jQuery('.toggle-search, .header-search-wrapper .button-close').on('click', function(){
        jQuery('.header-search-wrapper').toggleClass('active');
    });

    //open and close popup
    jQuery(document).on('click', '.open-popup', function(e){

        e.preventDefault();
        var popup = jQuery('.popup-wrapper, .popup-content[data-rel="'+jQuery(this).data('rel')+'"]');

        if(jQuery(this).data('rel') == 3){
            //alert(jQuery(this).closest('.animate-to-green').attr('href'));

            console.log(jQuery(this).data('url'));
            popup.find('.popup-align').html(" ");
            popup.find('.popup-align').load(jQuery(this).data('url') + ' .exzo_single_product', function () {
                _functions.initSwiper();
                jQuery('.popup-content').removeClass('active');
                popup.addClass('active');
                jQuery('html').addClass('overflow-hidden');
                return false;
            });

        }
        jQuery('.popup-content').removeClass('active');
        popup.addClass('active');
        jQuery('html').addClass('overflow-hidden');
        return false;
    });

    jQuery(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(e){
        e.preventDefault();
        if(jQuery('.video-popup').hasClass('active')) jQuery('.video-popup .popup-iframe').html('');
        jQuery('.popup-wrapper, .popup-content').removeClass('active');
        jQuery('html').removeClass('overflow-hidden');
        return false;
    });

    //open ajax product popup
    //preload
    function showprogress() {
        if (document.images.length === 0) {return false;}
        var loaded = 0;
        for (var i=0; i<document.images.length; i++) {
            if (document.images[i].complete) {
                loaded++;
            }
        }
        percentage  = (loaded / document.images.length);
    }
    var ID, percentage;
/*
    jQuery(document).on('click', '.open-popup-ajax', function(e){
        e.preventDefault();
        jQuery('html').addClass('overflow-hidden');
        jQuery('.popup-content').removeClass('active');
        jQuery('.popup-wrapper').addClass('active');
        var url = jQuery(this).attr('href');
        jQuery.ajax({
            type:"GET",
            async:true,
            url: url,
            success:function(response){
                var responseObject = jQuery(jQuery.parseHTML(response));
                jQuery('.ajax-popup .swiper-container').each(function(){
                    swipers['swiper-'+jQuery(this).attr('id')].destroy();
                    delete swipers['swiper-'+jQuery(this).attr('id')];
                });
                jQuery('.ajax-popup').remove();
                jQuery('.popup-wrapper').append(responseObject.addClass('ajax-popup'));
                ID = window.setInterval(function(){
                    showprogress();
                    if (percentage == 1) {
                        window.clearInterval(ID);
                        percentage = 0;
                        _functions.initSwiper();
                        _functions.initSelect();
                        responseObject.addClass('active');
                    }
                }, 300);
            }
        });
        return false;
    });
*/
    /************gallery ajax****************
     *
     * **************************************/
    jQuery(document).on('click', '.open-popup-ajax', function(e){
        e.preventDefault();
        jQuery('html').addClass('overflow-hidden');
        jQuery('.popup-content').removeClass('active');
        jQuery('.popup-wrapper').addClass('active');
        var url = jQuery(this).attr('href');

        var mythis = jQuery(this);

        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_ajax_gallery&id=' + mythis.data('id'),
            success:function(response){
                var responseObject = jQuery(jQuery.parseHTML(response));
                jQuery('.ajax-popup .swiper-container').each(function(){
                    swipers['swiper-'+jQuery(this).attr('id')].destroy();
                    delete swipers['swiper-'+jQuery(this).attr('id')];
                });
                jQuery('.ajax-popup').remove();
                jQuery('.popup-wrapper').append(responseObject.addClass('ajax-popup'));
                ID = window.setInterval(function(){
                    showprogress();
                    if (percentage == 1) {
                        window.clearInterval(ID);
                        percentage = 0;
                        _functions.initSwiper();
                        _functions.initSelect();
                        responseObject.addClass('active');
                    }
                }, 300);
            }
        });
        return false;
    });



    //video popup
    jQuery('.open-video').on('click', function(e){
        e.preventDefault();
        jQuery('.video-popup .popup-iframe').html('<iframe src="'+jQuery(this).data('src')+'"></iframe>');
        jQuery('.popup-wrapper').addClass('active');
        jQuery('.video-popup').addClass('active');
    });

    //slider - product preview shortcode
    jQuery(document).on('click', '.product-preview-shortcode .sidebar .entry', function(){
        var index = jQuery(this).closest('.sidebar').find('.entry').index(this);
        jQuery(this).closest('.sidebar').find('.active').removeClass('active');
        jQuery(this).addClass('active');
        jQuery(this).closest('.product-preview-shortcode').find('.preview .entry.active').removeClass('active');
        jQuery(this).closest('.product-preview-shortcode').find('.preview .entry').eq(index).addClass('active');
    });

    //product shortcode 1 color click
    jQuery(document).on('click', '.color-selection .entry', function(){
        jQuery(this).parent().find('.entry').removeClass('active');
        jQuery(this).addClass('active');
    });

    //tabs
    var tabsFinish = 0;
    jQuery(document).on('click', '.tabs-block .tab-menu', function() {
        if(jQuery(this).hasClass('active') || tabsFinish) return false;

        tabsFinish = 1;
        var tabsWrapper = jQuery(this).closest('.tabs-block'),
            tabsMenu = tabsWrapper.find('.tab-menu'),
            tabsItem = tabsWrapper.find('.tab-entry'),
            index = tabsMenu.index(this);
        tabsWrapper.find('.tabulation-title').text(jQuery(this).text());
        tabsItem.filter(':visible').fadeOut(function(){
            tabsItem.eq(index).css({'display':'block', 'opacity':'0'});
            tabsItem.eq(index).find('.swiper-container').each(function(){
                swipers['swiper-'+jQuery(this).attr('id')].update();
            });
            jQuery(window).resize();
            tabsItem.eq(index).animate({'opacity':'1'}, function(){
                tabsFinish = 0;
            });
        });
        tabsMenu.removeClass('active');
        jQuery(this).addClass('active');
    });



    jQuery(document).on('click', '.tabulation-title', function(){
        jQuery(this).toggleClass('active');
    });

    //categories
    jQuery('.categories-menu .toggle').on('click', function(){
        jQuery(this).toggleClass('active').next().slideToggle();
    });

    //products view toggle
    jQuery('.toggle-products-view').on('click', function(){
        if(jQuery(this).hasClass('active')) return false;
        jQuery(this).parent().find('.active').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.products-content').addClass('notransition');
        jQuery('.products-content').toggleClass('view-inline');
        setTimeout(function(){jQuery('.products-content').removeClass('notransition');},0);
    });

    //quantity selector
    jQuery(document).on('click', '.quantity-select .minus', function(){
        var newValue = parseInt(jQuery(this).parent().find('.number').text(), 10);
        jQuery(this).parent().find('.number').text(newValue>1?(newValue-1):newValue);
        jQuery(this).parent().parent().find('.exzo_quantity').val(newValue>1?(newValue-1):newValue).trigger("change");


    });

    jQuery(document).on('click', '.quantity-select .plus', function(){
        var newValue = parseInt(jQuery(this).parent().find('.number').text(), 10);
        jQuery(this).parent().find('.number').text(newValue+1);
        jQuery(this).parent().parent().find('.exzo_quantity').val(newValue+1).trigger("change");
    });

    //rating
    jQuery(document).on('click', '.rate-wrapper.set .fa', function(){
        jQuery(this).parent().find('.fa-star').removeClass('fa-star').addClass('fa-star-o');
        jQuery(this).removeClass('fa-star-o').prevAll().removeClass('fa-star-o');
        jQuery(this).addClass('fa-star').prevAll().addClass('fa-star');
    });

    //remove item from cart
    jQuery('.cart-entry-description .button-close').on('click', function(){
        if(jQuery(this).closest('.cart-overflow').find('.cart-entry').length==1) jQuery(this).closest('.cart-entry').replaceWith('<h4 class="h4">Your shopping cart is empty</h4>');
        else jQuery(this).closest('.cart-entry').remove();
    });

    //file remove button in input file block
    jQuery('.input-file-wrapper .file-remove').on('click', function(){
        var filewrapper = jQuery(this).closest('.input-file-wrapper'),
            textwrapper = filewrapper.find('.simple-input');
        filewrapper.removeClass('active');
        textwrapper.text(textwrapper.data('placeholder'));
        filewrapper.find('input').val('');
    });

    //checkout - toggle wrapper checkbox
    jQuery('.checkbox-toggle-title input').on('change', function(){
        jQuery('.checkbox-toggle-wrapper').slideToggle();
    });


   // jQuery(".nav-wrapper li").slice(0,1).addClass("active");

});


jQuery(window).load(function () {
    var $container = jQuery('.grid').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });
});