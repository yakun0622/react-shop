import {M, RD, Z, F, LR, D} from '../../../common'
import * as TYPE from '../../../actions/type'


export default (state = {}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}
/**
 * 发货地址列表载入
 * @param state
 * @param data
 * @param id
 * @param oldData
 * @param count
 * @returns {{daddress: {}, count: *}}
 */
c[TYPE.DADDRESS_LOAD] = (state, data, id, oldData, count)=> {
    let s = {
        daddress: Z(data),
        count: count
    }
    return s
}

c[TYPE.DADDRESS_SET_DEFAULT] = (state, data, id, oldData, count)=> {
    let s = M(state)
    if (s.daddress) {
        F(s.daddress, (item, key)=> {
            item.IsDefault = key == id ? '1' : '0'
        })
    }
    // LR('DADDRESS', TYPE.DADDRESS_SET_DEFAULT, id)
    return s
}

c[TYPE.DADDRESS_DELETE_BY_ID] = (state, data, id, oldData, count)=> {
    let s = M(state)
    if (s.daddress) {
        F(s.daddress, (item, key)=> {
            if (key == id)
                delete s.daddress[key]
        })
    }
    return s
}

c[TYPE.DADDRESS_ADD_SAVE] = (state, data, id, oldData, count)=> {
    D(TYPE.DADDRESS_LOAD)
    return state
}

c[TYPE.DADDRESS_EDIT_SAVE] = (state, data, id, oldData, count)=> {
    D(TYPE.DADDRESS_LOAD)
    return state
}

