jQuery(window).load(function () {
    var jQuerycontainer = jQuery('.grid').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });
    jQuery('.sorting-menu a').click(function () {
        if (jQuery(this).hasClass('active'))
            return false;
        jQuery(this).parent().parent().find('.active').removeClass('active');
        jQuery(this).addClass('active');
        jQuery(this).closest('.sorting-menu').find('.tabulation-title').text(jQuery(this).text());
        var filterValue = jQuery(this).attr('data-filter');
        jQuerycontainer.isotope({filter: filterValue});
    });

});