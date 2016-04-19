<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
<script src="__JS__/jquery.min.js"></script>
	<script src="__THIRD__/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="__JS__/admin.js"></script>
	<script>
		function change_verify(selecter) {
			$("#" + selecter).attr("src", "<?php echo U('Api/verify');?>#" + Math.random());
			return false;
		};
		function login(){
			$.ajax({
				url: '<?php echo U('Admin/login');?>',
				type: 'POST',
				dataType: 'json',
				data: $('#loginform').serialize(),
				success:function(data){
					if (data.status) {
						window.location.href=data.url; 
					}else{
						change_verify('verifyimage');
						switch(data.info){
							case 'password':
								alert('邮箱或者密码错误！');
								$('#loginform')[0].reset();
								break;
							case 'verify':
								alert('验证码错误！');
								$('#verify').val('');
								break;
							case 'forbidden':
								alert('账户暂时不可用！');
								$('#loginform')[0].reset();
								break;
							default:
								alert(data.info);
								$('#loginform')[0].reset();
						}
					};
				}
			});
			return false;
		};
	</script>
</head>
<body>
	<form>
		<p><input type="text" name="username" /></p>
		<p><input type="password" name="password" /></p>
		
		<p>验 证 码:</p>
		<input type="text" name="verify" placeholder="">
			<img id="verifyimage" onclick="change_verify('verifyimage');" src="<?php echo U('Api/verify');?>" alt="验证码" style="width:100px;height:44px;">
		
		<p><button type="submit" onclick="return login();">登陆</button></p>
	</form>
	<p><button onclick="change_verify('verifyimage');">换一张</button></p>
</body>
</html>