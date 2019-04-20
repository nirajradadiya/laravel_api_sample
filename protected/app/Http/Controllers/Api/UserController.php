<?php
namespace App\Http\Controllers\Api;
use Illuminate\Routing\Controller;
use App\Models\User,App\Models\EmailTemplates;
use App\Helpers\CommonApiHelper,App\Helpers\CommonHelper;
use App\Helpers\MailSendHelper;
use Auth,Hash,Input,Session,Redirect,Mail,URL,Str,Config,DB,Response,View;
class UserController extends ApiBaseController
{

  /*
    @Description: Function for user SignUp/Register
    @Author: Sandeep Gajera
    @Input: - all data related register like emailid,password,name,devicetoken,etc
    @Output: - registered userdetails 
    @Date: 12-03-2019
  */


  //status = 1-'Active', 2-'Deactive'
  //is_verify = 0-No,1-Yes
  public function user_signup()
  {
    try
    {
      $flag       = false;
      $code       = UNSUCCESS;
      $msg        = MSG_UNSUCCESS;
      $http_code  = HTTP_SUCCESS;
      $parameter  = Input::all();
      $response   = array();
      $varification_code =  mt_rand(100000,999999);
      if(Input::all())
      {
        $user_details_emailid = User::get_user_details_with_where([["v_email_id","=",$parameter['v_email_id']]] );

        $user_details_mobile_number = User::get_user_details_with_where([["v_mobile_number","=",$parameter['v_mobile_number']]] );


        if(empty($user_details_emailid) && empty($user_details_mobile_number)) // for new user 
        {
          $parameter['e_register_type'] = 'App'; //As of Now Assign Static value
          if(isset($parameter['v_password']))
          {
            $password = $parameter['v_password'];
            $parameter['v_password'] = Hash::make($parameter['v_password']);
          }

          if($parameter['e_register_type'] == 'App')
          {
            $parameter['v_email_verification_code'] = $varification_code;
            $parameter['d_vcode_expiry_date'] = CURRENT_DATE_TIME;
          }
            
          if(isset($parameter['v_profile_image']))
          {
            $store_path = USERS_PROFILE_IMG_PATH;
            $parameter['v_profile_image'] = CommonApiHelper::image_upload($parameter['v_profile_image'],$store_path,"profile",rand(0000,9999)); 
          }
          else
          {
            $parameter['v_profile_image'] = DEFAULT_USER_IMAGE_NAME;
          }

          $parameter['api_token'] = CommonApiHelper::generate_api_token($parameter['v_email_id']);
          if($add_record = User::insert_record("App\Models\User",$parameter))
          {
            $response['user_details'] = array_only($add_record->toArray(),CommonApiHelper::user_required_fields());

            $code = SUCCESS;
            $flag = true;

            if($parameter['e_register_type'] == 'App')
            {
              $msg = MSG_RESEND_VERIFICATION_EMAIL_SEND;
              /*@ob_end_clean();
              header("Connection: close");
              ignore_user_abort();
              @ob_start();
              header('HTTP/1.1 200 OK', true, 200);
              header('Content-Type: application/json');
              echo json_encode(array('code' => $code,'msg'=>$msg,'data'=>$response,'flag'=>$flag),$http_code);
              $size = @ob_get_length();
              header("Content-Length: $size");
              @ob_end_flush();
              flush();
              session_write_close();*/
              $this->user_send_varification_mail($add_record->v_name,$add_record->v_email_id,$varification_code,$password);
            }
          }
        }
        else // for old user that already register
        {
          if(!empty($user_details_mobile_number))
          {
            $user_details = $user_details_mobile_number;
          }

          if(!empty($user_details_emailid))
          {
            $user_details = $user_details_emailid;
          }

          if($user_details->e_status == 'Active')
          {
            if($user_details->deleted_at == NULL) 
            {
              unset($user_details->deleted_at);
              if($user_details->e_is_email_verify == "No")
              {
                unset($parameter['v_password']);
                $parameter['v_email_verification_code'] = $varification_code;
                $parameter['d_vcode_expiry_date'] = CURRENT_DATE_TIME;
               
                if(isset($parameter['v_profile_image']))
                {
                  $store_path = USERS_PROFILE_IMG_PATH;
                  if($user_details->v_profile_image != DEFAULT_USER_IMAGE_NAME)
                  {
                    CommonApiHelper::empty_dir($store_path.$user_details->v_profile_image);
                  }
                  $parameter['v_profile_image'] = CommonApiHelper::image_upload($parameter['v_profile_image'],$store_path,"profile",rand(0000,9999)); 
                }


                if(User::update_using_array($parameter,$user_details))
                {
                  $code = SUCCESS;
                  $flag = true;
                  $msg = MSG_RESEND_VERIFICATION_EMAIL_SEND;
                  $response['user_details'] = array_only($user_details->toArray(),CommonApiHelper::user_required_fields());
                  /*@ob_end_clean();
                  header("Connection: close");
                  ignore_user_abort();
                  @ob_start();
                  header('HTTP/1.1 200 OK', true, 200);
                  header('Content-Type: application/json');
                  echo json_encode(array('code' => $code,'msg'=>$msg,'data'=>$response,'flag'=>$flag),$http_code);
                  $size = @ob_get_length();
                  header("Content-Length: $size");
                  @ob_end_flush();
                  flush();
                  session_write_close();*/
                  $this->user_send_varification_mail($user_details->v_name,$user_details->v_email_id,$varification_code);
                }
              }
              else
              {
                if(!empty($user_details_emailid))
                {     
                  $code = ALREADY_EMAIL_EXISTS;
                  $msg  = MSG_ALREADY_EMAIL_EXISTS;
                  $flag = false;
                }
                else
                {
                  $code = ALREADY_MOBILE_NO_EXISTS;
                  $msg  = MSG_ALREADY_MOBILE_NO_EXISTS;
                  $flag = false;
                }
              }
            } 
            else
            {
              $code = USER_DELETED;
              $msg = MSG_USER_DELETED;
              $flag = false;
            }   
          } 
          else
          {
            $code = USER_INACTIVE;
            $msg = MSG_USER_INACTIVE;
            $flag = false;
          }
        }
      }
      else
      {
        $code = EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
        $flag = false;
      }
    }
    catch (\Exception $e) {
        $response = array();
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
    }
    if($code != SUCCESS)
    {
      $response = (object)$response;
    }
    return response(array("code"=>$code,"msg"=>$msg,'data'=>$response,'flag'=>$flag),$http_code);
  }


