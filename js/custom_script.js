var timeoutID; 
var user_id;
var email_flag = true; // for email unique validation
$(document).ready(function(){
   
    $('#file_trriger').click(function(){
        $('#image_change').trigger('click');
    }); 
    if($(".fancybox").length > 0)
    {
        $(".fancybox").fancybox();     
    }
    //new date time picker js code 
    if (jQuery().datetimepicker) {
        $(".form_datetime").datetimepicker({
            autoclose: true,
            isRTL: Metronic.isRTL(),
            format: "dd MM yyyy - HH:ii P",
            pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left"),
            lazyInit:true,
            endDate:new Date()
        });
        $("#datetime_reset_button").click(function(){
            $('#d_report_created_date').val('');
            $(".form_datetime").datetimepicker('reset');
        });
    
    }

	/*
    <!-- old date time picker js code -->
    if (jQuery().datetimepicker) {
        $(".form_meridian_datetime").datetimepicker({
            isRTL: Metronic.isRTL(),
            format: "dd MM yyyy - HH:ii P",
            showMeridian: true,
            autoclose: true,
            lang:'en',
            pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left"),
            todayBtn: true,
            endDate:new Date(),
            todayButton:true,
            defaultSelect:true,
            timepickerScrollbar:true,
            formatTimeScroller:'g:i a',
            scrollMonth:true,
            scrollTime:true,
            maxDate:0, // now 
            maxTime:0, // now 
        });
        //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    }*/
 

    if($('#date').length > 0){
        window.setTimeout( function(){            
            $('#date').datepicker({format: 'mm/dd/yyyy'});
        },1000);
    }

    if($('.date_picker').length > 0){
        window.setTimeout( function(){            
            $('.date_picker').datepicker({format: 'dd-mm-yyyy',startDate:new Date()});
        },1000);
    }
    if($('.date_picker_all_date').length > 0){
        window.setTimeout( function(){            
            $('.date_picker_all_date').datepicker({format: 'dd-mm-yyyy'});
        },1000);
    }
   
	$("#v_coupon_code").keyup(function(event) {
        $(this).val( $(this).val().toUpperCase().replace(/[^a-zA-Z0-9]/g,"") );
    });
  
    //Code for Star Messages or anything Start
        
    $('.bookmark_row').on('click',function() {
        var current_count = parseInt($('#book_mark_count').attr('data-count'));
        
        if($(this).hasClass('fa-star-o')){
            var current_count = parseInt(current_count+1);
            $('#book_mark_count').attr('data-count',current_count);
            $('#book_mark_count').html('('+current_count+')');
            $(this).addClass('fa-star').removeClass('fa-star-o');
        } else {
            var current_count = parseInt(current_count-1);
            $('#book_mark_count').attr('data-count',current_count);
            $('#book_mark_count').html('('+current_count+')');
            $(this).addClass('fa-star-o').removeClass('fa-star');
        }
        var offset = $(this).parent().offset();
        $(this).parent().clone().addClass('bookmartrow-clone').css({
            'left' : offset.left + 'px',
            'top' : parseInt(offset.top-$(window).scrollTop()) + 'px',
            'width' :  $(this).parent().width() + 'px',
            'height' : $(this).parent().height() + 'px'
        }).appendTo($(this).parent());

        var bookmark_points = $('#bookmark_row_point').offset();
        $('.bookmartrow-clone').animate( { top: parseInt(bookmark_points.top-$(window).scrollTop()) + 'px', left: bookmark_points.left + 'px', 'height': '0px', 'width': '0px' }, 800, function(){
            $(this).remove();
        });
    });

   
    //hospital admin section country,city,area js code
   
    $("#country_lists").change(function(){
        $this = $(this);
        if($this.val()!=""){
            rel_value = $this.find('option:selected').attr('rel');
            $("#city_lists option").hide();
            $("#city_lists option:first").show();
            $("#city_lists option[rel="+rel_value+"]").show();
            $("#city_lists option[value='']").attr("selected",true);
        } else {
            $("#city_lists option[value='']").attr("selected",true);
            $("#city_lists option").hide();
            $("#city_lists option:first").show();
            $("#area_lists option[value='']").attr("selected",true);
            $("#area_lists option").hide();
            $("#area_lists option:first").show();
        }
    });
    $("#city_lists").change(function(){
        $this = $(this);
        if($this.val()!=""){
            rel_value = $this.find('option:selected').val();
            $("#area_lists option").hide();
            $("#area_lists option:first").show();
            $("#area_lists option[rel="+rel_value+"]").show();
            $("#area_lists option[value='']").attr("selected",true);
        } else {
            $("#area_lists option[value='']").attr("selected",true);
            $("#area_lists option").hide();
            $("#area_lists option:first").show();
        }
    });
    //end hospital admin section country,city,area js code

    //start appointment admin section js code
    if($("#hospital_list").val() == '')
    {
        $("#employee_id option").hide();
        $("#employee_id option:first").show();
    }
    $("#hospital_list").change(function(){
        $this = $(this);
        if($this.val()!=""){
            rel_value = $this.find('option:selected').attr('rel');
            $("#employee_id option").hide();
            $("#employee_id option:first").show();
            $("#employee_id option[rel="+rel_value+'-'+$("#e_is_medical").val()+"]").show();

            $("#employee_id option[value='']").attr("selected",true);
        } else {
            $("#employee_id option[value='']").attr("selected",true);
            $("#employee_id option").hide();
            $("#employee_id option:first").show();
        }
    });
    //end appointment admin section js code
    //add employee section admin code
        
        
        $('input[type=radio][name=service_type]').change(function() {
            if (this.value == 'Medical') 
            {   
                $("#hospital_div").show();
                $("#v_hospital").addClass('required');
                $("#i_service_id option").hide();
                $("#i_service_id option:first").show();
                $("#i_service_id option[rel='Yes']").show();
                $("#i_service_id option[value='']").attr("selected",true);
            }
            else 
            {
                $("#hospital_div").hide();
                $("#v_hospital").removeClass('required');
                $("#i_service_id option").hide();
                $("#i_service_id option:first").show();
                $("#i_service_id option[rel='No']").show();
                $("#i_service_id option[value='']").attr("selected",true);
            }
        });
        
    //end employee section admin code

    $(document).on("change",".parent_service",function () {
        var color_code = $(".parent_service option:selected").attr('color-code');
        if($(this).val() == '0')
        {
            $("#color_picker").show(); 
            $("#service_color").val(color_code);
            $("#service_color").addClass('required');
        } else {
            $("#service_color").val(color_code);
            $("#color_picker").hide();
            $("#service_color").removeClass('required');
        }
    });
   
    $(document).on("click",".model_close",function () {
        window.location.href = window.location.href; 
    });
    $(document).on("click","#delete_record",function () {
        var url = $(this).attr('delete-url');
        var arrId = $(this).attr('rel');
        var el = $(this);
        if(arrId != '') {
            bootbox.confirm('Are you sure you want to delete this record?', function (confirmed) {
            if(confirmed){                                  
                $.get(url, function (data){
                    if($.trim(data) == "TRUE") {
                        $('.alert-success:first').show();
                        $('.alert-success:visible .message').html('Record deleted successfully.');
                        
                        el.closest('tr').fadeOut(1500, function() {
                            $(this).closest('tr').remove();
                            if($("#datatable_ajax tbody > tr").length <= 1) {
                                $(".filter-submit").trigger( "click" );
                            }
                        });    
                        
                        setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);                        
                    }
                });
            }
            }); 
        }      
    });
    $(document).on("click","#logout",function () {
        var url = $(this).attr('logout-url');
        var redirect_url = $(this).attr('redirect-url');
        bootbox.confirm('Are you sure you want to logout?', function (confirmed) {
        if(confirmed){                                  
            $.get(url, function (data){
                if($.trim(data) == "TRUE") {
                    $('.alert-success:first').show();
                    $('.alert-success:visible .message').html('You have successfully logout.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);
                    window.location.href = ADMIN_URL; 
                }
            });
        }
        });       
    });
    $(document).on("click","#change_status",function () {
        var url = $(this).attr('status-url');
        var arrId = $(this).attr('rel');
        var status = $(this).attr('status');
        var el = $(this);

        if(arrId != '') {
            bootbox.confirm('Are you sure you want to '+status+' this plan?', function (confirmed) {
            if(confirmed){ 
                $.get(url, function (data){
                    if($.trim(data) == "TRUE") {
                        $('.alert-success:first').show();
                        $('.alert-success:visible .message').html('Record  '+status+' successfully.');
                        
                        if(status != "Give Refund")
                        {
                            el.closest('tr').fadeOut(1500, function() {
                                $(this).closest('tr').remove();
                                if($("#datatable_ajax tbody > tr").length <= 1) {
                                    $(".filter-submit").trigger( "click" );
                                }
                            });    
                        }
                        else
                        {
                            window.location.href = window.location.href; 
                        }
                        setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);                        
                    }
                });
            }
            }); 
        }      
    });

    
    //For Loop Wise bulk image upload Code 
    for(j = 1; j <=$("#maximu_image_upload").val(); j++){
        $('.image_upload_'+j).change(function(){
            read_bulk_images(this,$(this).data('id'));
        });
    }

    $('.bulk_file_upload').click(function(){
        $('.image_upload_'+$(this).data('id')).trigger('click');
    });
    
    //Manually Write Multiple Image Click Events Code
    /*
    $(".image_upload-1").change(function(){
        read_bulk_images(this,1);
    });

    $(".file_upload-1").click(function(){
        $('.image_upload-1').trigger('click');
    });

    $(".image_upload-2").change(function(){
        read_bulk_images(this,2);
    });

    $(".file_upload-2").click(function(){
        $('.image_upload-2').trigger('click');
    });
    */


    $(".image_upload").change(function(){
          read_image(this);
    });
    
    $(".file_upload").click(function(){
          $('.image_upload').trigger('click');
    });
    /*** End Image upload without crop ***/
    
    // In service_price_plan change type of
    $('#e_type').change(function(event) {
       if($(this).val()=='Normal'){
         
          $('.v_includes_div').removeClass('display-none');
    
          $('#i_service_id').addClass('required');
          $('.i_service_id_div').show();

          $('#e_content_display').val('Center');
          $('#e_content_display').attr("disabled", true); 
        
       }
       else
       {
          $('.v_includes_div input').val('');
          $('.v_includes_div').addClass('display-none');
          $('#v_selection').removeClass('required');
          $('#i_service_id').removeClass('required');
          $('.i_service_id_div').hide();
           

       }

	   if($(this).val()=="SubPlan")
       {
           $('#i_selection_number').closest('.form-group').show();
           $('#i_selection_number').addClass('required');
		   
		   $('#f_price').closest('.form-group').hide();
           $('#f_price').removeClass('required');
		   $('#f_price').val('');
           $('#e_content_display').removeClass('required');
           $('#e_content_display_div').hide();
           $('#e_content_display').val('Center');
           $('#e_content_display').attr("disabled", true); 
           $('#v_selection_div').removeClass('display-none');
           $('#v_selection').addClass('required');
          
       }
       else {

           $('#i_selection_number').closest('.form-group').hide();
           $('#i_selection_number').removeClass('required');
           $('#i_selection_number').val('');
		   
		   $('#f_price').closest('.form-group').show();
           $('#f_price').addClass('required');
           if($(this).val() != "Normal")
           {
            $('#v_selection_div').addClass('display-none');
            $('#v_selection').removeClass('required');
            $('#e_content_display').attr("disabled", false); 
            $('#e_content_display').val('');
           }
           else
           {

             $('#e_content_display').val('Center');
             $('#e_content_display').attr("disabled", true); 
           }
       }	 
       
    });
    
    // on change discount type change icon
    $('#e_discount_type').change(function(event) {
       var discount_type = $("#e_discount_type option:selected").attr('rel');
       $('.discount').find('span').addClass('display-none');
       if (discount_type == 'Percentage') {
          $('.discount').find('.percentage').removeClass('display-none');
		  $('.discount_amount').addClass('input_percentage');
          $('#f_maximum_discount').removeAttr('readonly');		  
       }else {
          $('.discount').find('.amount').removeClass('display-none');
		  $('.discount_amount').removeClass('input_percentage');
          $('#f_maximum_discount').attr('readonly','readonly');
       }
	   $('#f_discount').val('');
    });

    $('#f_discount').blur(function(event) {
        var discount_type = $("#e_discount_type option:selected").attr('rel');
        if(discount_type=='Amount')
        {
            $('#f_maximum_discount').val($(this).val());
        }
    });
    
	$("#v_user_ids").click(function(event) {
        if ($("#v_user_ids").is(':checked')) {
            $(".v_user_ids").each(function () {
               $(this).attr("checked", true);
               $(this).removeClass('disabled');
            });
        } else {
            $(".v_user_ids").each(function () {
               $(this).attr("checked", false);
               $(this).removeClass('disabled');
            });
        }
        jQuery.uniform.update(".v_user_ids");
    });
    $("#admin_act_select_all").click(function(event) {
        if ($("#admin_act_select_all").is(':checked')) {
            $("#admin_act_select_all_label").text('Unchecked All');
            $(".user_chk").each(function () {
               $(this).attr("checked", true);
            });
        } else {
            $("#admin_act_select_all_label").text('Select All');
            $(".user_chk").each(function () {
               $(this).attr("checked", false);
            });
        }
        jQuery.uniform.update(".user_chk");
    });
    
   // In service_price_plan change Selection type
    $('#v_selection').change(function(event) {
       var selValue = $(this).val();
       var sel = $('#v_selection option:selected').attr('rel');
       $('.v_selection_value').html(sel);


       if($('#e_type').val()=='SubPlan')
       {    
           var endCount = 0;
            var addOption = '';
            switch (selValue) {
                case 'Quarterly': addOption += '<option value="3">3</option><option value="6">6</option><option value="9">9</option><option value="12">12</option>';
                    break;
                case 'Half Yearly': addOption += '<option value="6">6</option><option value="12">12</option>';
                    break;
				case 'Yearly': addOption += '<option value="12">12</option>';
                    break;
                default: switch (selValue) {                            
                            case 'Montly': endCount=12; break;
                            case 'One-Off': endCount=1; break;
                            case 'Weekly': endCount=52; break;
                            case 'Days': endCount=31; break;
                            default:
                        }
                        for (var i = 1; i <= endCount; i++) {
                            addOption+='<option value="'+i+'">'+i+'</option>';
                        }

            }
            $('#i_selection_number').html(addOption);
			if(selValue=='Yearly' || selValue=='One-Off')
			{				
				$('#i_selection_number').attr('readonly', 'readonly');
			} else {
				$('#i_selection_number').removeAttr('readonly');
			}
            $('#e_content_display').attr("disabled", true); 
            $('#e_content_display').val('Center');
           
       }

    });
    
    $(document).on('click',"#add_row, #add_row1", function()
    {
        $intCounter = $("#v_counter").val();
        $intCounter++;
        if($(this).attr('id') == 'add_row1')
        {
            $("#add_another").append('<div id="row_'+$intCounter+'"  class="form-group"><input type="text" id="v_includes_'+$intCounter+'" maxlength="50" name="v_includes[]" class="form-control" placeholder="Plan include(s)" /><div class="add-row cf"><a class="remove" id1="row_'+$intCounter+'" href="javascript:void(0);"></a></div>');
        }
        else
        {
            $("#add_another").append('<div id="row_'+$intCounter+'" class="form-group"><label class="control-label col-md-3" for="inputWarning"></label><div class="col-md-4"><input id="v_includes_'+$intCounter+'" type="text" name="v_includes[]" maxlength="50" class="form-control" placeholder="Plan include(s)" /></div><div class="add-row cf"><a class="remove" id1="row_'+$intCounter+'" href="javascript:void(0);"></a></div>');
        }
        $("#v_counter").val($intCounter);
    });
    $(document).on('click',".remove", function()
    {
        del_id = $(this).attr('id1');
        $("#"+del_id).remove();
    });
    
}); 
function hadleAddForm()
{
    $("#frmAdd").submit(function() {
        $('.duplicate_error').hide();
        $(".alert").hide();
        /*if($('#CkEditor').length > 0 ){ CKEDITOR.instances.CkEditor.updateElement(); }
        if($('#vCkEditor').length > 0){ CKEDITOR.instances.vCkEditor.updateElement(); }
        if($('#CkEditor2').length > 0){ CKEDITOR.instances.CkEditor2.updateElement(); }*/
        var button_pressed = $(document.activeElement).attr('id');
        if($('.ckeditor').length > 0)
        {
            for ( instance in CKEDITOR.instances ) {
                CKEDITOR.instances[instance].updateElement();
            }
        }
        if($('#image_val img').prop('src') != undefined && $('#image_val img').prop('src') != '')
        {
            $('#v_image_val').val($('#image_val img').prop('src'));
        }
        $("#frmAdd .alert-danger").hide();
        var $valid = form_valid("#frmAdd");
        if($valid) 
        {
            $('#v_selection').prop('disabled',false);
            var button_pressed_html = $('#'+button_pressed).html();
            $('button[type="submit"]').prop('disabled',true);
            $('#'+button_pressed).html('Please wait...');
            $.post($("#frmAdd").attr("action"), $("#frmAdd").serialize(), function(data) {
                
                if($.trim(data) == 'TRUE'){
                    if(button_pressed == 'New'){
                        window.location.href = window.location.href; 
                    } else {
                        window.location.href = (window.location.href).replace('/add','');
                    }
                } else {
                    $.each(data, function (key,val) {
                        $("#"+key+'_duplicate_error').show();
                        if (jQuery().grecaptcha) 
                        {
                            grecaptcha.reset();
                        }
                    });
                    $('#'+button_pressed).html(button_pressed_html);
                    $('button[type="submit"]').prop('disabled',false);
                }
            });
        } else {
            $("#frmAdd .alert-danger").show();
            return false;
        }
    });
}

