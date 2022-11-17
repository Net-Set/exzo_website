jQuery(function() {

	"use strict";

	jQuery('.contact-form').on("submit", function(){
		var jQuerythis = jQuery(this);
						   
		jQuery('.invalid').removeClass('invalid');						   
		var msg = exzo_obj.error_subtitle,
			successMessage = exzo_obj.success_text,
			error = 0,
			pattern = new RegExp(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/);


		if (jQuery.trim(jQuery('.contact-form input[name="name"]').val()) === '') {error = 1; jQuerythis.find('input[name="name"]').addClass('invalid'); msg = msg +  '\n - Name';}
        if (!pattern.test(jQuery.trim(jQuery('.contact-form input[name="email"]').val()))) {error = 1; jQuerythis.find('input[name="email"]').addClass('invalid'); msg = msg +  '\n - Email';}
		if (jQuery.trim(jQuery('.contact-form textarea[name="message"]').val()) === '') {error = 1; jQuerythis.find('textarea[name="message"]').addClass('invalid'); msg = msg +  '\n - Your Message';}

        if (error){
        	updateTextPopup(exzo_obj.error_title, msg);


        }else{

            var url = exzo_obj.ajaxurl,
            	name = jQuery.trim(jQuerythis.find('input[name="name"]').val()),
            	email = jQuery.trim(jQuerythis.find('input[name="email"]').val()),
            	phone = jQuery.trim(jQuerythis.find('input[name="phone"]').val()),
            	subject = (jQuerythis.find('input[name="subject"]').length)?jQuery.trim(jQuerythis.find('input[name="subject"]').val()):'',
            	message = jQuery.trim(jQuerythis.find('textarea[name="message"]').val());
		/*	jQuery.ajax({
				type: "POST",
				url: exzo_obj.ajaxurl,
				data: 'action=exzo_mail_send' + jQuery('.contact-form').serialize(),
				success: function (res) {

					alert(res);

					console.log(res);
				},

				error: function () {
					alert(3);

				}
			});*/
           jQuery.post(url,{'action' :'exzo_mail_send', 'name':name,'email':email,'phone':phone,'subject':subject,'message':message},function(data){
	        	updateTextPopup('THANK YOU!', successMessage);
	        	jQuerythis.append('<input type="reset" class="reset-button"/>');
	        	jQuery('.reset-button').click().remove();
			});
        }
	  	return false;
	});

	jQuery(document).on('keyup', '.input-wrapper .input', function(){
		jQuery(this).removeClass('invalid');
	});

	function updateTextPopup(title, text){
		jQuery('.simple-text-popup .title').text(title);
		jQuery('.simple-text-popup .text').text(text);
		jQuery('.popup-wrapper').addClass('active');
		jQuery('.simple-text-popup').addClass('active');
	}

});