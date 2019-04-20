var err_element = 'div';
var err_class = 'error-inner';

$(document).ready(function() {

    if($("#CkEditor").length > 0) {
        var CkEditor = CKEDITOR.replace('CkEditor');
        CkEditor.on('blur', function(evt){ $("#CkEditor").val(CkEditor.getData()); if( $("#CkEditor").val() != '') { $("#CkEditor_error").remove(); } });
        CkEditor.on('focus', function(evt){ $("#CkEditor").val(CkEditor.getData()); if( $("#CkEditor").val() != '') { $("#CkEditor_error").remove(); } });
    }

    if($("#CkEditor2").length > 0) {
        var CkEditor = CKEDITOR.replace('CkEditor2');
        CkEditor.on('blur', function(evt){ $("#CkEditor2").val(CkEditor.getData()); if( $("#CkEditor2").val() != '') { $("#CkEditor2_error").remove(); } });
        CkEditor.on('focus', function(evt){ $("#CkEditor2").val(CkEditor.getData()); if( $("#CkEditor2").val() != '') { $("#CkEditor2_error").remove(); } });
    }

    if($("#vCkEditor").length > 0) {
        var CkEditor = CKEDITOR.replace( 'vCkEditor', {
        	toolbar: [
        		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline','Link' ] }
        	]
        });
        CkEditor.on('blur', function(evt){ $("#vCkEditor").val(CkEditor.getData()); if( $("#vCkEditor").val() != '') { $("#vCkEditor_error").remove(); } });
        CkEditor.on('focus', function(evt){ $("#vCkEditor").val(CkEditor.getData()); if( $("#vCkEditor").val() != '') { $("#vCkEditor_error").remove(); } });
    }

    $('input,select,textarea').on("blur", function(event) {
        var id = this.id;
        var field_value = $.trim($(this).val());
        var placeholder = '';
        if($(this).attr('placeholder') !== undefined) {
            placeholder = $(this).attr('placeholder');
        }
        //$(this).css('border','1px solid #838383');

        var err_element_start = '<'+err_element+' class="'+err_class+'" id="'+this.id+'_error">';
        var err_element_end = '.</'+err_element+'>';
        var error_msg = '';
        flag = true;

        if($(this).hasClass('email') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm);
            if(! pattern.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).hasClass('url') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
            if(! pattern.test(field_value)) {
                error_msg = 'Please enter valid URL';
                flag = false;
            }
        }

        if($(this).hasClass('digits') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^[0-9]$/))) {
                error_msg = 'Please enter valid digits';
                flag = false;
            }
        }

        if($(this).hasClass('number') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/))) {
                error_msg = 'Please enter valid number';
                flag = false;
            }
        }

        if($(this).hasClass('validate_zip') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^[a-z][0-9][a-z]\-s*?[0-9][a-z][0-9]$/i) || field_value.match(/^[a-z][0-9][a-z]\s*?[0-9][a-z][0-9]$/i))) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).hasClass('validate_creditcard') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/^\d{15,16}$/);
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
       }

        if($(this).hasClass('validate_month') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{1,2}$/;
            if(!re.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }
        if($(this).hasClass('validate_year') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{4}$/;
            var currentYear = (new Date).getFullYear();

            if(!re.test(field_value) || parseInt(field_value) < parseInt(currentYear)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }
        if($(this).hasClass('validate_cvccode') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{3}$/;
            if(!re.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).attr('equalTo') !== undefined)  {
            if(field_value != 'Confirm Password' && $.trim($($(this).attr('equalTo')).val()) != field_value) {
                error_msg = 'Password does not match';
                flag = false;
            }
        }

        if($(this).hasClass('validate_password') && $(this).val() !='' && field_value !== undefined && field_value != placeholder ) {
            var re = /[a-zA-Z0-9\!\@\#\$\.\%\^\&\*\(\)\_\\ \+]{6,}/;
            if(!re.test(field_value)){
                error_msg = 'Minimum 6 characters required';
                flag = false;
            }
        }

        if($(this).hasClass('validate_social_secutiry') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /[a-zA-Z0-9\!\@\#\$\.\%\^\&\*\(\)\_\+]{9,}/;
            if(!re.test(field_value)){
                error_msg = 'Invalid social security number';
                flag = false;
            }
        }

        if(this.id == 'email' && $('#email').attr('class').indexOf("duplicate-email-error") >= 0) {
            flag = false;
            error_msg = 'Email address already exist';
        }

        if($(this).hasClass('phone') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
              var pattern = /^[0-9()\s]+$/; //space and 0-9 number allow
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid phone';
                flag = false;
            }
        }

        if($(this).hasClass('check-url-char') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/[a-zA-Z0-9-]/g);
            if(! pattern.test(field_value)) {
                error_msg = 'Please enter valid text';
                flag = false;
            }
        }

        if($(this).hasClass('required') && (field_value == "" || field_value == undefined || field_value == placeholder )) {
            if($(this).attr('type') !== undefined && $(this).attr('type') == 'file')  {
                error_msg = 'Please upload file';
            }else if($(this).attr('type') !== undefined && $(this).attr('type') == 'hidden'){
                error_msg = 'Please select any one.';
            } else {
                error_msg = 'Please enter '+placeholder.toLowerCase();
            }
            flag = false;
        }
        if($(this).hasClass('required-least-one') && $(this).attr('groupid') != "" && $(this).attr('groupid') != undefined ){
            if($('input[groupid="'+$(this).attr('groupid')+'"]:checked').length < 1)
            {
                error_msg = 'Please select any option';
                flag = false;
            }
        }

        if(!flag && error_msg != '') {
            //error_msg = err_element_start + error_msg + err_element_end;
            //$("#"+id+"_error").html(error_msg);
        } else {
            $("#"+id+"_error").remove();
			$(this).closest('.form-group').removeClass('has-error');
            if($("#div_validation_msg").is(':empty'))
            {
                $("#div_validation_msg").hide();
            }
        }
        return flag;
    });
});

