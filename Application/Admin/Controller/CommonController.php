<?php
namespace Admin\Controller;
use Think\Controller;
class CommonController extends Controller {
	public function _initialize(){
		if (!session('?'.C('USER_AUTH_KEY'))) {
			$this->redirect('Admin/Auth/login');
		}else{
			file_put_contents("nihao.txt",session('?'.C('USER_AUTH_KEY'));
		}
		if (!session(C('ADMIN_AUTH_KEY'))) {
			$AUTH = new \Think\Auth();
			if(!$AUTH->check(MODULE_NAME.'_'.CONTROLLER_NAME.'_'.ACTION_NAME, session(C('USER_AUTH_KEY')))){
				$this->error('没有权限！');
			}
		}
		
}