function hadleEditForm()
{
    $("#frmEdit").submit(function() {
        $("#frmEdit .duplicate-error").hide();
        $("#frmEdit .alert-danger").hide();
        if($('#CkEditor').length > 0 ){ CKEDITOR.instances.CkEditor.updateElement(); }
        if($('#vCkEditor').length > 0){ CKEDITOR.instances.vCkEditor.updateElement(); }
        if($('#CkEditor2').length > 0){ CKEDITOR.instances.CkEditor2.updateElement(); }
        var $valid = form_valid("#frmEdit");
        for ( instance in CKEDITOR.instances ) {
            CKEDITOR.instances[instance].updateElement();
        }
        
        if($('#image_val img').prop('src') != undefined && $('#image_val img').prop('src') != '' && $('#image_val img').prop('src').indexOf("base64") > -1)
        {
            $('#v_image_val').val($('#image_val img').prop('src'));
        }
        if($valid){
            var button_pressed_html = $('#Submit').html();
            $('button[type="submit"]').prop('disabled',true).html('Please wait...');
            var send_data = $("#frmEdit").serialize()
            $.post($("#frmEdit").attr("action"), send_data, function(data)
            {
                if($.trim(data) == 'TRUE'){
                    window.location.href = $("#frmEdit").attr('redirect');
                } else {
                    $.each(data, function (key,val) {
                        $("#"+key+'_duplicate_error').show();
                        if (jQuery().grecaptcha) 
                        {
                            grecaptcha.reset();
                        }
                    });
                    $('button[type="submit"]').prop('disabled',false).html(button_pressed_html);
                }
            });
        }
        return false;
    });
}