  /*
    @Description: Function for user SignIn/Login
    @Author: Sandeep Gajera
    @Input: - all data related register like emailid,password,name,devicetoken,etc
    @Output: - registered userdetails 
    @Date: 12-03-2019
  */

  //status = 1-'Active', 2-'Deactive'
  //is_verify = 0-No,1-Yes
  //login_status = 1-'Active', 2-'Inactive'
  
  public function user_signin()  //login with App 
  {
    try
    {
      $flag = false;
      $code = UNSUCCESS;
      $msg  = MSG_UNSUCCESS;
      $response = $user_details = $login_data = array();
      $parameter = Input::all();
      if(Input::all())
      {
        
        $user_details = User::get_user_details_with_where([["v_email_id","=",$parameter['v_username']]]);

        if(empty($user_details))
        {
          $user_details = User::get_user_details_with_where([["v_mobile_number","=",$parameter['v_username']]]);          
        }

        if(!empty($user_details))
        {
          if(Hash::check($parameter['v_password'],$user_details->v_password)) // check user is login details valid or not
          { 
            if($user_details->e_is_email_verify == "Yes")
            {
              if($user_details->e_register_type == "App") // check user is register with fb/Google or not..
              { 
                if($user_details->e_status == "Active") // check user is InActive by admin or not.
                {
                  if($user_details->deleted_at == NULL) // check user is delete by admin or not.
                  { 
                    unset($parameter['v_email_id'],$parameter['v_username'],$parameter['v_password']);
                    $parameter['e_login_status'] = 'Active';
                    $parameter['d_last_login_date'] = CURRENT_DATE_TIME;  
                    $parameter['api_token'] = CommonApiHelper::generate_api_token($user_details->v_email_id);

                    if(User::update_using_array($parameter,$user_details))
                    {
                      $response['user_details'] = array_only($user_details->toArray(), CommonApiHelper::user_required_fields());
                        $code = SUCCESS;
                        $msg = MSG_SUCCESS;
                        $flag = true;
                      }               
                  }
                  else
                  {
                    $code = USER_DELETED;
                    $msg = MSG_USER_DELETED;
                    $flag = false;
                  }
                }
                else
                {
                  $code = USER_INACTIVE;
                  $msg = MSG_USER_INACTIVE;
                  $flag = false;
                }
              }
              else if($user_details->e_register_type == "Facebook")
              {
                $code = ALREADY_REGISTERED_WITH_FACEBOOK;
                $msg = MSG_ALREADY_REGISTERED_WITH_FACEBOOK;
                $flag = false;
              } 
              else if($user_details->e_register_type == "Google")
              {
                $code = ALREADY_REGISTERED_WITH_GOOGLE;
                $msg = MSG_ALREADY_REGISTERED_WITH_GOOGLE;
                $flag = false;
              }
            }
            else
            {
              $response['user_details'] = array_only($user_details->toArray(), CommonApiHelper::user_required_fields());
              $code = EMAILID_NOT_VARIFY;
              $msg = MSG_EMAILID_NOT_VARIFY;
              $flag = false;
            }
          }
          else
          {
            $user_details->v_device_token = '';
            $user_details->save();
            $code = INVALID_PASSWORD;
            $msg = MSG_INVALID_PASSWORD;
            $flag = false;
          } 
        }
        else
        {
          $code = INVALID_USERNAME;
          $msg = MSG_INVALID_USERNAME;
          $flag = false;
        }
      }
      else
      {
        $code = EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
        $flag = false;
      } 
    }
    catch (\Exception $e) {
        $response = array();
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
        $flag = false;
    }
    if($code != SUCCESS)
    {
      $response = (object)$response;
    }
    return response(array('code' => $code,'msg' => $msg,'data' => $response,'flag'=>$flag));
  }

