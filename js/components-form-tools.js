var ComponentsFormTools = function () {

    var handleBootstrapSwitch = function() {
        $('.make-switch').bootstrapSwitch().on('switchChange.bootstrapSwitch', function(event, state) {
            var url = $(this).attr('url');
            var status;
            url = url.slice(0,url.lastIndexOf("/"))+"/";
            if(state==true)
            {
               url+=$.trim($(this).attr('data-on-text'));
               status = $.trim($(this).attr('data-on-text'));
            }
            else {
               url+=$.trim($(this).attr('data-off-text'));
               status = $.trim($(this).attr('data-off-text'));
            }

            $.post(url,function(data){
                if(data == 'TRUE')
                {
                    $('.alert-success').show();
                    $('.alert-success .message').html('Record '+status.toLowerCase()+' successfully.');
                    setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);
                }
            });
        });
    };
    var handleUniform = function() {
        if (!$().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle, .make-switch, .icheck), input[type=radio]:not(.toggle, .star, .make-switch, .icheck)");
        if (test.size() > 0) {
            test.each(function() {
                if ($(this).parents(".checker").size() === 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    };
    
    var handleColorPicker = function (){
        if($('#service_color').length > 0 ){
            $('#service_color').colorpicker({
                horizontal: true
            });    
        }
          
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleBootstrapSwitch();
            handleUniform();
            handleColorPicker();
        }
    };

}();
