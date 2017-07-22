/**
 * Created by kenn on 16/8/6.
 */
import {M, Z, RD, setCache, L} from '../common'

import * as t from '../actions/type'

export default (state = {}, action) => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[t.AREA_MULTI_LOAD] = (state, data) => {
    if (data) {
        setCache('area', data, 'LS')
    }
    L('AREA_MULTI_LOAD.....', data)
    return M(state, data)
}