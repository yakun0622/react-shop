/**
 * Created by kenn on 16/7/4.
 */

import {M, MM, Z, RD, F, LR, L, setCache, delCache} from '../../../common'

import * as t from '../type'


export default (state = null, action) => {
    if (c.hasOwnProperty(action.type)) {
        return RD(MM(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[t.STORE_LOAD] = (state, data) => {

    if (!state) {
        state = {}
    }
    if (data) {
        state.name = data.MemberName
        state.storeName = data.StoreName
        state.icon = data.MemberAvatar || 'default_icon.png'
        state.id = data.Id
        state.phone = data.MemberMobile
        state.email = data.MemberEmail || ''
        state.sex = data.MemberSex
    }

    // LR('STORE', t.STORE_LOAD + '-data', data)

    return state
}


c[t.STORE_LOGOUT] = (state, data) => {
    // localStorage.removeItem('Authorization')
    delCache('Authorization')
    state = null
    location.href = '/'
    return state
}

c[t.STORE_LOGIN] = (state, data) => {
    //LR(USER, t.STORE_LOGIN + '-data', data)
    // localStorage.setItem('Authorization', data)
    setCache('Authorization', data)
    location.href = '/'
    const user = UR()
    state.name = user.name
    return state
}

//商户首页统计
c[t.STORE_STATIC] = (state, data)=> {
    if (data) {
        state.storeStatic = data
    }
    LR('STORE11111', t.STORE_STATIC, state)
    return state
}

c[t.STORE_EDIT] = (state, data, id, old) => {
    state.name = old.MemberName
    if (old.MemberAvatar) {
        state.icon = old.MemberAvatar == '' ? 'default_icon.png' : data.MemberAvatar
    }
    state.phone = old.MemberMobile
    state.sex = old.MemberSex
    if (old.MemberEmail) {
        state.email = old.MemberEmail == '' ? null : old.MemberEmail
    }

    return state
}

/**
 * 载入商户信息
 * @param state
 * @param data
 * @param id
 * @param oldData
 * @param count
 * @returns {*}
 */
// c[t.STORE_LOAD] = (state, data, id, oldData, count)=> {
//     L('aaaaaa')
//     return M(state, data)
// }

/**
 * 设置免运费额度
 * @param state
 * @param data
 * @param id
 * @param oldData
 * @param count
 * @returns {*}
 */
c[t.STORE_FREE_FREIGHT_SAVE] = (state, data, id, oldData, count)=> {
    return M(state, data)
}

c[t.STORE_FREE_FREIGHT_CHANGE] = (state, data, id, oldData, count)=> {
    return M(state, {StoreFreePrice: data})
}
