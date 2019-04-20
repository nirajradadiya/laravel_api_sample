<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class OcModel extends Model {
	public static function get_table() {
		return (new static)->getTable();
	}

	public function model_refresh($fields) {
		$latest = static::find($this->id);
		foreach ($fields as $field) {
			if(isset($latest->$field)) {
				$this->$field = $latest->$field;
			}
		}
	}

	public static function insert_record($model,$key_value_array) //common funciton for insert record dynamically 
	{
	  $add_record = new $model;  
	  foreach ($key_value_array as $key => $value) 
	  {
	    $add_record->$key = trim($value);
	  }
	  if($add_record->save())
	  {
	   return $add_record; 
	  }
	}

	public static function  mass_assignment_insert($model,$key_value_array) //common funciton for insert multiple record with array dynamically 
	{
	  $model::insert($key_value_array);  
	}

	public static function  update_using_id($model,$key_value_array,$id) //common funciton for update record dynamically 
	{
	  $update_record = $model::find($id);  
	  foreach ($key_value_array as $key => $value) 
	  {
	    $update_record->$key = trim($value);
	  }
	  return $update_record->save();
	}

	public static function  update_using_array($key_value_array,$update_array) //common funciton for update record dynamically 
	{  
	  foreach($key_value_array as $key => $value) 
	  {
	    $update_array->$key = trim($value);
	  }
	  return $update_array->save();
	}

	public static function  update_using_array_with_where($model,$where_array,$update_array) //common funciton for update record dynamically with where
	{  
	  $model::where($where_array)->update($update_array);
	}

	public static function delete_using_id($model,$key,$id)
	{
	  $model::where($key,'=',$id)->delete();  
	}
}
