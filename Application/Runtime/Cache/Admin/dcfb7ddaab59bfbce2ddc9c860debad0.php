<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
<script src="/fcms/Public/Js/jquery.min.js"></script>
	<script src="/fcms/Public/Third/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/fcms/Public/Js/admin.js"></script>
	<script>
		function change_verify(selecter) {
			$("#" + selecter).attr("src", "<?php echo U('Api/verify');?>");
			return false;
		};
		function login(){
			$.ajax({
				url: '<?php echo U('login');?>',
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
	<form id="loginform">
		<p><input type="text" name="email" placeholder="" /></p>
		<p><input type="password" name="password" placeholder="" /></p>
		
		<p>验 证 码:</p>
		<input type="text" name="verify" id="verify" placeholder="" />
			<img id="verifyimage" onclick="change_verify('verifyimage');" src="<?php echo U('Api/verify');?>" alt="验证码" style="width:400px;height:200px;">
			
		<p><button type="submit" onclick="return login();">登陆</button></p>
	</form>

</body>
</html>