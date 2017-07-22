/**
 * Created by kenn on 16/9/8.
 */
import * as t from './type'
let api = {}

api[ t.USER_LOAD ] = { url: 'member', isLogin: true }
api[ t.USER_LIST_LOAD ] = { method: 'post', url: 'member' }
api[ t.USER_GROUP_LOAD ] = 'group'
api[ t.USER_JION_GROUP_LOAD ] = 'member_group'
api[t.USER_GROUPS_TAG_LOAD] = 'tag/user_group_tags'

api[ t.ORDER_ADD ] = 'POST:order'


api[ t.GOODS_LOAD ] = 'sun_goods'

/**
 * 购物车
 * @type {string}
 */
api[ t.CART_ADD ] = { method: 'POST', url: 'cart' }
api[ t.CART_LOAD ] = 'cart'
api[ t.CART_REMOVE ] = 'delete:cart'
api[ t.CART_COUNT ] = 'post:cart/change_num'

/**
 * 收藏夹
 * @type {string}
 */
api[ t.LIKE_ADD ] = 'POST:favorites'
api[ t.LIKE_REMOVE ] = 'post:favorites/remove'
api[ t.LIKE_REMOVE_ALL ] = 'post:favorites/remove'
api[ t.LIKE_COUNT ] = 'post:favorites/change_num'

api[ t.LIKE_LOAD ] = 'favorites'
api[ t.LIKE_FOLDER_ADD ] = 'POST:favorites_folder'
api[ t.LIKE_FOLDER_LOAD ] = 'favorites_folder'
api[ t.LIKE_EDIT_FOLDERNAME ] = 'PUT:favorites_folder'
api[ t.LIKE_FOLDER_REMOVE ] = 'DELETE:favorites_folder'

api[t.TRANSORTFEE] = 'post:order/transportfee'

/**
 * 用户地址
 * @type {string}
 */
api[ t.ADDRESS_LOAD ] = 'address'
api[ t.ADDRESS_DEFAULT ] = 'PUT:address'
api[ t.ADDRESS_EDIT ] = 'PUT:address'
api[ t.ADDRESS_ADD ] = 'POST:address'
api[ t.ADDRESS_REMOVE ] = 'DELETE:address'

/**
 * 搜索api
 * @type {string}
 */
api[ t.SEARCH ] = 'POST:search/goods/filter|0'
api[ t.SEARCH_SHOP ] = 'search/shop'
api[ t.SEARCH_GOODS ] = 'search/goods'
api[ t.SEARCH_GOODS_COMMON ] = 'POST:search/goods_common|0'


export default api