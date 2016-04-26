<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>后台管理界面</title>
    <script src="/fcms/Public/Js/jquery.min.js"></script>
    <link href="/fcms/Public/Third/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/fcms/Public/Third/iconfont/iconfont.css" rel="stylesheet">
    <link href="/fcms/Public/Css/admin.css" rel="stylesheet">
    <script src="/fcms/Public/Third/bootstrap/js/bootstrap.min.js"></script>
    <script src="/fcms/Public/Third/multi_menu/accordion.js"></script>
    <script src="/fcms/Public/Third/artTemplate/template.js"></script>
    <script>
    var html;
  $(document).ready(
    function(){
      $.ajax({
        url:'<?php echo U('index');?>',
        type: 'POST',
        dataType: 'json',
        data:"__api=mymenu",
        success:function(data){
          var html = template('left_nav',data.info);
          document.getElementById('left-nav').innerHTML = html;
          $(".leftnav").accordion({
                accordion: false,
                speed: 100,
                closedIcon: 'iconfont icon-shouqi',
                openedIcon: 'iconfont icon-zhankai',
              renderAfter:function(){
              $(".leftnav > li > a").trigger('click');
            }});
        }
      })
    }
  );
</script>

</head>

<body>
    <div class="header" style="height:50px;padding:0px;">
        <nav class="navbar navbar-static-top navbar-default navbar-inverse" style="margin-bottom:0;">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="" target="_blank"><b>易贝<sup>®</sup>内容管理系统</b></a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="javascript:EBCMS.<?php echo ($namespace); ?>.config();">系统配置</a></li>
                        <li><a href="javascript:EBCMS.<?php echo ($namespace); ?>.runtime(1);">清理系统缓存</a></li>
                        <li><a href="<?php echo U('Home/Index/index');?>" target="_blank">前台</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><b><?php echo ($nickname); ?></b> <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:EBCMS.<?php echo ($namespace); ?>.password();">修改密码</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="<?php echo U('Auth/logout');?>">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  <div class="body" style="top:50px;padding:0px;bottom:25px;">
    <div class="layout">
      <div class="layout-left" style="margin-right:-180px;width:180px;background:#222;">
      <div id="left-nav" class="box"></div>
        <script id="left_nav" type="text/html">
          <ul class="leftnav">
            {{include 'nav_item'}}
          </ul>
        </script>
        <script id="nav_item" type="text/html">
          {{each rows as v n}}
            <li>
            {{if v.rows}}
              <a href="#"><i class="{{v.iconcls}}"></i> {{v.title}}</a>
              <ul>
              {{include 'nav_item' v}}
              </ul>
            {{else}}
              <a href="{{v.url}}"><i class="{{v.iconcls}}"></i> {{v.title}}</a>
            {{/if}}
            </li>
          {{/each}}
        </script>
      </div>
     
      <div class="layout-rightbox">
        <div class="layout-right" style="height:100%;overflow:auto;margin-left:180px;">
          <div id="main" class="box">
            <div style="height:15px;"></div>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<table class="viewtable">
				<caption>欢迎使用</caption>
				<tbody>
					<tr>
						<td colspan="2">感谢您选择四川易贝网络科技有限公司开发的易贝内容管理系统EBCMS,EBCMS是基于ThinkPHP开发的一套内容管理系统。我们的宗旨是给客户提供一套持久更新、功能全面、操作便捷的供大众使用的内容管理系统，我们希望我们的产品能够让你从繁琐的、复杂的、低效的网站建设和维护中解脱出来！</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<table class="viewtable">
				<caption>系统提醒</caption>
				<tbody>
					<?php if((APP_DEBUG) == "1"): ?><tr>
						<th>调试模式</th>
						<td>网站正式上线后，建议关闭调试模式</td>
					</tr><?php endif; ?>
					<tr>
						<th>日志记录</th>
						<td>网站正式上线后，建议开启后台用户的操作历史记录</td>
					</tr>
					<tr>
						<th>文件安全</th>
						<td>网站正式上线后，建议只开启Runtime、Uploads、Backup的读写权限，其他文件和目录设置为只读</td>
					</tr>
					<tr>
						<th>权限安全</th>
						<td>网站正式上线后，建议对不同角色后台用户分配合理权限，特别是核心基础功能权限以及删除操作权限的分配要尤为慎重！</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-md-6">
			<table class="viewtable">
				<caption>产品团队</caption>
				<tbody>
					<tr>
						<th>总策划</th>
						<td>荷塘月色</td>
					</tr>
					<tr>
						<th>产品设计</th>
						<td>荷塘月色</td>
					</tr>
					<tr>
						<th>研发团队</th>
						<td>荷塘月色、叮当苗儿、鱼摆摆、troen2、闲心等</td>
					</tr>
					<tr>
						<th>官方网址</th>
						<td><a href="http://www.ebcms.com" target="_blank">EBCMS官方网站</a></td>
					</tr>
					<tr>
						<th>QQ群</th>
						<td>457911526(<span style="color:red;">免费下载</span>)</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<table class="viewtable">
				<caption>系统信息</caption>
				<tbody>
					<tr>
						<th>系统版本</th>
						<td></td>
					</tr>
					<tr>
						<th>上传限制</th>
						<td><?php echo get_cfg_var('upload_max_filesize');?></td>
					</tr>
					<tr>
						<th>脚本超时</th>
						<td><?php echo get_cfg_var('max_execution_time');?>秒</td>
					</tr>
					<tr>
						<th>服务器系统</th>
						<td><?php echo php_uname();?></td>
					</tr>
					<tr>
						<th>运行环境</th>
						<td><?php echo ($_SERVER['SERVER_SOFTWARE']); ?></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-md-6">
			<table class="viewtable">
				<caption>系统更新</caption>
				<tbody>
					<tr>
						<td colspan="2" style="padding:0px;height: 230px;line-height: 0px;"><iframe src="http://www.ebcms.com/index.php?m=Home&c=Server&a=ebcms&v=<?php echo (EBCMS_VERSION); ?>&from=<?php echo ($_SERVER['HTTP_HOST']); ?>" style="width:100%;height:100%;" runat="server" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes"></iframe></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
          </div>
          <div id="main_edit" class="box" style="display: none;"></div>
        </div>
      </div>

    </div>
  </div>


<div class="footer" style="height:25px;padding:0px;">
    <div style="height:23px;text-align:right;line-height:23px;margin:0px;">LVZHENG&nbsp;&nbsp;</div>
  </div>
</body>
</html>