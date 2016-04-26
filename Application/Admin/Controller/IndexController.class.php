<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        if (IS_POST) {
			if ($api = I('__api')) {
				$this -> $api();
			}
		}elseif (IS_GET) {
			$this -> nickname = session('__nickname');
			switch (I('tpl')) {
				case 'main':
					$this -> success($this -> fetch('main'));
					break;

				case 'config':
					$this -> success($this -> fetch('config'));
					break;
				
				default:
					$this -> display();
					break;
			}
		}
    }

    protected function mymenu(){
    	$this->mymenus();
    }
    public function mymenus(){
    	$pid = I('pid',0,'intval');
    	$menus = D('Menu')->where('status=1 AND type="admin"')->select();
    	$menus=data2subtree($menus,$pid);
    	//$this->rowsarray($menus);
    	//$this->show("<pre>".print_r($menus,true)."</pre>");
    	$res = array(
			'rows' => $menus,
			);
    	$this->success($res);
    }
    private function rowsarray($arr){
    	foreach($arr as $key => $value){

    	}
    	
    }
}