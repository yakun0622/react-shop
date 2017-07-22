/**
 * Created by kenn on 16/7/16.
 */
import { MM, F, C, LR, M } from '../../../common'

import * as TYPE from '../../../actions/type'
import { REQUEST_WAIT } from '../../../store/code'

/**
 * 设置商品
 * @param action
 * @param state
 *
 * spec 数据格式
 * {
 *      Id: {
 *          SpName,
 *          values: {
 *               Id: {SpValueName, SpValueColor, SpValueColorSort, GcId, StoreId, SpId},
 *          }
 *      }
 * }
 */

export default ( state = init, action ) => {
    switch ( action.type ) {
        case TYPE.GOODS_EDIT_INIT:
            state = init
            break
        //选择分类
        case TYPE.GOODS_EDIT_SAVE:
            LR( 'goodsEdit', TYPE.GOODS_EDIT_SAVE, action.data )

            break
        //选择分类
        case TYPE.GOODS_EDIT_SELECT_CATEGORY:
            if ( state.goodsCommon.GcId3 != action.data.GcId3 ) {
                state.goodsCommon.BrandId = 0
                state.goodsCommon.BrandName = ''
                state.goodsCommon.TypeId = 0
                state.goods = {0: initGoods()}
            }
            state.goodsCommon.GcId3 = Number( action.data.GcId3 )
            state.goodsCommon.GcId1 = action.data.GcId1
            state.goodsCommon.GcId2 = action.data.GcId2
            state.goodsCommon.GcName = action.data.GcName

            break

        //修改商品通用名称
        case TYPE.GOODS_EDIT_COMMON_NAME:

            if ( action.error ) {
                state.error.goodsCommon[ 'GoodsName' ] = action.error.message
            } else {
                delete state.error.goodsCommon[ 'GoodsName' ]
            }

            state.goodsCommon.GoodsName = action.data

            break

        //修改商品名称
        case TYPE.GOODS_EDIT_NAMES:
            setGoods( action, state, 'GoodsName' );

            break

        //修改商品广告词
        case TYPE.GOODS_EDIT_JINGLE:
            setGoods( action, state, 'GoodsJingle' )
            break

        //修改商家商品编号
        case TYPE.GOODS_EDIT_STORE_SERIAL:
            setGoods( action, state, 'GoodsSerial' )
            break

        //修改运费模板
        case TYPE.GOODS_EDIT_STORE_TRANSPORT:
            state.goodsCommon.TransportId = Number( action.data.id )
            state.goodsCommon.TransportTitle = action.data.title
            //LR('goodsEdit', 'TransportId', state.goodsCommon)
            break

        //修改库存
        case TYPE.GOODS_EDIT_STORAGE:
            if ( !isNaN( action.data.value ) ) {
                setGoods( action, state, 'GoodsStorage' )
            }
            break

        //修改库存预警值
        case TYPE.GOODS_EDIT_STORAGE_SLARM:
            if ( !isNaN( action.data.value ) ) {
                setGoods( action, state, 'GoodsStorageSlarm' )
            }
            break

        //修改商品价格
        case TYPE.GOODS_EDIT_PRICE:
            if ( !isNaN( action.data.value ) ) {
                action.data.value = Number(action.data.value)
                setGoods( action, state, 'GoodsPrice' )
            }
            break

        //选择类型
        case TYPE.GOODS_EDIT_COMMON_TYPE:
            if ( state.goodsCommon.TypeId != action.data.typeId ) {
                state.goods = null
                state.goodsCommon.Specs = []
                state.goodsCommon.TypeId = Number(action.data.typeId)
                LR('goodsEdit', 'type', action.data.specs)
                action.data.specs.forEach(( specId, i ) => {
                    if( i%2 == 0 ) {
                        state.goodsCommon.Specs.push( { Id: specId, SpName: action.data.specs[i+1], values: [] } )
                    }
                })
            }
            break

        //选择品牌
        case TYPE.GOODS_EDIT_COMMON_BRAND:

            state.goodsCommon.BrandId = action.data.id
            state.goodsCommon.BrandName = action.data.name

            break

        //初始化spec
        case TYPE.GOODS_EDIT_SPEC_INIT:
            state.goodsCommon.Specs = action.data
            break

        //编辑specvalue
        case TYPE.GOODS_EDIT_SPEC_VALUE:

            //console.log(action.data.SpValueName)

            state.goodsCommon.Specs[ action.data.specIndex ].values[ action.data.valueIndex ].SpValueName = action.data.SpValueName
            break

        //编辑specvalue
        case TYPE.GOODS_EDIT_SPEC_REMOVE:
            const specId = state.goodsCommon.Specs[ action.data.specIndex ].Id
            const valueId = state.goodsCommon.Specs[ action.data.specIndex ].values[ action.data.valueIndex ].SpValueId
            state.goodsCommon.Specs[ action.data.specIndex ].values.splice( action.data.valueIndex, 1 )
            //console.log(action)
            F( state.goods, ( goodsData, goodsId ) => {
                if ( goodsData.Specs[ specId ] && goodsData.Specs[ specId ] == valueId ) {
                    delete state.goods[ goodsId ]
                }
            } )
            break

        //添加spec值
        case TYPE.GOODS_EDIT_SPEC_ADD:
            //LR('goodsEdit', 'value', state)
            //state.goodsCommon.Specs[ action.data ][ 'values' ][ ++state.specValueId ]
            //    = { SpValueName: '', SpValueSort: C( state.goodsCommon.Specs[ action.data ][ 'values' ] ) }
            const addValueId = ++state.specValueId
            state.goodsCommon.Specs[ action.data ].values.push(
                {
                    Id: addValueId,
                    SpValueName: '',
                    SpValueSort: state.goodsCommon.Specs[ action.data ][ 'values' ].length
                }
            )
            //根据goodsCommon的specs添加goods
            createGoods( state.goodsCommon.Specs.length, addValueId, 0, null, state, action )
            break

        //设置图片
        case TYPE.GOODS_EDIT_IMAGES_ADD:
            if ( action.data.goodsIds.length ) {
                F( action.data.goodsIds, ( goodsId ) => {
                    if ( state.goods[ goodsId ].GoodsImages.length ) {
                        state.goods[ goodsId ].GoodsImages = setImage( state.goods[ goodsId ].GoodsImages,
                            action.data.images )
                    } else {
                        state.goods[ goodsId ].GoodsImages = action.data.images
                        state.goods[ goodsId ].GoodsImage = action.data.images[ 0 ]
                    }
                } )
            } else {
                if ( state.goodsCommon.GoodsImages.length ) {
                    state.goodsCommon.GoodsImages = setImage( state.goodsCommon.GoodsImages, action.data.images )
                    //LR('goodsEdit', 'value', state.goodsCommon.GoodsImages)
                } else {
                    state.goodsCommon.GoodsImages = action.data.images
                    state.goodsCommon.GoodsImage = action.data.images[ 0 ]
                }
            }
            break

        //删除图片
        case TYPE.GOODS_EDIT_IMAGE_REMOVE:
            if ( action.data.goodsIds.length ) {
                F( action.data.goodsIds, ( goodsId ) => {
                    state.goods[ goodsId ].GoodsImage = setMainImageByRemoveImages( state.goods[ goodsId ].GoodsImages,
                        state.goods[ goodsId ].GoodsImage,
                        action.data.index )
                    state.goods[ goodsId ].GoodsImages.splice( action.data.index, 1 )
                } )
            } else {
                state.goodsCommon.GoodsImage = setMainImageByRemoveImages( state.goodsCommon.GoodsImages,
                    state.goodsCommon.GoodsImage,
                    action.data.index )
                state.goodsCommon.GoodsImages.splice( action.data.index, 1 )
            }
            break

        //替换图片
        case TYPE.GOODS_EDIT_IMAGE_REPLACE:
            if ( action.data.goodsIds.length ) {
                F( action.data.goodsIds, ( goodsId ) => {
                    if ( state.goods[ goodsId ].GoodsImages.indexOf( action.data.image ) == -1 ) {
                        state.goods[ goodsId ].GoodsImage = setMainImageByReplaceImages( state.goods[ goodsId ].GoodsImage,
                            state.goods[ goodsId ].GoodsImages[ action.data.index ],
                            action.data.image )
                        state.goods[ goodsId ].GoodsImages[ action.data.index ] = action.data.image
                    }
                } )
            } else if ( state.goodsCommon.GoodsImages.indexOf( action.data.image ) == -1 ) {
                state.goodsCommon.GoodsImage = setMainImageByReplaceImages( state.goodsCommon.GoodsImage,
                    state.goodsCommon.GoodsImages[ action.data.index ],
                    action.data.image )
                state.goodsCommon.GoodsImages[ action.data.index ] = action.data.image
            }
            break

        //设置主图
        case TYPE.GOODS_EDIT_MAIN_IMAGE:
            setGoods( action, state, 'GoodsImage' )
            if ( action.data.goodsIds.length ) {
                action.data.goodsIds.forEach( ( goodsId ) => {
                    state.goods[ goodsId ].GoodsImage = action.data.image
                    state.goods[ goodsId ].GoodsImages.splice( action.data.index, 1 )
                    state.goods[ goodsId ].GoodsImages.unshift( action.data.image )
                } )
            } else {
                state.goodsCommon.GoodsImage = action.data.image
                state.goodsCommon.GoodsImages.splice( action.data.index, 1 )
                state.goodsCommon.GoodsImages.unshift( action.data.image )
            }
            break

        //增加商品详情
        case TYPE.GOODS_EDIT_BODY_ADD:
            set( state, action.data.goodsIds, ( goods ) => {
                goods.GoodsBody.push( action.data.body )
            } )
            break

        //编辑商品详情
        case TYPE.GOODS_EDIT_BODY_EDIT:
            set( state, action.data.goodsIds, ( goods ) => {
                goods.GoodsBody[ action.data.index ] = action.data.body
            } )
            break

        //删除商品详情
        case TYPE.GOODS_EDIT_BODY_REMOVE:
            set( state, action.data.goodsIds, ( goods ) => {
                if ( action.data.index > -1 ) {
                    goods.GoodsBody.splice( action.data.index, 1 )
                } else {
                    goods.GoodsBody = []
                }
            } )
            break
    }


    return MM( state )
}

