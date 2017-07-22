/**
 * api定义规则,首先定义api名称,对应store中的key
 * 在定义api, key必须和type名称保持一致, 这样网路请求中间件就可以判断type 对应的API是否存在
 * 如果存在就请求网络
 */
import * as t from '../actions/type'

import home from '../apps/home/api'
import shop from '../apps/shop/api'
import user from '../apps/user/api'
import common from '../apps/common/api'

let api = {}

export const HOME_PAGE = 'homePage'
export const CONFIRM_DIALOG = 'confirmDialog'
export const WAITING = 'waiting'

//user
api[t.ACCOUNT_EXIST] = 'POST:login/exist|0'
api[ t.USER_LOGIN ] = 'POST:login|0'
api[ t.USER_LOGOUT ] = 'logout'
api[ t.USER_REGISTER ] = 'POST:register|0'
api[ t.USER_PHONE_NOEXIST ] = 'POST:register/noexist|0'
api[ t.PHONE_GET_CODE ] = 'register/sms|0'
api[ t.USER_PASSWORD_EXIST ] = 'post:member/password'
api[ t.USER_NAME_NOEXIST ] = 'post:member/name'
api[ t.USER_EMAIL_NOEXIST ] = 'post:member/email'
api[ t.USER_EDIT ] = 'put:member'

/**
 * 分类
 * @type {string}
 */
export const CATEGORYS = 'categorys'
api[ t.CATEGORY_LOAD ] = 'goods_class|0'

export const USER = 'user'

/**
 * 订单
 * @type {string}
 */
export const ORDERS = 'orders'

api[ t.ORDER_ADD ] = 'POST:order'


/**
 * 购物车
 * @type {string}
 */
export const CART = 'cart'

/**
 * 收藏夹
 * @type {string}
 */
export const LIKE = 'like'

/**
 * 用户地址
 * @type {string}
 */
export const ADDRESS = 'address'

/**
 * 地区
 * @type {string}
 */
export const AREA = 'area'
export const AREA_NAME = 'areaName'
export const AREA_MULTI = 'areaMulti'
api[ t.AREA_LOAD ] = 'area'
api[ t.AREA_MULTI_LOAD ] = 'area/get_area'

export const GOODS = 'goods'

export const GOODS_COMMON = 'goodsCommon'
api[ t.GOODS_COMMON_LIST_LOAD ] = 'goods_common|0'

export const CHECKEDST = 'checkedSt'

export const SPECS = 'specs'

export const COOPTS = 'coopts'

/**
 * 搜索api
 * @type {string}
 */
export const SEARCH = 'search'
api[t.SEARCH_GROUP] = 'group/search'

/**
 * 商品
 */
export const GOODS_EDIT = 'goodsEdit'
api[ t.GOODS_EDIT_SAVE ] = 'post:goods_common'
api[t.GOODS_TAG_LOAD] = 'goods_tag'
api[t.GOODS_TAG_SAVE] = 'POST:goods_tag'

api[t.GOODS_DATAS_LOAD] = 'goods/details|0'

/**
 * 品牌
 * @type {string}
 */
export const BRANDS = 'brands'
api[t.BRANDS_LOAD] = 'brand'

/**
 * 类型
 * @type {string}
 */
export const TYPES = 'types'
api[t.TYPES_LOAD] = 'type'

export const STOREGOODS = 'storeGoods'

export const STOREORDERS = 'storeOrders'

/**
 * 发货地址
 * @type {string}
 */
export const DADDRESS='daddress'


export default Object.assign(api, home, user, shop, common)