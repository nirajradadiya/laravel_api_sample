<?php
namespace App\Models;
use App\Models\OcModel;
use Illuminate\Database\Eloquent\Model;
class Articles extends OcModel
{
    public $timestamps = true;
    protected $table = 'user_articles';    
    public static function get_user_articles_details_with_where($key_value_array) {
        return self::where($key_value_array)
                   ->first();
    }

    public static function get_users_articles_with_where($key_value_array) {
        return self::where($key_value_array)->orderby('id','desc')->get();
    }

    public static function delete_using_array($key_value_array) {
        return self::where($key_value_array)->delete();
    }


   



}
