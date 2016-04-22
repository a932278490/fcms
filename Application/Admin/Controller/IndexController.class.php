<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        if (IS_GET) {
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
}