  /*
    @Description: Common Function for user Send Verification Email
    @Author: Sandeep Gajera
    @Input: - emailid,username,verification code
    @Output: - send verification mail to User Emailid
    @Date: 12-03-2019
  */
 

  // function for sending varification mail
  function user_send_varification_mail($v_user_name,$v_email,$code,$password = '--')
  { 
    $link = URL::route('useremailverification',$code);
    // get template from admin
    $email_data = EmailTemplates::get_email_template_details(4);
    if(!empty($email_data))
    {
      // modify template
      $to_array = array('[USER_NAME]','[LINK]','[EMAIL]','[PASSWORD]');
      $replace_array = array($v_user_name,$link,$v_email,$password);
      $email_data->v_template_body =  str_replace($to_array,$replace_array,$email_data->v_template_body);
      // send mail
      MailSendHelper::send_email($email_data,[$v_email]);
      return true;
    }
    else
    {
      return false;
    }
  }

  /*
    @Description: Common Function for User Verify EmailId/Click on Link
    @Author: Sandeep Gajera
    @Input: - 
    @Output: - verification sucess msg
    @Date: 12-03-2019
  */

  public function user_email_verification($code)
  {
    $user_details = User::get_user_details_with_where([['v_email_verification_code','=',$code]]);
    if(!empty($user_details))
    {
      if($user_details->e_is_email_verify == "No")
      {
        $user_details->e_is_email_verify = "Yes";
        $user_details->v_email_verification_code = "";
        if($user_details->save())
        {
          $msg = MSG_EMAIL_VERIFY_SUCCESS;
         /* @ob_end_clean();
          header("Connection: close");
          ignore_user_abort(); 
          @ob_start();
          header('HTTP/1.1 200 OK', true, 200);
          header('Content-Type: text/html');
          echo View::make('api.varifys')->with(array('message'=>$msg,'title'=>EMAIL_VERIFY));
          $size = @ob_get_length();
          header("Content-Length: $size");
          @ob_end_flush();
          flush();
          session_write_close();*/// mail sent to user with new link 
          //send a welcome mail after verification sucessfully
          $this->user_send_welcome_mail($user_details->name,$user_details->v_email_id);
          return View::make('api.varifys')->with(array('message'=>$msg,'title'=>EMAIL_VERIFY));
        }
      }
      else
      {
        $msg = MSG_EMAIL_ALREADY_VERIFY; 
        return View::make('api.varifys')->with(array('message'=>$msg,'title'=>EMAIL_VERIFY)); 
      }
    }
    else
    {
      $msg = MSG_EMAIL_VERIFY_LINK_INVALID;
      return View::make('api.varifys')->with(array('message'=>$msg,'title'=>EMAIL_VERIFY)); 
    }
  }


