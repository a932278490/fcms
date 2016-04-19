<?php
namespace Admin\Controller;
use Think\Controller;
class AuthController extends Controller {
    public function index(){
        $this->login();
    }

    public function login(){
		// 登陆页面
		if (IS_GET) {
			$this -> display('login');
		}
		
		// 登录动作
		if (IS_POST) {
			// 验证验证码
			$verify = new \Think\Verify();
			if(!$verify->check(I('verify'))){
				$this -> error('verify');
			}
		}
    }

    
}