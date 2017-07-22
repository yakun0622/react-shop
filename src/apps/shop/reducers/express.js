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

c[t.EXPRESS_LOAD] = (state, data) => {
    return M(state, Z(data))
}