function set( state, goodsIds, callback ) {
    if ( goodsIds.length ) {
        goodsIds.forEach( ( goodsId ) => {
            callback( state.goods[ goodsId ] )
        } )
    } else {
        callback( state.goodsCommon )
    }
}

function setMainImageByRemoveImages( images, image, index ) {
    if ( images[ index ] == image ) {
        if ( images.length > 1 ) {
            if ( index ) {
                return images[ 0 ]
            } else {
                return images[ 1 ]
            }

        }
        return null
    }
    return image
}

function setMainImageByReplaceImages( mainImage, image, newImage ) {
    if ( mainImage == image ) {
        return newImage
    }
    return image
}


function setGoods( action, state, name ) {
    //LR('goodsEdit', name, action.data)
    if ( action.data.goodsIds.length ) {
        F( action.data.goodsIds, ( goodsId, i ) => {
            state.goods[ goodsId ][ name ] = action.data.value
        } )
    } else {
        state.goodsCommon[ name ] = action.data.value
    }
}

function setImage( images, newImages ) {
    const length = 9 - images.length
    for ( let i = 0; i < length && i < newImages.length; i++ ) {
        if ( images.indexOf( newImages[ i ] ) == -1 ) {
            images.push( newImages[ i ] )
        }
    }
    return images
}


