<?php
namespace Admin\Model;
use Think\Model\RelationModel;
class UserModel extends RelationModel{
	protected $_link = array(
		'group'=> array(
			'mapping_type'	=> self::MANY_TO_MANY,
			'class_name'=>'auth_group',
			'mapping_name'=>'group',
			'foreign_key'=>'uid',
			'relation_foreign_key'=>'group_id',
			'relation_table'=>'__AUTH_GROUP_ACCESS__',
		),
	);
}