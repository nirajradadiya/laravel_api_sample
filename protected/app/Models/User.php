<?php
namespace App\Models;
use App\Models\OcModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
class User extends OcModel
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    public $timestamps = true;
    protected $table = 'user';   


    public function blood_request()
    {
        return $this->hasMany('App\Models\UserBloodRequest','i_user_id');
    }

    public function body_part_request()
    {
        return $this->hasMany('App\Models\UserBoodyPartsRequest','i_user_id');
    }

 
    public static function get_user_details_with_where($key_value_array) {
        return self::where($key_value_array)
                   ->with(['blood_request','body_part_request'])
                   ->withTrashed()
                   ->first();
    }

    public static function get_users_with_where($key_value_array) {
        return self::where($key_value_array)
                   ->with(['blood_request','body_part_request'])
                   ->withTrashed()
                   ->get();
    }
    
    public static function get_user_details_with_parms_where($key_value_array) {
    	
        return self::where('v_email_id',$key_value_array)
                   	->withTrashed()
                   	->first();
    }
}