  /*
    @Description: Common Function for User Welcome Mail After Verify EmailId
    @Author: Sandeep Gajera
    @Input: - 
    @Output: - send welcome mail to user
    @Date: 12-03-2019
  */

  public function user_send_welcome_mail($v_user_name, $v_email)
  {
    // get template from admin
    $email_data = EmailTemplates::get_email_template_details(5);
    if(!empty($email_data))
    {
      // modify template
      $to_array = array('[USER_NAME]');
      $replace_array = array($v_user_name);
      $email_data->v_template_body =  str_replace($to_array,$replace_array,$email_data->v_template_body);
      // send mail
      MailSendHelper::send_email($email_data,[$v_email]);
      return true;
    }
    else
    {
      return false;
    }
  } 

  /*
    @Description: Function for User Forgot His Password
    @Author: Sandeep Gajera
    @Input: - emailid
    @Output: - send forgot password link to user emailid
    @Date: 12-03-2019
  */
 
  public function user_forgot_password()
  {
    try
    {
      $flag = false;
      $code = UNSUCCESS;
      $msg = MSG_UNSUCCESS;
      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      if(Input::all())
      {
        $user_details = User::get_user_details_with_where([["v_email_id","=",$parameter['v_email_id']]]);
        
        if(!empty($user_details))
        { 
          if($user_details->deleted_at == NULL)
          { 
            if($user_details->e_status == 'Active')
            { 
              if($user_details->e_is_email_verify == "Yes")
              {
                if($user_details->e_register_type == 'App')
                {
                  $fcode = CommonApiHelper::generateRandomString(6);
                  $email_data = EmailTemplates::get_email_template_details(3);
                  if(!empty($email_data))
                  {
                    $link = URL::route('userforgotpassword',$fcode);
                    $to_array = array('[NAME]','[LINK]');
                    $replace_array = array($user_details->name,$link);
                    $email_data->v_template_body =  str_replace($to_array,$replace_array,$email_data->v_template_body);
                  
                    // update forgot password fields
                    $parameter['v_forgot_password_code'] = $fcode;
                    $parameter['d_fcode_expiry_date'] = CURRENT_DATE_TIME;
                    
                    if(User::update_using_array($parameter,$user_details))
                    { 
                      // send mail to email address with new password
                      $code = SUCCESS;
                      $flag = true;
                      $msg = MSG_FORGOT_PASSWORD;
                      $http_code = HTTP_SUCCESS;
                     /* @ob_end_clean();
                      header("Connection: close");
                      ignore_user_abort();
                      @ob_start();
                      header('HTTP/1.1 200 OK', true, 200);
                      header('Content-Type: application/json');
                      echo json_encode(array('code' => $code,'msg'=>$msg,'flag'=>$flag));
                      $size = @ob_get_length();
                      header("Content-Length: $size");
                      @ob_end_flush();
                      flush();
                      session_write_close();*/
                      
                      if($code == SUCCESS)
                      {
                          // send mail
                          MailSendHelper::send_email($email_data,[$parameter['v_email_id']]);
                      }
                    }
                  }
                  else
                  {
                    $code = EMAIL_TEMPLATE_INACTIVE;
                    $msg = MSG_EMAIL_TEMPLATE_INACTIVE;
                    $flag = false;
                  }
                }
                else if($user_details->e_register_type == "Facebook")
                {
                  $code = ALREADY_REGISTERED_WITH_FACEBOOK;
                  $msg = MSG_ALREADY_REGISTERED_WITH_FACEBOOK;
                  $flag = false;
                } 
                else if($user_details->e_register_type == "Google")
                {
                  $code = ALREADY_REGISTERED_WITH_GOOGLE;
                  $msg = MSG_ALREADY_REGISTERED_WITH_GOOGLE;
                  $flag = false;
                }
              }
              else
              {
                $code = EMAILID_NOT_VARIFY;
                $msg = MSG_EMAILID_NOT_VARIFY;
                $flag = false;
              }
            }
            else
            {
              $code = USER_INACTIVE;
              $msg = MSG_USER_INACTIVE;
              $flag = false;
            }
          }
          else
          {
            $code = USER_DELETED;
            $msg = MSG_USER_DELETED;
            $flag = false;
          }
        } 
        else
        {
          $code = INVALID_EMAILID;
          $msg = MSG_INVALID_EMAILID;
          $flag = false;
        }
      }
      else
      {
        $code = EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
        $flag = false;
      }
    }
    catch (\Exception $e) {
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
        $flag = false;
    }
    return response(array("code"=>$code,"msg"=>$msg,"flag"=>$flag),$http_code);
  }

