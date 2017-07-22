SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `sun_address`;
CREATE TABLE `sun_address` (
  `address_id` mediumint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '地址ID',
  `member_id` mediumint(10) unsigned NOT NULL DEFAULT '0' COMMENT '会员ID',
  `true_name` varchar(50) NOT NULL COMMENT '会员姓名',
  `area_id` mediumint(10) unsigned NOT NULL DEFAULT '0' COMMENT '地区ID',
  `city_id` mediumint(9) DEFAULT NULL COMMENT '市级ID',
  `area_info` varchar(255) NOT NULL DEFAULT '' COMMENT '地区内容',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `tel_phone` varchar(20) DEFAULT NULL COMMENT '座机电话',
  `mob_phone` varchar(15) DEFAULT NULL COMMENT '手机电话',
  `is_default` enum('0','1') NOT NULL DEFAULT '0' COMMENT '1默认收货地址',
  `dlyp_id` int(11) DEFAULT '0' COMMENT '自提点ID',
  PRIMARY KEY (`address_id`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='买家地址信息表';

-- insert into `sun_address`(`address_id`,`member_id`,`true_name`,`area_id`,`city_id`,`area_info`,`address`,`tel_phone`,`mob_phone`,`is_default`,`dlyp_id`) values
-- ('3','2','43434','144','39','上海	上海市	卢湾区','4343434','','43434343434','0','0'),

DROP TABLE IF EXISTS  `sun_admin`;
CREATE TABLE `sun_admin` (
  `admin_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `admin_name` varchar(20) NOT NULL COMMENT '管理员名称',
  `admin_password` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员密码',
  `admin_login_time` int(10) NOT NULL DEFAULT '0' COMMENT '登录时间',
  `admin_login_num` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `admin_is_super` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否超级管理员',
  `admin_gid` smallint(6) DEFAULT '0' COMMENT '权限组ID',
  PRIMARY KEY (`admin_id`),
  KEY `member_id` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- insert into `sun_admin`(`admin_id`,`admin_name`,`admin_password`,`admin_login_time`,`admin_login_num`,`admin_is_super`,`admin_gid`) values
-- ('1','kenn','96e79218965eb72c92a549dd5a330112','1460036820','76','1','0');


DROP TABLE IF EXISTS  `sun_area`;
CREATE TABLE `sun_area` (
  `area_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `area_name` varchar(50) NOT NULL COMMENT '地区名称',
  `area_parent_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '地区父ID',
  `area_sort` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `area_deep` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '地区深度，从1开始',
  `area_region` varchar(3) DEFAULT NULL COMMENT '大区名称',
  PRIMARY KEY (`area_id`),
  KEY `area_parent_id` (`area_parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45056 DEFAULT CHARSET=utf8 COMMENT='地区表';

-- insert into `sun_area`(`area_id`,`area_name`,`area_parent_id`,`area_sort`,`area_deep`,`area_region`) values
-- ('1','北京','0','0','1','华北'),

DROP TABLE IF EXISTS  `sun_arrival_notice`;
CREATE TABLE `sun_arrival_notice` (
  `an_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '通知id',
  `goods_id` int(10) unsigned NOT NULL COMMENT '商品id',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `member_id` int(10) unsigned NOT NULL COMMENT '会员id',
  `an_addtime` int(10) unsigned NOT NULL COMMENT '添加时间',
  `an_email` varchar(100) NOT NULL COMMENT '邮箱',
  `an_mobile` varchar(11) NOT NULL COMMENT '手机号',
  `an_type` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态 1到货通知，2预售',
  PRIMARY KEY (`an_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品到货通知表';

DROP TABLE IF EXISTS  `sun_attribute`;
CREATE TABLE `sun_attribute` (
  `attr_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '属性id',
  `attr_name` varchar(100) NOT NULL COMMENT '属性名称',
  `type_id` int(10) unsigned NOT NULL COMMENT '所属类型id',
  `attr_value` text NOT NULL COMMENT '属性值列',
  `attr_show` tinyint(1) unsigned NOT NULL COMMENT '是否显示。0为不显示、1为显示',
  `attr_sort` tinyint(1) unsigned NOT NULL COMMENT '排序',
  PRIMARY KEY (`attr_id`),
  KEY `attr_id` (`attr_id`,`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8 COMMENT='商品属性表';

-- insert into `sun_attribute`(`attr_id`,`attr_name`,`type_id`,`attr_value`,`attr_show`,`attr_sort`) values
-- ('221','口味','50','普通,柠檬味','1','1'),

DROP TABLE IF EXISTS  `sun_attribute_value`;
CREATE TABLE `sun_attribute_value` (
  `attr_value_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '属性值id',
  `attr_value_name` varchar(100) NOT NULL COMMENT '属性值名称',
  `attr_id` int(10) unsigned NOT NULL COMMENT '所属属性id',
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `attr_value_sort` tinyint(1) unsigned NOT NULL COMMENT '属性值排序',
  PRIMARY KEY (`attr_value_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3307 DEFAULT CHARSET=utf8 COMMENT='商品属性值表';

-- insert into `sun_attribute_value`(`attr_value_id`,`attr_value_name`,`attr_id`,`type_id`,`attr_value_sort`) values
-- ('3181','普通','221','50','0'),


DROP TABLE IF EXISTS  `sun_brand`;
CREATE TABLE `sun_brand` (
  `brand_id` mediumint(11) NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `brand_name` varchar(100) DEFAULT NULL COMMENT '品牌名称',
  `brand_initial` varchar(1) NOT NULL COMMENT '品牌首字母',
  `brand_class` varchar(50) DEFAULT NULL COMMENT '类别名称',
  `brand_pic` varchar(100) DEFAULT NULL COMMENT '图片',
  `brand_sort` tinyint(3) unsigned DEFAULT '0' COMMENT '排序',
  `brand_recommend` tinyint(1) DEFAULT '0' COMMENT '推荐，0为否，1为是，默认为0',
  `store_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺ID',
  `brand_apply` tinyint(1) NOT NULL DEFAULT '1' COMMENT '品牌申请，0为申请中，1为通过，默认为1，申请功能是会员使用，系统后台默认为1',
  `class_id` int(10) unsigned DEFAULT '0' COMMENT '所属分类id',
  `show_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '品牌展示类型 0表示图片 1表示文字 ',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8 COMMENT='品牌表';

-- insert into `sun_brand`(`brand_id`,`brand_name`,`brand_initial`,`brand_class`,`brand_pic`,`brand_sort`,`brand_recommend`,`store_id`,`brand_apply`,`class_id`,`show_type`) values
-- ('365','飞利浦 / PHILIPS','P','工程物资','05095614845245898_sm.gif','99','0','0','1','1466','0')


DROP TABLE IF EXISTS  `sun_cart`;
CREATE TABLE `sun_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `buyer_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '买家id',
  `store_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺id',
  `store_name` varchar(50) NOT NULL DEFAULT '' COMMENT '店铺名称',
  `goods_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
  `goods_name` varchar(100) NOT NULL COMMENT '商品名称',
  `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品价格',
  `goods_num` smallint(5) unsigned NOT NULL DEFAULT '1' COMMENT '购买商品数量',
  `goods_image` varchar(100) NOT NULL COMMENT '商品图片',
  `bl_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '组合套装ID',
  `cart_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '类别：1-购物车，2-预置订单',
  PRIMARY KEY (`cart_id`),
  KEY `member_id` (`buyer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=726 DEFAULT CHARSET=utf8 COMMENT='购物车数据表';

-- insert into `sun_cart`(`cart_id`,`buyer_id`,`store_id`,`store_name`,`goods_id`,`goods_name`,`goods_price`,`goods_num`,`goods_image`,`bl_id`,`cart_type`) values
-- ('8','60','10','埃伦斯电子','102238','联想（lenovo）LED显示器 商用显示器（19.5英寸—29英寸） 29寸 LED商用 1',3888.00,'1','10_05108584342837919.jpg','0','2'),



DROP TABLE IF EXISTS  `sun_daddress`;
CREATE TABLE `sun_daddress` (
  `address_id` mediumint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '地址ID',
  `store_id` mediumint(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺ID',
  `seller_name` varchar(50) NOT NULL DEFAULT '' COMMENT '联系人',
  `area_id` mediumint(10) unsigned NOT NULL DEFAULT '0' COMMENT '地区ID',
  `city_id` mediumint(9) DEFAULT NULL COMMENT '市级ID',
  `area_info` varchar(100) DEFAULT NULL COMMENT '省市县',
  `address` varchar(100) NOT NULL COMMENT '地址',
  `telphone` varchar(40) DEFAULT NULL COMMENT '电话',
  `company` varchar(50) NOT NULL COMMENT '公司',
  `is_default` enum('0','1') NOT NULL DEFAULT '0' COMMENT '是否默认1是',
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='卖家发货地址信息表';

-- insert into `sun_daddress`(`address_id`,`store_id`,`seller_name`,`area_id`,`city_id`,`area_info`,`address`,`telphone`,`company`,`is_default`) values
-- ('1','1','34434','143','39','上海	上海市	黄浦区','434343434343','434343434','','0'),



DROP TABLE IF EXISTS  `sun_evaluate_goods`;
CREATE TABLE `sun_evaluate_goods` (
  `geval_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `geval_orderid` int(11) NOT NULL COMMENT '订单表自增ID',
  `geval_orderno` bigint(20) unsigned NOT NULL COMMENT '订单编号',
  `geval_ordergoodsid` int(11) NOT NULL COMMENT '订单商品表编号',
  `geval_goodsid` int(11) NOT NULL COMMENT '商品表编号',
  `geval_goodsname` varchar(100) NOT NULL COMMENT '商品名称',
  `geval_goodsprice` decimal(10,2) DEFAULT NULL COMMENT '商品价格',
  `geval_goodsimage` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `geval_scores` tinyint(1) NOT NULL COMMENT '1-5分',
  `geval_content` varchar(255) DEFAULT NULL COMMENT '信誉评价内容',
  `geval_isanonymous` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0表示不是 1表示是匿名评价',
  `geval_addtime` int(11) NOT NULL COMMENT '评价时间',
  `geval_storeid` int(11) NOT NULL COMMENT '店铺编号',
  `geval_storename` varchar(100) NOT NULL COMMENT '店铺名称',
  `geval_frommemberid` int(11) NOT NULL COMMENT '评价人编号',
  `geval_frommembername` varchar(100) NOT NULL COMMENT '评价人名称',
  `geval_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '评价信息的状态 0为正常 1为禁止显示',
  `geval_remark` varchar(255) DEFAULT NULL COMMENT '管理员对评价的处理备注',
  `geval_explain` varchar(255) DEFAULT NULL COMMENT '解释内容',
  `geval_image` varchar(255) DEFAULT NULL COMMENT '晒单图片',
  PRIMARY KEY (`geval_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='信誉评价表';

-- insert into `sun_evaluate_goods`(`geval_id`,`geval_orderid`,`geval_orderno`,`geval_ordergoodsid`,`geval_goodsid`,`geval_goodsname`,`geval_goodsprice`,`geval_goodsimage`,`geval_scores`,`geval_content`,`geval_isanonymous`,`geval_addtime`,`geval_storeid`,`geval_storename`,`geval_frommemberid`,`geval_frommembername`,`geval_state`,`geval_remark`,`geval_explain`,`geval_image`) values
-- ('1','2','8000000000000201','2','100078','apple',5000.00,'1_05093511340534433.jpg','5','不错哦','0','1456033535','1','尚线','2','kenn1','0',null,null,null),


DROP TABLE IF EXISTS  `sun_evaluate_store`;
CREATE TABLE `sun_evaluate_store` (
  `seval_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评价ID',
  `seval_orderid` int(11) unsigned NOT NULL COMMENT '订单ID',
  `seval_orderno` varchar(100) NOT NULL COMMENT '订单编号',
  `seval_addtime` int(11) unsigned NOT NULL COMMENT '评价时间',
  `seval_storeid` int(11) unsigned NOT NULL COMMENT '店铺编号',
  `seval_storename` varchar(100) NOT NULL COMMENT '店铺名称',
  `seval_memberid` int(11) unsigned NOT NULL COMMENT '买家编号',
  `seval_membername` varchar(100) NOT NULL COMMENT '买家名称',
  `seval_desccredit` tinyint(1) unsigned NOT NULL DEFAULT '5' COMMENT '描述相符评分',
  `seval_servicecredit` tinyint(1) unsigned NOT NULL DEFAULT '5' COMMENT '服务态度评分',
  `seval_deliverycredit` tinyint(1) unsigned NOT NULL DEFAULT '5' COMMENT '发货速度评分',
  PRIMARY KEY (`seval_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='店铺评分表';

-- insert into `sun_evaluate_store`(`seval_id`,`seval_orderid`,`seval_orderno`,`seval_addtime`,`seval_storeid`,`seval_storename`,`seval_memberid`,`seval_membername`,`seval_desccredit`,`seval_servicecredit`,`seval_deliverycredit`) values
-- ('1','2','8000000000000201','1456033535','1','尚线','2','kenn1','4','5','5'),


DROP TABLE IF EXISTS  `sun_express`;
CREATE TABLE `sun_express` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `e_name` varchar(50) NOT NULL COMMENT '公司名称',
  `e_state` enum('0','1') NOT NULL DEFAULT '1' COMMENT '状态',
  `e_code` varchar(50) NOT NULL COMMENT '编号',
  `e_letter` char(1) NOT NULL COMMENT '首字母',
  `e_order` enum('1','2') NOT NULL DEFAULT '2' COMMENT '1常用2不常用',
  `e_url` varchar(100) NOT NULL COMMENT '公司网址',
  `e_zt_state` tinyint(4) DEFAULT '0' COMMENT '是否支持服务站配送0否1是',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='快递公司';

-- insert into `sun_express`(`id`,`e_name`,`e_state`,`e_code`,`e_letter`,`e_order`,`e_url`,`e_zt_state`) values
-- ('1','安信达','0','anxindakuaixi','A','2','http://www.anxinda.com','0'),




DROP TABLE IF EXISTS  `sun_favorites`;
CREATE TABLE `sun_favorites` (
  `fav_id` int(10) unsigned NOT NULL AUTO_INCREMENT  COMMENT '收藏ID',
  `member_id` int(10) unsigned NOT NULL COMMENT '会员ID',
  `fav_type` varchar(20) NOT NULL COMMENT '收藏类型',
  `fav_time` int(10) unsigned NOT NULL COMMENT '收藏时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='买家收藏表';



# DROP TABLE IF EXISTS  `sun_favorites`;
# CREATE TABLE `sun_favorites_folder` (
#   `id` int(10) unsigned NOT NULL AUTO_INCREMENT  COMMENT '收藏文件夹ID',
#   `member_id` int(10) unsigned NOT NULL COMMENT '会员ID',
#   `fav_id` int(10) unsigned NOT NULL COMMENT '收藏ID',
#   `fav_type` varchar(20) NOT NULL COMMENT '收藏类型',
#   `fav_time` int(10) unsigned NOT NULL COMMENT '创建时间'
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='买家收藏表';

-- insert into `sun_favorites`(`member_id`,`fav_id`,`fav_type`,`fav_time`) values
-- ('154','18','store','1458538663'),



DROP TABLE IF EXISTS  `sun_gadmin`;
CREATE TABLE `sun_gadmin` (
  `gid` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `gname` varchar(50) DEFAULT NULL COMMENT '组名',
  `limits` text COMMENT '权限内容',
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='权限组';

-- insert into `sun_gadmin`(`gid`,`gname`,`limits`) values
-- ('1','管理层','AdR9E8pkWKJsSHy6cOUEokXBeoMI5S7wlb842QKF-beSwwQaWcQq1yNeokMKD1n9-qPAEWM6XxgaYjQwW7TA2qhOaVeYmzi9wajoJYnawqTbIlh8UroPK9tbPowgpGbRq1pQ9AbPpHkj9O4PAoXPqHjgKonShCtWQSjiNCvd4y2c-ATiX5ZmboFTsEzebc_TqF5duModp6YRqR-R98qKrX1kdOoMgodMazle6EnPBKtWQSnku-Yb4e2dNsdlo5kiborQM8AdLcwPZJ8Y-U7dJacU59xSNoaML70jeW5Pv8YMbzkjpIYQxy6QfeokdGvgoK7gO8ipHVmksA-S8Etdbk_RJtwc_A2k5etNJ13NeUcS6XwjOKxLfcjSKHnkJcWPQWnP_2UluCvcZ-7dNAgjY5bk7A-SLIyf84xPKNza-89fJGlU5JmSu0uMKTggtGzMvccSLfafo0UQQmETvaWgu2ig4a7dNwipHFnic8qU7Yzdc4qTZx_dOA-jK6YNqVrStorRL7xkdGyOAIeO67UlJcUPxOwRg2jldygf5GwetsTlXNll7w3Qsk0ebEwSqFzc-wodaelO51rQtgzP7TwjNG5Nf0jK6LqipIfOg6vWQGijNungJ-2c-kkl3tlmLw7Q7I2h8gyUJByafAFgJOjQ4BlQ98qQK71n-W5LgIUOaXifpMlTRO8PgWSluGigoKDfuEVnGFYisEuTcAld7bD'),
-- ('2','美工','QZpHSL35SyWYMOWSNssejePPzx5rtif0np6T0ybpC14a7qJ9Hy0NlnFvsQE');

DROP TABLE IF EXISTS  `sun_goods`;
CREATE TABLE `sun_goods` (
  `goods_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id(SKU)',
  `goods_commonid` int(10) unsigned NOT NULL COMMENT '商品公共表id',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `goods_jingle` varchar(150) NOT NULL COMMENT '商品广告词',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
  `store_name` varchar(50) NOT NULL COMMENT '店铺名称',
  `gc_id` int(10) unsigned NOT NULL COMMENT '商品分类id',
  `gc_id_1` int(10) unsigned NOT NULL COMMENT '一级分类id',
  `gc_id_2` int(10) unsigned NOT NULL COMMENT '二级分类id',
  `gc_id_3` int(10) unsigned NOT NULL COMMENT '三级分类id',
  `brand_id` int(10) unsigned NOT NULL COMMENT '品牌id',
  `goods_price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `goods_promotion_price` decimal(10,2) NOT NULL COMMENT '商品促销价格',
  `goods_promotion_type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '促销类型 0无促销，1团购，2限时折扣',
  `goods_marketprice` decimal(10,2) NOT NULL COMMENT '市场价',
  `goods_serial` varchar(50) NOT NULL COMMENT '商家编号',
  `goods_storage_alarm` tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
  `goods_click` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品点击数量',
  `goods_salenum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '销售数量',
  `goods_collect` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏数量',
  `goods_spec` text NOT NULL COMMENT '商品规格序列化',
  `goods_storage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品库存',
  `goods_image` varchar(100) NOT NULL DEFAULT '' COMMENT '商品主图',
  `goods_state` tinyint(3) unsigned NOT NULL COMMENT '商品状态 0下架，1正常，10违规（禁售）',
  `goods_verify` tinyint(3) unsigned NOT NULL COMMENT '商品审核 1通过，0未通过，10审核中',
  `goods_addtime` int(10) unsigned NOT NULL COMMENT '商品添加时间',
  `goods_edittime` int(10) unsigned NOT NULL COMMENT '商品编辑时间',
  `areaid_1` int(10) unsigned NOT NULL COMMENT '一级地区id',
  `areaid_2` int(10) unsigned NOT NULL COMMENT '二级地区id',
  `color_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '颜色规格id',
  `transport_id` mediumint(8) unsigned NOT NULL COMMENT '运费模板id',
  `goods_freight` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
  `goods_vat` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否开具增值税发票 1是，0否',
  `goods_commend` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否 默认0',
  `goods_stcids` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺分类id 首尾用,隔开',
  `evaluation_good_star` tinyint(3) unsigned NOT NULL DEFAULT '5' COMMENT '好评星级',
  `evaluation_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评价数',
  `is_virtual` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为虚拟商品 1是，0否',
  `virtual_indate` int(10) unsigned NOT NULL COMMENT '虚拟商品有效期',
  `virtual_limit` tinyint(3) unsigned NOT NULL COMMENT '虚拟商品购买上限',
  `virtual_invalid_refund` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否允许过期退款， 1是，0否',
  `is_fcode` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
  `is_appoint` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
  `is_presell` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
  `have_gift` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否拥有赠品',
  `is_own_shop` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为平台自营',
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105721 DEFAULT CHARSET=utf8 COMMENT='商品表';

-- insert into `sun_goods`(`goods_id`,`goods_commonid`,`goods_name`,`goods_jingle`,`store_id`,`store_name`,`gc_id`,`gc_id_1`,`gc_id_2`,`gc_id_3`,`brand_id`,`goods_price`,`goods_promotion_price`,`goods_promotion_type`,`goods_marketprice`,`goods_serial`,`goods_storage_alarm`,`goods_click`,`goods_salenum`,`goods_collect`,`goods_spec`,`goods_storage`,`goods_image`,`goods_state`,`goods_verify`,`goods_addtime`,`goods_edittime`,`areaid_1`,`areaid_2`,`color_id`,`transport_id`,`goods_freight`,`goods_vat`,`goods_commend`,`goods_stcids`,`evaluation_good_star`,`evaluation_count`,`is_virtual`,`virtual_indate`,`virtual_limit`,`virtual_invalid_refund`,`is_fcode`,`is_appoint`,`is_presell`,`have_gift`,`is_own_shop`) values
-- ('100091','100167','延中/yanzhong  盐汽水  600ml*20瓶/箱 20瓶/箱 600ml 1箱','老品牌 更信赖 防暑运动 补充水分','1','尚线自营','2173','2142','2170','2173','366',43.00,43.00,'0',50.00,'','0','133','0','0','a:3:{i:433;s:9:"20瓶/箱";i:437;s:5:"600ml";i:453;s:4:"1箱";}','999','1_05096331419562649.jpg','1','1','1456306182','1460002442','9','39','0','1',20.00,'1','1','','5','0','0','0','0','0','0','0','0','0','0'),

DROP TABLE IF EXISTS  `sun_goods_common`;
CREATE TABLE `sun_goods_common` (
  `goods_commonid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品公共表id',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `goods_jingle` varchar(150) NOT NULL COMMENT '商品广告词',
  `gc_id` int(10) unsigned NOT NULL COMMENT '商品分类',
  `gc_id_1` int(10) unsigned NOT NULL COMMENT '一级分类id',
  `gc_id_2` int(10) unsigned NOT NULL COMMENT '二级分类id',
  `gc_id_3` int(10) unsigned NOT NULL COMMENT '三级分类id',
  `gc_name` varchar(200) NOT NULL COMMENT '商品分类',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
  `store_name` varchar(50) NOT NULL COMMENT '店铺名称',
  `spec_name` text NOT NULL COMMENT '规格名称',
  `spec_value` text NOT NULL COMMENT '规格值',
  `brand_id` int(10) unsigned NOT NULL COMMENT '品牌id',
  `brand_name` varchar(100) NOT NULL COMMENT '品牌名称',
  `type_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '类型id',
  `goods_image` varchar(100) NOT NULL COMMENT '商品主图',
  `goods_attr` text NOT NULL COMMENT '商品属性',
  `goods_body` text NOT NULL COMMENT '商品内容',
  `mobile_body` text NOT NULL COMMENT '手机端商品描述',
  `goods_state` tinyint(3) unsigned NOT NULL COMMENT '商品状态 0下架，1正常，10违规（禁售）',
  `goods_stateremark` varchar(255) DEFAULT NULL COMMENT '违规原因',
  `goods_verify` tinyint(3) unsigned NOT NULL COMMENT '商品审核 1通过，0未通过，10审核中',
  `goods_verifyremark` varchar(255) DEFAULT NULL COMMENT '审核失败原因',
  `goods_lock` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品锁定 0未锁，1已锁',
  `goods_addtime` int(10) unsigned NOT NULL COMMENT '商品添加时间',
  `goods_selltime` int(10) unsigned NOT NULL COMMENT '上架时间',
  `goods_specname` text NOT NULL COMMENT '规格名称序列化（下标为规格id）',
  `goods_price` decimal(10,2) NOT NULL COMMENT '商品价格',
  -- `goods_marketprice` decimal(10,2) NOT NULL COMMENT '默认价格',
  -- `goods_costprice` decimal(10,2) NOT NULL COMMENT '成本价',
  `goods_discount` float unsigned NOT NULL COMMENT '折扣',
  `goods_serial` varchar(50) NOT NULL COMMENT '商家编号',
  `goods_storage_alarm` tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
  `transport_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '运费模板',
  `transport_title` varchar(60) NOT NULL DEFAULT '' COMMENT '运费模板名称',
  `goods_commend` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否，默认为0',
  `goods_freight` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
  `goods_vat` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否开具增值税发票 1是，0否',
  `areaid_1` int(10) unsigned NOT NULL COMMENT '一级地区id',
  `areaid_2` int(10) unsigned NOT NULL COMMENT '二级地区id',
  `goods_stcids` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺分类id 首尾用,隔开',
  `plateid_top` int(10) unsigned DEFAULT NULL COMMENT '顶部关联板式',
  `plateid_bottom` int(10) unsigned DEFAULT NULL COMMENT '底部关联板式',
  `is_virtual` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为虚拟商品 1是，0否',
  `virtual_indate` int(10) unsigned DEFAULT NULL COMMENT '虚拟商品有效期',
  `virtual_limit` tinyint(3) unsigned DEFAULT NULL COMMENT '虚拟商品购买上限',
  `virtual_invalid_refund` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否允许过期退款， 1是，0否',
  `is_fcode` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
  `is_appoint` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
  `appoint_satedate` int(10) unsigned NOT NULL COMMENT '预约商品出售时间',
  `is_presell` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
  `presell_deliverdate` int(10) unsigned NOT NULL COMMENT '预售商品发货时间',
  `is_own_shop` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为平台自营',
  PRIMARY KEY (`goods_commonid`)
) ENGINE=InnoDB AUTO_INCREMENT=101440 DEFAULT CHARSET=utf8 COMMENT='商品公共内容表';

-- insert into `sun_goods_common`(`goods_commonid`,`goods_name`,`goods_jingle`,`gc_id`,`gc_id_1`,`gc_id_2`,`gc_id_3`,`gc_name`,`store_id`,`store_name`,`spec_name`,`spec_value`,`brand_id`,`brand_name`,`type_id`,`goods_image`,`goods_attr`,`goods_body`,`mobile_body`,`goods_state`,`goods_stateremark`,`goods_verify`,`goods_verifyremark`,`goods_lock`,`goods_addtime`,`goods_selltime`,`goods_specname`,`goods_price`,`goods_marketprice`,`goods_costprice`,`goods_discount`,`goods_serial`,`goods_storage_alarm`,`transport_id`,`transport_title`,`goods_commend`,`goods_freight`,`goods_vat`,`areaid_1`,`areaid_2`,`goods_stcids`,`plateid_top`,`plateid_bottom`,`is_virtual`,`virtual_indate`,`virtual_limit`,`virtual_invalid_refund`,`is_fcode`,`is_appoint`,`appoint_satedate`,`is_presell`,`presell_deliverdate`,`is_own_shop`) values
-- ('100167','延中/yanzhong  盐汽水  600ml*20瓶/箱','老品牌 更信赖 防暑运动 补充水分','2173','2142','2170','2173','劳防用品 &gt;防暑降温 &gt;盐汽水','1','尚线自营','a:3:{i:18;s:6:"规格";i:20;s:12:"重量容量";i:39;s:9:"起订数";}','a:3:{i:18;a:1:{i:433;s:9:"20瓶/箱";}i:20;a:1:{i:437;s:5:"600ml";}i:39;a:3:{i:453;s:4:"1箱";i:454;s:5:"10箱";i:455;s:6:"100箱";}}','366','延中/YANZHONG','50','1_05096331419562649.jpg','a:4:{i:224;a:2:{s:4:"name";s:9:"质保期";i:3186;s:8:"12个月";}i:221;a:2:{s:4:"name";s:6:"口味";i:3181;s:6:"普通";}i:222;a:2:{s:4:"name";s:12:"是否进口";i:3183;s:3:"否";}i:223;a:2:{s:4:"name";s:12:"功能类别";i:3184;s:6:"防暑";}}','<p class="formwork_titleleft" style="font-size:14px;font-weight:700;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">延中 盐汽水600ml*20瓶 整箱</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">商品名称：延中 盐汽水</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">配 料：水、果葡糖浆、食用盐&nbsp;</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">食品添加剂：二氧化碳、柠檬酸、甜蜜素、食用香精、苯甲酸钠&nbsp;</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">净 含 量：600ml×20&nbsp;</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">保 质 期：12个月&nbsp;</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">贮存条件：阴凉干燥通风，避免阳光直射和高温。</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <span style="font-family:Microsoft YaHei;">开启后需冷藏保存并请尽快饮用，冰凉后饮用，口味更佳</span> 
-- </p>
-- <p class="formwork_titleleft2" style="font-size:14px;color:#666666;font-family:Arial, Verdana, 宋体;background-color:#FFFFFF;">
--  <img src="http://img20.360buyimg.com/vc/jfs/t172/162/512021349/103284/59c279c4/539014a3N651566b1.jpg" alt="image" /><img src="https://img.alicdn.com/imgextra/i2/56817343/TB2d8TObXXXXXbZXXXXXXXXXXXX_!!56817343.jpg" alt="image" /><span style="line-height:1.5;"></span> 
-- </p>','','1',null,'1','','0','1456289368','0','',39.00,50.00,0.00,'78','','1','1','标准模板','1',20.00,'1','9','39','','0','0','0','0','0','0','0','0','0','0','0','0'),

DROP TABLE IF EXISTS  `sun_goods_attr_index`;
CREATE TABLE `sun_goods_attr_index` (
  `goods_id` int(10) unsigned NOT NULL COMMENT '商品id',
  `goods_commonid` int(10) unsigned NOT NULL COMMENT '商品公共表id',
  `gc_id` int(10) unsigned NOT NULL COMMENT '商品分类id',
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `attr_id` int(10) unsigned NOT NULL COMMENT '属性id',
  `attr_value_id` int(10) unsigned NOT NULL COMMENT '属性值id',
  PRIMARY KEY (`goods_id`,`gc_id`,`attr_value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品与属性对应表';

-- insert into `sun_goods_attr_index`(`goods_id`,`goods_commonid`,`gc_id`,`type_id`,`attr_id`,`attr_value_id`) values
-- ('100091','100167','2173','50','221','3181'),


DROP TABLE IF EXISTS  `sun_goods_browse`;
CREATE TABLE `sun_goods_browse` (
  `goods_id` int(11) NOT NULL COMMENT '商品ID',
  `member_id` int(11) NOT NULL COMMENT '会员ID',
  `browsetime` int(11) NOT NULL COMMENT '浏览时间',
  `gc_id` int(11) NOT NULL COMMENT '商品分类',
  `gc_id_1` int(11) NOT NULL COMMENT '商品一级分类',
  `gc_id_2` int(11) NOT NULL COMMENT '商品二级分类',
  `gc_id_3` int(11) NOT NULL COMMENT '商品三级分类',
  PRIMARY KEY (`goods_id`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品浏览历史表';

-- insert into `sun_goods_browse`(`goods_id`,`member_id`,`browsetime`,`gc_id`,`gc_id_1`,`gc_id_2`,`gc_id_3`) values
-- ('100091','66','1460002443','2173','2142','2170','2173'),


DROP TABLE IF EXISTS  `sun_goods_class`;
CREATE TABLE `sun_goods_class` (
  `gc_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `gc_name` varchar(100) NOT NULL COMMENT '分类名称',
  -- `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `type_name` varchar(100) NOT NULL COMMENT '类型名称',
  `gc_parent_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `commis_rate` float unsigned NOT NULL DEFAULT '0' COMMENT '佣金比例',
  `gc_sort` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `gc_virtual` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否允许发布虚拟商品，1是，0否',
  `gc_title` varchar(200) NOT NULL COMMENT '名称',
  `gc_keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键词',
  `gc_description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  PRIMARY KEY (`gc_id`),
  KEY `store_id` (`gc_parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2458 DEFAULT CHARSET=utf8 COMMENT='商品分类表';

-- insert into `sun_goods_class`(`gc_id`,`gc_name`,`type_id`,`type_name`,`gc_parent_id`,`commis_rate`,`gc_sort`,`gc_virtual`,`gc_title`,`gc_keywords`,`gc_description`) values
-- ('1466','工程物资','40','通用','0','0','2','0','','',''),


DROP TABLE IF EXISTS  `sun_goods_class_staple`;
CREATE TABLE `sun_goods_class_staple` (
  `staple_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '常用分类id',
  `staple_name` varchar(255) NOT NULL COMMENT '常用分类名称',
  `gc_id_1` int(10) unsigned NOT NULL COMMENT '一级分类id',
  `gc_id_2` int(10) unsigned NOT NULL COMMENT '二级商品分类',
  `gc_id_3` int(10) unsigned NOT NULL COMMENT '三级商品分类',
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `member_id` int(10) unsigned NOT NULL COMMENT '会员id',
  `counter` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '计数器',
  PRIMARY KEY (`staple_id`),
  KEY `store_id` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=346 DEFAULT CHARSET=utf8 COMMENT='店铺常用分类表';

-- insert into `sun_goods_class_staple`(`staple_id`,`staple_name`,`gc_id_1`,`gc_id_2`,`gc_id_3`,`type_id`,`member_id`,`counter`) values
-- ('5','劳防用品 >防暑降温 >盐汽水','2142','2170','2173','40','1','5'),
-- ('6','办公物资 >办公用纸 >复印纸','2246','2247','2248','41','1','38'),


DROP TABLE IF EXISTS  `sun_goods_class_tag`;
CREATE TABLE `sun_goods_class_tag` (
  `gc_tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'TAGid',
  `gc_id_1` int(10) unsigned NOT NULL COMMENT '一级分类id',
  `gc_id_2` int(10) unsigned NOT NULL COMMENT '二级分类id',
  `gc_id_3` int(10) unsigned NOT NULL COMMENT '三级分类id',
  `gc_tag_name` varchar(255) NOT NULL COMMENT '分类TAG名称',
  `gc_tag_value` text NOT NULL COMMENT '分类TAG值',
  `gc_id` int(10) unsigned NOT NULL COMMENT '商品分类id',
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  PRIMARY KEY (`gc_tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=900 DEFAULT CHARSET=utf8 COMMENT='商品分类TAG表';


DROP TABLE IF EXISTS  `sun_goods_images`;
CREATE TABLE `sun_goods_images` (
  `goods_image_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品图片id',
  `goods_commonid` int(10) unsigned NOT NULL COMMENT '商品公共内容id',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
    `color_id` int(10) unsigned NOT NULL COMMENT '颜色规格值id',
  `goods_image` varchar(1000) NOT NULL COMMENT '商品图片',
  `goods_image_sort` tinyint(3) unsigned NOT NULL COMMENT '排序',
  `is_default` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '默认主题，1是，0否',
  PRIMARY KEY (`goods_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5862 DEFAULT CHARSET=utf8 COMMENT='商品图片';

-- insert into `sun_goods_images`(`goods_image_id`,`goods_commonid`,`store_id`,`color_id`,`goods_image`,`goods_image_sort`,`is_default`) values
-- ('1201','100169','1','0','1_05096540531399322.jpg','0','1'),



DROP TABLE IF EXISTS  `sun_group`;
CREATE TABLE `sun_group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(64) NOT NULL COMMENT '名称',
  `group_logo` varchar(45) DEFAULT NULL COMMENT '企业logo',
  `group_type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '组类型，0：企业 1: 店铺 2: 工作室 3: 团队 4:政府机构 5:非公益组织 6: 一般群组 ',
  `group_desc` varchar(500) NOT NULL DEFAULT '' COMMENT '简介',
  `group_tel` varchar(25) NOT NULL COMMENT '座机',
  `group_memberCount` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '成员数量',
  `group_parent` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级群组',
  `group_address` varchar(200) DEFAULT '' COMMENT '地址',
  `group_email` varchar(45) DEFAULT NULL COMMENT 'email',
  `group_ownerId` int(11) DEFAULT NULL COMMENT '负责人， 对应userid',
  `group_ownerName` varchar(45) DEFAULT NULL COMMENT '负责人名字',
  `group_levels` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '级别',
  `group_ctime` int(10) unsigned NOT NULL COMMENT '创建时间',
  `group_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '组状态：1-正常\n2-删除',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COMMENT='群组\n根据类型可以是公司，机构，团队等';

-- insert into `sun_group`(`group_id`,`group_name`,`group_logo`,`group_type`,`group_desc`,`group_tel`,`group_memberCount`,`group_parent`,`group_address`,`group_email`,`group_ownerId`,`group_ownerName`,`group_levels`,`group_ctime`,`group_state`) values
-- ('1','尚线电子商务',null,'0','尚线电子商务','13800000000','0','0','上海市111','hainiu@hainiu.com','1','hinew','1','1457940712','2'),


DROP TABLE IF EXISTS  `sun_group_information`;
CREATE TABLE `sun_group_information` (
  `information_group_id` int(10) unsigned NOT NULL,
  `information_licenseNumber` varchar(45) DEFAULT NULL COMMENT '营业执照注册号',
  `information_licenseImage` varchar(255) DEFAULT NULL COMMENT '营业执照图片地址',
  `information_organizationCode` varchar(45) DEFAULT NULL COMMENT '组织机构代码',
  `information_organizationImage` varchar(255) DEFAULT NULL COMMENT '组织机构证图片地址',
  `information_taxId` varchar(45) DEFAULT NULL COMMENT '税务号',
  `information_taxImage` varchar(45) DEFAULT NULL COMMENT '税务证图片地址',
  `information_createDate` int(11) DEFAULT NULL COMMENT '注册日期',
  `information_licenseStart` int(11) DEFAULT NULL COMMENT '营业执照有效期开始',
  `information_licenseEnd` int(11) DEFAULT NULL COMMENT '营业执照有效期结束',
  `information_manageScope` varchar(1000) DEFAULT NULL COMMENT '经营范围',
  `information_registerCapital` int(11) DEFAULT NULL COMMENT '注册资本',
  `information_brandAgent` varchar(128) DEFAULT NULL COMMENT '代理品牌，如多个品牌，以逗号隔开',
  `information_brandAgentNode` varchar(255) DEFAULT NULL COMMENT '品牌代理授权书图片地址，如多个品牌，以逗号隔开',
  `information_afterSaleAdress` varchar(45) DEFAULT NULL COMMENT '售后地址',
  `information_fax` varchar(45) DEFAULT NULL COMMENT '传真',
  UNIQUE KEY `group_information_group_id_UNIQUE` (`information_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组信息';




DROP TABLE IF EXISTS  `sun_invoice`;
CREATE TABLE `sun_invoice` (
  `inv_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '索引id',
  `member_id` int(10) unsigned NOT NULL COMMENT '会员ID',
  `inv_state` enum('1','2') DEFAULT NULL COMMENT '1普通发票2增值税发票',
  `inv_title` varchar(50) DEFAULT '' COMMENT '发票抬头[普通发票]',
  `inv_content` varchar(10) DEFAULT '' COMMENT '发票内容[普通发票]',
  `inv_company` varchar(50) DEFAULT '' COMMENT '单位名称',
  `inv_code` varchar(50) DEFAULT '' COMMENT '纳税人识别号',
  `inv_reg_addr` varchar(50) DEFAULT '' COMMENT '注册地址',
  `inv_reg_phone` varchar(30) DEFAULT '' COMMENT '注册电话',
  `inv_reg_bname` varchar(30) DEFAULT '' COMMENT '开户银行',
  `inv_reg_baccount` varchar(30) DEFAULT '' COMMENT '银行帐户',
  `inv_rec_name` varchar(20) DEFAULT '' COMMENT '收票人姓名',
  `inv_rec_mobphone` varchar(15) DEFAULT '' COMMENT '收票人手机号',
  `inv_rec_province` varchar(30) DEFAULT '' COMMENT '收票人省份',
  `inv_goto_addr` varchar(50) DEFAULT '' COMMENT '送票地址',
  PRIMARY KEY (`inv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='买家发票信息表';

-- insert into `sun_invoice`(`inv_id`,`member_id`,`inv_state`,`inv_title`,`inv_content`,`inv_company`,`inv_code`,`inv_reg_addr`,`inv_reg_phone`,`inv_reg_bname`,`inv_reg_baccount`,`inv_rec_name`,`inv_rec_mobphone`,`inv_rec_province`,`inv_goto_addr`) values
-- ('1','60','1','上海明华物业管理有限公司','明细','','','','','','','','','',''),


DROP TABLE IF EXISTS  `sun_member`;
CREATE TABLE `sun_member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '会员id',
  `member_name` varchar(50) NOT NULL COMMENT '会员名称',
  `member_truename` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `member_avatar` varchar(50) DEFAULT NULL COMMENT '会员头像',
  `member_sex` tinyint(1) DEFAULT NULL COMMENT '会员性别',
  `member_birthday` date DEFAULT NULL COMMENT '生日',
  `member_passwd` varchar(32) NOT NULL COMMENT '会员密码',
  `member_paypwd` char(32) DEFAULT NULL COMMENT '支付密码',
  `member_email` varchar(100) NOT NULL COMMENT '会员邮箱',
  `member_email_bind` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0未绑定1已绑定',
  `member_mobile` varchar(11) DEFAULT NULL COMMENT '手机号',
  `member_mobile_bind` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0未绑定1已绑定',
  `member_qq` varchar(100) DEFAULT NULL COMMENT 'qq',
  `member_ww` varchar(100) DEFAULT NULL COMMENT '阿里旺旺',
  `member_login_num` int(11) NOT NULL DEFAULT '1' COMMENT '登录次数',
  `member_time` varchar(10) NOT NULL COMMENT '会员注册时间',
  `member_login_time` varchar(10) NOT NULL COMMENT '当前登录时间',
  `member_old_login_time` varchar(10) NOT NULL COMMENT '上次登录时间',
  `member_login_ip` varchar(20) DEFAULT NULL COMMENT '当前登录ip',
  `member_old_login_ip` varchar(20) DEFAULT NULL COMMENT '上次登录ip',
  `member_qqopenid` varchar(100) DEFAULT NULL COMMENT 'qq互联id',
  `member_qqinfo` text COMMENT 'qq账号相关信息',
  `member_sinaopenid` varchar(100) DEFAULT NULL COMMENT '新浪微博登录id',
  `member_sinainfo` text COMMENT '新浪账号相关信息序列化值',
  `member_points` int(11) NOT NULL DEFAULT '0' COMMENT '会员积分',
  `available_predeposit` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '预存款可用金额',
  `freeze_predeposit` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '预存款冻结金额',
  `available_rc_balance` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '可用充值卡余额',
  `freeze_rc_balance` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '冻结充值卡余额',
  `inform_allow` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否允许举报(1可以/2不可以)',
  `is_buy` tinyint(1) NOT NULL DEFAULT '1' COMMENT '会员是否有购买权限 1为开启 0为关闭',
  `is_allowtalk` tinyint(1) NOT NULL DEFAULT '1' COMMENT '会员是否有咨询和发送站内信的权限 1为开启 0为关闭',
  `member_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '会员的开启状态 1为开启 0为关闭',
  `member_snsvisitnum` int(11) NOT NULL DEFAULT '0' COMMENT 'sns空间访问次数',
  `member_areaid` int(11) DEFAULT NULL COMMENT '地区ID',
  `member_cityid` int(11) DEFAULT NULL COMMENT '城市ID',
  `member_provinceid` int(11) DEFAULT NULL COMMENT '省份ID',
  `member_areainfo` varchar(255) DEFAULT NULL COMMENT '地区内容',
  `member_privacy` text COMMENT '隐私设定',
  `member_quicklink` varchar(255) DEFAULT NULL COMMENT '会员常用操作',
  `member_exppoints` int(11) NOT NULL DEFAULT '0' COMMENT '会员经验值',
  `inviter_id` int(11) DEFAULT NULL COMMENT '邀请人ID',
  `member_admin_add` tinyint(1) NOT NULL DEFAULT '1' COMMENT '后台新增：1-否\n2-是',
  PRIMARY KEY (`member_id`),
  KEY `member_name` (`member_name`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 COMMENT='会员表';


-- insert into `sun_member`(`member_id`,`member_name`,`member_truename`,`member_avatar`,`member_sex`,`member_birthday`,`member_passwd`,`member_paypwd`,`member_email`,`member_email_bind`,`member_mobile`,`member_mobile_bind`,`member_qq`,`member_ww`,`member_login_num`,`member_time`,`member_login_time`,`member_old_login_time`,`member_login_ip`,`member_old_login_ip`,`member_qqopenid`,`member_qqinfo`,`member_sinaopenid`,`member_sinainfo`,`member_points`,`available_predeposit`,`freeze_predeposit`,`available_rc_balance`,`freeze_rc_balance`,`inform_allow`,`is_buy`,`is_allowtalk`,`member_state`,`member_snsvisitnum`,`member_areaid`,`member_cityid`,`member_provinceid`,`member_areainfo`,`member_privacy`,`member_quicklink`,`member_exppoints`,`inviter_id`,`member_admin_add`) values
-- ('1','hinew','尚线（上海）电子商务有限公司',null,'1',null,'96e79218965eb72c92a549dd5a330112',null,'seller@qq.com','0','13801058805','1','','','69','1434389719','1459873260','1459850124','223.167.21.35','223.167.21.35',null,null,null,null,'720',0.00,0.00,0.00,0.00,'1','1','1','1','0','143','9','2','上海	上海市	黄浦区','a:7:{s:5:"email";s:1:"0";s:8:"truename";s:1:"0";s:3:"sex";s:1:"0";s:8:"birthday";s:1:"2";s:4:"area";s:1:"2";s:2:"qq";s:1:"0";s:2:"ww";s:1:"0";}',null,'120',null,'1'),


DROP TABLE IF EXISTS  `sun_member_common`;
CREATE TABLE `sun_member_common` (
  `member_id` int(11) NOT NULL COMMENT '会员ID',
  `auth_code` char(6) DEFAULT NULL COMMENT '短信/邮件验证码',
  `send_acode_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '短信/邮件验证码发送时间',
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员扩展表';

-- insert into `sun_member_common`(`member_id`,`auth_code`,`send_acode_time`) values
-- ('2',null,'0'),

DROP TABLE IF EXISTS  `sun_member_ext`;
CREATE TABLE `sun_member_ext` (
  `member_userId` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `member_groupId` bigint(20) unsigned NOT NULL COMMENT '组id',
  `member_type` varchar(64) NOT NULL DEFAULT '0' COMMENT '角色id，0可创建分公司，添加成员，设定审批流程，1为审批人员，2为普通成员',
  `member_status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `member_levels` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '级别',
  `approve_levels` tinyint(6) unsigned DEFAULT NULL COMMENT '审批级别',
  `approve_order` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单审批额度',
  `approve_month` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '月审批额度',
  `approve_months` decimal(10,2) NOT NULL COMMENT '月剩余审批额度',
  `approve_year` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '年审批额度',
  `approve_years` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '年剩余审批额度',
  `member_ctime` varchar(45) DEFAULT NULL,
  UNIQUE KEY `user_id_UNIQUE` (`member_userId`),
  KEY `group_id_UNIQUE` (`member_groupId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- insert into `sun_member_ext`(`member_userId`,`member_groupId`,`member_type`,`member_status`,`member_levels`,`approve_levels`,`approve_order`,`approve_month`,`approve_months`,`approve_year`,`approve_years`,`member_ctime`) values
-- ('0','1','1','0','0','2',50000.00,800000.00,800000.00,80000000.00,80000000.00,'1457941064'),


DROP TABLE IF EXISTS  `sun_member_msg_setting`;
CREATE TABLE `sun_member_msg_setting` (
  `mmt_code` varchar(50) NOT NULL COMMENT '用户消息模板编号',
  `member_id` int(10) unsigned NOT NULL COMMENT '会员id',
  `is_receive` tinyint(3) unsigned NOT NULL COMMENT '是否接收 1是，0否',
  PRIMARY KEY (`mmt_code`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户消息接收设置表';

DROP TABLE IF EXISTS  `sun_member_msg_tpl`;
CREATE TABLE `sun_member_msg_tpl` (
  `mmt_code` varchar(50) NOT NULL COMMENT '用户消息模板编号',
  `mmt_name` varchar(50) NOT NULL COMMENT '模板名称',
  `mmt_message_switch` tinyint(3) unsigned NOT NULL COMMENT '站内信接收开关',
  `mmt_message_content` varchar(255) NOT NULL COMMENT '站内信消息内容',
  `mmt_short_switch` tinyint(3) unsigned NOT NULL COMMENT '短信接收开关',
  `mmt_short_content` varchar(255) NOT NULL COMMENT '短信接收内容',
  `mmt_mail_switch` tinyint(3) unsigned NOT NULL COMMENT '邮件接收开关',
  `mmt_mail_subject` varchar(255) NOT NULL COMMENT '邮件标题',
  `mmt_mail_content` text NOT NULL COMMENT '邮件内容',
  PRIMARY KEY (`mmt_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户消息模板';

-- insert into `sun_member_msg_tpl`(`mmt_code`,`mmt_name`,`mmt_message_switch`,`mmt_message_content`,`mmt_short_switch`,`mmt_short_content`,`mmt_mail_switch`,`mmt_mail_subject`,`mmt_mail_content`) values
-- ('arrival_notice','到货通知提醒','1','您关注的商品 “{$goods_name}” 已经到货。<a href="{$goods_url}" target="_blank">点击查看商品</a>','0','【{$site_name}】您关注的商品 “{$goods_name}” 已经到货。','0','{$site_name}提醒：您关注的商品  “{$goods_name}” 已经到货。','<p>
-- 	{$site_name}提醒：
-- </p>
-- <p>
-- 	您关注的商品 “{$goods_name}” 已经到货。
-- </p>
-- <p>
-- 	<a href="{$goods_url}" target="_blank">点击查看商品</a> 
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p style="text-align:right;">
-- 	{$site_name}
-- </p>
-- <p style="text-align:right;">
-- 	{$mail_send_time}
-- </p>'),


DROP TABLE IF EXISTS  `sun_message`;
CREATE TABLE `sun_message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '短消息索引id',
  `message_parent_id` int(11) NOT NULL COMMENT '回复短消息message_id',
  `from_member_id` int(11) NOT NULL COMMENT '短消息发送人',
  `to_member_id` varchar(1000) NOT NULL COMMENT '短消息接收人',
  `message_title` varchar(50) DEFAULT NULL COMMENT '短消息标题',
  `message_body` varchar(255) NOT NULL COMMENT '短消息内容',
  `message_time` varchar(10) NOT NULL COMMENT '短消息发送时间',
  `message_update_time` varchar(10) DEFAULT NULL COMMENT '短消息回复更新时间',
  `message_open` tinyint(1) NOT NULL DEFAULT '0' COMMENT '短消息打开状态',
  `message_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '短消息状态，0为正常状态，1为发送人删除状态，2为接收人删除状态',
  `message_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0为私信、1为系统消息、2为留言',
  `read_member_id` varchar(1000) DEFAULT NULL COMMENT '已经读过该消息的会员id',
  `del_member_id` varchar(1000) DEFAULT NULL COMMENT '已经删除该消息的会员id',
  `message_ismore` tinyint(1) NOT NULL DEFAULT '0' COMMENT '站内信是否为一条发给多个用户 0为否 1为多条 ',
  `from_member_name` varchar(100) DEFAULT NULL COMMENT '发信息人用户名',
  `to_member_name` varchar(100) DEFAULT NULL COMMENT '接收人用户名',
  PRIMARY KEY (`message_id`),
  KEY `from_member_id` (`from_member_id`),
  KEY `to_member_id` (`to_member_id`(255)),
  KEY `message_ismore` (`message_ismore`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COMMENT='短消息';

-- insert into `sun_message`(`message_id`,`message_parent_id`,`from_member_id`,`to_member_id`,`message_title`,`message_body`,`message_time`,`message_update_time`,`message_open`,`message_state`,`message_type`,`read_member_id`,`del_member_id`,`message_ismore`,`from_member_name`,`to_member_name`) values
-- ('1','0','0','2',null,'您的订单已经出库。<a href="http://sunlinked.cn/shop/index.php?act=member_order&op=show_order&order_id=2" target="_blank">点击查看订单</a>','1456033461','1456033461','0','0','1','','','0','',''),



DROP TABLE IF EXISTS  `sun_offpay_area`;
CREATE TABLE `sun_offpay_area` (
  `store_id` int(8) unsigned NOT NULL COMMENT '商家ID',
  `area_id` text COMMENT '县ID组合',
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='货到付款支持地区表';


DROP TABLE IF EXISTS  `sun_order`;
CREATE TABLE `sun_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单索引id',
  `order_sn` bigint(20) unsigned NOT NULL COMMENT '订单编号',
  `pay_sn` bigint(20) unsigned NOT NULL COMMENT '支付单号',
  `store_id` int(11) unsigned NOT NULL COMMENT '卖家店铺id',
  `store_name` varchar(50) NOT NULL COMMENT '卖家店铺名称',
  `buyer_id` int(11) unsigned NOT NULL COMMENT '买家id',
  `buyer_name` varchar(50) NOT NULL COMMENT '买家姓名',
  `buyer_email` varchar(80) NOT NULL COMMENT '买家电子邮箱',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '订单生成时间',
  `payment_code` char(10) NOT NULL DEFAULT '' COMMENT '支付方式名称代码,',
  `payment_time` int(10) unsigned DEFAULT '0' COMMENT '支付(付款)时间',
  `finnshed_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '订单完成时间',
  `goods_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '商品总价格',
  `order_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单总价格',
  `rcb_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '充值卡支付金额',
  `pd_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '预存款支付金额',
  `shipping_fee` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '运费',
  `evaluation_state` tinyint(4) DEFAULT '0' COMMENT '评价状态 0未评价，1已评价，2已过期未评价',
  `order_state` tinyint(4) NOT NULL DEFAULT '10' COMMENT '订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;',
  `refund_state` tinyint(1) unsigned DEFAULT '0' COMMENT '退款状态:0是无退款,1是部分退款,2是全部退款',
  `lock_state` tinyint(3) unsigned DEFAULT '0' COMMENT '锁定状态:0是正常,大于0是锁定,默认是0',
  `delete_state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除状态0未删除1放入回收站2彻底删除',
  `refund_amount` decimal(10,2) DEFAULT '0.00' COMMENT '退款金额',
  `delay_time` int(10) unsigned DEFAULT '0' COMMENT '延迟时间,默认为0',
  `order_from` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1WEB2mobile',
  `shipping_code` varchar(50) DEFAULT '' COMMENT '物流单号',
  `group_id` int(11) DEFAULT NULL COMMENT '公司ID',
  `group_name` varchar(64) DEFAULT NULL COMMENT '公司名',
  `approve_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '审批状态：0-待审批；1-审批完成',
  `approver_id` int(11) DEFAULT NULL COMMENT '最终审批人id',
  `approver_name` varchar(50) DEFAULT NULL COMMENT '最终审批人name',
  `approve_reason` varchar(400) DEFAULT NULL COMMENT '不通过原因',
  `approve_time` int(11) DEFAULT NULL COMMENT '审批时间',
  `emergency_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否应急：\n0-非应急\n1-应急',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8 COMMENT='订单表';

-- insert into `sun_order`(`order_id`,`order_sn`,`pay_sn`,`store_id`,`store_name`,`buyer_id`,`buyer_name`,`buyer_email`,`add_time`,`payment_code`,`payment_time`,`finnshed_time`,`goods_amount`,`order_amount`,`rcb_amount`,`pd_amount`,`shipping_fee`,`evaluation_state`,`order_state`,`refund_state`,`lock_state`,`delete_state`,`refund_amount`,`delay_time`,`order_from`,`shipping_code`,`group_id`,`group_name`,`approve_state`,`approver_id`,`approver_name`,`approve_reason`,`approve_time`,`emergency_state`) values
-- ('1','8000000000000101','450509377038154002','1','尚线','2','kenn1','kenn@1232.com','1456033038','online','0','0',5000.00,5000.00,0.00,0.00,0.00,'0','0','0','0','0',0.00,'0','1','',null,null,'0',null,null,null,null,'0'),


DROP TABLE IF EXISTS  `sun_order_bill`;
CREATE TABLE `sun_order_bill` (
  `ob_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '结算单编号(年月店铺ID)',
  `ob_start_date` int(11) NOT NULL COMMENT '开始日期',
  `ob_end_date` int(11) NOT NULL COMMENT '结束日期',
  `ob_order_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单金额',
  `ob_shipping_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '运费',
  `ob_order_return_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '退单金额',
  `ob_commis_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '佣金金额',
  `ob_commis_return_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '退还佣金',
  `ob_store_cost_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '店铺促销活动费用',
  `ob_result_totals` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '应结金额',
  `ob_create_date` int(11) DEFAULT '0' COMMENT '生成结算单日期',
  `os_month` mediumint(6) unsigned NOT NULL COMMENT '结算单年月份',
  `ob_state` enum('1','2','3','4') DEFAULT '1' COMMENT '1默认2店家已确认3平台已审核4结算完成',
  `ob_pay_date` int(11) DEFAULT '0' COMMENT '付款日期',
  `ob_pay_content` varchar(200) DEFAULT '' COMMENT '支付备注',
  `ob_store_id` int(11) NOT NULL COMMENT '店铺ID',
  `ob_store_name` varchar(50) DEFAULT NULL COMMENT '店铺名',
  PRIMARY KEY (`ob_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='结算表';


DROP TABLE IF EXISTS  `sun_order_common`;
CREATE TABLE `sun_order_common` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单索引id',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺ID',
  `shipping_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配送时间',
  `shipping_express_id` tinyint(1) NOT NULL DEFAULT '0' COMMENT '配送公司ID',
  `evaluation_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评价时间',
  `evalseller_state` enum('0','1') NOT NULL DEFAULT '0' COMMENT '卖家是否已评价买家',
  `evalseller_time` int(10) unsigned NOT NULL COMMENT '卖家评价买家的时间',
  `order_message` varchar(300) DEFAULT NULL COMMENT '订单留言',
  `order_pointscount` int(11) NOT NULL DEFAULT '0' COMMENT '订单赠送积分',
  `voucher_price` int(11) DEFAULT NULL COMMENT '代金券面额',
  `voucher_code` varchar(32) DEFAULT NULL COMMENT '代金券编码',
  `deliver_explain` text COMMENT '发货备注',
  `daddress_id` mediumint(9) NOT NULL DEFAULT '0' COMMENT '发货地址ID',
  `reciver_name` varchar(50) NOT NULL COMMENT '收货人姓名',
  `reciver_info` varchar(500) NOT NULL COMMENT '收货人其它信息',
  `reciver_province_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '收货人省级ID',
  `reciver_city_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '收货人市级ID',
  `invoice_info` varchar(500) DEFAULT '' COMMENT '发票信息',
  `promotion_info` varchar(500) DEFAULT '' COMMENT '促销信息备注',
  `dlyo_pickup_code` varchar(4) DEFAULT NULL COMMENT '提货码',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8 COMMENT='订单信息扩展表';


-- insert into `sun_order_common`(`order_id`,`store_id`,`shipping_time`,`shipping_express_id`,`evaluation_time`,`evalseller_state`,`evalseller_time`,`order_message`,`order_pointscount`,`voucher_price`,`voucher_code`,`deliver_explain`,`daddress_id`,`reciver_name`,`reciver_info`,`reciver_province_id`,`reciver_city_id`,`invoice_info`,`promotion_info`,`dlyo_pickup_code`) values
-- ('1','1','0','0','0','0','0','','0',null,null,null,'0','33323','a:6:{s:5:"phone";s:11:"32323232323";s:9:"mob_phone";s:11:"32323232323";s:9:"tel_phone";s:0:"";s:7:"address";s:38:"河北省	唐山市	丰南区 32323323";s:4:"area";s:29:"河北省	唐山市	丰南区";s:6:"street";s:8:"32323323";}','0','74','a:0:{}','',null),


DROP TABLE IF EXISTS  `sun_order_goods`;
CREATE TABLE `sun_order_goods` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单商品表索引id',
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `goods_id` int(11) NOT NULL COMMENT '商品id',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `goods_price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `goods_num` smallint(5) unsigned NOT NULL DEFAULT '1' COMMENT '商品数量',
  `goods_image` varchar(100) DEFAULT NULL COMMENT '商品图片',
  `goods_pay_price` decimal(10,2) unsigned NOT NULL COMMENT '商品实际成交价',
  `store_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺ID',
  `buyer_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '买家ID',
  `goods_type` enum('1','2','3','4','5') NOT NULL DEFAULT '1' COMMENT '1默认2团购商品3限时折扣商品4组合套装5赠品',
  `promotions_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '促销活动ID（团购ID/限时折扣ID/优惠套装ID）与goods_type搭配使用',
  `commis_rate` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '佣金比例',
  `gc_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '商品最底级分类ID',
  PRIMARY KEY (`rec_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=635 DEFAULT CHARSET=utf8 COMMENT='订单商品表';

-- insert into `sun_order_goods`(`rec_id`,`order_id`,`goods_id`,`goods_name`,`goods_price`,`goods_num`,`goods_image`,`goods_pay_price`,`store_id`,`buyer_id`,`goods_type`,`promotions_id`,`commis_rate`,`gc_id`) values
-- ('1','1','100078','apple',5000.00,'1','1_05093511340534433.jpg',5000.00,'1','2','1','0','0','1057'),


DROP TABLE IF EXISTS  `sun_order_log`;
CREATE TABLE `sun_order_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `log_msg` varchar(150) DEFAULT '' COMMENT '文字描述',
  `log_time` int(10) unsigned NOT NULL COMMENT '处理时间',
  `log_role` char(2) NOT NULL COMMENT '操作角色',
  `log_user` varchar(30) DEFAULT '' COMMENT '操作人',
  `log_orderstate` enum('0','10','20','30','40') DEFAULT NULL COMMENT '订单状态：0(已取消)10:未付款;20:已付款;30:已发货;40:已收货;',
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8 COMMENT='订单处理历史表';

-- insert into `sun_order_log`(`log_id`,`order_id`,`log_msg`,`log_time`,`log_role`,`log_user`,`log_orderstate`) values
-- ('1','1','取消了订单','1456033082','买家','kenn1','0'),



DROP TABLE IF EXISTS  `sun_payment`;
CREATE TABLE `sun_payment` (
  `payment_id` tinyint(1) unsigned NOT NULL COMMENT '支付索引id',
  `payment_code` char(10) NOT NULL COMMENT '支付代码名称',
  `payment_name` char(10) NOT NULL COMMENT '支付名称',
  `payment_config` text COMMENT '支付接口配置信息',
  `payment_state` enum('0','1') NOT NULL DEFAULT '0' COMMENT '接口状态0禁用1启用',
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='支付方式表';

-- insert into `sun_payment`(`payment_id`,`payment_code`,`payment_name`,`payment_config`,`payment_state`) values
-- ('1','offline','货到付款','a:1:{s:0:"";s:0:"";}','1'),


DROP TABLE IF EXISTS  `sun_refund_reason`;
CREATE TABLE `sun_refund_reason` (
  `reason_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '原因ID',
  `reason_info` varchar(50) NOT NULL COMMENT '原因内容',
  `sort` tinyint(1) unsigned DEFAULT '255' COMMENT '排序',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='退款退货原因表';

-- insert into `sun_refund_reason`(`reason_id`,`reason_info`,`sort`,`update_time`) values
-- ('95','效果不好不喜欢','123','1393480261'),
-- ('96','商品破损、有污渍','123','1393480261'),
-- ('97','保质期不符','123','1393480261'),
-- ('98','认为是假货','123','1393480261'),
-- ('99','不能按时发货','123','1393480261');


DROP TABLE IF EXISTS  `sun_refund_return`;
CREATE TABLE `sun_refund_return` (
  `refund_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `order_id` int(10) unsigned NOT NULL COMMENT '订单ID',
  `order_sn` varchar(50) NOT NULL COMMENT '订单编号',
  `refund_sn` varchar(50) NOT NULL COMMENT '申请编号',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺ID',
  `store_name` varchar(20) NOT NULL COMMENT '店铺名称',
  `buyer_id` int(10) unsigned NOT NULL COMMENT '买家ID',
  `buyer_name` varchar(50) NOT NULL COMMENT '买家会员名',
  `goods_id` int(10) unsigned NOT NULL COMMENT '商品ID,全部退款是0',
  `order_goods_id` int(10) unsigned DEFAULT '0' COMMENT '订单商品ID,全部退款是0',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `goods_num` int(10) unsigned DEFAULT '1' COMMENT '商品数量',
  `refund_amount` decimal(10,2) DEFAULT '0.00' COMMENT '退款金额',
  `goods_image` varchar(100) DEFAULT NULL COMMENT '商品图片',
  `order_goods_type` tinyint(1) unsigned DEFAULT '1' COMMENT '订单商品类型:1默认2团购商品3限时折扣商品4组合套装',
  `refund_type` tinyint(1) unsigned DEFAULT '1' COMMENT '申请类型:1为退款,2为退货,默认为1',
  `seller_state` tinyint(1) unsigned DEFAULT '1' COMMENT '卖家处理状态:1为待审核,2为同意,3为不同意,默认为1',
  `refund_state` tinyint(1) unsigned DEFAULT '1' COMMENT '申请状态:1为处理中,2为待管理员处理,3为已完成,默认为1',
  `return_type` tinyint(1) unsigned DEFAULT '1' COMMENT '退货类型:1为不用退货,2为需要退货,默认为1',
  `order_lock` tinyint(1) unsigned DEFAULT '1' COMMENT '订单锁定类型:1为不用锁定,2为需要锁定,默认为1',
  `goods_state` tinyint(1) unsigned DEFAULT '1' COMMENT '物流状态:1为待发货,2为待收货,3为未收到,4为已收货,默认为1',
  `add_time` int(10) unsigned NOT NULL COMMENT '添加时间',
  `seller_time` int(10) unsigned DEFAULT '0' COMMENT '卖家处理时间',
  `admin_time` int(10) unsigned DEFAULT '0' COMMENT '管理员处理时间,默认为0',
  `reason_id` int(10) unsigned DEFAULT '0' COMMENT '原因ID:0为其它',
  `reason_info` varchar(300) DEFAULT '' COMMENT '原因内容',
  `pic_info` varchar(300) DEFAULT '' COMMENT '图片',
  `buyer_message` varchar(300) DEFAULT NULL COMMENT '申请原因',
  `seller_message` varchar(300) DEFAULT NULL COMMENT '卖家备注',
  `admin_message` varchar(300) DEFAULT NULL COMMENT '管理员备注',
  `express_id` tinyint(1) unsigned DEFAULT '0' COMMENT '物流公司编号',
  `invoice_no` varchar(50) DEFAULT NULL COMMENT '物流单号',
  `ship_time` int(10) unsigned DEFAULT '0' COMMENT '发货时间,默认为0',
  `delay_time` int(10) unsigned DEFAULT '0' COMMENT '收货延迟时间,默认为0',
  `receive_time` int(10) unsigned DEFAULT '0' COMMENT '收货时间,默认为0',
  `receive_message` varchar(300) DEFAULT NULL COMMENT '收货备注',
  `commis_rate` smallint(6) DEFAULT '0' COMMENT '佣金比例',
  PRIMARY KEY (`refund_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='退款退货表';


DROP TABLE IF EXISTS  `sun_seller`;
CREATE TABLE `sun_seller` (
  `seller_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '卖家编号',
  `seller_name` varchar(50) NOT NULL COMMENT '卖家用户名',
  `member_id` int(10) unsigned NOT NULL COMMENT '用户编号',
  `seller_group_id` int(10) unsigned NOT NULL COMMENT '卖家组编号',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺编号',
  `is_admin` tinyint(3) unsigned NOT NULL COMMENT '是否管理员(0-不是 1-是)',
  `seller_quicklink` varchar(255) DEFAULT NULL COMMENT '卖家快捷操作',
  `last_login_time` int(10) unsigned DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='卖家用户表';

-- insert into `sun_seller`(`seller_id`,`seller_name`,`member_id`,`seller_group_id`,`store_id`,`is_admin`,`seller_quicklink`,`last_login_time`) values
-- ('1','hinew2016','1','0','1','1','store_goods_add,taobao_import','1459928060'),


DROP TABLE IF EXISTS  `sun_seller_group`;
CREATE TABLE `sun_seller_group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '卖家组编号',
  `group_name` varchar(50) NOT NULL COMMENT '组名',
  `limits` text NOT NULL COMMENT '权限',
  `smt_limits` text NOT NULL COMMENT '消息权限范围',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺编号',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='卖家用户组表';

-- insert into `sun_seller_group`(`group_id`,`group_name`,`limits`,`smt_limits`,`store_id`) values
-- ('1','商品管理','store_goods_add,taobao_import,store_goods_online,store_goods_offline,store_plate,store_spec,store_album','','9');


DROP TABLE IF EXISTS  `sun_seller_log`;
CREATE TABLE `sun_seller_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '日志编号',
  `log_content` varchar(50) NOT NULL COMMENT '日志内容',
  `log_time` int(10) unsigned NOT NULL COMMENT '日志时间',
  `log_seller_id` int(10) unsigned NOT NULL COMMENT '卖家编号',
  `log_seller_name` varchar(50) NOT NULL COMMENT '卖家帐号',
  `log_store_id` int(10) unsigned NOT NULL COMMENT '店铺编号',
  `log_seller_ip` varchar(50) NOT NULL COMMENT '卖家ip',
  `log_url` varchar(50) NOT NULL COMMENT '日志url',
  `log_state` tinyint(3) unsigned NOT NULL COMMENT '日志状态(0-失败 1-成功)',
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4409 DEFAULT CHARSET=utf8 COMMENT='卖家日志表';

-- insert into `sun_seller_log`(`log_id`,`log_content`,`log_time`,`log_seller_id`,`log_seller_name`,`log_store_id`,`log_seller_ip`,`log_url`,`log_state`) values
-- ('16','登录成功','1456004200','1','sjhnn','1','180.173.24.205','seller_login&login','1'),


-- DROP TABLE IF EXISTS  `sun_seo`;
-- CREATE TABLE `sun_seo` (
--   `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
--   `title` varchar(255) NOT NULL COMMENT '标题',
--   `keywords` varchar(255) NOT NULL COMMENT '关键词',
--   `description` text NOT NULL COMMENT '描述',
--   `type` varchar(20) NOT NULL COMMENT '类型',
--   UNIQUE KEY `id` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='SEO信息存放表';


DROP TABLE IF EXISTS  `sun_setting`;
CREATE TABLE `sun_setting` (
  `name` varchar(50) NOT NULL COMMENT '名称',
  `value` text COMMENT '值',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统设置表';

-- insert into `sun_setting`(`name`,`value`) values
-- ('captcha_status_goodsqa','1'),


DROP TABLE IF EXISTS  `sun_spec`;
CREATE TABLE `sun_spec` (
  `sp_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `sp_name` varchar(100) NOT NULL COMMENT '规格名称',
  `sp_sort` tinyint(1) unsigned NOT NULL COMMENT '排序',
  -- `class_id` int(10) unsigned DEFAULT '0' COMMENT '所属分类id',
  -- `class_name` varchar(100) DEFAULT NULL COMMENT '所属分类名称',
  PRIMARY KEY (`sp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='商品规格表';

-- insert into `sun_spec`(`sp_id`,`sp_name`,`sp_sort`,`class_id`,`class_name`) values
-- ('1','颜色','0','0',''),



DROP TABLE IF EXISTS  `sun_spec_value`;
CREATE TABLE `sun_spec_value` (
  `sp_value_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '规格值id',
  `goods_commonid` int(10) unsigned NOT NULL COMMENT '商品公共表id',
  `sp_value_name` varchar(100) NOT NULL COMMENT '规格值名称',
  `sp_id` int(10) unsigned NOT NULL COMMENT '所属规格id',
  `gc_id` int(10) unsigned NOT NULL COMMENT '分类id',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
  `sp_value_color` varchar(10) DEFAULT NULL COMMENT '规格颜色',
  `sp_value_sort` tinyint(1) unsigned NOT NULL COMMENT '排序',
  PRIMARY KEY (`sp_value_id`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2862 DEFAULT CHARSET=utf8 COMMENT='商品规格值表';

-- insert into `sun_spec_value`(`sp_value_id`,`sp_value_name`,`sp_id`,`gc_id`,`store_id`,`sp_value_color`,`sp_value_sort`) values
-- ('433','10箱','18','2173','1',null,'0'),



DROP TABLE IF EXISTS  `sun_store`;
CREATE TABLE `sun_store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺索引id',
  `store_name` varchar(50) NOT NULL COMMENT '店铺名称',
  `grade_id` int(11) NOT NULL COMMENT '店铺等级',
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `member_name` varchar(50) NOT NULL COMMENT '会员名称',
  `seller_name` varchar(50) DEFAULT NULL COMMENT '店主卖家用户名',
  `sc_id` int(11) NOT NULL COMMENT '店铺分类',
  `store_company_name` varchar(50) DEFAULT NULL COMMENT '店铺公司名称',
  `province_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '店铺所在省份ID',
  `area_info` varchar(100) NOT NULL COMMENT '地区内容，冗余数据',
  `store_address` varchar(100) NOT NULL COMMENT '详细地区',
  `store_zip` varchar(10) NOT NULL COMMENT '邮政编码',
  `store_state` tinyint(1) NOT NULL DEFAULT '2' COMMENT '店铺状态，0关闭，1开启，2审核中',
  `store_close_info` varchar(255) DEFAULT NULL COMMENT '店铺关闭原因',
  `store_sort` int(11) NOT NULL DEFAULT '0' COMMENT '店铺排序',
  `store_time` varchar(10) NOT NULL COMMENT '店铺时间',
  `store_end_time` varchar(10) DEFAULT NULL COMMENT '店铺关闭时间',
  `store_label` varchar(255) DEFAULT NULL COMMENT '店铺logo',
  `store_banner` varchar(255) DEFAULT NULL COMMENT '店铺横幅',
  `store_avatar` varchar(150) DEFAULT NULL COMMENT '店铺头像',
  `store_keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺seo关键字',
  `store_description` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺seo描述',
  `store_qq` varchar(50) DEFAULT NULL COMMENT 'QQ',
  `store_ww` varchar(50) DEFAULT NULL COMMENT '阿里旺旺',
  `store_phone` varchar(20) DEFAULT NULL COMMENT '商家电话',
  `store_zy` text COMMENT '主营商品',
  `store_domain` varchar(50) DEFAULT NULL COMMENT '店铺二级域名',
  `store_domain_times` tinyint(1) unsigned DEFAULT '0' COMMENT '二级域名修改次数',
  `store_recommend` tinyint(1) NOT NULL DEFAULT '0' COMMENT '推荐，0为否，1为是，默认为0',
  `store_theme` varchar(50) NOT NULL DEFAULT 'default' COMMENT '店铺当前主题',
  `store_credit` int(10) NOT NULL DEFAULT '0' COMMENT '店铺信用',
  `store_desccredit` float NOT NULL DEFAULT '0' COMMENT '描述相符度分数',
  `store_servicecredit` float NOT NULL DEFAULT '0' COMMENT '服务态度分数',
  `store_deliverycredit` float NOT NULL DEFAULT '0' COMMENT '发货速度分数',
  `store_collect` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺收藏数量',
  `store_slide` text COMMENT '店铺幻灯片',
  `store_slide_url` text COMMENT '店铺幻灯片链接',
  `store_stamp` varchar(200) DEFAULT NULL COMMENT '店铺印章',
  `store_printdesc` varchar(500) DEFAULT NULL COMMENT '打印订单页面下方说明文字',
  `store_sales` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺销量',
  `store_presales` text COMMENT '售前客服',
  `store_aftersales` text COMMENT '售后客服',
  `store_workingtime` varchar(100) DEFAULT NULL COMMENT '工作时间',
  `store_free_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '超出该金额免运费，大于0才表示该值有效',
  `store_decoration_switch` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺装修开关(0-关闭 装修编号-开启)',
  `store_decoration_only` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '开启店铺装修时，仅显示店铺装修(1-是 0-否',
  `store_decoration_image_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '店铺装修相册图片数量',
  `live_store_name` varchar(255) DEFAULT NULL COMMENT '商铺名称',
  `live_store_address` varchar(255) DEFAULT NULL COMMENT '商家地址',
  `live_store_tel` varchar(255) DEFAULT NULL COMMENT '商铺电话',
  `live_store_bus` varchar(255) DEFAULT NULL COMMENT '公交线路',
  `is_own_shop` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否自营店铺 1是 0否',
  `bind_all_gc` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '自营店是否绑定全部分类 0否1是',
  `store_vrcode_prefix` char(3) DEFAULT NULL COMMENT '商家兑换码前缀',
  `store_baozh` tinyint(1) DEFAULT '0' COMMENT '保证服务开关',
  `store_baozhopen` tinyint(1) DEFAULT '0' COMMENT '保证金显示开关',
  `store_baozhrmb` varchar(10) DEFAULT '零' COMMENT '保证金金额',
  `store_qtian` tinyint(1) DEFAULT '0' COMMENT '7天退换',
  `store_zhping` tinyint(1) DEFAULT '0' COMMENT '正品保障',
  `store_erxiaoshi` tinyint(1) DEFAULT '0' COMMENT '两小时发货',
  `store_tuihuo` tinyint(1) DEFAULT '0' COMMENT '退货承诺',
  `store_shiyong` tinyint(1) DEFAULT '0' COMMENT '试用中心',
  `store_shiti` tinyint(1) DEFAULT '0' COMMENT '实体验证',
  `store_xiaoxie` tinyint(1) DEFAULT '0' COMMENT '消协保证',
  `store_huodaofk` tinyint(1) DEFAULT '0' COMMENT '货到付款',
  PRIMARY KEY (`store_id`),
  KEY `store_name` (`store_name`),
  KEY `sc_id` (`sc_id`),
  KEY `store_state` (`store_state`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='店铺数据表';

-- insert into `sun_store`(`store_id`,`store_name`,`grade_id`,`member_id`,`member_name`,`seller_name`,`sc_id`,`store_company_name`,`province_id`,`area_info`,`store_address`,`store_zip`,`store_state`,`store_close_info`,`store_sort`,`store_time`,`store_end_time`,`store_label`,`store_banner`,`store_avatar`,`store_keywords`,`store_description`,`store_qq`,`store_ww`,`store_phone`,`store_zy`,`store_domain`,`store_domain_times`,`store_recommend`,`store_theme`,`store_credit`,`store_desccredit`,`store_servicecredit`,`store_deliverycredit`,`store_collect`,`store_slide`,`store_slide_url`,`store_stamp`,`store_printdesc`,`store_sales`,`store_presales`,`store_aftersales`,`store_workingtime`,`store_free_price`,`store_decoration_switch`,`store_decoration_only`,`store_decoration_image_count`,`live_store_name`,`live_store_address`,`live_store_tel`,`live_store_bus`,`is_own_shop`,`bind_all_gc`,`store_vrcode_prefix`,`store_baozh`,`store_baozhopen`,`store_baozhrmb`,`store_qtian`,`store_zhping`,`store_erxiaoshi`,`store_tuihuo`,`store_shiyong`,`store_shiti`,`store_xiaoxie`,`store_huodaofk`) values
-- ('1','尚线自营','1','1','hinew','hinew2016','14',null,'0','','','','1','','0','1434389719','','05098029528478117.jpg','05098029528477682.jpg','05103150920915353_sm.png','','','583168923','','021-53531077','',null,'0','0','style1','0','0','0','0','0',null,null,null,null,'0',null,null,null,199.00,'2','0','0','小','上海市','111','11','0','0',null,'1','1','壹仟万','0','1','0','1','0','0','0','1'),


DROP TABLE IF EXISTS  `sun_store_bind_class`;
CREATE TABLE `sun_store_bind_class` (
  `bid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int(11) unsigned DEFAULT '0' COMMENT '店铺ID',
  `commis_rate` tinyint(4) unsigned DEFAULT '0' COMMENT '佣金比例',
  `class_1` mediumint(9) unsigned DEFAULT '0' COMMENT '一级分类',
  `class_2` mediumint(9) unsigned DEFAULT '0' COMMENT '二级分类',
  `class_3` mediumint(9) unsigned DEFAULT '0' COMMENT '三级分类',
  `state` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态0审核中1已审核 2平台自营店铺',
  PRIMARY KEY (`bid`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8 COMMENT='店铺可发布商品类目表';

-- insert into `sun_store_bind_class`(`bid`,`store_id`,`commis_rate`,`class_1`,`class_2`,`class_3`,`state`) values
-- ('3','1','0','0','0','0','1'),



DROP TABLE IF EXISTS  `sun_store_class`;
CREATE TABLE `sun_store_class` (
  `sc_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `sc_name` varchar(50) NOT NULL COMMENT '分类名称',
  `sc_bail` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '保证金数额',
  `sc_sort` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`sc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='店铺分类表';

-- insert into `sun_store_class`(`sc_id`,`sc_name`,`sc_bail`,`sc_sort`) values
-- ('12','SOP入驻商家','0','1'),
-- ('13','设计服务类商家','0','2'),
-- ('14','尚线自营','0','0');


DROP TABLE IF EXISTS  `sun_store_extend`;
CREATE TABLE `sun_store_extend` (
  `store_id` mediumint(8) unsigned NOT NULL COMMENT '店铺ID',
  `express` text COMMENT '快递公司ID的组合',
  `pricerange` text COMMENT '店铺统计设置的商品价格区间',
  `orderpricerange` text COMMENT '店铺统计设置的订单价格区间',
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='店铺信息扩展表';

-- insert into `sun_store_extend`(`store_id`,`express`,`pricerange`,`orderpricerange`) values
-- ('1','29,40,41,44,8',null,null),



DROP TABLE IF EXISTS  `sun_store_goods_class`;
CREATE TABLE `sun_store_goods_class` (
  `stc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `stc_name` varchar(50) NOT NULL COMMENT '店铺商品分类名称',
  `stc_parent_id` int(11) NOT NULL COMMENT '父级id',
  `stc_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '店铺商品分类状态',
  `store_id` int(11) NOT NULL DEFAULT '0' COMMENT '店铺id',
  `stc_sort` int(11) NOT NULL DEFAULT '0' COMMENT '商品分类排序',
  PRIMARY KEY (`stc_id`),
  KEY `stc_parent_id` (`stc_parent_id`,`stc_sort`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8 COMMENT='店铺商品分类表';

-- insert into `sun_store_goods_class`(`stc_id`,`stc_name`,`stc_parent_id`,`stc_state`,`store_id`,`stc_sort`) values
-- ('1','U-work/优工安全鞋','0','1','4','1'),



DROP TABLE IF EXISTS  `sun_store_grade`;
CREATE TABLE `sun_store_grade` (
  `sg_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `sg_name` char(50) DEFAULT NULL COMMENT '等级名称',
  `sg_goods_limit` mediumint(10) unsigned NOT NULL DEFAULT '0' COMMENT '允许发布的商品数量',
  `sg_album_limit` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '允许上传图片数量',
  `sg_space_limit` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上传空间大小，单位MB',
  `sg_template_number` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '选择店铺模板套数',
  `sg_template` varchar(255) DEFAULT NULL COMMENT '模板内容',
  `sg_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '开店费用(元/年)',
  `sg_description` text COMMENT '申请说明',
  `sg_function` varchar(255) DEFAULT NULL COMMENT '附加功能',
  `sg_sort` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '级别，数目越大级别越高',
  PRIMARY KEY (`sg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='店铺等级表';

-- insert into `sun_store_grade`(`sg_id`,`sg_name`,`sg_goods_limit`,`sg_album_limit`,`sg_space_limit`,`sg_template_number`,`sg_template`,`sg_price`,`sg_description`,`sg_function`,`sg_sort`) values
-- ('1','系统默认','0','0','100','6','default|style1|style2|style3|style4|style5',0.00,'用户选择“默认等级”，可以立即开通。','','0'),



DROP TABLE IF EXISTS  `sun_store_joinin`;
CREATE TABLE `sun_store_joinin` (
  `member_id` int(10) unsigned NOT NULL COMMENT '用户编号',
  `member_name` varchar(50) DEFAULT NULL COMMENT '店主用户名',
  `company_name` varchar(50) DEFAULT NULL COMMENT '公司名称',
  `company_province_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '所在地省ID',
  `company_address` varchar(50) DEFAULT NULL COMMENT '公司地址',
  `company_address_detail` varchar(50) DEFAULT NULL COMMENT '公司详细地址',
  `company_phone` varchar(20) DEFAULT NULL COMMENT '公司电话',
  `company_employee_count` int(10) unsigned DEFAULT NULL COMMENT '员工总数',
  `company_registered_capital` int(10) unsigned DEFAULT NULL COMMENT '注册资金',
  `contacts_name` varchar(50) DEFAULT NULL COMMENT '联系人姓名',
  `contacts_phone` varchar(20) DEFAULT NULL COMMENT '联系人电话',
  `contacts_email` varchar(50) DEFAULT NULL COMMENT '联系人邮箱',
  `business_licence_number` varchar(50) DEFAULT NULL COMMENT '营业执照号',
  `business_licence_address` varchar(50) DEFAULT NULL COMMENT '营业执所在地',
  `business_licence_start` date DEFAULT NULL COMMENT '营业执照有效期开始',
  `business_licence_end` date DEFAULT NULL COMMENT '营业执照有效期结束',
  `business_sphere` varchar(1000) DEFAULT NULL COMMENT '法定经营范围',
  `business_licence_number_electronic` varchar(50) DEFAULT NULL COMMENT '营业执照电子版',
  `organization_code` varchar(50) DEFAULT NULL COMMENT '组织机构代码',
  `organization_code_electronic` varchar(50) DEFAULT NULL COMMENT '组织机构代码电子版',
  `general_taxpayer` varchar(50) DEFAULT NULL COMMENT '一般纳税人证明',
  `bank_account_name` varchar(50) DEFAULT NULL COMMENT '银行开户名',
  `bank_account_number` varchar(50) DEFAULT NULL COMMENT '公司银行账号',
  `bank_name` varchar(50) DEFAULT NULL COMMENT '开户银行支行名称',
  `bank_code` varchar(50) DEFAULT NULL COMMENT '支行联行号',
  `bank_address` varchar(50) DEFAULT NULL COMMENT '开户银行所在地',
  `bank_licence_electronic` varchar(50) DEFAULT NULL COMMENT '开户银行许可证电子版',
  `is_settlement_account` tinyint(1) DEFAULT NULL COMMENT '开户行账号是否为结算账号 1-开户行就是结算账号 2-独立的计算账号',
  `settlement_bank_account_name` varchar(50) DEFAULT NULL COMMENT '结算银行开户名',
  `settlement_bank_account_number` varchar(50) DEFAULT NULL COMMENT '结算公司银行账号',
  `settlement_bank_name` varchar(50) DEFAULT NULL COMMENT '结算开户银行支行名称',
  `settlement_bank_code` varchar(50) DEFAULT NULL COMMENT '结算支行联行号',
  `settlement_bank_address` varchar(50) DEFAULT NULL COMMENT '结算开户银行所在地',
  `tax_registration_certificate` varchar(50) DEFAULT NULL COMMENT '税务登记证号',
  `taxpayer_id` varchar(50) DEFAULT NULL COMMENT '纳税人识别号',
  `tax_registration_certificate_electronic` varchar(50) DEFAULT NULL COMMENT '税务登记证号电子版',
  `seller_name` varchar(50) DEFAULT NULL COMMENT '卖家帐号',
  `store_name` varchar(50) DEFAULT NULL COMMENT '店铺名称',
  `store_class_ids` varchar(1000) DEFAULT NULL COMMENT '店铺分类编号集合',
  `store_class_names` varchar(1000) DEFAULT NULL COMMENT '店铺分类名称集合',
  `joinin_state` varchar(50) DEFAULT NULL COMMENT '申请状态 10-已提交申请 11-缴费完成  20-审核成功 30-审核失败 31-缴费审核失败 40-审核通过开店',
  `joinin_message` varchar(200) DEFAULT NULL COMMENT '管理员审核信息',
  `joinin_year` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '开店时长(年)',
  `sg_name` varchar(50) DEFAULT NULL COMMENT '店铺等级名称',
  `sg_id` int(10) unsigned DEFAULT NULL COMMENT '店铺等级编号',
  `sg_info` varchar(200) DEFAULT NULL COMMENT '店铺等级下的收费等信息',
  `sc_name` varchar(50) DEFAULT NULL COMMENT '店铺分类名称',
  `sc_id` int(10) unsigned DEFAULT NULL COMMENT '店铺分类编号',
  `sc_bail` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '店铺分类保证金',
  `store_class_commis_rates` varchar(200) DEFAULT NULL COMMENT '分类佣金比例',
  `paying_money_certificate` varchar(50) DEFAULT NULL COMMENT '付款凭证',
  `paying_money_certificate_explain` varchar(200) DEFAULT NULL COMMENT '付款凭证说明',
  `paying_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '付款金额',
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='店铺入住表';

-- insert into `sun_store_joinin`(`member_id`,`member_name`,`company_name`,`company_province_id`,`company_address`,`company_address_detail`,`company_phone`,`company_employee_count`,`company_registered_capital`,`contacts_name`,`contacts_phone`,`contacts_email`,`business_licence_number`,`business_licence_address`,`business_licence_start`,`business_licence_end`,`business_sphere`,`business_licence_number_electronic`,`organization_code`,`organization_code_electronic`,`general_taxpayer`,`bank_account_name`,`bank_account_number`,`bank_name`,`bank_code`,`bank_address`,`bank_licence_electronic`,`is_settlement_account`,`settlement_bank_account_name`,`settlement_bank_account_number`,`settlement_bank_name`,`settlement_bank_code`,`settlement_bank_address`,`tax_registration_certificate`,`taxpayer_id`,`tax_registration_certificate_electronic`,`seller_name`,`store_name`,`store_class_ids`,`store_class_names`,`joinin_state`,`joinin_message`,`joinin_year`,`sg_name`,`sg_id`,`sg_info`,`sc_name`,`sc_id`,`sc_bail`,`store_class_commis_rates`,`paying_money_certificate`,`paying_money_certificate_explain`,`paying_amount`) values
-- ('1','hinew','尚线（上海）电子商务有限公司','0','上海 上海市 黄浦区','延安东路128弄10号','021-53531077','10','1000','周劼廷','13817711810','jetzhou-hn@hi-new.cn','310120002894774','上海 上海市 奉贤区','2015-08-24','2026-08-23','各类商品',null,'310226350730716',null,null,'','','','','',null,null,'','','','','','310226350730716','310226350730716',null,'hinew2016','尚线',null,null,'40',null,'1',null,null,null,null,null,'0',null,null,null,0.00),


DROP TABLE IF EXISTS  `sun_store_msg`;
CREATE TABLE `sun_store_msg` (
  `sm_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '店铺消息id',
  `smt_code` varchar(100) NOT NULL COMMENT '模板编码',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
  `sm_content` varchar(255) NOT NULL COMMENT '消息内容',
  `sm_addtime` int(10) unsigned NOT NULL COMMENT '发送时间',
  `sm_readids` varchar(255) NOT NULL COMMENT '已读卖家id',
  PRIMARY KEY (`sm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8 COMMENT='店铺消息表';

-- insert into `sun_store_msg`(`sm_id`,`smt_code`,`store_id`,`sm_content`,`sm_addtime`,`sm_readids`) values
-- ('12','new_order','4','您有订单需要处理，订单编号：8000000000000501。','1456653813',',4,'),


DROP TABLE IF EXISTS  `sun_store_msg_read`;
CREATE TABLE `sun_store_msg_read` (
  `sm_id` int(11) NOT NULL COMMENT '店铺消息id',
  `seller_id` int(11) NOT NULL COMMENT '卖家id',
  `read_time` int(11) NOT NULL COMMENT '阅读时间',
  PRIMARY KEY (`sm_id`,`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='店铺消息阅读表';

-- insert into `sun_store_msg_read`(`sm_id`,`seller_id`,`read_time`) values
-- ('12','4','1456725758'),



DROP TABLE IF EXISTS  `sun_store_msg_setting`;
CREATE TABLE `sun_store_msg_setting` (
  `smt_code` varchar(100) NOT NULL COMMENT '模板编码',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺id',
  `sms_message_switch` tinyint(3) unsigned NOT NULL COMMENT '站内信接收开关，0关闭，1开启',
  `sms_short_switch` tinyint(3) unsigned NOT NULL COMMENT '短消息接收开关，0关闭，1开启',
  `sms_mail_switch` tinyint(3) unsigned NOT NULL COMMENT '邮件接收开关，0关闭，1开启',
  `sms_short_number` varchar(11) NOT NULL COMMENT '手机号码',
  `sms_mail_number` varchar(100) NOT NULL COMMENT '邮箱号码',
  PRIMARY KEY (`smt_code`,`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='店铺消息接收设置';

-- insert into `sun_store_msg_setting`(`smt_code`,`store_id`,`sms_message_switch`,`sms_short_switch`,`sms_mail_switch`,`sms_short_number`,`sms_mail_number`) values
-- ('complain','18','1','0','0','',''),
-- ('new_order','4','1','1','1','13585872656','3364732362@qq.com');


DROP TABLE IF EXISTS  `sun_store_msg_tpl`;
CREATE TABLE `sun_store_msg_tpl` (
  `smt_code` varchar(100) NOT NULL COMMENT '模板编码',
  `smt_name` varchar(100) NOT NULL COMMENT '模板名称',
  `smt_message_switch` tinyint(3) unsigned NOT NULL COMMENT '站内信默认开关，0关，1开',
  `smt_message_content` varchar(255) NOT NULL COMMENT '站内信内容',
  `smt_message_forced` tinyint(3) unsigned NOT NULL COMMENT '站内信强制接收，0否，1是',
  `smt_short_switch` tinyint(3) unsigned NOT NULL COMMENT '短信默认开关，0关，1开',
  `smt_short_content` varchar(255) NOT NULL COMMENT '短信内容',
  `smt_short_forced` tinyint(3) unsigned NOT NULL COMMENT '短信强制接收，0否，1是',
  `smt_mail_switch` tinyint(3) unsigned NOT NULL COMMENT '邮件默认开，0关，1开',
  `smt_mail_subject` varchar(255) NOT NULL COMMENT '邮件标题',
  `smt_mail_content` text NOT NULL COMMENT '邮件内容',
  `smt_mail_forced` tinyint(3) unsigned NOT NULL COMMENT '邮件强制接收，0否，1是',
  PRIMARY KEY (`smt_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商家消息模板';

-- insert into `sun_store_msg_tpl`(`smt_code`,`smt_name`,`smt_message_switch`,`smt_message_content`,`smt_message_forced`,`smt_short_switch`,`smt_short_content`,`smt_short_forced`,`smt_mail_switch`,`smt_mail_subject`,`smt_mail_content`,`smt_mail_forced`) values
-- ('complain','商品被投诉提醒','1','您售出的商品被投诉，等待商家申诉。投诉单编号：{$complain_id}。','1','0','【{$site_name}】您售出的商品被投诉，等待商家申诉。投诉单编号：{$complain_id}。','0','0','{$site_name}提醒：您售出的商品被投诉，等待商家申诉。投诉单编号：{$complain_id}。','<p>
-- 	{$site_name}提醒：
-- </p>
-- <p>
-- 	您售出的商品被投诉，等待商家申诉。投诉单编号：{$complain_id}。
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p>
-- 	<br />
-- </p>
-- <p style="text-align:right;">
-- 	{$site_name}
-- </p>
-- <p style="text-align:right;">
-- 	{$mail_send_time}
-- </p>
-- <p>
-- 	<br />
-- </p>','0'),




DROP TABLE IF EXISTS  `sun_store_sns_comment`;
CREATE TABLE `sun_store_sns_comment` (
  `scomm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺动态评论id',
  `strace_id` int(11) NOT NULL COMMENT '店铺动态id',
  `scomm_content` varchar(150) DEFAULT NULL COMMENT '评论内容',
  `scomm_memberid` int(11) DEFAULT NULL COMMENT '会员id',
  `scomm_membername` varchar(45) DEFAULT NULL COMMENT '会员名称',
  `scomm_memberavatar` varchar(50) DEFAULT NULL COMMENT '会员头像',
  `scomm_time` varchar(11) DEFAULT NULL COMMENT '评论时间',
  `scomm_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '评论状态 1正常，0屏蔽',
  PRIMARY KEY (`scomm_id`),
  UNIQUE KEY `scomm_id` (`scomm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='店铺动态评论表';





DROP TABLE IF EXISTS  `sun_store_watermark`;
CREATE TABLE `sun_store_watermark` (
  `wm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '水印id',
  `jpeg_quality` int(3) NOT NULL DEFAULT '90' COMMENT 'jpeg图片质量',
  `wm_image_name` varchar(255) DEFAULT NULL COMMENT '水印图片的路径以及文件名',
  `wm_image_pos` tinyint(1) NOT NULL DEFAULT '1' COMMENT '水印图片放置的位置',
  `wm_image_transition` int(3) NOT NULL DEFAULT '20' COMMENT '水印图片与原图片的融合度 ',
  `wm_text` text COMMENT '水印文字',
  `wm_text_size` int(3) NOT NULL DEFAULT '20' COMMENT '水印文字大小',
  `wm_text_angle` tinyint(1) NOT NULL DEFAULT '4' COMMENT '水印文字角度',
  `wm_text_pos` tinyint(1) NOT NULL DEFAULT '3' COMMENT '水印文字放置位置',
  `wm_text_font` varchar(50) DEFAULT NULL COMMENT '水印文字的字体',
  `wm_text_color` varchar(7) NOT NULL DEFAULT '#CCCCCC' COMMENT '水印字体的颜色值',
  `wm_is_open` tinyint(1) NOT NULL DEFAULT '0' COMMENT '水印是否开启 0关闭 1开启',
  `store_id` int(11) DEFAULT NULL COMMENT '店铺id',
  PRIMARY KEY (`wm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='店铺水印图片表';

-- insert into `sun_store_watermark`(`wm_id`,`jpeg_quality`,`wm_image_name`,`wm_image_pos`,`wm_image_transition`,`wm_text`,`wm_text_size`,`wm_text_angle`,`wm_text_pos`,`wm_text_font`,`wm_text_color`,`wm_is_open`,`store_id`) values
-- ('1','90',null,'1','20',null,'20','4','3','default','#CCCCCC','0','1'),


DROP TABLE IF EXISTS  `sun_store_waybill`;
CREATE TABLE `sun_store_waybill` (
  `store_waybill_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '店铺运单模板编号',
  `store_id` int(10) unsigned NOT NULL COMMENT '店铺编号',
  `express_id` int(10) unsigned NOT NULL COMMENT '物流公司编号',
  `waybill_id` int(10) unsigned NOT NULL COMMENT '运单模板编号',
  `waybill_name` varchar(50) NOT NULL COMMENT '运单模板名称',
  `store_waybill_data` varchar(2000) DEFAULT NULL COMMENT '店铺自定义设置',
  `is_default` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否默认模板',
  `store_waybill_left` int(11) NOT NULL DEFAULT '0' COMMENT '店铺运单左偏移',
  `store_waybill_top` int(11) NOT NULL DEFAULT '0' COMMENT '店铺运单上偏移',
  PRIMARY KEY (`store_waybill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='店铺运单模板表';

-- insert into `sun_store_waybill`(`store_waybill_id`,`store_id`,`express_id`,`waybill_id`,`waybill_name`,`store_waybill_data`,`is_default`,`store_waybill_left`,`store_waybill_top`) values
-- ('1','4','44','5','中通快递','a:10:{s:10:"buyer_name";a:2:{s:9:"item_text";s:9:"收货人";s:4:"show";b:1;}s:10:"buyer_area";a:2:{s:9:"item_text";s:15:"收货人地区";s:4:"show";b:1;}s:13:"buyer_address";a:2:{s:9:"item_text";s:15:"收货人地址";s:4:"show";b:1;}s:12:"buyer_mobile";a:2:{s:9:"item_text";s:15:"收货人手机";s:4:"show";b:1;}s:11:"buyer_phone";a:2:{s:9:"item_text";s:15:"收货人电话";s:4:"show";b:1;}s:11:"seller_name";a:2:{s:9:"item_text";s:9:"发货人";s:4:"show";b:1;}s:11:"seller_area";a:2:{s:9:"item_text";s:15:"发货人地区";s:4:"show";b:1;}s:14:"seller_address";a:2:{s:9:"item_text";s:15:"发货人地址";s:4:"show";b:1;}s:12:"seller_phone";a:2:{s:9:"item_text";s:15:"发货人电话";s:4:"show";b:1;}s:14:"seller_company";a:2:{s:9:"item_text";s:15:"发货人公司";s:4:"show";b:1;}}','0','0','0'),
-- ('2','1','29','3','顺风','a:10:{s:10:"buyer_name";a:2:{s:9:"item_text";s:9:"收货人";s:4:"show";b:1;}s:10:"buyer_area";a:2:{s:9:"item_text";s:15:"收货人地区";s:4:"show";b:1;}s:13:"buyer_address";a:2:{s:9:"item_text";s:15:"收货人地址";s:4:"show";b:1;}s:12:"buyer_mobile";a:2:{s:9:"item_text";s:15:"收货人手机";s:4:"show";b:1;}s:11:"buyer_phone";a:2:{s:9:"item_text";s:15:"收货人电话";s:4:"show";b:1;}s:11:"seller_name";a:2:{s:9:"item_text";s:9:"发货人";s:4:"show";b:1;}s:11:"seller_area";a:2:{s:9:"item_text";s:15:"发货人地区";s:4:"show";b:1;}s:14:"seller_address";a:2:{s:9:"item_text";s:15:"发货人地址";s:4:"show";b:1;}s:12:"seller_phone";a:2:{s:9:"item_text";s:15:"发货人电话";s:4:"show";b:1;}s:14:"seller_company";a:2:{s:9:"item_text";s:15:"发货人公司";s:4:"show";b:1;}}','0','-5','-4');


DROP TABLE IF EXISTS  `sun_transport`;
CREATE TABLE `sun_transport` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '运费模板ID',
  `title` varchar(30) NOT NULL COMMENT '运费模板名称',
  `send_tpl_id` mediumint(8) unsigned DEFAULT NULL COMMENT '发货地区模板ID',
  `store_id` mediumint(8) unsigned NOT NULL COMMENT '店铺ID',
  `update_time` int(10) unsigned DEFAULT '0' COMMENT '最后更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='运费模板';

-- insert into `sun_transport`(`id`,`title`,`send_tpl_id`,`store_id`,`update_time`) values
-- ('1','标准模板','1','1','1456300013'),


DROP TABLE IF EXISTS  `sun_transport_extend`;
CREATE TABLE `sun_transport_extend` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '运费模板扩展ID',
  `area_id` text COMMENT '市级地区ID组成的串，以，隔开，两端也有，',
  `top_area_id` text COMMENT '省级地区ID组成的串，以，隔开，两端也有，',
  `area_name` text COMMENT '地区name组成的串，以，隔开',
  `snum` mediumint(8) unsigned DEFAULT '1' COMMENT '首件数量',
  `sprice` decimal(10,2) DEFAULT '0.00' COMMENT '首件运费',
  `xnum` mediumint(8) unsigned DEFAULT '1' COMMENT '续件数量',
  `xprice` decimal(10,2) DEFAULT '0.00' COMMENT '续件运费',
  `is_default` enum('1','2') DEFAULT '2' COMMENT '是否默认运费1是2否',
  `transport_id` mediumint(8) unsigned NOT NULL COMMENT '运费模板ID',
  `transport_title` varchar(60) DEFAULT NULL COMMENT '运费模板',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8 COMMENT='运费模板扩展表';

-- insert into `sun_transport_extend`(`id`,`area_id`,`top_area_id`,`area_name`,`snum`,`sprice`,`xnum`,`xprice`,`is_default`,`transport_id`,`transport_title`) values
-- ('3','','','全国','1',20.00,'1',10.00,'1','1','标准模板'),


DROP TABLE IF EXISTS  `sun_type`;
CREATE TABLE `sun_type` (
  `type_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `type_name` varchar(100) NOT NULL COMMENT '类型名称',
  `type_sort` tinyint(1) unsigned NOT NULL COMMENT '排序',
  `class_id` int(10) unsigned DEFAULT '0' COMMENT '所属分类id',
  `class_name` varchar(100) NOT NULL COMMENT '所属分类名称',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='商品类型表';

-- insert into `sun_type`(`type_id`,`type_name`,`type_sort`,`class_id`,`class_name`) values
-- ('40','通用','0','0',''),



DROP TABLE IF EXISTS  `sun_type_brand`;
CREATE TABLE `sun_type_brand` (
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `brand_id` int(10) unsigned NOT NULL COMMENT '品牌id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品类型与品牌对应表';



DROP TABLE IF EXISTS  `sun_type_spec`;
CREATE TABLE `sun_type_spec` (
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `sp_id` int(10) unsigned NOT NULL COMMENT '规格id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品类型与规格对应表';

-- insert into `sun_type_spec`(`type_id`,`sp_id`) values
-- ('40','17'),


DROP TABLE IF EXISTS  `sun_type_gc`;
CREATE TABLE `sun_type_gc` (
  `type_id` int(10) unsigned NOT NULL COMMENT '类型id',
  `gc_id` int(10) unsigned NOT NULL COMMENT '分类id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品类型与分类对应表';



DROP TABLE IF EXISTS  `sun_upload`;
CREATE TABLE `sun_upload` (
  `upload_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `file_name` varchar(100) DEFAULT NULL COMMENT '文件名',
  `file_thumb` varchar(100) DEFAULT NULL COMMENT '缩微图片',
  `file_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  `upload_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '文件类别，0为无，1为文章图片，默认为0，2为帮助内容图片，3为店铺幻灯片，4为系统文章图片，5为积分礼品切换图片，6为积分礼品内容图片',
  `upload_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `item_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '信息ID',
  PRIMARY KEY (`upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8 COMMENT='上传文件表';

-- insert into `sun_upload`(`upload_id`,`file_name`,`file_thumb`,`file_size`,`upload_type`,`upload_time`,`item_id`) values
-- ('181','',null,'15221','2','1456213527','99'),
-- ('194','05113709555089525.jpg',null,'32541','1','1458026955','35');




DROP TABLE IF EXISTS  `sun_waybill`;
CREATE TABLE `sun_waybill` (
  `waybill_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `waybill_name` varchar(50) NOT NULL,
  `waybill_image` varchar(50) NOT NULL,
  `waybill_width` int(10) unsigned NOT NULL COMMENT '宽度',
  `waybill_height` int(10) unsigned NOT NULL COMMENT '高度',
  `waybill_data` varchar(2000) DEFAULT NULL COMMENT '打印位置数据',
  `waybill_usable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可用',
  `waybill_top` int(11) NOT NULL DEFAULT '0' COMMENT '上偏移量',
  `waybill_left` int(11) NOT NULL DEFAULT '0' COMMENT '左偏移量',
  `express_id` tinyint(1) unsigned NOT NULL COMMENT '快递公司编号',
  `express_name` varchar(50) NOT NULL COMMENT '快递公司名称',
  `store_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺编号(0-代表系统模板)',
  PRIMARY KEY (`waybill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='快递单打印模板表';

-- insert into `sun_waybill`(`waybill_id`,`waybill_name`,`waybill_image`,`waybill_width`,`waybill_height`,`waybill_data`,`waybill_usable`,`waybill_top`,`waybill_left`,`express_id`,`express_name`,`store_id`) values
-- ('1','百世汇通','04558238732336424.jpg','229','126','a:10:{s:10:"buyer_name";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"485";s:3:"top";s:2:"97";s:5:"width";s:2:"88";s:6:"height";s:2:"24";}s:10:"buyer_area";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"423";s:3:"top";s:3:"173";s:5:"width";s:3:"256";s:6:"height";s:2:"20";}s:13:"buyer_address";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"420";s:3:"top";s:3:"201";s:5:"width";s:3:"333";s:6:"height";s:2:"20";}s:12:"buyer_mobile";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"473";s:3:"top";s:3:"230";s:5:"width";s:3:"141";s:6:"height";s:2:"20";}s:11:"buyer_phone";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"671";s:3:"top";s:3:"227";s:5:"width";s:3:"100";s:6:"height";s:2:"20";}s:11:"seller_name";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"126";s:3:"top";s:2:"98";s:5:"width";s:3:"112";s:6:"height";s:2:"16";}s:11:"seller_area";a:5:{s:5:"check";s:2:"on";s:4:"left";s:2:"72";s:3:"top";s:3:"174";s:5:"width";s:3:"227";s:6:"height";s:2:"20";}s:14:"seller_address";a:5:{s:5:"check";s:2:"on";s:4:"left";s:2:"68";s:3:"top";s:3:"204";s:5:"width";s:3:"294";s:6:"height";s:2:"20";}s:12:"seller_phone";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"120";s:3:"top";s:3:"231";s:5:"width";s:3:"124";s:6:"height";s:2:"20";}s:14:"seller_company";a:5:{s:5:"check";s:2:"on";s:4:"left";s:3:"116";s:3:"top";s:3:"124";s:5:"width";s:3:"184";s:6:"height";s:2:"20";}}','1','-3','-5','16','汇通快递','0'),



SET FOREIGN_KEY_CHECKS = 1;

