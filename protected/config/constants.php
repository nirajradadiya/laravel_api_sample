<?php
define('VERSION','?ver=v.1.0.1');
define('JS_VERSION','?ver=v.1.0.1');
define('CSS_VERSION','?ver=v.1.0.1');

$SITE_URL = $app->make('url')->to('/')."/";
define('SITE_FOLDER_NAME','demos/sample_api_task');
define('WWW_ROOT',$_SERVER['DOCUMENT_ROOT'].'/'.SITE_FOLDER_NAME.'/');
define('SITE_NAME','Sample Api Task');
define('SITE_URL',$SITE_URL);
define('ASSET_URL',$SITE_URL.'assets/');

define('SITE_PLUGIN_URL',$SITE_URL."plugins/");
define('DOC_ROOT' , $_SERVER['DOCUMENT_ROOT']);

define('FROM_EMAIL_ADDRESS','newproject@gmail.com');
define('FROM_EMAIL_ADDRESS_NAME','Test Admin');
define('JS_CSS_VER','1.0.0');





//General Msg Constant
define("ERR_PWS", "Email id and password does not match.");
define("ERR_INACTIVE", "Your account has been inactived by admin.");
define("ERR_VERIFY_EMAIL", "Your email id is not verified.");
define("ERR_VERIFIED", "Your Email Id is not verified yet.");
define("LOG_SUCCESS","You have successfully logged out.");
define("INVALID_EMAIL","Invalid email id.");
define("PW_SENT","Password has been emailed successfully.");
define("PW_RESET_SENT","Check your inbox to reset your password.");
define("PROFILE_SUCCESS","Profile has been updated successfully.");
define("SETTING_SUCCESS","Setting has been updated successfully.");
define("PW_RESET_SUCCESS","Password has been reset successfully.");
define("PW_RESET_ERROR","Could not recover your password.");
define("PW_RESET_TIME_EXCEED","Your reset password link has been expired!");
define("ADD_SUCCESS","Record added successfully.");
define("EDIT_SUCCESS","Record updated successfully.");
define("APPSETTINGS_SUCCESS","App Settings has been updated successfully.");
define("EMAIL_VERIFICATION_MAIL_SUCCESS","Email verification mail has been sent successfully.");
define("INVALID_USERID","Invalid user id.");




// API CONSTANTS START


define('USERS_PROFILE_IMG_PATH','files/users/');
define('DEFAULT_USER_IMAGE_NAME','defualt_avtar.png');

define('APP_LOGO_PATH','img/logo.png');
//Route File Constants
define('API_V1_PREFIX',"v1.0");
define('API_ROUTE_PREFIX',"api");

define('API_URL',SITE_URL.API_ROUTE_PREFIX.'/'.API_V1_PREFIX);
define('CRONJOB_PREFIX','cron-job');
define('API_MIDDLEWARE_NAME',"auth.api");
define('API_GUARD_NAME',"api");
define('CURRENT_DATE_TIME',date('Y-m-d H:i:s'));
define('CURRENT_DATE_TIME_FORMAT','Y-m-d H:i:s');
define('CURRENT_DATE_FORMAT','Y-m-d');
define('CURRENT_DATE_DISPLAY_FORMAT','d-m-Y');
define('CURRENT_DATE',date('Y-m-d'));
define('CURRENT_DATE_DISPLAY',date('d-m-Y'));


/* Api All Code */
define("SUCCESS", 100);  //sucess
define("UNSUCCESS", 101); //unsuccess
define("UNAUTHORIZED",102);
define("USER_BLOCKED",120);  //block
define("USER_DELETED",130);   //delete
define("USER_INACTIVE", 140); //inactive
define("EMAIL_TEMPLATE_INACTIVE",141);
define("CMSPAGE_INACTIVE",142);
define("VARIFICATION_CODE_INACTIVE",143);
define("INVALID_EMAILID", 150); //invalid
define("INVALID_PASSWORD", 151);
define("INVALID_MOBILE_NO",152);
define("INVALID_VARIFICATION_CODE",153);
define("INVALID_API_RESPONSE", 154);
define("INVALID_ARTICLES_ID", 156);
define("INVALID_USERNAME", 157);
define("INVALID_REQUEST_JSON", 158);
define("INVALID_API_URL", 159);
define("ALREADY_EMAIL_EXISTS", 160); //already
define("ALREADY_EMAIL_VARIFICATION", 161);
define("ALREADY_MOBILE_NO_EXISTS", 163);
define("ALREADY_MOBILE_NO_VARIFICATION", 164);
define("ALREADY_REGISTERED_WITH_FACEBOOK", 165);
define("ALREADY_REGISTERED_WITH_GOOGLE", 166);
define("ALREADY_REGISTERED_WITH_APP", 167);
define("EMPTY_PARAMETER",170); //empty
define("IMAGE_PARAMETER_EMPTY",171); //
define("OPERATION_TYPE_PARAMETER_EMPTY",172); 
define("NO_DATA_FOUND",180); //no data found
define("EMAILID_NOT_VARIFY",190); //varification
define("ERROR_IN_CURL_PHP_FUNCTION",210);
define("ERROR_IN_API_LARAVEL_TRY_CATCH",211);
define("LOGOUT_FROM_APP",212);