/**
 * 根据添加的规格值创建相应goods
 * @param countSpecs  规格的数量
 * @param index         规格索引,遍历是取对应的规格值
 * @param initGoods     初始化goods的数据
 * @param goodsId      goodsid
 * @returns {*}
 */
function createGoods( countSpecs, currentValueId, index, oldInitGoods, state, action ) {


    for ( let i = 0; i < state.goodsCommon.Specs.length; i++ ) {

        if ( i == index ) {
            //如果规格id等于被添加的规格则不遍历此规格值,否则遍历
            if ( i == action.data ) {
                let init = oldInitGoods || initGoods( action, state )
                init.Specs[ state.goodsCommon.Specs[ i ].Id ] = currentValueId
                if ( index == countSpecs - 1 ) {
                    if ( !state.goods ) {
                        state.goods = {}
                    }
                    state.goods[ ++state.goodsId ] = M( init )
                } else {
                    createGoods( countSpecs, currentValueId, i + 1, init, state, action )
                }
            } else {
                state.goodsCommon.Specs[ i ].values.forEach( ( value, valueIndex ) => {
                    let inits = oldInitGoods || initGoods( action, state )
                    const specId = state.goodsCommon.Specs[ i ].Id
                    //console.log( specId + '====' + value.SpValueId + '>>>' + index )
                    inits.Specs[ specId ] = value[ 'Id' ]
                    if ( index == countSpecs - 1 ) {
                        if ( !state.goods ) {
                            state.goods = {}
                        }
                        //LR('createGoods', inits)
                        state.goods[ ++state.goodsId ] = M( inits )
                    } else {
                        createGoods( countSpecs, currentValueId, i + 1, inits, state, action )
                    }
                } )
            }
        }
    }


}