function handleProfileForm() {
   $("#myprofileform").submit(function() {
        $('.duplicate_error').hide();
        $(".alert").hide();
        $("#myprofileform .alert-danger").hide();
        var $valid = form_valid("#myprofileform");
        //var $valid = $("#myprofileform").valid();
        if($valid) 
        {
            $.post($("#myprofileform").attr("action"), $("#myprofileform").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    window.location.href = window.location.href;
                } else {
                    $.each(data, function (key,val) {
                        $("#"+key+'_duplicate_error').show();
                        $("#"+key+'_duplicate_error').html(val);
                    });
                }
            });
        } else {
            $("#myprofileform .alert-danger").show();
            return false;
        }
    });    
}
function handleAppSettingsForm() {
   $("#appsettingsform").submit(function() {
        $('.duplicate_error').hide();
        $(".alert").hide();
        $("#appsettingsform .alert-danger").hide();
        var $valid = form_valid("#appsettingsform");
        //var $valid = $("#myprofileform").valid();
        if($valid) 
        {
            $.get($("#appsettingsform").attr("action"), $("#appsettingsform").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    window.location.href = window.location.href;
                } else {
                    $.each(data, function (key,val) {
                        $("#"+key+'_duplicate_error').show();
                        $("#"+key+'_duplicate_error').html(val);
                    });
                }
            });
        } else {
            $("#appsettingsform .alert-danger").show();
            return false;
        }
    });    
}
function handleForgetPassword()
{
    $("#forget-form").submit(function() {
        $("#forget-form .alert-danger").hide();
        var $valid = $("#forget-form").valid();
        if($valid) 
        {
            $("#btn-forgot").attr("disabled", true);
            $.post($("#forget-form").attr("action"), $("#forget-form").serialize(), function(data){
                if(data == "TRUE")
        		{
        			$('.login-form').show();
        			$('.forget-form').hide();
        			$(".login-form .forgot-success").show();
                    $("#btn-forgot").attr("disabled", false);
        		}
        		else
        		{
        		  $("#forget-form .alert-danger").show();
                  $("#btn-forgot").attr("disabled", false);	
        		}
    		});
        } else {
            $("#btn-forgot").attr("disabled", false);
            $("#forget-form .alert-danger").show();    
            return false;
        }
    });
}