define("INVALID_USERTYPE", 221);
define("NOT_ABLE_TO_REQUEST_FOR_BLOOD", 222);
define("INVALID_BLODDGROUP",223);

/*Api All HTTP Code */

define("HTTP_UNAUTHORIZED",401);
define("HTTP_SUCCESS",200);
define("HTTP_NOT_FOUND",404);
define("HTTP_INTERNAL_SERVER_ERROR",500);


/* Api All Msg */
define("MSG_SUCCESS", "Success");  //sucess
define("MSG_UNSUCCESS", "Unsuccess"); //unsuccess
define("MSG_UNAUTHORIZED","Unauthorized");
define("MSG_USER_BLOCKED","Your account has been blocked by admin.");  //block
define("MSG_USER_DELETED","Your account has been removed by admin.");   //delete
define("MSG_USER_INACTIVE","Your account has been inactiveted by admin."); //inactive
define("MSG_EMAIL_TEMPLATE_INACTIVE","Email template is inactive.");
define("MSG_CMSPAGE_INACTIVE","The page you tried to access does not exist on the system.");
define("MSG_VARIFICATION_CODE_INACTIVE","Verification code has been expired.");
define("MSG_INVALID_EMAILID", "Please enter valid email address."); //invalid
define("MSG_USER_NOT_FOUND", "This user is not registered with us"); //invalid
define("MSG_INVALID_PASSWORD", "Please enter valid password.");
define("MSG_INVALID_VARIFICATION_CODE","Please enter valid code.");
define("MSG_INVALID_API_RESPONSE","Found Error in api response.");
define("MSG_INVALID_MOBILE_NO","Mobile number is not registered.");
define("MSG_INVALID_ARTICLES_ID","Please send vaid article id.");
define("MSG_INVALID_USERNAME","Please pass register emailid or mobile number.");
define("MSG_INVALID_REQUEST_JSON","Please pass valid JSON in the request.");
define("MSG_INVALID_API_URL","Please enter valid api url.Url does not exist in the system.");
define("MSG_ALREADY_EMAIL_EXISTS", "Entered email address has already registered by someone else. Please try again with another email address.");//already
define("MSG_ALREADY_MOBILE_NO_EXISTS", "This mobile number already registered by someone. Please try with another mobile number.");
define("MSG_ALREADY_EMAIL_VARIFICATION","You have already verified same email address.");
define("MSG_ALREADY_MOBILE_NO_VARIFICATION","Already Mobile Number Verification.");
define("MSG_ALREADY_REGISTERED_WITH_FACEBOOK", "You have already registered with same email address please choose different Facebook account.");
define("MSG_ALREADY_REGISTERED_WITH_GOOGLE", "You have already registered with same email address please choose different Google account.");
define("MSG_ALREADY_REGISTERED_WITH_APP", "Already register with App.");
define("MSG_EMPTY_PARAMETER","Sent parameters are empty."); //empty
define("MSG_IMAGE_PARAMETER_EMPTY","Please send image."); 
define("MSG_OPERATION_TYPE_PARAMETER_EMPTY","Please send operation type."); 
define("MSG_NO_DATA_FOUND","No Data Found."); //no data found
define("MSG_EMAILID_NOT_VARIFY","Please click on the verification link sent to your email address and then click on continue button to login the application"); //varification
define("MSG_LOGOUT_FROM_APP","User has been already logout from app.Please login again."); //Other msg
define("MSG_INVALID_USERTYPE","Please pass valid user type");

//sucess msg list
define("MSG_LOGOUT","User logout successfully.");  
define("MSG_RESEND_VERIFICATION_EMAIL_SEND","Verification email has been sent to your registered email id.");
define("MSG_CONTACTUS_SUBMIT_SUCESSFULLY","Your contact inquiry has been sent successfully.");
define("MSG_UPDATE_PROFILE","Your profile has been updated successfully.");
define("MSG_UPDATE_DEVICE_TOKEN","Your device token has been updated successfully.");
define("MSG_FORGOT_PASSWORD","A reset password link has been sent on your email address.");
define("OLD_PASSWORD_NOT_MATCH","The old password you have entered is incorrect");
define("MSG_UPDATE_PASSWORD","Your password has been changed successfully.");
define("MSG_UPDATE_ARTICLE","Your article has been updated successfully.");
define("MSG_ADD_ARTICLE","Your article has been added successfully.");
define("MSG_DELETE_ARTICLE","Your article has been deleted successfully.");
//no data found msg list



/*  Email Verification / Reset Password Blade Message List */
define("EMAIL_VERIFY","Email Verification."); 
define("MSG_EMAIL_VERIFY_SUCCESS","Your email id has been  verified successfully."); 
define("MSG_EMAIL_ALREADY_VERIFY","You have already verified your email address."); 
define("MSG_EMAIL_VERIFY_LINK_INVALID","Invalid verification link."); 


// API CONSTANTS END

  function  pr($arr) {
      echo "<pre>";
      print_r($arr);
      echo "</pre>";    
  }
?>