function initGoods( action, state ) {

    let init = {
        GoodsName: '',
        GoodsJingle: '',            //'商品广告词'
        GcId1: 0,
        GcId2: 0,
        GcId3: 0,
        GcName: '',                 //'商品分类',
        StoreId: 0,
        StoreName: '',
        BrandId: 0,                  //int(10) unsigned NOT NULL COMMENT '品牌id',
        GoodsImage: '',               //mage varchar(100) NOT NULL COMMENT '商品主图',
        GoodsImages: [],               //mage varchar(100) NOT NULL COMMENT '商品图片',
        GoodsBody: [],                //text NOT NULL COMMENT '商品内容
        GoodsPrice: 0,               // decimal(10,2) NOT NULL COMMENT '商品价格',
        GoodsSerial: '',              // varchar(50) NOT NULL COMMENT '商家编号',
        GoodsStorage: 0,             //商品库存
        GoodsStorageSlarm: 0,        // tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
        GoodsCommend: 0,             // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否，默认为0',
        GoodsFreight: 0,             // decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
        VirtualIndate: 0,            //int(10) unsigned DEFAULT NULL COMMENT '虚拟商品有效期',
        VirtualLimit: 0,             // tinyint(3) unsigned DEFAULT NULL COMMENT '虚拟商品购买上限',
        IsFcode: 0,                  // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
        IsAppoint: 0,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
        AppointSatedate: 0,          // int(10) unsigned NOT NULL COMMENT '预约商品出售时间',
        IsPresell: 0,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
        PresellDeliverdate: 0,       // int(10) unsigned NOT NULL COMMENT '预售商品发货时间',
        Specs: {},
        GoodsState: 1,          //商品状态 0下架，1正常，10违规（禁售）
        GoodsVerify: 1,     //商品审核 1通过，0未通过，10审核中
    }
    if( action ) {
        init.Specs[ action.data ] = {}
        init.Specs[ action.data ][ 'values' ] = {}
        init.Specs[ action.data ][ 'values' ][ state.specValueId ] = { SpValueName: '', SpValueSort: 0 }
    }


    return init
}

const init = {
    error: {
        goods: {},
        goodsCommon: {},
    },

    goodsId: 0,
    specValueId: 0,

    goods: null,

    goodsCommon: {
        GoodsName: '',
        GoodsJingle: '',            //'商品广告词'q
        GcId1: 0,
        GcId2: 0,
        GcId3: 0,
        GcName: '',                 //'商品分类',
        StoreId: 0,
        StoreName: '',
        BrandId: 0,                  //int(10) unsigned NOT NULL COMMENT '品牌id',q
        BrandName: '',                //varchar(100) NOT NULL COMMENT '品牌名称',q
        TypeId: 0,                   //int(10) unsigned NOT NULL DEFAULT '0' COMMENT '类型id',q
        GoodsImage: '',               //mage varchar(100) NOT NULL COMMENT '商品主图',q
        GoodsImages: [],
        GoodsBody: [],                //text NOT NULL COMMENT '商品内容',q
        GoodsState: 1,               // tinyint(3) unsigned NOT NULL COMMENT '商品状态 0下架，1正常，10违规（禁售）,  20未编辑完成',q
        GoodsVerify: 1,              //(3) unsigned NOT NULL COMMENT '商品审核 1通过，0未通过，10审核中',q
        GoodsVerifyremark: '',        //varchar(255) DEFAULT NULL COMMENT '审核失败原因',q
        GoodsPrice: 0,               // decimal(10,2) NOT NULL COMMENT '商品价格',q
        GoodsSerial: '',              // varchar(50) NOT NULL COMMENT '商家编号',
        GoodsStorage: 0,             //商品库存
        GoodsStorageSlarm: 0,        // tinyint(3) unsigned NOT NULL COMMENT '库存报警值',
        TransportId: 0,              // mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '运费模板',
        TransportTitle: '',           //varchar(60) NOT NULL DEFAULT '' COMMENT '运费模板名称',
        GoodsCommend: 0,             // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '商品推荐 1是，0否，默认为0',
        GoodsFreight: 0,             // decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '运费 0为免运费',
        GoodsVat: 0,                 // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否开具增值税发票 1是，0否',
        Areaid_1: 0,                 // int(10) unsigned NOT NULL COMMENT '一级地区id',
        Areaid_2: 0,                 // int(10) unsigned NOT NULL COMMENT '二级地区id',
        GoodsStcids: '',              // varchar(255) NOT NULL DEFAULT '' COMMENT '店铺分类id 首尾用,隔开',
        PlateidTop: 0,               // int(10) unsigned DEFAULT NULL COMMENT '顶部关联板式',
        PlateidBottom: 0,            // int(10) unsigned DEFAULT NULL COMMENT '底部关联板式',
        IsVirtual: 0,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为虚拟商品 1是，0否',
        VirtualIndate: 0,            //int(10) unsigned DEFAULT NULL COMMENT '虚拟商品有效期',
        VirtualLimit: 0,             // tinyint(3) unsigned DEFAULT NULL COMMENT '虚拟商品购买上限',
        VirtualInvalidRefund: 0,     // tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否允许过期退款， 1是，0否',
        IsFcode: 0,                  // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否为F码商品 1是，0否',
        IsAppoint: 0,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预约商品 1是，0否',
        AppointSatedate: 0,          // int(10) unsigned NOT NULL COMMENT '预约商品出售时间',
        IsPresell: 0,                // tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否是预售商品 1是，0否',
        PresellDeliverdate: 0,       // int(10) unsigned NOT NULL COMMENT '预售商品发货时间',
        Specs: [],
    }
}
