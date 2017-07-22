/**
 * Created by wangyakun on 16/9/10.
 */
import {M, Z, RD, F, LR, L, D} from '../../../common'

import * as TYPE from '../../../actions/type'


export default (state = {}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[TYPE.STORE_ORDER_INFO] = (state, data, id, oldData, count) => {
    if (data) {
        state.orderInfo = data
    }
    return state
}

c[TYPE.ORDER_SEND_LOAD] = (state, data, id, oldData, count) => {
    if (data) {
        state.orderInfo = data.orderInfo
        state.daddressInfo = data.daddressInfo
        state.myExpressList = data.myExpressList
        state.expressList = data.expressList
    }
    return state
}

c[TYPE.ORDER_SEND_ADD] = (state, data, id, oldData, count) => {
    if (data) {
        D(TYPE.STORE_ORDERS_LOAD, state.orderLoad)
    }
    return state
}


c[TYPE.STORE_ORDERS_LOAD] = (state, data, id, requestData, count) => {
    state.orderLoad = requestData
    return state
}