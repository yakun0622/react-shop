/**
 * Created by wangyakun on 2016/11/19.
 */
import {M, RD, Z, F, MM} from '../../../common'
import * as t from '../type'


export default (state = {}, action) => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[t.STORE_ORDER_BILL_LOAD] = (state, data, id, oldData, count) => {
    state.orderBillList = data
    state.count = count
    return state
}