  /*
    @Description: Function for User Click on Forgot Password Link For Verify Code and Redirect to Forgot Password Screen (Html Form)
    @Author: Sandeep Gajera
    @Input: - 
    @Output: - redirect to forgot password screen if user click on email link
    @Date: 12-03-2019
  */
 
  public function user_reset_password_form($fcode)
  {
    $user_details = User::get_user_details_with_where([["v_forgot_password_code","=",$fcode]]);
    if (!empty($user_details))
    {
        $t1 = strtotime(CURRENT_DATE_TIME);
        $t2 = strtotime($user_details->d_fcode_expiry_date);
        $diff = $t1 - $t2;
        $hours = $diff / ( 60 * 60 );
      
        if($hours > 24)
        {
          $user_details->v_forgot_password_code="";
          $user_details->save();
          return Redirect::route('reset_password_msg', array(str_replace("/","",PW_RESET_TIME_EXCEED)));
        }
        else
        {
          return View::make('api.reset_password', array('ccode' => $fcode,'emailid'=>$user_details->v_email_id,'user'=>$user_details,'title' => 'Password-Reset'));
      }
    } else {
        return Redirect::route('reset_password_msg', array(str_replace("/","",PW_RESET_ERROR)));
    }
  }
  
  /*
    @Description: Function for User Fill Forgot Password  Form and Submit It For New Password Set
    @Author: Sandeep Gajera
    @Input: - 
    @Output: - give sucess msg for set password
    @Date: 12-03-2019
  */

  public function user_reset_password_submit()
  {
    $passwords = Input::all();
    $user_details = User::get_user_details_with_where([["v_forgot_password_code","=",Input::get('vfcode')]]);

    if(!empty($user_details))
    {
        // Get passwords from the user's input
        $npass = Input::get('v_password');
        $cpass = Input::get('cpassword');
        // test input password against the existing one
        if ($npass == $cpass)
        {
            $user_details->v_password = Hash::make($npass);
            $user_details->v_forgot_password_code = '';
            // save the new password
            if($user_details->save())
            {
                return Redirect::route('reset_password_msg', array(str_replace("/","",PW_RESET_SUCCESS)));
            }
        } 
        else
        {
            return Redirect::route('reset_password_msg', array(str_replace("/","",PW_RESET_ERROR)));
        }
    } 
    else
    {
        return Redirect::route('reset_password_msg', array(str_replace("/","",PW_RESET_ERROR)));
    }
  }
  public function reset_password_msg($msg)
  {
     return View::make('api.reset_password_message_screen', array('title' => 'Password-Reset'))->with('message', $msg);
  }

  /*
    @Description: Function for User Logout from App
    @Author: Sandeep Gajera
    @Input: - header:api token
    @Output: - sucess message give to user
    @Date: 12-03-2019
  */   

  public function user_logout()
  {
    try
    {
      $flag = true;
      $code = SUCCESS;
      $msg = MSG_LOGOUT;
      $http_code = HTTP_SUCCESS;
      $user_details = auth()->guard('api')->user();
      User::where("id",$user_details->id)->update(array("e_login_status"=>"Inactive",'v_device_token'=>''));
    }
    catch (\Exception $e) {
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
    }
    return response(array("code"=>$code,"msg"=>$msg,"flag"=>$flag),$http_code); 
  }


