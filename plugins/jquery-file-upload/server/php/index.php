<?php
/*
 * jQuery File Upload Plugin PHP Example 5.14
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
$button_name = $_REQUEST['button_name'];
// upload directory path, upload url, script url, param name are the parameters to be overwrite in uploadhandler.php
$options = array('upload_dir' => $_SERVER['DOCUMENT_ROOT'].'/power_ad/files/',
     'upload_url' => $_REQUEST['SITE_URL'].'files/',
     'script_url'=> $_REQUEST['SITE_URL'].'plugins/jquery-file-upload/server/php/index.php'
);
if($button_name != ''){
   $options['param_name'] = $button_name;
}

if(isset($_POST['accept_file_types']) && $_POST['accept_file_types'] != "")
{
    $options['accept_file_types'] = $_POST['accept_file_types'];
}

$upload_handler = new UploadHandler($options);
/*
error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
$upload_handler = new UploadHandler();*/
