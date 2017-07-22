/**
 * Created by wangyakun on 16/9/10.
 */
import {M, MM, Z, RD, F, LR, L, isObject, D} from '../../../common'

import * as TYPE from '../../../actions/type'


export default (state = {}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(MM(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[TYPE.STORE_GOODS_COMMON_OFFLINE_LOAD] = (state, data, id, requestData, count) => {
    state.offlineData = requestData
    state.goodsCommon = data
    state.count = count
    return state
}

c[TYPE.STORE_GOODS_COMMON_ONLINE_LOAD] = (state, data, id, requestData, count) => {
    state.onlineData = requestData
    state.goodsCommon = data
    state.count = count
    return state
}

c[TYPE.STORE_GOODS_DELETE] = (state, data, id, requestData) => {
    if (data) {
        reloadData(requestData.type, state)
    }
    return state
}

c[TYPE.STORE_GOODS_COMMON_SHOW] = (state, data, id, requestData) => {
    if (data) {
        reloadData(requestData.type, state)
    }
    return state
}

c[TYPE.STORE_GOODS_COMMON_UNSHOW] = (state, data, id, requestData) => {
    if (data) {
        reloadData(requestData.type, state)
    }
    return state
}

const reloadData = (type, state) => {
    L('type', type)
    if (type == 'online') {
        D(TYPE.STORE_GOODS_COMMON_ONLINE_LOAD, state.onlineData)
    } else {
        D(TYPE.STORE_GOODS_COMMON_OFFLINE_LOAD, state.offlineData)
    }
}