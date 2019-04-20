var counter=0;
var IMAGE_EXTENSION = /\.(gif|jpg|jpeg|tiff|png)$/i;
var FILE_EXTENSION = /\.(gif|jpg|jpeg|tiff|png|doc|docx|pdf|xls|xlt|xlsx)$/i;

var docext_arr = ["doc","docx"];
var pdfext_arr = ["pdf"];
var excelext_arr = ["xls","xlt","xlsx"];

// initialize fileupload default file
    var url =  SITE_URL+'plugins/jquery-file-upload/server/php/index.php';

 $('#multi_upload_file').fileupload({
     url: url,
     dataType: 'json',
     sequentialUploads: true, // sequnetial upload
     formData : {object:'multi_upload_file',path:'',button_name:'multi_upload_file','accept_file_types':IMAGE_EXTENSION,'SITE_URL':SITE_URL},
     send : function (e, data)
     {
         var uploadFile = data.files[0];

         // if uploaded file has invalid extension
         if (!(IMAGE_EXTENSION).test(uploadFile.name))
         {
             bootbox.alert('Upload image only');
             return false;
         }
         $('#loading_img').addClass('active_img');
         $('#loading_img').removeClass('inactive_img');
         $('button[type="submit"]').prop('disabled','disabled');
     },
     done: function (e, data)
     {
         file_table = $("#file_table");
         all_files_status = "";
         $('#loading_img').removeClass('active_img');
         $('#loading_img').addClass('inactive_img');
         $('button[type="submit"]').prop('disabled',false);
         $.each(data.result.multi_upload_file, function (index, file)
         {
             sizeInMB = (file.size / (1024*1024)).toFixed(2);
             original_name = file.name.slice(11);
             // get extension of uploaded file
             fileExt = file.name.split('.').pop();

             counter++;
             var btn_val = 'Delete';

             file_table.append('<tr id="file_'+counter+'"><td><img class="list_image" src="'+file.url+'" /></td><td><a target="_blank" href="'+file.url+'">'+original_name+'</a></td><td><button type="button" id1="'+counter+'" href="javascript:void(0);" id2="'+file.name+'" id3="'+WWW_ROOT+TEMP_IMG_PATH+file.name+'" class="btn red delete remove_file" rel="'+file.size+'"><i class="fa fa-trash delete_btn"></i><span>'+btn_val+'</span></button></td></tr>');

             // store string into database
             all_files_status = $("#all_files_status").val();
             if(all_files_status != "" && all_files_status != undefined)
             {
                 all_files_status = all_files_status+"-_-_-"+file.name;
             }
             else
             {
                 all_files_status = file.name;
             }

             $("#intFileCounter").val($('.remove_file').size());
             $("#all_files_status").val(all_files_status);
         });
     }
 });
 $('#multi_upload_file_reports').fileupload({
     url: url,
     dataType: 'json',
     sequentialUploads: true, // sequnetial upload
     formData : {object:'multi_upload_file',path:'',button_name:'multi_upload_file','accept_file_types':FILE_EXTENSION,'SITE_URL':SITE_URL},
     send : function (e, data)
     {
         var uploadFile = data.files[0];

         // if uploaded file has invalid extension
         if (!(FILE_EXTENSION).test(uploadFile.name))
         {
             bootbox.alert('File type '+uploadFile.name+' is not supported.Supported file types are Image(PNG, JPEG, JPG), PDF, WORD(DOC, DOCX) and Excel(XLS, XLT,XLSX).');

             return false;
         }
         $('#loading_img').addClass('active_img');
         $('#loading_img').removeClass('inactive_img');
         $('button[type="submit"]').prop('disabled','disabled');
     },
     done: function (e, data)
     {
         file_table = $("#file_table");
         all_files_status = "";
         $('#loading_img').removeClass('active_img');
         $('#loading_img').addClass('inactive_img');
         $('button[type="submit"]').prop('disabled',false);
         counter = $('#file_count').val();
         $.each(data.result.multi_upload_file, function (index, file)
         {
             sizeInMB = (file.size / (1024*1024)).toFixed(2);
             original_name = file.name.slice(11);
             // get extension of uploaded file
             fileExt = file.name.split('.').pop();
             counter++;
             if(jQuery.inArray(fileExt,docext_arr) != -1)
             {
             	file.url = SITE_URL+'/img/ic-word@3x.png';
             }
             else if(jQuery.inArray(fileExt,pdfext_arr) != -1)
             {
             	file.url = SITE_URL+'/img/ic-pdf@3x.png';
             }
             else if(jQuery.inArray(fileExt,excelext_arr) != -1)
             {
             	file.url = SITE_URL+'/img/ic-sheet@3x.png';
             }

             var btn_val = 'Delete';
             file_table.append('<tr id="file_'+counter+'" rel="'+file.name+'"><td><input type="text" placeholder="Report Name" id="title'+counter+'" name="report_title'+counter+'" class="form-control required"></td><td><img class="list_image" src="'+file.url+'" /></td><td><a  target="_blank" href="'+file.url+'">'+original_name+'</a></td><td><button type="button" id1="'+counter+'" href="javascript:void(0);" id2="'+file.name+'" id3="'+WWW_ROOT+TEMP_IMG_PATH+file.name+'" class="btn red delete remove_file" rel="'+file.size+'"><i class="fa fa-trash delete_btn"></i><span>'+btn_val+'</span></button></td></tr>');

             // store string into database
             all_files_status = $("#all_files_status").val();
             if(all_files_status != "" && all_files_status != undefined)
             {
                 all_files_status = all_files_status+"-_-_-"+file.name;
             }
             else
             {
                 all_files_status = file.name;
             }

             $("#intFileCounter").val($('.remove_file').size());
             $("#all_files_status").val(all_files_status);
         });
         $('#file_count').val(counter);
     }
 });


 // remove uploaded file from page
 $(document).on('click',".remove_file", function()
 {
     row_id = $(this).attr('id1');
     original_file_name = $('#file_'+row_id).attr('rel');
     remove_data = $(this).attr('id2');
     remove_all_data = $(this).attr('id3');

     id = $(this).attr('id4');

     file_name_val = $(this).attr('id5');

     // remove data from hidden variable
     all_files_status = $("#all_files_status").val();
     all_files_status = all_files_status.replace(remove_data,'');
     all_files_status = all_files_status.replace(/^-_-_-|-_-_-$/g,'');
     $("#all_files_status").val(all_files_status);
     $("#file_"+row_id).remove(); // remove row
     
     if(id != '' || id != null)
     {
         $.post($('#remove_url').val(),{'file_name':remove_all_data,'id':id,'file_name_val':file_name_val,'original_file_name':original_file_name},function(responce){

         });
     }
     $('#file_count').val(parseInt($("#file_count").val()) - 1);
     $("#intFileCounter").val( $('.remove_file').size()==0?'':$('.remove_file').size());
 });
