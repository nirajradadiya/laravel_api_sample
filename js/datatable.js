/***
Wrapper/Helper Class for datagrid based on jQuery Datatable Plugin
***/
var Datatable = function() {

    var tableOptions; // main options
    var dataTable; // datatable object
    var table; // actual table jquery object
    var tableContainer; // actual table container object
    var tableWrapper; // actual table wrapper jquery object
    var tableInitialized = false;
    var ajaxParams = {}; // set filter mode
    var the;
    
    var countSelectedRecords = function() {
        var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        var text = tableOptions.dataTable.language.metronicGroupActions;
        if (selected > 0) {
            $('.table-group-actions > span', tableWrapper).text(text.replace("_TOTAL_", selected));
        } else {
            $('.table-group-actions > span', tableWrapper).text("");
        }
    };

    return {

        //main function to initiate the module
        init: function(options) {
            the = this
            
            //Set filter in ajaxparams from cookie
            //if($.cookie(durl) !== null && $.cookie(durl) !== "" && $.cookie(durl) !== undefined) {      
//                var cookieData = $.cookie(durl);
//                var cookieData = $.parseJSON(cookieData);
//                
//                $.each(cookieData , function(index,value) {
//                   the.setAjaxParam(index, value);
//                });
//            }            
            if (!$().dataTable) {
                return;
            };
                        
            // default settings
            options = $.extend(true, {
                src: "", // actual table  
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: true,
                loadingMessage: 'Loading...',
                dataTable: {
                    "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r><'table-scrollable't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>", // datatable layout
                    //"pageLength": 10, // default records per page
                    "language": { // language settings
                        // metronic spesific
                        "metronicGroupActions": "_TOTAL_ records selected:  ",
                        "metronicAjaxRequestGeneralError": "There is some problem with server. Please try again later.",

                        // data tables spesific
                        "lengthMenu": "<span class='seperator'>|</span>View _MENU_ records",
                        "info": "<span class='seperator'>|</span>Found total _TOTAL_ records",
                        "infoEmpty": "No records found to show",
                        "emptyTable": "No data available in table",
                        "zeroRecords": "No matching records found",
                        "paginate": {
                            "previous": "Prev",
                            "next": "Next",
                            "last": "Last",
                            "first": "First",
                            "page": "Page",
                            "pageOf": "of"
                        }
                    },

                    "orderCellsTop": true,
                    "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                        'orderable': false,
                        'targets': [0]
                    }],
                    
                    "columns": options.columnsSortField,

                    "pagingType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                    "autoWidth": false, // disable fixed width and enable fluid table
                    "processing": false, // enable/disable display message box on record load
                    "serverSide": true, // enable/disable server side ajax loading

                    "ajax": { // define ajax settings
                        "url": "", // ajax URL
                        "type": "POST", // request type
                        "timeout": 20000,
                        "data": function(data) { // add request parameters before submit
                            data['page'] = parseInt((data['start']) / (data['length']) + 1);
                                            
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                            ajaxParams['export_page'] = parseInt((data['start']) / (data['length']) + 1);
                            ajaxParams['export_length'] = data['length'];
                            ajaxParams['export_order'] = data['order'][0]['dir'];
                            ajaxParams['export_order_field'] = data['order'][0]['column'];
                            
                            Metronic.blockUI({
                                message: tableOptions.loadingMessage,
                                target: tableContainer,
                                overlayColor: 'none',
                                cenrerY: true,
                                boxed: true
                            });
                        },
                        "dataSrc": function(res) { // Manipulate the data returned from the server
                            if(res.markers !== undefined && res.markers.length > 0){
                                   the.google_map_markers(res.markers);
                            } else {
                                   if($("#gmap_basic").length > 0)
                                   {
                                        the.google_default_map();        
                                                                       
                                   } 
                                   the.google_default_map();    
                            }
                            if (res.customActionMessage) {
                                Metronic.alert({
                                    type: (res.customActionStatus == 'OK' ? 'success' : 'danger'),
                                    icon: (res.customActionStatus == 'OK' ? 'check' : 'warning'),
                                    message: res.customActionMessage,
                                    container: tableWrapper,
                                    place: 'prepend'
                                });
                            }

                            if (res.customActionStatus) {
                                if (tableOptions.resetGroupActionInputOnSuccess) {
                                    $('.table-group-action-input', tableWrapper).val("");
                                }
                            }

                            if ($('.group-checkable', table).size() === 1) {
                                $('.group-checkable', table).attr("checked", false);
                                $.uniform.update($('.group-checkable', table));
                            }

                            if (tableOptions.onSuccess) {
                                tableOptions.onSuccess.call(undefined, the);
                            }

                            Metronic.unblockUI(tableContainer);

                            return res.data;
                        },
                        "error": function() { // handle general connection errors
                            if (tableOptions.onError) {
                                tableOptions.onError.call(undefined, the);
                            }

                            Metronic.alert({
                                type: 'danger',
                                icon: 'warning',
                                message: tableOptions.dataTable.language.metronicAjaxRequestGeneralError,
                                container: tableWrapper,
                                place: 'prepend'
                            });

                            Metronic.unblockUI(tableContainer);
                        }
                    },
                    'fnRowCallback': function (row, data, index) {
                        if($(row).find('.is_new').val() == '1') {
                            $(row).css('font-weight', 'bold');
                        }
                        /*if($(row).find('.is_link_to').length > 0) {
                           $(row).attr("onclick","window.location='"+$(row).find('.is_link_to').val()+"'");
                           //onclick="return window.location ='www.google.com'" 
                        }*/
                    },

                    "drawCallback": function(oSettings) { // run some code on table redraw
                        if (tableInitialized === false) { // check if table has been initialized
                            tableInitialized = true; // set table initialized
                            table.show(); // display table
                        }
                        Metronic.initUniform($('input[type="checkbox"]:not(.make-switch)', table));  // reinitialize uniform checkboxes on each table reload
                        countSelectedRecords(); // reset selected records indicator
                    }
                }
            }, options);

            tableOptions = options;

            // create table's jquery object
            table = $(options.src);
            tableContainer = table.parents(".table-container");

            // apply the special class that used to restyle the default datatable
            var tmp = $.fn.dataTableExt.oStdClasses;

            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
            $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-small input-sm input-inline";
            $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";

            // initialize a datatable
            dataTable = table.DataTable(options.dataTable);

            // revert back to default
            $.fn.dataTableExt.oStdClasses.sWrapper = tmp.sWrapper;
            $.fn.dataTableExt.oStdClasses.sFilterInput = tmp.sFilterInput;
            $.fn.dataTableExt.oStdClasses.sLengthSelect = tmp.sLengthSelect;

            // get table wrapper
            tableWrapper = table.parents('.dataTables_wrapper');

            // build table group actions panel
            if ($('.table-actions-wrapper', tableContainer).size() === 1) {
                $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
                $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            }
            // handle group checkboxes check/uncheck
            $('.group-checkable', table).change(function(e) {
                e.preventDefault();
                var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]', table);
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    //$(this).attr("checked", checked);
                    $(this).prop('checked', checked);
                });
                $.uniform.update(set);
                countSelectedRecords();
            });

            // handle row's checkbox click
            table.on('change', 'tbody > tr > td:nth-child(1) input[type="checkbox"]', function() {
                countSelectedRecords();
            });

            // handle filter submit button click
            table.on('click', '.filter-submit', function(e) {
                e.preventDefault();
                the.submitFilter();
            });
                        
            table.on('keyup', 'input[type="text"]',function(e) {        
        		var unicode = e.keyCode;
                if(unicode == 13) {        
                      e.preventDefault();
                      the.submitFilter();
        		} 
            });
    
            // handle filter cancel button click
            table.on('click', '.filter-cancel', function(e) {
                e.preventDefault();
                $('body #location_report_range span').html('Filter By Visit Date');
                $('body #location_report_range span').html('Filter By Visit Date');
                $('#date_parameters').val('');
                if($('#iChildId').is(':visible'))
                {
                  $("#iChildId option[value='']").attr('selected', true)  
                }
                if($('#tStartTime').length > 0)
                {
                    $('#tStartTime').val('');
                }
                if($('#tEndTime').length > 0)
                {
                    $('#tEndTime').val('');
                }
                if($('#location_report_range').is(':visible'))
                {
                  $('#datatable_ajax').DataTable().ajax.url($('.listing_url').val());  
                }
                
                $('body #message_date span').html('Filter By Added Date');
                if($('#message_date').is(':visible'))
                {
                  $('#datatable_ajax').DataTable().ajax.url($('.listing_url').val());  
                }
                the.resetFilter();
            });
        },

        submitFilter: function() {
            the.setAjaxParam("action", tableOptions.filterApplyAction);

            // get all typeable inputs
            $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', table).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            dataTable.ajax.reload();
        },

        resetFilter: function() {
            $('textarea.form-filter, select.form-filter, input.form-filter', table).each(function() {
                $(this).val("");
                //$($(this)).select2("val", "");
            });
            $('input.form-filter[type="checkbox"]', table).each(function() {
                $(this).attr("checked", false);
            });
            
            the.clearAjaxParams();
            the.addAjaxParam("action", tableOptions.filterCancelAction);
            dataTable.ajax.reload();
            
            //$.removeCookie(durl);
        },

        getSelectedRowsCount: function() {
            return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        },

        getSelectedRows: function() {
            var rows = [];
            $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function() {
                rows.push($(this).val());
            });

            return rows;
        },

        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }

            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) { // check for duplicates
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }

            if (skip === false) {
                ajaxParams[name].push(value);
            }
        },

        clearAjaxParams: function(name, value) {
            //$.removeCookie(durl);
            ajaxParams = {};
        },

        getDataTable: function() {
            return dataTable;
        },

        getTableWrapper: function() {
            return tableWrapper;
        },

        gettableContainer: function() {
            return tableContainer;
        },

        getTable: function() {
            return table;
        },
        getAjaxParams: function() {
            //ajaxParams['page'] = ajaxParams['export_page'];
            //ajaxParams['length'] = ajaxParams['export_length'];
            return ajaxParams;
        },
        //saveFilterOnCookie: function() {
//            console.log('testing Foltert');
//        },
        google_map_markers : function(res){
            if(res.length > 0)
            {
                setTimeout(function(){
                    var map = new GMaps({
                        div: '#gmap_basic',
                        lat: res[0].latitude,
                        lng: res[0].longitude
                    });
                    var allMarkers = res;
                    $.each(allMarkers, function(index, item) {
                        map.addMarker({
                           lat: item.latitude,
                           lng: item.longitude,
                           title: item.title,
                           icon: SITE_URL+"img/marker.png",
                           infoWindow: {
                                content: '<span style="color:#000">'+item.title+'<br>'+item.link+'</span>'
                            }
                        });
                    });
                    map.setZoom(14);
                },1000);
            } else {
                alert(0);
            }
        },
        
        google_default_map : function(){
            if($("#gmap_basic").length > 0)
            {
                var map = new GMaps({
                    div: '#gmap_basic',
                    lat: 22.662851,
                    lng: -18.995134
                });
                map.setZoom(2);    
            }
            
        }

    };

};