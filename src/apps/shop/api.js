/**
 * Created by kenn on 16/9/8.
 */
import * as t from './type'
let api = {}

/**
 * 商品相关
 * @type {{method: string, url: string, isLogin: boolean}}
 */
api[t.STORE_GOODS_COMMON_ONLINE_LOAD] = {method: 'GET', url: 'store/goods_common/online', isLogin: true}
api[t.STORE_GOODS_COMMON_OFFLINE_LOAD] = {method: 'GET', url: 'store/goods_common/offline', isLogin: true}
api[t.STORE_GOODS_DELETE] = {method: 'POST', url: 'goods_common/delete_goods', isLogin: true}
api[t.STORE_GOODS_COMMON_UNSHOW] = {method: 'POST', url: 'goods_common/unshow_goods', isLogin: true}
api[t.STORE_GOODS_COMMON_SHOW] = {method: 'POST', url: 'goods_common/show_goods', isLogin: true}
api[t.STORE_STATIC] = {method: 'get', url: 'store/static/simple', isLogin: true}

/**
 * 订单相关
 * @type {{method: string, url: string, isLogin: boolean}}
 */
api[t.STORE_ORDERS_LOAD] = {method: 'get', url: 'store/orders/list', isLogin: true}
api[t.STORE_ORDER_GOODS_LOAD] = {method: 'post', url: 'store/orders/goodses', isLogin: true}
api[t.STORE_ORDER_INFO] = {method: 'POST', url: 'store/orders/orderInfo', isLogin: true}
api[t.STORE_ORDER_CANCEL] = {method: 'POST', url: 'store/orders/changeState', isLogin: true}
api[t.ORDER_SEND_LOAD] = {method: 'POST', url: 'store_deliver/send_info', isLogin: true}
api[t.ORDER_SEND_ADD] = {method: 'POST', url: 'store_deliver/send_add', isLogin: true}
api[t.ORDER_SHIPPINGFEE_EDIT] = {method: 'POST', url: 'store/orders/edit_shippingFee', isLogin: true}

/**
 * 退货
 * @type {{method: string, url: string, isLogin: boolean}}
 */
api[t.STORE_REFUND_RETURN_LOAD] = {method: 'get', url: 'store/refund_return/list', isLogin: true}

export const STORE = 'store'
api[ t.STORE_LOAD ] = {method: 'get', url: 'store', isLogin: true }

/**
 * 物流相关
 * @type {{method: string, url: string, isLogin: boolean}}
 */

api[t.STORE_TRANSPORT_LOAD] = {method: 'get', url: 'transport/list', isLogin: true}
api[t.STORE_TRANSPORT_ADD] = {method: 'post', url: 'transport/add', isLogin: true}
api[t.STORE_TRANSPORT_EDIT_SAVE] = {method: 'put', url: 'transport', isLogin: true}
api[t.STORE_TRANSPORT_DELETE] = {method: 'delete', url: 'transport', isLogin: true}
api[t.STORE_TRANSPORT_EXTENDS_SAVE] = {method: 'post', url: 'transport_extend/save', isLogin: true}
api[t.STORE_TRANSPORT_EXTENDS_DELETE] = {method: 'post', url: 'transport_extend/delete', isLogin: true}

api[t.DADDRESS_LOAD] = {method: 'get', url: 'daddress', isLogin: true}
api[t.DADDRESS_SET_DEFAULT] = {method: 'put', url: 'daddress/default', isLogin: true}
api[t.DADDRESS_DELETE_BY_ID] = {method: 'delete', url: 'daddress/', isLogin: true}
api[t.DADDRESS_ADD_SAVE] = {method: 'post', url: 'daddress/', isLogin: true}
api[t.DADDRESS_EDIT_SAVE] = {method: 'put', url: 'daddress/', isLogin: true}

api[t.STORE_EXTEND_LOAD] = {method: 'get', url: 'store_extend', isLogin: true}
api[t.STORE_EXTEND_ADD] = {method: 'post', url: 'store_extend', isLogin: true}
api[t.STORE_FREE_FREIGHT_SAVE] = {method: 'post', url: 'store/free_freight', isLogin: true}

api[t.EXPRESS_LOAD] = {method: 'get', url: 'express', isLogin: true}

api[t.STORE_OFFPAY_AREA_LOAD] = {method: 'get', url: 'offpay_area', isLogin: true}
api[t.STORE_OFFPAY_AREA_SAVE] = {method: 'post', url: 'offpay_area/save', isLogin: true}

/**
 * 结算
 * @type {{method: string, url: string, isLogin: boolean}}
 */
api[t.STORE_ORDER_BILL_LOAD] = {method: 'get', url: 'store/order_bill/list', isLogin: true}

export default api
