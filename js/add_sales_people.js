var FormWizard = function () {


    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }
            
            $.validator.addMethod("gmail", function(value, element) {
                 return this.optional(element) || /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/i.test(value); 
            }, "Please enter valid gmail id.");
    
            var form = $('#salesAdd');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);
            var v_twitter = false;
            
            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    v_firstname: {
                        required: true
                    },
                    v_lastname: {
                        required: true
                    },
                    v_email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    v_im_skype: {
                        required: true
                    },
                    v_twitter_id: {
                        required: function(element) {
                            if($("#v_twitter_password").val() == ''){
                                $("#v_twitter_id_lbl").html('Twitter Id');
                                return false;    
                            } else {
                                $("#v_twitter_id_lbl").html('Twitter Id<span class="required">*</span>');
                                return true;
                            }
                        }
                    },
                    v_twitter_password: {
                         required: function(element) {
                            if($("#v_twitter_id").val() == ''){
                                $("#twitter_pass_lbl").html('Twitter Password');
                                return false;    
                            } else {
                                $("#twitter_pass_lbl").html('Twitter Password<span class="required">*</span>');
                                return true;
                            }
                        }
                    },
                    v_gmail:{
                        gmail: function(element) {
                            if($("#v_gmail").val() != ''){
                                return true;    
                            } 
                        }
                    },
                    v_im_password: {
                        required: true
                    },
                    v_phone: {
                        required: true
                    },
                    e_status: {
                        required: true,
                    }                    
                },


                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        $(element).closest('.form-group').find('.duplicate-error').hide();
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    success.hide();
                    error.show();
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top - 300
                    }, 1000);
                    $(validator.errorList[0].element).focus()
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label.addClass('valid') // mark the current input as valid and display OK icon
                        .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                        label.remove();
                    }
                },

                submitHandler: function (form) {
                    //success.show();
                    error.hide();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });
            
            
            form.find('#button_next').click(function() {
                form.find('.duplicate-error').hide();
                 var $valid = form.valid();
    	  			if($valid) {
                        $.post(SITE_URL+'sales/check-duplicate', $("#salesAdd").serialize(), function(data) {
                            if(data != 'TRUE') {
                                form.find('.alert-success').hide();
                                form.find('.alert-danger').show();
                                $(data).each(function(i,val){
                                    $.each(val,function(key,v){
                                          form.find('#'+key).closest('.form-group').addClass('has-error');
                                          form.find('#error_'+key).show();
                                    });
                                });
                                if($('.has-error .form-control').length > 0) {
                                    $('html, body').animate({
                                        scrollTop:$('.has-error .form-control').first().offset().top - 350
                                    }, 1000);
                                    $('.has-error .form-control').first().focus()
                                }
                            } else {
                                $('#form_wizard_1').bootstrapWizard('next');
                                success.hide();
                                error.hide();
                            }
                        });
                    } 
                    return false;
            });
            
            /* Confirm Submit */
            form.find('#button_submit').click(function() {
                form.find('.duplicate-error').hide();
                 var $valid = form.valid();
    	  			if($valid) {
    	  			  $(this).attr('disabled',true);
                      $('.button-previous').attr('disabled',false);
                      $(this).html('Please wait.. <i class="m-icon-swapright m-icon-white"></i>');
                      $.post(SITE_URL+'sales/add', $("#salesAdd").serialize(), function(data) {
                            if($.trim(data) != 'TRUE') {
                                $(this).removeAttr('disabled');
                                $('.button-previous').removeAttr('disabled');
                                $(this).html('Confirm <i class="m-icon-swapright m-icon-white"></i>');
                                form.find('.alert-success').hide();
                                form.find('.alert-danger').show();
                                $(data).each(function(i,val){
                                    $.each(val,function(key,v){
                                          form.find('#'+key).closest('.form-group').addClass('has-error');
                                          form.find('#error_'+key).show();
                                    });
                                });
                                if($('.has-error .form-control').length > 0) {
                                    $('html, body').animate({
                                        scrollTop:$('.has-error .form-control').first().offset().top - 350
                                    }, 1000);
                                    $('.has-error .form-control').first().focus()
                                }
                                
                                form.find(".button-first").trigger( "click" );
                            } else {
                                window.location = SITE_URL+'sales';
                                /*$(this).attr('disabled',false);
                                $(this).text('Confirm <i class="m-icon-swapright m-icon-white"></i>');
                                success.hide();
                                error.hide();*/
                                //window.location = SITE_URL+'sales';
                            }
                        });
                    } 
                    return false;
            });
            

            var displayConfirm = function() {
                $('#tab3 .form-control-static', form).each(function() {
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    if($(this).attr("data-display") == 'e_status'){
                            if(input.val() == 1) {
                                $(this).html('Active');    
                            } else {
                                $(this).html('Inactive');   
                            }                            
                    } else {
                        $(this).html(input.val());
                    }
                });
               $('#image_cinform').html($('#preview-image1').html());                
            }

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                //$('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }
                console.log(current);
                if (current == 1) {
                    $('#form_wizard_1').find('#button_next').show();
                    $('#form_wizard_1').find('#image_button').hide();
                    $('#form_wizard_1').find('.button-previous').hide();
                    $('#form_wizard_1').find('.button-submit').hide();
                } 
                
                if (current == 2) {
                    $('#form_wizard_1').find('.button-previous').show();
                    $('#form_wizard_1').find('#image_button').show();
                    $('#form_wizard_1').find('#button_next').hide();
                    $('#form_wizard_1').find('.button-submit').hide();
                } 
                
                if (current == 3) {
                    $('#form_wizard_1').find('.button-submit').show();
                    $('#form_wizard_1').find('.button-previous').show();
                    $('#form_wizard_1').find('#image_button').hide();
                    $('#form_wizard_1').find('#button_next').hide();
                    displayConfirm();
                } 
                Metronic.scrollTo($('.page-title'));
            }

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                'firstSelector': '.button-first',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    return false;
                    var $valid = form.valid();
    	  			if(!$valid) {
    	  				return false;
    	  			}
                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function (tab, navigation, index) {
                    var $valid = form.valid();
    	  			if(!$valid) {
    	  				return false;
    	  			}
                    handleTitle(tab, navigation, index);
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1').find('#image_button').hide();
            $('#form_wizard_1 .button-submit').click(function () {
                return true;
            }).hide();
            
            
            
            $('#file_trriger').click(function(){
                console.log('testet');
                $('#image_change').trigger('click');
            });
        }
    };  
}();