//this function will automaticall append the error msg to next to field
//err_container: If err_container is set, than append all messages to the error container(err_container) element
function form_valid(form, err_container) {
    var flag = true;

    err_container = typeof err_container !== 'undefined' ? err_container : '';
    if(err_container != '') { $(err_container).html(''); }
    $("."+err_class).remove();

    $(form).find('input,select,textarea').each(function() {
        var field_value = $.trim($(this).val());
        var placeholder = '';
        if(err_container != '')
        {
            $(this).css('border','1px solid #838383');
        }
        if($(this).attr('placeholder') !== undefined) {
            placeholder = $(this).attr('placeholder');
        }

        var err_element_start = '<'+err_element+' class="'+err_class+'" id="'+this.id+'_error">';
        var err_element_end = '.</'+err_element+'>';
        var error_msg = '';
        $(this).closest('.form-group').removeClass('has-error'); // set error class to the control group

        if($(this).hasClass('email') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
            if(! pattern.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).hasClass('url') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
            if(! pattern.test(field_value)) {
                error_msg = 'Please enter valid URL';
                flag = false;
            }
        }

        if($(this).hasClass('digits') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^\d+$/))) {
                error_msg = 'Please enter valid digits';
                flag = false;
            }
        }

        if($(this).hasClass('number') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/))) {
                error_msg = 'Please enter valid number';
                flag = false;
            }
        }
		
		if($(this).hasClass('input_percentage') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (field_value<=0 || field_value>=100) {
                error_msg = 'Percentage should be greater then 0 and must be less then 100';
                flag = false;
            }
        }

		if($(this).hasClass('min') && field_value != "" && field_value !== undefined && field_value != placeholder ) {

			if ( !$('.discount_amount').hasClass('input_percentage') && parseFloat(field_value)<$('.discount_amount').val() ) {
                error_msg = 'Should be greater than Discount';
                flag = false;
            }
        }	
        if($(this).hasClass('max') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (  parseFloat(field_value)>$('#refundamount').attr('max') ) {
                error_msg = 'Should be less than Order Amount';
                flag = false;
            }
        }   
		
        if($(this).hasClass('validate_zip') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            if (!(field_value.match(/^[a-z][0-9][a-z]\-s*?[0-9][a-z][0-9]$/i) || field_value.match(/^[a-z][0-9][a-z]\s*?[0-9][a-z][0-9]$/i))) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).hasClass('validate_creditcard') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/^\d{15,16}$/);
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
       }

        if($(this).hasClass('validate_month') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{1,2}$/;
            if(!re.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }
        if($(this).hasClass('validate_year') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{4}$/;
            var currentYear = (new Date).getFullYear();

            if(!re.test(field_value) || parseInt(field_value) < parseInt(currentYear)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }
        if($(this).hasClass('validate_cvccode') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /^[0-9]{3}$/;
            if(!re.test(field_value)) {
                error_msg = 'Please enter valid '+placeholder.toLowerCase();
                flag = false;
            }
        }

        if($(this).attr('equalTo') !== undefined)  {
            if(field_value != 'Confirm Password' && $.trim($($(this).attr('equalTo')).val()) != field_value) {
                error_msg = 'Password does not match';
                flag = false;
            }
        }

        if($(this).hasClass('validate_password') && $(this).val() !='' && field_value !== undefined && field_value != placeholder ) {
            var re = /[a-zA-Z0-9\!\@\#\$\.\%\^\&\*\(\)\_\\ \+]{6,}/;
            if(!re.test(field_value)){
                error_msg = 'Minimum 6 characters required';
                flag = false;
            }
        }

        if($(this).hasClass('validate_social_secutiry') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var re = /[a-zA-Z0-9\!\@\#\$\.\%\^\&\*\(\)\_\+]{9,}/;
            if(!re.test(field_value)){
                error_msg = 'Invalid social security number';
                flag = false;
            }
        }

        if(this.id == 'email' && $('#email').attr('class').indexOf("duplicate-email-error") >= 0) {
            flag = false;
            error_msg = 'Email address already exist';
        }

        if($(this).hasClass('check-url-char') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = new RegExp(/[a-zA-Z0-9-]/g);
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid text';
                flag = false;
            }
        }
        if($(this).hasClass('phone') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = /^[0-9()\s]+$/; //space and 0-9 number allow
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid phone';
                flag = false;
            }
        }

        if($(this).hasClass('slug') && field_value != "" && field_value !== undefined && field_value != placeholder ) {
            var pattern = /^[0-9a-z\d-]+$/;
            if(!pattern.test(field_value)) {
                error_msg = 'Please enter valid slug(atoz,0-9,-)';
                flag = false;
            }
        }

        if($(this).hasClass('ckeditor')) {
            if(this.id == 'CkEditor') {
                $(this).val(CKEDITOR.instances.CkEditor.getData());
                field_value = $(this).val();
            }
        }

        if($(this).hasClass('required') && (field_value == "" || field_value == undefined || field_value == placeholder )) {
            if($(this).attr('type') !== undefined && $(this).attr('type') == 'file')  {
                error_msg = 'Please upload file';
            }
            else if($(this).attr('type') !== undefined && $(this).attr('type') == 'hidden')
            {
                if($(this).hasClass('dropdown_date_validation'))
                {
                    error_msg = 'Please select hour, minute and AM/PM';
                }
                else if($(this).hasClass('dropdown_date_msg'))
                {
                    error_msg = 'Start time should be less than end time';
                }
                else
                {
                    error_msg = 'Please select ' + placeholder.toLowerCase();
                }
            }
            else if($(this).hasClass('select_msg'))
            {
                error_msg = 'Please select '+placeholder.toLowerCase();
            }
            else
            {
                error_msg = 'Please enter '+placeholder.toLowerCase();
            }
            flag = false;
        }
        if($(this).hasClass('required-least-one') && $(this).attr('groupid') != "" && $(this).attr('groupid') != undefined ){
            if($('input[groupid="'+$(this).attr('groupid')+'"]:checked').length < 1)
            {
                error_msg = 'Please select any option.';
                flag = false;
            }
        }

        if(!flag && error_msg != '') {
            error_msg = err_element_start + error_msg + err_element_end;
            if(err_container != '') {
                $(err_container).append( error_msg );
                $(this).css('border','1px solid red');

            } else {
                if($(this).hasClass('ckeditor')) {
                    $(this).next('div').after(error_msg );
                }
                else if($(this).hasClass('required-least-one') ) {
                    if( $(this).val()===$('.required-least-one').last().val() )
                    {
                        $(this).closest('.checkbox-list').after( error_msg );
                        $(this).closest('.form-group').addClass('has-error'); // set error class to the control group
                    }
                }
                else if($(this).hasClass('price_amount')) {
                    $(this).parent().parent().next().after( error_msg );
                    $(this).closest('.form-group').addClass('has-error'); // set error class to the control group
                }
                else if($(this).hasClass('discount_amount')) {
                    $(this).closest('.input-group').after( error_msg );
                    $(this).closest('.form-group').addClass('has-error'); // set error class to the control group
                }
                else {
                    $(this).after( error_msg );
                    $(this).closest('.form-group').addClass('has-error'); // set error class to the control group
                }
            }
        }

    });
    return flag;
}

//Prevent Key Press Out of Valid Key Like Number class Not Allow Character


$('.digit').keypress(function(event){
   if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
       event.preventDefault(); //stop character from entering input
   }
});

$('.number').keypress(function(event){
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 45){
       event.preventDefault(); //stop character from entering input
    }
});

$('.digit_limit').keypress(function(event){
   if($(this).val().length > $(this).attr('digitlimit'))
   {
        event.preventDefault();
   }
});