function handleResetPassword(){
    $("#reset-form").submit(function() {
        $(".alert").hide();
        $("#reset-form .alert-danger").hide();
        var $valid = $("#reset-form").valid();
        if($valid) 
        {
            $("#btn-reset").attr("disabled", true);
            $.post($("#reset-form").attr("action"), $("#reset-form").serialize(), function(data){
                if(data == "TRUE" || data != '')
        		{
        		  window.location.href = $('#returnRedirect').val();    	
        		}
        		else
        		{
        			$('.login-form').show();
        			$('.reset-form').hide();
        			$(".login-form .alert-success").show();
                    $("#btn-reset").attr("disabled", false);
        		}
    		});
        } else {
            $("#btn-reset").attr("disabled", false);
            $("#reset-form .alert-danger").show();    
            return false;
        }
    });
}

function handleApiResetPassword(){
    $("#reset-form-api_submit_button").click(function() {
       //alert('11'); return false;
        $(".alert").hide();
        $("#reset-form-api .alert-danger").hide();
        var $valid = $("#reset-form-api").valid();
        if($valid) 
        { 

            $("#btn-reset").attr("disabled", true);
            document.getElementById("reset-form-api").submit();
            $("#reset-form-api").submit();
            return true;
            
        } else {
            $("#btn-reset").attr("disabled", false);
            $("#reset-form-api .alert-danger").show();    
            return false;
        }
    });
}

