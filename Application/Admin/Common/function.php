<?php
function crypt_pwd($pwd,$salt){
	return md5($pwd.(isset($salt)?$salt:' love ebcms forever!'));
}