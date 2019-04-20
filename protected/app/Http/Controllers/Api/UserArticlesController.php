<?php
namespace App\Http\Controllers\Api;
use Illuminate\Routing\Controller;
use App\Models\Articles;
use App\Helpers\CommonApiHelper;
use App\Helpers\MailSendHelper;
use Auth,Hash,Input,Session,Redirect,Mail,URL,Str,Config,DB,Response,View;
class UserArticlesController extends ApiBaseController
{

  /*
    @Description: Function for Give List Of  All Articles of Login User
    @Author: Sandeep Gajera
    @Input: - userid,header:api token
    @Output: - return user articles
    @Date: 12-03-2019
  */   
 
  public function get($userid) 
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
            $response['articles'] = Articles::get_users_articles_with_where([["i_user_id","=",$userid]]); 
            $msg = MSG_SUCCESS;
            $flag = true;
            $code = SUCCESS;
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
    @Description: Function for add new article
    @Author: Sandeep Gajera
    @Input: - all data related article like title,msg,date,status
    @Output: - registered articledetail
    @Date: 03-12-2019
  */


  //status = 1-'Active', 2-'Deactive'
  public function create($userid)
  {
    try
    {
      $flag       = false;
      $code       = UNSUCCESS;
      $msg        = MSG_UNSUCCESS;
      $http_code  = HTTP_SUCCESS;
      $parameter  = Input::all();
      $response   = array();
      if(Input::all())
      {
        $parameter['i_user_id'] = $userid;
        if($article_detail = Articles::insert_record("App\Models\Articles",$parameter))
        {
          $response['article_detail'] = $article_detail;
          $msg = MSG_ADD_ARTICLE;
          $code = SUCCESS;
          $flag = true;
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
    @Description: Function for Update Articles By Article ID
    @Author: Sandeep Gajera
    @Input: - userid,articlesid,header:api token
    @Output: - return user details
    @Date: 3-12-2019
  */   
 
  public function update($userid,$articleid) 
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
      if($user_details->id == $userid)
      {
        if($user_details->e_status == "Active")
        {
          if($user_details->deleted_at == NULL)
          {
            $article_details = Articles::get_user_articles_details_with_where([["id","=",$articleid]]);
            if(!empty($article_details))
            {
              if(Articles::update_using_array($parameter,$article_details))
              {    
                $response['article_details'] = $article_details;
                $code = SUCCESS;
                $msg = MSG_UPDATE_ARTICLE;
                $flag = true;
              }
            }
            else
            {
              $code = INVALID_ARTICLES_ID;
              $msg = MSG_INVALID_ARTICLES_ID;
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
    @Description: Function for Delete Articles By Article ID
    @Author: Sandeep Gajera
    @Input: - userid,articlesid,header:api token
    @Output: - return user details
    @Date: 3-12-2019
  */   
 
  public function delete($userid,$articleid) 
  {
    try
    {
      $flag = false;
      $code = NO_DATA_FOUND;
      $msg = MSG_NO_DATA_FOUND;
      $http_code = HTTP_SUCCESS;
      $parameter = Input::all();
      $user_details = auth()->guard('api')->user();
      if($user_details->id == $userid)
      {
        if($user_details->e_status == "Active")
        {
          if($user_details->deleted_at == NULL)
          {
            $article_details = Articles::get_user_articles_details_with_where([["id","=",$articleid]]);
            if(!empty($article_details))
            {
              if(Articles::delete_using_array([["id","=",$articleid]]))
              {    
                $code = SUCCESS;
                $msg = MSG_DELETE_ARTICLE;
                $flag = true;
              }
            }
            else
            {
              $code = INVALID_ARTICLES_ID;
              $msg = MSG_INVALID_ARTICLES_ID;
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
      }
    }
    catch (\Exception $e) {
        $response = array();
        $code = ERROR_IN_API_LARAVEL_TRY_CATCH;
        $msg = $e->getMessage(); 
    }
    
    return response(array('code' => $code,'msg' => $msg,"flag"=>$flag),$http_code);
  }

}
  