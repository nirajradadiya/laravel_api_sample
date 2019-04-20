<?php
namespace App\Helpers;
class CommonHelper {

  public function static objectToArray($d) {
    if (is_object($d)) {
      $d = get_object_vars($d);
    }

    if (is_array($d)) {
      return array_map(__FUNCTION__, $d);
    }
    else {
      return $d;
    }
  }

 

  public function static get_last_query() {
    $queries = DB::getQueryLog();
    $sql = end($queries);
   

    if( ! empty($sql['bindings']))
    {
      $pdo = DB::getPdo();
      foreach($sql['bindings'] as $binding)
      {
        $sql['query'] =
          preg_replace('/\?/', $pdo->quote($binding),
            $sql['query'], 1);
      }
    }
    return pr($sql['query']);
  } 
}

?>