function hadleReplyForm()
{
    $("#submit_btn").on('click',function(e) {
        if($('#CkEditor').length > 0 ){ CKEDITOR.instances.CkEditor.updateElement(); }
        $("#frmSendMail .alert-danger").hide();
        var btnText = $(this).html();
        var $valid = form_valid("#frmSendMail");
        if($valid) 
        {
            $("#submit_btn").prop('disabled',true); 
            $("#submit_btn").html('Please wait...');           
            $.post($("#frmSendMail").attr("action"), $("#frmSendMail").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal').modal('toggle'); 
                    $('.alert-success').show();
                    $("#submit_btn").prop('disabled',false);
                    $("#submit_btn").html(btnText);
                    $('.alert-success .message').html('Feeback email sent successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);    
                    window.location.href = window.location.href; 
                }
            });
        } else {
            $("#submit_btn").prop('disabled',false);
            $("#submit_btn").html(btnText);            
            $("#frmSendMail .alert-danger").show();
            return false;
        }
    });
}
function hadleEditEmailTemplateForm()
{
    $("#submit_btn").on('click',function(e) {
        if($('#CkEditor').length > 0 ){ CKEDITOR.instances.CkEditor.updateElement(); }
        $("#frmEditTemplate .alert-danger").hide();
        var btnText = $(this).html();
        var $valid = form_valid("#frmEditTemplate");
        if($valid) 
        {
            $("#submit_btn").prop('disabled',true); 
            $("#submit_btn").html('Please wait...');           
            $.post($("#frmEditTemplate").attr("action"), $("#frmEditTemplate").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal').modal('toggle'); 
                    $('.alert-success').show();
                    $("#submit_btn").prop('disabled',false);
                    $("#submit_btn").html(btnText);
                    $('.alert-success .message').html('Email Template Edit successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);    
                    window.location.href = window.location.href; 
                }
            });
        } else {
            $("#submit_btn").prop('disabled',false);
            $("#submit_btn").html(btnText);            
            $("#frmSendMail .alert-danger").show();
            return false;
        }
    });
}

function hadleRescheduleForm()
{
    $(document).on("click", ".reschedule_btn", function () {
		 $("#frmReschedule #reschedule_date").val('');
		 var id = $(this).data('id');
         var user_name = $(this).data('username');
         var parent_name = $(this).data('parent-name');
         var plan_name = $(this).data('plan');
         var schedule_date = $(this).data('schedule-date');
         var reschedule_by = $(this).data('reschedule-by');
         var reschedule_date = $(this).data('reschedule-date');
         var time_session = $(this).data('time-session');
         $("#frmReschedule #id").val(id);
         $("#frmReschedule #user_name").val(user_name);
         $("#frmReschedule #parent_name").val(parent_name);
         $("#frmReschedule #plan_name").val(plan_name);
         $("#frmReschedule #schedule_date").val(schedule_date);
         if(reschedule_by != ''){
            $("#frmReschedule #reschedule_by_sec label").html('Reschedule By '+reschedule_by);  
            $("#frmReschedule #reschedule_date").val(reschedule_date);
         } else {
            $("#frmReschedule #reschedule_by_sec").hide();  
         }
         $("#frmReschedule #e_reschedule_created_by").val(reschedule_by);
         if(time_session != ''){
            $("#frmReschedule #e_day").val(time_session);   
         }
         
    });
    
    $(document).on("click", "#submit_btn", function (e) {
        $("#frmReschedule .alert-danger").hide();
        var $valid = form_valid("#frmReschedule");
        var btnText = $("#submit_btn").html();
        if($valid) 
        {
            $("#submit_btn").prop('disabled',true); 
            $("#submit_btn").html('Please wait...');           
            $.post($("#frmReschedule").attr("action"), $("#frmReschedule").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal').modal('toggle'); 
                    $('.alert-success').show();
                    $("#submit_btn").prop('disabled',false);
                    $("#submit_btn").html(btnText);
                    $(".filter-submit").trigger( "click");
                    $('.alert-success .message').html('Appointment reschedule successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);     
                    window.location.href = window.location.href; 
                }
            });
        } else {
            $("#submit_btn").prop('disabled',false); 
            $("#submit_btn").html(btnText);           
            $("#frmReschedule .alert-danger").show();
            return false;
        }
    });
}

