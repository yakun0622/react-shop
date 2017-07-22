/**
 * Created by kenn on 16/7/17.
 */
export default {
    error: {
        goods: {},
        goodsCommon: {},
    },

    goodsId: 0,

    images: {},

    goods: {
        //1:
        //    {
        //    GoodsName: null,
        //    GoodsJingle: null,            //'商品广告词'
        //    GoodsImage: null,               //mage varchar(100) NOT NULL COMMENT '商品主图',
        //    GoodsBody: null,                //text NOT NULL COMMENT '商品内容
        //    GoodsPrice: null,               // decimal(10,2) NOT NULL COMMENT '商品价格',
        //    GoodsSerial: null,              // varchar(50) NOT NULL COMMENT '商家编号',
        //    GoodsStorageSlarm: null,        // tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
        //    GoodsCommend: null,             // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否，默认为0',
        //    GoodsFreight: null,             // decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
        //    VirtualIndate: null,            //int(10) unsigned DEFAULT NULL COMMENT '虚拟商品有效期',
        //    VirtualLimit: null,             // tinyint(3) unsigned DEFAULT NULL COMMENT '虚拟商品购买上限',
        //    IsFcode: null,                  // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
        //    IsAppoint: null,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
        //    AppointSatedate: null,          // int(10) unsigned NOT NULL COMMENT '预约商品出售时间',
        //    IsPresell: null,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
        //    PresellDeliverdate: null,       // int(10) unsigned NOT NULL COMMENT '预售商品发货时间',
        //    ColorId: null,
        //    GoodsImages: [1,4,5],
        //    Spec: {1 : {name: '', values: { 1 : {SpValueName: '', SpValueSort: 0}}},
        //    AmountPrice: null
        //}
    },

    goodsCommon: {
        GoodsName: null,
        GoodsJingle: null,            //'商品广告词'
        GcId1: null,
        GcId2: null,
        GcId3: null,
        GcName: null,                 //'商品分类',
        StoreId: 1,
        StoreName: '海牛',
        BrandId: null,                  //int(10) unsigned NOT NULL COMMENT '品牌id',
        BrandName: null,                //varchar(100) NOT NULL COMMENT '品牌名称',
        TypeId: null,                   //int(10) unsigned NOT NULL DEFAULT '0' COMMENT '类型id',
        GoodsImage: null,               //mage varchar(100) NOT NULL COMMENT '商品主图',
        GoodsImages: [],
        GoodsBody: null,                //text NOT NULL COMMENT '商品内容',
        GoodsState: null,               // tinyint(3) unsigned NOT NULL COMMENT '商品状态 0下架，1正常，10违规（禁售）,  20未编辑完成',
        GoodsVerify: null,              //(3) unsigned NOT NULL COMMENT '商品审核 1通过，0未通过，10审核中',
        GoodsVerifyremark: null,        //varchar(255) DEFAULT NULL COMMENT '审核失败原因',
        GoodsPrice: null,               // decimal(10,2) NOT NULL COMMENT '商品价格',
        GoodsSerial: null,              // varchar(50) NOT NULL COMMENT '商家编号',
        GoodsStorageSlarm: null,        // tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
        TransportId: null,              // mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '运费模板',
        TransportTitle: null,           //varchar(60) NOT NULL DEFAULT '' COMMENT '运费模板名称',
        GoodsCommend: null,             // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否，默认为0',
        GoodsFreight: null,             // decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
        GoodsVat: null,                 // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否开具增值税发票 1是，0否',
        Areaid_1: null,                 // int(10) unsigned NOT NULL COMMENT '一级地区id',
        Areaid_2: null,                 // int(10) unsigned NOT NULL COMMENT '二级地区id',
        GoodsStcids: null,              // varchar(255) NOT NULL DEFAULT '' COMMENT '店铺分类id 首尾用,隔开',
        PlateidTop: null,               // int(10) unsigned DEFAULT NULL COMMENT '顶部关联板式',
        PlateidBottom: null,            // int(10) unsigned DEFAULT NULL COMMENT '底部关联板式',
        IsVirtual: null,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为虚拟商品 1是，0否',
        VirtualIndate: null,            //int(10) unsigned DEFAULT NULL COMMENT '虚拟商品有效期',
        VirtualLimit: null,             // tinyint(3) unsigned DEFAULT NULL COMMENT '虚拟商品购买上限',
        VirtualInvalidRefund: null,     // tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否允许过期退款， 1是，0否',
        IsFcode: null,                  // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
        IsAppoint: null,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
        AppointSatedate: null,          // int(10) unsigned NOT NULL COMMENT '预约商品出售时间',
        IsPresell: null,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
        PresellDeliverdate: null,       // int(10) unsigned NOT NULL COMMENT '预售商品发货时间',
        Specs: null,
    }
}