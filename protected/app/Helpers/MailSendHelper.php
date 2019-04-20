<?php

namespace App\Helpers;

use Carbon\Carbon;
use Log,Mail,Config;

class MailSendHelper {

  public static function send_email($email_data = array(),$to_sender_emailids = array(),$cc_emails_send_list = array(),$bcc_emails_send_list = array()) {

    //Common Replace Value For All Email
    $to_array = array('[SITE_URL]','[SITE_NAME]','[DATE]','[IMG_LOGO_PATH]');
    $replace_array = array(SITE_URL,SITE_NAME,CURRENT_DATE_TIME,SITE_URL.APP_LOGO_PATH);
    
    $email_data->v_template_body =  str_replace($to_array,$replace_array,$email_data->v_template_body);
   
    //Mail Send Code
    if(count($to_sender_emailids)==0){
      $to_sender_emailids = MailSendHelper::to_emails_send_list();
    }
    if(count($cc_emails_send_list)==0){
      $cc_sender_emailids = MailSendHelper::cc_emails_send_list();
    }
    if(count($bcc_emails_send_list)==0){
      $bcc_sender_emailids = MailSendHelper::bcc_emails_send_list();
    }

    if(count($to_sender_emailids)){
      
      //Laravel Method For Send Mail 
      Mail::send('emails.send',$data = array('email_body'=>$email_data->v_template_body), function ($message) use ($email_data,$to_sender_emailids,$cc_sender_emailids,$bcc_sender_emailids) {
              $message->subject($email_data->v_subject);
              $message->from($email_data->v_from_email_id,SITE_NAME);
              $message->to($to_sender_emailids);
              $message->cc($cc_sender_emailids);
              $message->bcc($bcc_sender_emailids);
      });
    }

    if(count(Mail::failures()) > 0) {
      //If Mail Not Send Sucessfully
      return '0';
    } else {
      //If Mail Send Sucessfully
      return '1';
    }
  }

  private static function to_emails_send_list(){
    return array(
      'sandeep.gajera@tops-int.com'
    );
  }
  
  private static function cc_emails_send_list(){
    return array();
  }

  private static function bcc_emails_send_list(){
    return array();
  }
}

?>
