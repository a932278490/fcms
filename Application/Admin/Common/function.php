<?php
function crypt_pwd($pwd,$salt){
	return md5($pwd.(isset($salt)?$salt:' love ebcms forever!'));
}

function data2subtree($arr = array(),$pid = 0,$childrenfield = 'rows',$pidfield='pid',$idfield='id'){
	$temp = array();
	foreach ($arr as $key => $value) {
		if ($value[$pidfield] == $pid) {
			unset($arr[$key]);
			$tmp = data2subtree($arr,$value[$idfield],$childrenfield,$pidfield,$idfield);
			if ($tmp) {
				$value[$childrenfield] = $tmp;
			}
			$temp[] = $value;
		}
	}
	return $temp;
}