  /*
    @Description: Function for Give Login User Details
    @Author: Sandeep Gajera
    @Input: - userid,header:api token
    @Output: - return user details
    @Date: 12-03-2019
  */   
 
  public function user_details($userid) 
  {
    try
    {
      $flag = false;
      $code = NO_DATA_FOUND;
      $msg = MSG_NO_DATA_FOUND;
      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      $response = array();
      $user_details = auth()->guard('api')->user();
      if($user_details->id == $userid)
      {
        if($user_details->e_status == "Active")
        {
          if($user_details->deleted_at == NULL)
          {
            $msg = MSG_SUCCESS;
            if($user_details->e_is_email_verify != "Yes")
            {
              $msg = MSG_EMAILID_NOT_VARIFY;
            }
            $flag = true;
            $code = SUCCESS;
            $response['user_details'] = $user_details;
          }
          else
          {
            $code = USER_DELETED;
            $msg = MSG_USER_DELETED;
          }
        }
        else
        {
          $code = USER_INACTIVE;
          $msg = MSG_USER_INACTIVE;
        }
      }
      else
      { 
        $code = UNAUTHORIZED;
        $msg = MSG_UNAUTHORIZED;
      }
    }
    catch (\Exception $e) {
        $response = array();
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
    }
    if($code != SUCCESS)
    {
      $response = (object)$response;
    }
    return response(array('code' => $code,'msg' => $msg,"flag"=>$flag,'data' => $response),$http_code);
  }


  /*
    @Description: Function for Update Device Related Information
    @Author: Sandeep Gajera
    @Input: - userid,header:api token,devicetoken,devicetype
    @Output: - sucess msg to user for update device token
    @Date: 12-03-2019
  */
 
  public function user_update_device_token($userid)
  {
    try
    {
      $flag = false;
      $code = UNSUCCESS;
      $msg = MSG_UNSUCCESS;
      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      $response = array();
      $user_details = auth()->guard('api')->user();
      if(Input::all())
      {
        if($user_details->id == $userid)
        {
          if($user_details->e_status == "Active")
          {
            if($user_details->deleted_at == NULL)
            {
              if($user_details->e_is_email_verify == "Yes")
              { 
                  User::update_using_array_with_where('App\Models\User',[["id","!=",$userid],["v_device_token","=",$parameter['v_device_token']]],array('v_device_token'=>'')); //set null for same device token that use by other user for notification 
                  if(User::update_using_array($parameter,$user_details))
                  {
                    $flag = true;
                    $code = SUCCESS;
                    $msg = MSG_UPDATE_DEVICE_TOKEN;
                  } 
              }
              else
              {
                $code = EMAILID_NOT_VARIFY;
                $msg = MSG_EMAILID_NOT_VARIFY;  
              } 
            }
            else
            { 
              $code = USER_DELETED;
              $msg = MSG_USER_DELETED;
            }
          }
          else
          {
            $code = USER_INACTIVE;
            $msg = MSG_USER_INACTIVE;
          } 
        }
        else
        {
          $code = UNAUTHORIZED;
          $msg = MSG_UNAUTHORIZED;
          $http_code = HTTP_UNAUTHORIZED;
        }
      }
      else
      {
        $code= EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
      }
    }
    catch (\Exception $e) {
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
    }
    return response(array('code' => $code,'msg' => $msg,"flag"=>$flag),$http_code);
  }

  

  /*
    @Description: Function for Update User Information
    @Author: Sandeep Gajera
    @Input: - userid,header:api token,devicetoken,devicetype
    @Output: - sucess msg to user for update user information
    @Date: 12-03-2019
  */