function hadleAssignEmployeeForm()
{
    $(document).on("click", ".assign_employee_btn", function () {
         $('#myModal2').modal('show'); 
         var id = $(this).data('id');
         var user_name = $(this).data('username');
         var parent_name = $(this).data('parent-name');
         var plan_name = $(this).data('plan');
         var employee_id = $(this).data('employee-id');
         var patient_id = $(this).data('patient-id');
         var hospital_id = $(this).data('hospital-id');
         var e_is_medical = $(this).data('eismedical');
         $("#e_is_medical").val(e_is_medical);
         $('.medical_div').hide();
         $('#medical_validation').removeClass('required');
         $('#hospital_list').removeClass('required');
         $('#patient_unique_id').removeClass('required');
         
         if(e_is_medical == 'Yes')
         {
            $('#medical_validation').addClass('required');
            $('#hospital_list').addClass('required');
            $('.medical_div').show();
            $('#patient_unique_id').addClass('required'); 
         }
            
         $("#frmAssignEmployee #appointment_id").val(id);
         $("#frmAssignEmployee #user").val(user_name);
         $("#frmAssignEmployee #parent").val(parent_name);
         $("#frmAssignEmployee #service").val(plan_name);
        
         $("#frmAssignEmployee #patient_unique_id").val(patient_id);
         $("#frmAssignEmployee #hospital_list").val(hospital_id);  

         $("#employee_id option").hide();
         $("#employee_id option:first").show();
         $("#employee_id option[rel="+hospital_id+'-'+e_is_medical+"]").show();
         $("#frmAssignEmployee #employee_id").val(employee_id);
         
    });
    
    $(document).on("click", "#submit_btn2", function (e) {
        $("#frmAssignEmployee .alert-danger").hide();
        var $valid = form_valid("#frmAssignEmployee");
        if($valid) 
        {  
            $.post($("#frmAssignEmployee").attr("action"), $("#frmAssignEmployee").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    var btnText = $("#submit_btn2").html();
                    $("#submit_btn2").html('Please wait...');
                    $("#submit_btn2").attr('disabled',true);
                    $('#myModal2').modal('toggle'); 
                    $('.alert-success').show();
                    $("#submit_btn2").html(btnText);
                    $("#submit_btn2").prop('disabled',false);
                    $(".filter-submit").trigger( "click");
                    $('.alert-success .message').html('Employee Assign successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);     

                    //change status 

                    $("#frmUpdateStatus #status option[value='Complete']").remove();
                    $('#frmUpdateStatus #status').append($("<option></option>").attr("value",'Complete').text('Complete'));  
                    window.location.href = window.location.href; 

                }
                else {
                    $("#submit_btn2").attr('disabled',false);
                    $.each(data, function (key,val) {
                        $("#"+key+'_duplicate_error').show();    
                    });
                }
            });
        } else {
            var btnText = $("#submit_btn2").html();
            $("#submit_btn2").prop('disabled',false); 
            $("#submit_btn2").html(btnText);           
            $("#frmAssignEmployee .alert-danger").show();
            return false;
        }
    });
}
function hadleRefundForm()
{
    $(document).on("click", ".refund_btn", function () {
         var id = $(this).data('id');
         var user_name = $(this).data('username');
         var plan_name = $(this).data('planname');
         var plan_price = $(this).data('planprice');
         var total_price = $(this).data('totalprice');
         var amount_sign = $(this).data('amountsign');
         $("#frmUserRefund #labAmount").text('Amount(In '+amount_sign+')');
         $("#frmUserRefund #refund_id").val(id);
         $("#frmUserRefund #user").val(user_name);
         $("#frmUserRefund #planname").val(plan_name);
         $("#frmUserRefund #totalprice").val(total_price);
         $("#frmUserRefund #planprice").val(plan_price);
         $("#frmUserRefund #refundamount").attr('min','0');
         $("#frmUserRefund #refundamount").attr('max',total_price.replace(amount_sign,''));
         
    });
    
    $(document).on("click", "#submit_btn2", function (e) {
        $("#frmUserRefund .alert-danger").hide();
        var $valid = form_valid("#frmUserRefund");
        if($valid) 
        {
            var btnText = $("#submit_btn2").html();
            $("#submit_btn2").html('Please wait...');
            $("#submit_btn2").attr('disabled',true);
            $.post($("#frmUserRefund").attr("action"), $("#frmUserRefund").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal2').modal('toggle'); 
                    $('.alert-success').show();
                    $("#submit_btn2").html(btnText);
                    $("#submit_btn2").prop('disabled',false);
                    $(".filter-submit").trigger( "click");
                    $('.alert-success .message').html('Refund Amount Submit Sucessfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);     
                    window.location.href = window.location.href; 

                }
            });
        } else {
            $("#submit_btn2").prop('disabled',false); 
            $("#submit_btn2").html(btnText);           
            $("#frmUserRefund .alert-danger").show();
            return false;
        }
    });
}

function hadlePaymentUpdateStatusForm()
{
    $(document).on("click", ".update_status_btn", function () {     
         var id = $(this).data('id');
         var user_name = $(this).data('username');
         var plan_name = $(this).data('plan');
         var service_name = $(this).data('service');
         var status = $(this).data('status');
         var total_price = $(this).data('totalprice');
         $("#frmUpdateStatus #id").val(id);
         $("#frmUpdateStatus #user_name").val(user_name);
         $("#frmUpdateStatus #service_name").val(service_name);
         $("#frmUpdateStatus #plan_name").val(plan_name);
         $("#frmUpdateStatus #status").val(status);   
         $("#frmUpdateStatus #total_price").val('Rs '+total_price);    
    });
    
    $(document).on("click", "#submit_btn3", function (e) {
        $("#frmUpdateStatus .alert-danger").hide();
        var $valid = form_valid("#frmUpdateStatus");
        if($valid) 
        {
            var btnText = $("#submit_btn3").html();
            $("#submit_btn3").prop('disabled',true); 
            $("#submit_btn3").html('Please wait...');  
            $.post($("#frmUpdateStatus").attr("action"), $("#frmUpdateStatus").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal3').modal('toggle'); 
                    $('.alert-success').show();
                    $(".filter-submit").trigger( "click");
                    $("#submit_btn3").prop('disabled',false);
                    $("#submit_btn3").html(btnText);
                    $('.alert-success .message').html('Status updated successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);     
                }
            });
        } else {
            $("#submit_btn3").prop('disabled',false); 
            $("#submit_btn3").html(btnText);           
            $("#frmUpdateStatus .alert-danger").show();
            return false;
        }
    });
}


function hadleUpdateStatusForm()
{
    $(document).on("click", ".update_status_btn", function () {		
         var id = $(this).data('id');
         var user_name = $(this).data('username');
         var parent_name = $(this).data('parent-name');
         var plan_name = $(this).data('plan');
         var schedule_date = $(this).data('schedule-date');
         var reschedule_by = $(this).data('reschedule-by');
         var reschedule_date = $(this).data('reschedule-date');
         var employee_name = $(this).data('employee-name');
         var plantype = $(this).data('plantype');
         var status = $(this).data('status');
         $("#frmUpdateStatus #id").val(id);
         $("#frmUpdateStatus #user_name").val(user_name);
         $("#frmUpdateStatus #parent_name").val(parent_name);
         $("#frmUpdateStatus #plantype").val(plantype);
         $("#frmUpdateStatus #plan_name").val(plan_name);
         $("#frmUpdateStatus #schedule_date").val(schedule_date);
         if(reschedule_by != ''){
            $("#frmUpdateStatus #reschedule_by_sec label").html('Reschedule By '+reschedule_by);  
            $("#frmUpdateStatus #reschedule_date").val(reschedule_date);
         } else {
            $("#frmUpdateStatus #reschedule_by_sec").hide();  
         }
         $("#frmUpdateStatus #e_reschedule_created_by").val(reschedule_by);
         $("#frmUpdateStatus #employee_name").val(employee_name);
         if(status != '' && status !='Pending' && status != 'Approve'){
            $("#frmUpdateStatus #status").val(status);   
         }
         if(status != 'Approve')
         {
            $("#frmUpdateStatus #status option[value='Complete']").remove();
         }
    });
    
    $(document).on("click", "#submit_btn3", function (e) {
        $("#frmUpdateStatus .alert-danger").hide();
        var $valid = form_valid("#frmUpdateStatus");
        if($valid) 
        {
            var btnText = $("#submit_btn3").html();
            $("#submit_btn3").prop('disabled',true); 
            $("#submit_btn3").html('Please wait...');  
            $.post($("#frmUpdateStatus").attr("action"), $("#frmUpdateStatus").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal3').modal('toggle'); 
                    $('.alert-success').show();
                    $(".filter-submit").trigger( "click");
                    $("#submit_btn3").prop('disabled',false);
                    $("#submit_btn3").html(btnText);
                    $('.alert-success .message').html('Status updated successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);   
                    window.location.href = window.location.href;   
                }
            });
        } else {
            $("#submit_btn3").prop('disabled',false); 
            $("#submit_btn3").html(btnText);           
            $("#frmUpdateStatus .alert-danger").show();
            return false;
        }
    });
}

