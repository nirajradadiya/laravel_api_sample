<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\OcModel;
class EmailTemplates extends OcModel
{
    public $timestamps = true;
    protected $table = 'email_templates';    
    public static function get_email_template_details($id = '') {
        return  self::where('id','=',$id)
                    ->where('e_status','Active')
                    ->first();
    }
}
