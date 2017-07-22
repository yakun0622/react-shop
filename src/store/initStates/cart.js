/**
 * Created by kenn on 16/7/30.
 */
export default {

    datas: {
        1: {
            BuyerId: 1, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '买家id',
            StoreId: 1, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺id',
            StoreName: '海牛', // varchar(50) NOT NULL DEFAULT '' COMMENT '店铺名称',
            GoodsId: 1, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
            GoodsName: "苹果手机", //varchar(100) NOT NULL COMMENT '商品名称',
            GoodsPrice: 6888,// decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品价格',
            GoodsNum: 1, //smallint(5) unsigned NOT NULL DEFAULT '1' COMMENT '购买商品数量',
            GoodsImage: '', //varchar(100) NOT NULL COMMENT '商品图片',
        },
        2: {
            BuyerId: 1, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '买家id',
            StoreId: 2, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺id',
            StoreName: '悟客', // varchar(50) NOT NULL DEFAULT '' COMMENT '店铺名称',
            GoodsId: 1, //int(11) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
            GoodsName: "苹果手机", //varchar(100) NOT NULL COMMENT '商品名称',
            GoodsPrice: 6888,// decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品价格',
            GoodsNum: 1, //smallint(5) unsigned NOT NULL DEFAULT '1' COMMENT '购买商品数量',
            GoodsImage: '', //varchar(100) NOT NULL COMMENT '商品图片',
        },
    },

    goods: {},
    goodsCommon: {},

    count: 0
}