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

c[TYPE.STORE_ORDERS_LOAD] = (state, data, id, requestData, count) => {
    state.orderLoad = requestData
    state.orderList = data
    state.count = count

    return state
}


c[TYPE.STORE_ORDER_CANCEL] = (state, data, id) => {
    if (data) {
        state.result = data
        D(TYPE.STORE_ORDERS_LOAD, state.orderLoad)
    }
    return state
}
c[TYPE.ORDER_SHIPPINGFEE_EDIT] = (state, data, id, requestData) => {
    let s = M(state)
    if (data) {
        D(TYPE.STORE_ORDERS_LOAD, state.orderLoad)
    }
    return s
}

c[TYPE.STORE_ORDER_GOODS_LOAD] = (state, data, option, oldData, count) => {

    if (data) {
        data.goodses.forEach((goods, i) => {
            state.orderList.forEach((order, dataIndex) => {
                if (order.Id == oldData.OrderId) {

                    if (!state.orderList[dataIndex].goodses) {
                        state.orderList[dataIndex].goodses = {}
                    }

                    state.orderList[dataIndex].goodses[goods.Id] = goods

                }
            })
        })
    }

    return state
}