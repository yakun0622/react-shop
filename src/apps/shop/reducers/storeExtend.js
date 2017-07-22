/**
 * Created by wangyakun on 2016/11/19.
 */
import {M, RD, Z, F, MM} from '../../../common'
import * as TYPE from '../type'


export default (state = {}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}
/**
 * 载入商户快递
 * @param state
 * @param data
 * @param id
 * @param oldData
 * @param count
 * @returns {*}
 */
c[TYPE.STORE_EXTEND_LOAD] = (state, data, id, oldData, count)=> {
    if (data.length == 1) {
        return M(state, data[0])
    } else {
        return state
    }
}


c[TYPE.STORE_EXTEND_ADD] = (state, data, id, oldData, count)=> {
    state.Express = data
    return state
}