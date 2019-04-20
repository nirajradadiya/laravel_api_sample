<?php

namespace App\Http\Middleware;

use Closure,Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthManager;
use Illuminate\Auth\TokenGuard;
use App\Models\User;

class ApiAuthenticate
{   
    public function __construct(Request $request, AuthManager $auth)
    {
        $this->HeaderSecKey = 'Authorization';
        $this->auth = $auth;
    }
    
    public function handle(Request $request, Closure $next, $guard = 'api') {
        
        try
        {
            $flag = false;
            $response = array();
            $http_code = HTTP_SUCCESS;    
            if($this->auth->guard($guard)->user())
            {   
                $user_details = $this->auth->guard($guard)->user();
                if($user_details->e_login_status == 'Active')
                {
                    if(isset($request->userid) &&  $request->userid != $user_details->id)
                    {
                        goto response_error_json;
                    }
                    if($user_details->e_is_email_verify == "Yes")
                    {
                        if($user_details->deleted_at == NULL)
                        {
                            if($user_details->e_status == "Active")
                            {
                                return $next($request);
                            }
                            else
                            {
                                $code = USER_INACTIVE;
                                $msg = MSG_USER_INACTIVE;
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
                        $code = EMAILID_NOT_VARIFY;
                        $msg = MSG_EMAILID_NOT_VARIFY;
                    } 
                }
                else
                {
                    $code = LOGOUT_FROM_APP;
                    $msg = MSG_LOGOUT_FROM_APP;
                }
            } 
            else
            {
                response_error_json:
                $code = UNAUTHORIZED;
                $msg = MSG_UNAUTHORIZED;
                $http_code = HTTP_UNAUTHORIZED;
            } 
        }
        catch (\Exception $e){
            $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
            $msg = $e->getMessage(); 
        }
        if($code != SUCCESS)
        {
          $response = (object)$response;
        }
        //Just Knowledge Purponse Send Data In object Code:'data' => (object) null
        return response(array('code' => $code,'msg' => $msg,'flag'=>$flag,'data'=>$response),$http_code);
    }
}
