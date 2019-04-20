<?php

namespace App\Helpers;
class CommonApiHelper {

    public static function user_required_fields(){
        return array('id', 'v_name','v_hospital_name','v_hospital_type','t_hospital_address','v_profile_image','v_mobile_number','e_blood_group','t_address_line1','t_address_line2','v_pincode','e_user_type','v_latitude','v_longitude','v_email_id','api_token','e_register_type','e_is_email_verify','e_register_type','e_type');
    }

    public static function user_details_fields(){
        return array('id', 'v_name','v_hospital_name','v_hospital_type','t_hospital_address','v_mobile_number','v_profile_image','e_blood_group','t_address_line1','t_address_line2','v_pincode','e_user_type','v_latitude','v_longitude','v_email_id','api_token','e_register_type','e_is_email_verify','e_register_type','e_type');
    }

	public static function generate_api_token($email_id) {
		return md5(time().str_random(30)).md5($email_id).md5(str_random(30).time());
	}

	public static function image_upload($file,$store_path,$image_name,$id) //common funciton for upload image dynamically 
	{
	  $image_name =  $id.'_'.$image_name.'_'.rand(10000000,99999999).".png"; 
	  $file->move($store_path,$image_name);
	  return $image_name;
	}
	
	public static function get_file_extension($file_name) {
	  return substr(strrchr($file_name,'.'),1);
	}
	
	public static function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return strtoupper($randomString);
	}

	public static function is_json($string,$return_data = false) {
	  $data = json_decode($string,true);
	  return (json_last_error() == JSON_ERROR_NONE) ? ($return_data ? $data : TRUE) : FALSE;
	}
	public static function is_arary_json($string,$return_data = false) {
	  $data = json_decode($string,true);
	  return (json_last_error() == JSON_ERROR_NONE) ? ($return_data ? $data : TRUE) : FALSE;
	}
	public static function file_exists_check($path){
	  return file_exists($path); 
	}
	public static function add_prefix_path($n,$image_path) // function for delete images 
	{
	    return($image_path.$n);
	}
	public static function empty_dir($dir_path)
	{
	  array_map('unlink',glob($dir_path.'*'));
	}
	public static function sortByOrder($a, $b) 
	{
	      return $a['i_order'] - $b['i_order'];
	}
	public static function remove_dir($dir_path)
	{
	  File::deleteDirectory($dir_path);
	}
	public static function array_msort($array, $cols)
	{
	    $colarr = array();
	    foreach ($cols as $col => $order) {
		$colarr[$col] = array();
		foreach ($array as $k => $row) { $colarr[$col]['_'.$k] = strtolower($row[$col]); }
	    }
	    $eval = 'array_multisort(';
	    foreach ($cols as $col => $order) {
		$eval .= '$colarr[\''.$col.'\'],'.$order.',';
	    }
	    $eval = substr($eval,0,-1).');';
	    eval($eval);
	    $ret = array();
	    foreach ($colarr as $col => $arr) {
		foreach ($arr as $k => $v) {
		    $k = substr($k,1);
		    if (!isset($ret[$k])) $ret[$k] = $array[$k];
		    $ret[$k][$col] = $array[$k][$col];
		}
	    }
	    return $ret;
	}


	public static function send_notification_android_request_device_fcm($deviceToken,$message,$json_data)
    {
        $url = 'https://fcm.googleapis.com/fcm/send';
        $server_key =  SERVER_NOTIFICATE_FCM_KEY;
        $headers = array('Content-Type:application/json', 'Authorization:key='.$server_key);
        $notification = array( 'title' => SITE_NAME,
                               'text' => $message,
                               'icon' => '@mipmap/ic_launcher_trns',
                               'sound' => 'notification',
                               'click_action'=>"",
                               'color' => '#303F9F',
                               );
        $fields = array('data' => $json_data,
                        'notification'=> $notification,
                        'to'=> $deviceToken);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        $result = curl_exec($ch);
       	
        if ($result === FALSE) {
            die('FCM Send Error: ' . curl_error($ch));
        }
        curl_close($ch);
        return $result;
	}


	// Generate a random username for the connecting client
	public static function randomUsername() {
	    $ADJECTIVES = array(
	        'Abrasive', 'Brash', 'Callous', 'Daft', 'Eccentric', 'Fiesty', 'Golden',
	        'Holy', 'Ignominious', 'Joltin', 'Killer', 'Luscious', 'Mushy', 'Nasty',
	        'OldSchool', 'Pompous', 'Quiet', 'Rowdy', 'Sneaky', 'Tawdry',
	        'Unique', 'Vivacious', 'Wicked', 'Xenophobic', 'Yawning', 'Zesty',
	    );

	    $FIRST_NAMES = array(
	        'Anna', 'Bobby', 'Cameron', 'Danny', 'Emmett', 'Frida', 'Gracie', 'Hannah',
	        'Isaac', 'Jenova', 'Kendra', 'Lando', 'Mufasa', 'Nate', 'Owen', 'Penny',
	        'Quincy', 'Roddy', 'Samantha', 'Tammy', 'Ulysses', 'Victoria', 'Wendy',
	        'Xander', 'Yolanda', 'Zelda',
	    );

	    $LAST_NAMES = array(
	        'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
	        'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
	        'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
	        'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
	        'Zimmerman',
	    );

	    // Choose random components of username and return it
	    $adj = $ADJECTIVES[array_rand($ADJECTIVES)];
	    $fn = $FIRST_NAMES[array_rand($FIRST_NAMES)];
	    $ln = $LAST_NAMES[array_rand($LAST_NAMES)];
	    
	    return $adj . $fn . $ln;
	}
	
}
?>
