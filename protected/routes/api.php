<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

 
    /** Without Middleware Api List **/
    Route::group(['prefix' => API_V1_PREFIX], function () {
       
        /*Basic User Apis Start*/
        Route::post("/users/signup",array(   //1)User SignUp             
            'uses' => 'Api\UserController@user_signup'));

        Route::put("/users/signin",array(   //2)User/Admin SignIn             
            'uses' => 'Api\UserController@user_signin'));

        Route::put("/users/forgotpassword",array(  //3)user/admin forgot password in app side
            'uses' => 'Api\UserController@user_forgot_password'));

       
        Route::any("users/reset-password/{fcode}",array(//4)user reset password form in app side
            'as'=>'userforgotpassword',
            'uses' => 'Api\UserController@user_reset_password_form'));

        Route::post("/users/reset-password",array( //5)user reset password submit form in app side
            'as'=>'reset_password_submit',
            'uses' => 'Api\UserController@user_reset_password_submit'));

        Route::get("users/reset-password_msg/{msg}",array( //6)user reset password msg screen in app side
            'as'=>'reset_password_msg',
            'uses' => 'Api\UserController@reset_password_msg'));
        
        Route::any("users/email-verification/{code}",array(   //7)user verification email message
            'as'=>'useremailverification',
            'uses' => 'Api\UserController@user_email_verification'));

        
        /*Basic User Apis End */

    });

    /** With Middleware Use Api List **/
    Route::group(['prefix' => API_V1_PREFIX,'middleware' => API_MIDDLEWARE_NAME], function () {
        /*Basic User Apis Start*/
        
        Route::delete("/users/logout",array(              //1)user logout 
            'uses' => 'Api\UserController@user_logout'));

        Route::get("/users/{userid}",array(               //2)user details get
            'uses' => 'Api\UserController@user_details'))->where('userid','[0-9]+');

        Route::put("/users/{userid}/device-token",array(       //3)user device token update
            'uses' => 'Api\UserController@user_update_device_token'))->where('userid','[0-9]+');

        Route::post("/users/{userid}",array(             //4)user update opration
            'uses' => 'Api\UserController@user_update_profile'))->where('userid','[0-9]+');

        Route::put("/users/{userid}/change-password",array(             //5)user change password
            'uses' => 'Api\UserController@user_update_password'))->where('userid','[0-9]+');

        /*Basic User Apis End*/
        

        /* Start CRUD Apis For Articles Base on User */
            
        Route::get("/users/{userid}/articles",array(   //1)Get New Articles
            'uses' => 'Api\UserArticlesController@get'))->where('userid','[0-9]+');

        Route::post("/users/{userid}/articles",array(   //2)Add New Articles
            'uses' => 'Api\UserArticlesController@create'))->where('userid','[0-9]+');

        Route::put("/users/{userid}/articles/{article_id}",array(   //3)Update Article
            'uses' => 'Api\UserArticlesController@update'))->where('userid','[0-9]+');

        Route::delete("/users/{userid}/articles/{article_id}",array(   //4)Delete Article
            'uses' => 'Api\UserArticlesController@delete'))->where('userid','[0-9]+');

        /* End CRUD Apis For Articles Base on User */
        
    });
