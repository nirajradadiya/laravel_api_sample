var Validation = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Email is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function() {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                //$('.forget-form').submit();
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function() {
            $(".login-form")[0].reset();
            $(".alert").css("display", "none");
            $(".help-block").css("display", "none");
            $(".has-error").removeClass("has-error");
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }
    
    var handleResetPassword = function() {
        $('.reset-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                v_password: {
                    required: true,
                    minlength: 6
                },
                cpassword: {
                    equalTo: "#v_password"
                }
            },

            messages: {
                v_password: {
                    required: "Password is required.",
                     minlength: "Minimum 6 characters required."
                },
                cpassword: {
                    equalTo: "Please enter the same value again."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                //$('.forget-form').submit();
            }
        });

        $('.reset-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.reset-form').validate().form()) {
                    $('.reset-form').submit();
                }
                return false;
            }
        });
    }

    var handleApiResetPassword = function() {
        $('.reset-form-api').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                v_password: {
                    required: true,
                    minlength: 6
                },
                cpassword: {
                    equalTo: "#v_password"
                }
            },

            messages: {
                v_password: {
                    required: "Password is required.",
                     minlength: "Minimum 6 characters required."
                },
                cpassword: {
                    equalTo: "Please enter the same value again."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                //$('.forget-form').submit();
            }
        });

        $('.reset-form-api input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.reset-form-api').validate().form()) {
                    //alert('true');return false;
                    $('.reset-form-api').submit();
                }
                return false;
            }
        });
    }
    var handleRegister = function() {

        function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        if (jQuery().select2) {
	        $("#select2_sample4").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            allowClear: true,
	            formatResult: format,
	            formatSelection: format,
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#select2_sample4').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }
    
    var handleProfileFrm = function() {

        $('#myprofileform').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                v_name: {
                    required: true
                },
                v_email: {
                    required: true,
                    email: true,
                },
                password: {
                    minlength: 6
                },
                cpassword: {
                    equalTo: "#v_password"
                }
            },

            messages: {
                v_name: {
                    required: "Name is required."
                },
                v_email: {
                    required: "Email is required.",
                    email: 'Please enter a valid email address.'
                },
                v_password: {
                    minlength: "Minimum 6 characters required."
                },
                cpassword: {
                    equalTo: "Please enter the same value again."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('#myprofileform')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            /*errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },*/

            submitHandler: function(form) {
                //$('#myprofileform').submit(); // form validation success, call ajax form submit
            }
        });

        $('#myprofileform input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#myprofileform').validate().form()) {
                    $('#myprofileform').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }
    
    /*var handleAddFrm = function() {

        $('#frmAdd').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                v_name: {
                    required: true
                },
                v_email: {
                    required: true,
                    email: true
                },
                v_password: {
                    minlength: 6
                },
                cpassword: {
                    equalTo: "#v_password"
                }
            },

            messages: {
                v_name: {
                    required: "Name is required."
                },
                v_email: {
                    required: "Email is required.",
                    email: 'Please enter a valid email address.'
                },
                v_password: {
                    required: "Password is required.",
                    minlength: "Minimum 6 characters required."
                },
                cpassword: {
                    equalTo: "Please enter the same value again."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('#frmAdd')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            submitHandler: function(form) {
            }
        });

        $('#frmAdd input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#frmAdd').validate().form()) {
                    $('#frmAdd').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }*/
    
    /*var handleEditFrm = function() {

        $('#frmEdit').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                v_name: {
                    required: true
                },
                v_email: {
                    required: true,
                    email: true
                },
                v_password: {
                    minlength: 6
                },
                cpassword: {
                    equalTo: "#v_password"
                }
            },

            messages: {
                v_name: {
                    required: "Name is required."
                },
                v_email: {
                    required: "Email is required.",
                    email: 'Please enter a valid email address.'
                },
                v_password: {
                    minlength: "Minimum 6 characters required."
                },
                cpassword: {
                    equalTo: "Please enter the same value again."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('#frmEdit')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            

            submitHandler: function(form) {
                //$('#frmEdit').submit(); // form validation success, call ajax form submit
            }
        });

        $('#frmEdit input').keypress(function(e) {
            if (e.which == 13) {
                if ($('#frmEdit').validate().form()) {
                    $('#frmEdit').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }*/

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();
            handleRegister();
            //handleProfileFrm();
            handleResetPassword();
            handleApiResetPassword();
            //handleAddFrm();
            //handleEditFrm();

        }

    };

}();