function handleParentChildSelect()
{
    $(document).on("change","#i_user_id",function () {
        var rel = $(this).val();
        $("#i_parent_id option").show();
        $("#i_parent_id").val('');
        if(rel>0)
        {
            $('#i_parent_id option[rel!='+rel+']').hide();
        }  
    });
	var rel = $("#i_user_id").val();
		if(rel>0)
        {
            $('#i_parent_id option[rel!='+rel+']').hide();
        }        
}

function hadleSendToUsersForm()
{
    $(document).on("click", ".send_to_users_btn", function () {
         
         if($(this).data('e_is_expire') == "Yes")
         {
            $('#myModal').modal('toggle');   
            bootbox.alert("Coupon expiration date has passed.", function() {
                window.location.href =window.location.href;              
            });
             
         }
         var user_arr = [];
         var id = $(this).data('id');
         $("#frmSendToUsers #coupon_id").val(id);
         var coupon_code = $(this).data('coupon-code');
         var user_ids = $(this).data('user-ids');
         if (user_ids.toString().indexOf(',') == -1) {
             $("input[type=checkbox]").each(function () {
                if($(this).val() == user_ids)
                {
                    $(this).prop("checked", true);
                    $(this).prop("disabled", true);
                }
                else
                {
                    $(this).prop("checked", false);
                    $(this).prop("disabled", false)
                }

               // user_ids.indexOf($(this).val())!=-1?$(this).prop("checked", true):$(this).prop("checked", false);
               // user_ids.indexOf($(this).val())!=-1?$(this).prop("disabled", true):$(this).prop("disabled", false);
             });
         }
         else
         {
            var user_arr = $(this).data('user-ids').split(',');
            $("input[type=checkbox]").each(function () {
                if($.inArray($(this).val(),user_arr) != -1)
                {
                    $(this).prop("checked", true);
                    $(this).prop("disabled", true);
                }
                else
                {
                    $(this).prop("checked", false);
                    $(this).prop("disabled", false)
                }

               // user_ids.indexOf($(this).val())!=-1?$(this).prop("checked", true):$(this).prop("checked", false);
               // user_ids.indexOf($(this).val())!=-1?$(this).prop("disabled", true):$(this).prop("disabled", false);
             });
         }
         //var user_arr = user_ids.split('|');
         $("#frmSendToUsers #coupon_code").html(coupon_code);
         jQuery.uniform.update(".v_user_ids");
    });


    $(document).on("click", "#submit_btn", function (e) {
        $("#frmSendToUsers .alert-danger").hide();
        var $valid = form_valid("#frmSendToUsers");
        if($valid)
        {
            var btnText = $("#submit_btn").html();
            $("#submit_btn").html('Please wait...');
            $("#submit_btn").attr('disabled',true);
            $.post($("#frmSendToUsers").attr("action"), $("#frmSendToUsers").serialize(), function(data) {
                if($.trim(data) == 'TRUE'){
                    $('#myModal').modal('toggle');
                    $('.alert-success').show();
                    $("#submit_btn").html(btnText);
                    $("#submit_btn").prop('disabled',false);
                    $(".filter-submit").trigger( "click");
                    $('.alert-success .message').html('Coupon code send to user(s) successfully');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);
                    window.location.href = window.location.href;
                }
            });
        } else {
            $("#submit_btn").prop('disabled',false);
            $("#submit_btn").html(btnText);
            $("#frmSendToUsers .alert-danger").show();
            return false;
        }
    });
}

function export_to_excel(ModelName) {
    exportAction = ($("#frmSearchForm").attr('action')).replace("list-ajax","export");
    window.location.href = exportAction+'?'+$("#frmSearchForm").serialize();
    return false;
}

function show_markers(first_latitude, first_longitude,allMarkers)
{
    setTimeout(function(){
        var map = new GMaps({
            div: '#gmap_basic',
            lat: first_latitude,
            lng: first_longitude
        });
        var markerCount = 0;
        $.each(allMarkers, function(index, item) {
            map.addMarker({
                lat: item.latitude,
                lng: item.longitude,
                icon: SITE_URL+"img/marker.png",
                infoWindow: {
                    content: '<span style="color:#000">'+item.title+'<br>'+item.link+'</span>'
                }
            });
            markerCount++;
        });
        if(markerCount == 0)
        {
            map.setZoom(2);    
        } else {
            map.setZoom(14);
        }
    },1000);
}
/*** Image upload without crop ***/

