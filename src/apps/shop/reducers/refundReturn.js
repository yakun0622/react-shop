/**
 * Created by wangyakun on 16/9/10.
 */
import {M, Z, RD, F, LR, L} from '../../../common'

import * as TYPE from '../../../actions/type'


export default (state = {}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[TYPE.STORE_REFUND_RETURN_LOAD] = (state, data, id, oldData, count) => {
    L("aaaaaaaa.....")
    if (data != 10) {
        state.refundReturnList = Z(data)
        state.count = count
    }
    L("state",state)
    return state
}
