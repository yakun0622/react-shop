/**
 * Created by wangyakun on 2016/11/19.
 */
import {M, RD, Z, F, MM, L} from '../../../common'
import * as t from '../type'


export default (state = null, action) => {
    if (c.hasOwnProperty(action.type)) {
        return RD(MM(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[t.STORE_OFFPAY_AREA_LOAD] = (state, data) => {
    let temp = []
    if (data && data.AreaId) {
        let areaIds = data.AreaId.substring(1, data.AreaId.length - 1)
        temp = areaIds.split(',')
    }
    let areaIds = []
    F(temp, (value, key) => {
        areaIds.push(parseInt(value))
    })
    return areaIds
}

c[t.STORE_OFFPAY_AREA_CHANGE] = (state, data) => {
    L('STORE_OFFPAY_AREA_CHANGE......', data)
    return data
}