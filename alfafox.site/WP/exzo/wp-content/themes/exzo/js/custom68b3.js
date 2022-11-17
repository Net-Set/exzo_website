/**
 * Created by User on 18.10.2016.
 */

function exzo_getCookie(name) {
    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
}

// the default lifetime is 365 days
function exzo_setCookie(name, value, days) {
    var e = new Date;
    e.setDate(e.getDate() + (days || 365));
    document.cookie = name + "=" + value + ';expires=' + e.toUTCString() + ';path=/;domain=.' + document.domain;
}


jQuery(document).ready(function ($) {
    "use strict";



    jQuery('#menu-header-menu li').removeClass('active');

    var pgurl = window.location.href;
    $("#menu-header-menu li a").each(function(){
        if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            jQuery(this).parent().addClass('active');
    });



    //ger ajax butons
    jQuery('.entry .open-popup').click(function () {
        jQuery.ajax({

            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_get_social_reg_buttons',
            success: function (html) {
                //get cart content
                jQuery('.socials_button_ajax').html(html);

            }

        });
    });


    jQuery('.main_header .cart-entry-description  .button-close ').on('click',function (e) {
        e.preventDefault();
        var muytis  = jQuery(this);


        var id = jQuery(this).data('product_id');
        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_product_remove&product_id=' + id,
            success: function (html) {
                var obj = jQuery.parseJSON(html);

                jQuery('.main_header .cart-title.hidden-xs').html(obj.total);
                jQuery('.main_header  .simple-article .color').html(obj.total);
                jQuery('.main_header .cart-label').html(obj.count);
                jQuery('.header-bottom-cart .cart-label').html(obj.count);
                if(muytis.closest('.cart-overflow').find('.cart-entry').length==1) muytis.closest('.cart-entry').replaceWith('<h4 class="h4">Your shopping cart is empty</h4>');
                else muytis.closest('.cart-entry').remove();

            }

        });
    });
    jQuery('.main_header .cart-entry-description  .button-close ').click(function (e) {
        e.preventDefault();
        var muytis  = jQuery(this);


        var id = jQuery(this).data('product_id');
        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_product_remove&product_id=' + id,
            success: function (html) {
                var obj = jQuery.parseJSON(html);

                jQuery('.main_header .cart-title.hidden-xs').html(obj.total);
                jQuery('.main_header  .simple-article .color').html(obj.total);
                jQuery('.main_header .cart-label').html(obj.count);
                jQuery('.header-bottom-cart .cart-label').html(obj.count);


            }

        });
    });
    jQuery(document).on('click', '.rate-wrapper.set .fa', function () {

        $(this).parent().find('.rating_value').val(jQuery(this).prevAll().length + 1);
    });
    jQuery(document).on('click', '.add_to_cart', function (e) {
        e.preventDefault();

        var id = $(this).data('id');
        var mythis = $(this);
        mythis.addClass('disabled');
        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_woocommerce_add_to_cart_variable&id=' + id,
            success: function (html) {
                //get cart content
                jQuery.ajax({
                    url: exzo_obj.ajaxurl,
                    type: 'POST',
                    data: 'action=exzo_woocommerce_get_cart',
                    success: function (res) {
                        jQuery('.header-top .cart').html(res);
                        var c = jQuery(res).find('.cart-label').text();
                        jQuery('.header-bottom-cart .cart-label').html(c);

                        mythis.removeClass('disabled');
                    }

                });
                jQuery('.header-top .cart').addClass('active');

            }

        });
    });

    // add ti wish list
    jQuery(document).on('click', '.entry.exzo_add_to_wishlist', function (e) {
        e.preventDefault();


        var id = $(this).data('id');
        var mythis = $(this);
        mythis.addClass('active');
        mythis.css("cursor", "progress");
        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=add_to_wishlist&add_to_wishlist=' + mythis.data('product-id') + '&product_type=simple',
            success: function (html) {
                //get cart content
                mythis.removeClass('disabled');
                mythis.css("cursor", "default");


            }

        });
    });
    //compare
    jQuery(document).on('click', '.exzo_compare', function (e) {
        e.preventDefault();


        var id = $(this).data('id');
        var mythis = $(this);
        mythis.addClass('active');
        mythis.css("cursor", "progress");
        var popup = jQuery('.popup-wrapper, .popup-content[data-rel="' + jQuery(this).data('rel') + '"]');

        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_compare_ajax&id=' + mythis.data('product-id'),
            success: function (html) {
                //get cart content

                mythis.removeClass('disabled');
                mythis.css("cursor", "default");
                $('.popup-content_compare .popup-align').html(html);
                popup.find('.popup-align').html(" ");
                popup.find('.popup-align').html(html);
                _functions.initSwiper();
                jQuery('.popup-content').removeClass('active');
                popup.addClass('active');
                jQuery('html').addClass('overflow-hidden');


            }

        });
    });


    jQuery(document).on('click', '.exzo_auth', function (e) {

        e.preventDefault();
        var res = $('.auth_res_ajax');
        res.hide();
        var mytis = $(this);
        mytis.addClass('disabled');
        var db = $('.exzo_auth_disabled_button');
        db.show();

        jQuery.ajax({
            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_auth&' + jQuery('.exzo_footer_auth').serialize(),
            success: function (html) {
                console.log(html);
                res.html('');
                res.html(html);
                res.show();
                mytis.removeClass('disabled');

            }

        });
    });

    jQuery(document).on('click', '.exzo_reg', function (e) {
        e.preventDefault();
        var res = $('.reg_res_ajax');
        res.hide();
        jQuery.ajax({

            url: exzo_obj.ajaxurl,
            type: 'POST',
            data: 'action=exzo_reg&' + jQuery('.exzo_footer_reg').serialize(),
            success: function (html) {
                //get cart content
                console.log(html);
                res.html('');
                res.html(html);
                res.show();

            }

        });
    });


    $(".header-top .cart").hover(function () {
        jQuery('.header-top .cart').addClass('active');
    }, function () {
        jQuery('.header-top .cart').removeClass('active');
    });


    $(document).mouseup(function (e) {
        var container = $(".header-top .cart");
        if (container.has(e.target).length === 0) {
            container.removeClass('active');
        }
    });

    // price select
    jQuery('.exzo_payment_method_select').on('change', function () {
        // alert( this.value ); // or $(this).val()
        $('.exzo_payment_desc').hide();
        $('.po_' + this.value).fadeIn();

    });
    jQuery('.exzo_shop_post_per_page').on('change', function () {
        // alert( this.value ); // or $(this).val()
        exzo_setCookie('exzo_shop_post_per_page', $(this).val(), 30);
        location.reload();

    });

    // shop view
    $(document).on("click", '.exzo_shop_view a', function (e) {
        var mytis = $(this);
        // if grid view
        if (mytis.hasClass('exzo_grid')) {

            exzo_setCookie('exzo_shop_view', 'grid', 30);
        } else {

            exzo_setCookie('exzo_shop_view', 'list', 30);
        }


    });

    var exzo_shop_view = exzo_getCookie('exzo_shop_view');
    if (exzo_shop_view == 'list') {
        jQuery('.exzo_shop_view a.exzo_list').click();
    } else {
        jQuery('.exzo_shop_view a.exzo_grid').click();
    }

    /// end shop view

    jQuery('a[class^="tag-link"]').addClass("tag");
    /********range slider***********/
    var minVal = parseInt($('.min-price').text());
    var maxVal = parseInt($('.max-price').text());
    if (document.getElementById('#prices-range')) {
        alert(1);
        jQuery("#prices-range").slider({
            range: true,
            min: minVal,
            max: maxVal,
            step: 5,
            values: [minVal, maxVal],
            slide: function (event, ui) {
                jQuery('.min-price').text(ui.values[0]);
                jQuery('.max-price').text(ui.values[1]);
            }
        });
    }

    var priceSliderRange = jQuery('#prices-range');


    if (jQuery.ui) {
        if (jQuery(priceSliderRange).length) {

            var amount = jQuery("#amount");

            var amount_price = jQuery("#amout_rating");
            var min_price = jQuery("#exzo_min_price");
            var max_price = jQuery("#exzo_max_price");

            jQuery(priceSliderRange).slider({
                range: true,
                min: parseInt(amount.data('min')),
                max: parseInt(amount.data('max')),
                values: [amount.data('value_min'), amount.data('value_max')],
                slide: function (event, ui) {
                    amount.val(exzo_obj.currency + ui.values[0] + " - " + exzo_obj.currency + ui.values[1]);
                    min_price.val(ui.values[0]);

                    max_price.val(ui.values[1]);
                    console.log(ui.values[0]);
                }
            });
            amount.val(
                exzo_obj.currency + priceSliderRange.slider("values", 0) +
                " - " + exzo_obj.currency + priceSliderRange.slider("values", 1)
            );
            min_price.val(priceSliderRange.slider("values", 0));
            max_price.val(priceSliderRange.slider("values", 1));

        }
    }

    /*widgets*/

    $(document).on("click", '.widget-filter-color .entry', function (e) {
        window.location = exzo_obj.shop_url + '?tax=' + $(this).data('tax') + '&term=' + $(this).data('term');
    });


    /*
     color variable
     */
    $(document).on("click", '.color-selection.size-1 .entry', function (e) {
        $(this).parent().find('.color_val').val($(this).data('slug'));


    });
    $(document).on("click", '.alert .close', function (e) {
        $(this).parent().fadeOut("slow");


    });
    $(document).on("click", '.filter_product_group .exzo_filter_tax', function (e) {
        if (this.checked) {
            window.location = exzo_obj.shop_url + '?tax=' + $(this).data('tax') + '&term=' + $(this).data('term');
        }


    });


    /*-------------------------------------------------------------------------------
     mail chimp
     -------------------------------------------------------------------------------*/
    jQuery('.exzo_subscribe_btn').click(function (e) {
        e.preventDefault();
        var mythis = $(this);
        mythis.addClass('disabled');
        $.ajax({
            type: "POST",
            url: exzo_obj.ajaxurl,
            data: 'action=exzo_mailchimp_send&' + $('.exzo_subscribe_form').serialize(),
            success: function (res) {
                mythis.removeClass('disabled');

                mythis.closest('.exzo_subscribe_form').append("<br><div class=\"alert alert-success fade in\">" +
                    "<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>" +
                    "" + res + "" +
                    "</strong></div>");

            },


            error: function (res) {
                cosole.log(res);


            }
        });

    });

    /*-------------------------------------------------------------------------------
     mail chimp
     -------------------------------------------------------------------------------*/
    jQuery('.exzo_subscribe_btn2').click(function (e) {
        e.preventDefault();
        var mythis = $(this);
        mythis.addClass('disabled');
        $.ajax({
            type: "POST",
            url: exzo_obj.ajaxurl,
            data: 'action=exzo_mailchimp_send&' + $('.exzo_subscribe_form2').serialize(),
            success: function (res) {
                mythis.removeClass('disabled');

                mythis.closest('.exzo_subscribe_form2').append("<br><div class=\"alert alert-success fade in\">" +
                    "<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>" +
                    "" + res + "" +
                    "</strong></div>");

            },


            error: function (res) {
                cosole.log(res);


            }
        });

    });

    /*-------------------------------------------------------------------------------
     mail chimp
     -------------------------------------------------------------------------------*/
    jQuery('.exzo_sub_btn3').click(function (e) {
        e.preventDefault();
        var mythis = $(this);
        mythis.addClass('disabled');
        mythis.closest('.button.size-2').addClass('disabled');
        $.ajax({
            type: "POST",
            url: exzo_obj.ajaxurl,
            data: 'action=exzo_mailchimp_send&' + $('.exzo_sub_form3').serialize(),
            success: function (res) {
                mythis.removeClass('disabled');
                mythis.closest('.button.size-2').removeClass('disabled');
                jQuery('.exzo_msg').detach();
                mythis.closest('.exzo_sub_form3').append("<div class='exzo_msg'><br><div class=\"alert alert-success fade in\">" +
                    "<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>" +
                    "" + res + "" +
                    "</strong></div></div>");

            },


            error: function (res) {
                cosole.log(res);


            }
        });

    });

    jQuery(document).on('click', '.follow.light .entry', function (e) {
        e.preventDefault();
        window.open( $(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    });

});

