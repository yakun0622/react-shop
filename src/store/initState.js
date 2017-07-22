/**
 * Created by kenn on 16/7/3.
 */
/**
 * 初始化store
 * 服务端请求数据,命名规范: 数据库名称:{}
 * 如果是多条数据,数据库名称+s: {表字段名: { }} 格式写入
 * 本地状态数据,命名规范: 状态名 + ST
 */
import * as api from './api'
import goods from './initStates/goods'
import goodsCommon from './initStates/goodsCommon'
import goodsEdit from './initStates/goodsEdit'
import categorys from './initStates/categorys'
import cart from './initStates/cart'
import like from './initStates/like'
import homePage from './initStates/homePage'
import areaname from './initStates/areaname'

let initState = {}
initState.waiting = []

initState[api.CONFIRM_DIALOG] = {open: false}


/** 首页数据
 * @type {{}}
 */
initState[api.HOME_PAGE] = homePage

/**
 * 登录用户数据
 * 如果为null, 则表示用户未登录
 */
initState[api.USER] = null


/**
 * 商品分类,数据格式
 * id: {name, icon, sort, parent, sku}
 * id为商品id
 */
//initState[api.CATEGORYS] = categorys
//initState[api.CATEGORYS] = {}

/**
 * 删选项
 */
initState[api.COOPTS] = {}
// {
//     brand: {1: '苹果', 2: 'IBM', 3: '联想'},
//     color: {
//         1: {name: '红色', value: 'red', spId: 1, spName: '颜色', type: 1},
//         2: {name: '蓝色', value: 'blue', spId: 1, spName: '颜色', type: 1},
//         3: {name: '绿色', value: 'green', spId: 1, spName: '颜色', type: 1}
//     }
// }

/**
 * 搜索选项
 */
initState[api.SEARCH] = null

/**
 * 规格
 */
initState[api.SPECS] = {
    1: {name: '颜色', typeId: 1}
}

/**
 * 选择状态
 * @type {{categorys: number}}
 */
//initState[api.CHECKEDST] = {
//    overCategory: 1,
//        groupRootCheckedId : null,
//        groupCheckedId : null,
//        userMenuChecked : 1,
//        checkArea: null
//}

/**
 * 品牌
 * @type {{}}
 */
//initState['brands'] = {
//    1: 'Apple',
//    2: '三星'
//}


/**
 * 商品数据
 * 数据格式: sku: {
     *                  id
     *                  name
     *                  spec: {
     *                      specName: value
     *                      ......
     *                  }
     *                  ......
     *              }
 * sku定义
 */
//initState[api.GOODS] = goods
initState[api.GOODS] = {}

/**
 * 商品公共属性
 * @type {{}}
 */
//initState[api.GOODS_COMMON] = goodsCommon
//initState[api.GOODS_COMMON] = {}



/**
 * 购物车数据
 */
initState[api.CART] = {
    count: 0,
    datas: {}
}

/**
 * 收藏夹数据
 */
//initState[api.LIKE] = like
// {
//     fav: {},
//     goodsDatas: {},
//     goodsCommonDatas: {},
//     storeDatas: {}
// }

/**
 * 订单数据
 */
initState[api.ORDERS] = {}

/**
 * 用户地址数据
 */
initState[api.ADDRESS] = {}

/**
 * 地区
 */
initState[api.AREA] = {}

// initState[api.AREA_MULTI] = areaMulti


initState['areaName'] = areaname



export default initState