<?php
namespace Admin\Controller;
use Think\Controller;
class ApiController extends Controller {
	//验证码
	public function verify(){
		if (IS_GET) {
			$verify=new \Think\Verify();
			$verify->entry();
		}
	}
}