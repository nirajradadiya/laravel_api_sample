var durl='';
var TableAjax = function (url,columnsSort, order) {
    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });
    }

    var handleRecords = function (url, columnsSort, order) {
        durl = url;
        var grid = new Datatable();
        var table = $('#datatable_ajax'); // actual table jquery object
        
        grid.init({
            src: $("#datatable_ajax"),
            onSuccess: function (grid) { 
                //Store filter data on cookie 
                /*if($.cookie(url) === null || $.cookie(url) === ""){ }
                else
                {
                     $.removeCookie(url);
                }*/

                var filterData = grid.getAjaxParams()
                var cookieData = {};
                
                $.each(filterData, function(index,value) {
                    /*if(index == 'page' || index == 'length') {
                        cookieData[index] = value;
                    }*/
                    if($('[name='+index+']').length > 0) {
                        $('[name='+index+']').val(value);
                        if($('[name='+index+']').data('select2') != undefined) {
                            $('[name='+index+']').select2('val', value); 
                        }
                        //cookieData[index] = value;
                    }
                });
                
                //$.cookie(url, JSON.stringify(cookieData));
                setTimeout(function(){
                    if($(".fancybox").length > 0){
                        $(".fancybox").fancybox();
                    }
                    if($(".NotInterested").length > 0) { 
                        $(".NotInterested").closest('tr').attr('style','background-color: gray;');
                        console.log($(".NotInterested").closest('tr').length)
                    }
                    ComponentsFormTools.init();
                },100);
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            columnsSortField: columnsSort,
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",
                
                //"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                'stateSave': true,
                "lengthMenu": [
                    [10, 20, 50, 100, 150, 500],
                    [10, 20, 50, 100, 150, 500] // change per page values here
                ],
                "pageLength": 20, // default record count per page
                "ajax": {
                    "url": url + '?' + Date.now(), // ajax source
                },
                "order": order, // set first column as a default sort by asc
            }
        });
        
        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            
            
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            var url = $(".table-group-action-url", grid.getTableWrapper()).val();
            if (action.val() != ""  && action.val() != "Reply" && grid.getSelectedRowsCount() > 0) {
                 bootbox.confirm('Are you sure you want to '+action.val().toLowerCase()+' this record?', function (confirmed) {
                    if(confirmed){                                  
                        var send_data = {};
                         send_data.action = action.val();
                         send_data['ids'] = grid.getSelectedRows();
                         $.post(url,send_data, function(data) {
                            if(data == 'TRUE') {
                                send_data_action = send_data.action.toLowerCase();
                                if(send_data_action == 'active') {
                                    send_data_action = 'actived';
                                } else if(send_data_action == 'inactive') { 
                                    send_data_action = 'inactived';
                                } else {
                                    send_data_action = 'deleted';
                                }
                                Metronic.alert({
                                    type: 'success',
                                    icon: 'check',
                                    message: 'Record has been '+send_data_action +' successfully.',
                                    container: grid.getTableWrapper(),
                                    place: 'prepend'
                                });
                                
                                 $.each(send_data['ids'], function(i,id) {
                                    if(send_data.action == 'Active'){
                                        $('tbody > tr > td > .status_' + id, table).addClass('label-success');
                                        $('tbody > tr > td > .status_' + id, table).removeClass('label-danger');
                                        $('tbody > tr > td > .status_' + id, table).text(send_data.action);
                                        if($('tbody  tr  td .status_' + id+'.make-switch').length > 0){
                                            $('tbody  tr  td .status_' + id+'.make-switch').bootstrapSwitch('state', true,true);                                         }
                                    } else if(send_data.action == 'Inactive'){

                                        $('tbody > tr > td > .status_' + id, table).addClass('label-danger');
                                        $('tbody > tr > td > .status_' + id, table).removeClass('label-success');
                                        $('tbody > tr > td > .status_' + id, table).text(send_data.action);
                                        if($('tbody  tr  td .status_' + id+'.make-switch').length > 0){
                                            $('tbody  tr  td .status_' + id+'.make-switch').bootstrapSwitch('state', false,true);                                        }
                                    } else {
                                       $('tbody > tr > td  .delete_' + id, table).closest('tr').fadeOut(1500, function() {
                                            $(this).closest('tr').remove();
                                            if($("#datatable_ajax tbody > tr").length <= 1) {
                                                $(".filter-submit").trigger( "click" );
                                            }
                					   });  
                                    }
                                 });
                                 
                                 setTimeout(function(){ $('.alert-success').fadeOut(4000); },3000);      
                                 var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]', table);
                                 var checked = $(this).is(":checked");
                                 $(set).each(function() {
                                    $(this).attr("checked", false);
                                 });
                                 $('.table-group-action-input').val('');
                                 $('.group-checkable').attr("checked", false);
                                 $.uniform.update(set, table);
                                 $.uniform.update($('.group-checkable', table));
                            }
                         });   
                    }
                });   
            } else if(action.val() != "" && action.val() == "Reply"){
                var send_data = {};
                var emildId = '';
                var allEmails = [];
                send_data['ids'] = grid.getSelectedRows(); 
                 $.each(send_data['ids'], function(i,id) {
                    emildId = $('tbody > tr > td > a.email_address_' + id).text()
                    allEmails.push(emildId);  
                 });
                console.log(allEmails);  
            }
            else if (action.val() == "") {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });
        $(".form-filter").val('');
        // handle group actionsubmit button click
        $(document).on('click', '#export_to_excel', function (e) {
             var send_data = grid.getAjaxParams();
             if(send_data['export_page'] != undefined && send_data['export_page'] != '') {
                send_data['page'] = send_data['export_page'];
             }
             
             var send_data = $.param(send_data);
             var url = $(this).attr('action-url');
             if($('#date_parameters').length > 0 && $('body #location_report_range span').html() != 'Filter By Visited Date') {
                send_data = send_data + "&" + $('#date_parameters').val();
             }
             
             if($("#datatable_ajax tbody tr td").length > 1) {
                window.location.href = url+ '?' + send_data;   
             } else {
                 bootbox.alert('No Record found for export.');
                 return false;
             }
        });
    }

    return {

        //main function to initiate the module
        init: function (url, columnsSort, order) {
            initPickers();
            handleRecords(url, columnsSort, order);            
        }

    };

}();