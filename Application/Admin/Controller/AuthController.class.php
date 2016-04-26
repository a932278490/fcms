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

			session(null);

			$where = array(
				'email' => I('email'),
				'password' => crypt_pwd(I('password'))
				);
			
			$res = D('User')->where($where) -> relation('group') -> find();
			file_put_contents('nihao.txt', print_r($res,true));
			if($res = D('User')->where($where) -> relation('group') -> find()){
				// 判断账户状态

				if ($res['status'] != 1) {
					$this -> error('forbidden');
				}
				// 超级管理员识别
				if ($res['email'] == C('SUPERADMIN')) {
					session(C('ADMIN_AUTH_KEY'),true);
				}
				// 更新数据库
				$updata = array(
					'login_ip' => get_client_ip(1,true),
					'login_time' => time(),
					'login_times'=>$res['login_times']+1
					);
				M('User') -> where('id='.$res['id']) -> save($updata);
				session(C('USER_AUTH_KEY'),$res['id']);
				session('__email',$res['email']);
				session('__nickname',$res['nickname']);
				session('__avatar',$res['avatar']);
				$this -> success('登陆成功!',U('Admin/Index/index'),true);
			}else {
				$this -> error('password');
			}
		}

    }

    
}