  //status = 1-'Active', 2-'Deactive'
  //is_verify = 0-No,1-Yes
  public function user_update_profile($userid)
  {  
    try
    {
      $flag  = false;
      $code  = UNSUCCESS;
      $msg   = MSG_UNSUCCESS;

      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      $response = array();
      $user_details = auth()->guard('api')->user();
      if(Input::all())
      {
        if($userid == $user_details->id)
        {
          if($user_details->e_status == "Active")
          {
            if($user_details->deleted_at == NULL)
            {
              if($user_details->e_is_email_verify == "Yes")
              {
                if(isset($parameter['v_password']))
                {
                  $parameter['v_password'] = Hash::make($parameter['v_password']);
                }

                if(isset($parameter['v_profile_image']))
                {
                  $store_path = USERS_PROFILE_IMG_PATH;
                  if($user_details->v_profile_image != DEFAULT_USER_IMAGE_NAME)
                  {
                    CommonApiHelper::empty_dir($store_path.$user_details->v_profile_image);
                  }
                  $parameter['v_profile_image'] = CommonApiHelper::image_upload($parameter['v_profile_image'],$store_path,"profile",rand(0000,9999)); 
                }
                
                if(User::update_using_array($parameter,$user_details))
                {    
                  $response['user_details'] = $user_details;
                  $code = SUCCESS;
                  $msg = MSG_UPDATE_PROFILE;
                  $flag = true;
                } 
              }
              else
              {
                $code = EMAILID_NOT_VARIFY;
                $msg = MSG_EMAILID_NOT_VARIFY; 
                $flag = false; 
              }
            }
            else
            {
              $code = USER_DELETED;
              $msg = MSG_USER_DELETED;
              $flag = false; 
            }
          }
          else
          {
            $code = USER_INACTIVE;
            $msg = MSG_USER_INACTIVE; 
            $flag = false; 
          }
        } 
        else 
        {

          $code = UNAUTHORIZED;
          $msg = MSG_UNAUTHORIZED;
          $http_code = HTTP_UNAUTHORIZED;
          $flag = false; 
        }
      }
      else
      {
        $code = EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
        $flag = false; 
      }
    }
    catch (\Exception $e) {
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
        $flag = false; 
    }
    return response(array("code"=>$code,"msg"=>$msg,'flag'=>$flag,'data'=>$response));
  }

  /*
    @Description: Function for Update User Information
    @Author: Sandeep Gajera
    @Input: - userid,header:api token,oldpassword,password
    @Output: - sucess msg to user for update user information
    @Date: 12-03-2019
  */

  //status = 1-'Active', 2-'Deactive'
  //is_verify = 0-No,1-Yes
  public function user_update_password($userid)
  {  
    try
    {
      $flag = false;
      $code = UNSUCCESS;
      $msg  = MSG_UNSUCCESS;
      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      $user_details = auth()->guard('api')->user();
      if(Input::all())
      {
        if($userid == $user_details->id)
        {
          if($user_details->e_status == "Active")
          {
            if($user_details->deleted_at == NULL)
            {
              if($user_details->e_is_email_verify == "Yes")
              {
                if(Hash::check($parameter['old_password'],$user_details->v_password))
                {
                  if(isset($parameter['v_password']))
                  {
                    $parameter['v_password'] = Hash::make($parameter['v_password']);
                  }
                  unset($parameter['old_password']);
                  if(User::update_using_array($parameter,$user_details))
                  {
                    $code = SUCCESS;
                    $msg  = MSG_UPDATE_PASSWORD;
                    $flag = true;
                  } 
                }
                else
                {
                  $code = INVALID_PASSWORD;
                  $msg  = OLD_PASSWORD_NOT_MATCH;
                  $flag = false;
                }
              }
              else
              {
                $code = EMAILID_NOT_VARIFY;
                $msg  = MSG_EMAILID_NOT_VARIFY; 
                $flag = false; 
              }
            }
            else
            {
              $code = USER_DELETED;
              $msg  = MSG_USER_DELETED;
              $flag = false; 
            }
          }
          else
          {
            $code = USER_INACTIVE;
            $msg = MSG_USER_INACTIVE; 
            $flag = false; 
          }
        } 
        else 
        {

          $code = UNAUTHORIZED;
          $msg = MSG_UNAUTHORIZED;
          $http_code = HTTP_UNAUTHORIZED;
          $flag = false; 
        }
      }
      else
      {
        $code = EMPTY_PARAMETER;
        $msg = MSG_EMPTY_PARAMETER;
        $flag = false; 
      }
    }
    catch (\Exception $e) {
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
        $flag = false; 
    }
    return response(array("code"=>$code,"msg"=>$msg,'flag'=>$flag));
  }
}
  