function read_bulk_images(input,i) {

   if (input.files && input.files[0])
   {
     var file=input.files[0];

     var reader = new FileReader();
    
     $('.file_upload_'+i).html('Please wait...');
     $('button[type="submit"]').prop('disabled',true);
     reader.onload = function (e)
     {
        img_src = e.target.result;
        var img = new Image();
        img.src = img_src;
        img.onload = function() {
           
          if((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') )
          {    
             $("#show_image_"+i).attr("src", e.target.result);
             $("#show_image_"+i).show();
             $("#imgbase64_"+i).attr("value", e.target.result);
          } else
          {
              bootbox.alert("Please upload image only.", function(answer) {
                $('.image_upload_'+i).val('');
              });
          }
          $('button[type="submit"]').prop('disabled',false);
          $('.file_upload_'+i).html('Select Image');
        };
     };
     reader.readAsDataURL(input.files[0]);
   }
}

function read_image(input) {
    
      if (input.files && input.files[0])
      {
         var file=input.files[0];

         var reader = new FileReader();
        
         $('.file_upload').html('Please wait...');
         $('button[type="submit"]').prop('disabled',true);
         reader.onload = function (e)
         {
            img_src = e.target.result;
            var img = new Image();
            img.src = img_src;
            
            var maximum_height = 500;
            var maximum_width = 500;
            
            img.onload = function() {
               
              var width = this.width;
              var height = this.height;

              if((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') )
              {    
                /*  if(width<$('#require_width').val() || height<$('#require_height').val())
                  {
                      bootbox.alert("Please upload image of proper size.Width:"+width+'Height:'+height+" Required Width:"+$('#require_width').val()+' Required Height:'+$('#require_height').val(), function(answer) {
                          //  $('.image_upload').val('');
                          //  $('#imgbase64').val('');
                            //$(".show_image").attr('src',SITE_URL+"img/no_image.png");
                            
                          });
                      $('button[type="submit"]').prop('disabled',false);
                      $('.file_upload').html('Select Image');
                      return false;
                  }
                  if(width>maximum_width || height>maximum_height)
                  {
                       bootbox.alert("Please upload image of proper size.Width:"+width+'Height:'+height+" Required Maximum Width:"+maximum_width+' Maximum Height:'+maximum_height, function(answer) {
                           // $('.image_upload').val('');
                           // $('#imgbase64').val('');
                            //$(".show_image").attr('src',SITE_URL+"img/no_image.png");
                            
                          });
                      $('button[type="submit"]').prop('disabled',false);
                      $('.file_upload').html('Select Image');
                      return false;
                  }*/
                 $("#show_image").attr("src", e.target.result);
                 $("#show_image").show();
                 $("#imgbase64").attr("value", e.target.result);
              } else
              {
                  bootbox.alert("Please upload image only.", function(answer) {
                    $('.image_upload').val('');
                  });
              }
              $('button[type="submit"]').prop('disabled',false);
              $('.file_upload').html('Select Image');

            };

           
         };

         reader.readAsDataURL(input.files[0]);

      }
}
function read_image2(input) 
{
      
      if (input.files && input.files[0])
      {
         var file=input.files[0];
         
         var reader = new FileReader();
         $('.file_upload2').html('Please wait...');
         $('button[type="submit"]').prop('disabled',true);
         reader.onload = function (e)
         {
            
              img_src = e.target.result;
              var img = new Image();
              img.src = img_src;
              var width = img.width;
              var height = img.height;

              //alert(file.type);
            if((file.type == 'image/jpeg' || file.type == 'image/jpg' ||file.type == 'image/png' || file.type == 'image/png' || file.type == 'image/gif'))
            {
              //alert("Call...");
              if(width<$('#require_width').val() && height<$('#require_height').val())
              {
                  bootbox.alert("Image width & height must be 150 X 150 or more.", function(answer) {
                      $('.image_upload2').val('');
                      $('#imgbase642').val('');
                      $(".show_image2").attr('src',SITE_URL+"img/no_image.png");
                      //http://siteproofs.net/projects/saad_almallak/appex/img/no_image.png
                      //alert(SITE_URL);
                      
                    });
                  $('button[type="submit"]').prop('disabled',false);
                        $('.file_upload2').html('Select Image');
                    return false;
              }
               $("#show_image2").attr("src", e.target.result);
               $("#show_image2").show();
               $("#imgbase642").attr("value", e.target.result);
            } else
            {
                bootbox.alert("Please upload image only.", function(answer) {
                  $('.image_upload2').val('');
                });
            }



            
            $('button[type="submit"]').prop('disabled',false);
            $('.file_upload2').html('Select Image');
         };

         reader.readAsDataURL(input.files[0]);

      }
}

//my new code for validation of image with demensional
/*** Image upload without crop ***/
/*
function read_image(input,rwidth,rheight) {
    if (input.files && input.files[0])
    {
        var rwidth = $('#require_width').val();
        var rheight = $('#require_height').val();
        $('.file_upload').html('Please wait...');
        $('button[type="submit"]').prop('disabled',true);
         
        var file = input.files[0];
    /*    if((file.type != 'image/jpeg' || file.type != 'image/png' || file.type != 'image/gif'))
        {
            bootbox.alert("Please upload image only.", function(answer) {
              $('.image_upload').val('');
            });
            
            $('button[type="submit"]').prop('disabled',false);
            $('.file_upload').html('Select Image');
            return false;
        } 
    */    
/*        var reader = new FileReader();
        reader.onload = function (e)
        {
            var width = 0;
            var newImg = new Image();   
            newImg.onload = function() {
                width = newImg.width;
                height = newImg.height;
                
                if(width > rwidth && height > rheight)
                {
                    bootbox.alert("Please upload image only size."+width+' * '+height, function(answer) {
                    $('.image_upload').val('');
                    });
                    
                    $('button[type="submit"]').prop('disabled',false);
                    $('.file_upload').html('Select Image');
                    return false;
                }
                $("#show_image").attr("src", e.target.result);
                $("#show_image").show();
                $("#imgbase64").attr("value", e.target.result);
               
                $('button[type="submit"]').prop('disabled',false);
                $('.file_upload').html('Select Image');
            }
            newImg.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
} 
*/