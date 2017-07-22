/**
 * Created by wangyakun on 16/9/10.
 */
import {M, Z, RD, F, LR, L, D} from '../../../common'

import * as TYPE from '../../../actions/type'
import initState from '../../../store/initState'

export default (state = {areaName: initState['areaName']}, action = '') => {
    if (c.hasOwnProperty(action.type)) {
        return RD(M(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[TYPE.STORE_TRANSPORT_LOAD] = (state, data, id, oldData, count) => {
    if (data) {
        state.transportList = data
        state.count = count
    }
    return state
}

c[TYPE.STORE_TRANSPORT_AREA_CHANGE] = (state, data, id, oldData, count) => {
    state.checkedArea = data
    state.checkedAreaInfo = buildAreaData(state, data)
    L(' STORE_TRANSPORT_AREA_CHANGE state.......', state)
    return state
}

c[TYPE.STORE_TRANSPORT_ADD] = (state, data, id, oldData, count) => {
    if (data) {
        L('新增运费模板成功...')
        D(TYPE.STORE_TRANSPORT_LOAD)
    } else {
        L('新增运费模板失败...')
    }
    return state
}


c[TYPE.STORE_TRANSPORT_DELETE] = (state, data, id, oldData, count) => {
    if (data) {
        L('删除运费模板成功...')
        D(TYPE.STORE_TRANSPORT_LOAD)
    } else {
        L('删除运费模板失败...')
    }
    return state
}

c[TYPE.STORE_TRANSPORT_EXTENDS_ADD] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const transportList = state.transportList
    const transport = state.transportList[index]
    let ext = transport.Extends
    const addExt = {
        Id: null,
        AreaId: "",
        TopAreaId: "",
        AreaName: "未添加地区",
        Snum: 0,
        Sprice: 0,
        Xnum: 0,
        Xprice: 0,
        IsDefault: 2,
        TransportId: transport.Id,
        TransportTitle: transport.Title,
        FreeLine: 0,
        DefalutPrice: 0,
        editable: true
    }
    ext.push(addExt)
    transport.Extends = ext
    transportList[index] = transport
    state.transportList = transportList
    return state
}

//可编辑状态
c[TYPE.STORE_TRANSPORT_EDITABLE] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    state.transportList[index].editable = true
    return state
}

//内容编辑
c[TYPE.STORE_TRANSPORT_EDIT] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const name = data.Name
    const value = data.Value
    state.transportList[index][name] = value
    return state
}

//内容编辑保存
c[TYPE.STORE_TRANSPORT_EDIT_SAVE] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = oldData.Index
    state.transportList[index].editable = false
    return state
}

//取消编辑状态
c[TYPE.STORE_TRANSPORT_EDIT_CANCEL] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    state.transportList[index].Title = data.Title
    state.transportList[index].editable = false
    return state
}


//extends 可编辑状态
c[TYPE.STORE_TRANSPORT_EXTENDS_EDITABLE] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const extIndex = data.ExtIndex
    state.transportList[index].Extends[extIndex].editable = true
    return state
}

//extends 内容编辑
c[TYPE.STORE_TRANSPORT_EXTENDS_EDIT] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const extIndex = data.ExtIndex
    const name = data.Name
    const value = data.Data
    state.transportList[index].Extends[extIndex][name] = value
    return state
}

//extends 地区编辑
c[TYPE.STORE_TRANSPORT_EXTENDS_EDIT_AREA_SAVE] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const extIndex = data.ExtIndex
    state.transportList[index].Extends[extIndex].AreaName = data.AreaName
    state.transportList[index].Extends[extIndex].AreaId = data.AreaId
    state.transportList[index].Extends[extIndex].TopAreaId = data.TopAreaId
    return state
}

//extends 取消编辑状态
c[TYPE.STORE_TRANSPORT_EXTENDS_EDIT_CANCEL] = (state, data, id, oldData, count) => {
    // L('oldData', oldData)
    const index = data.Index
    const extIndex = data.ExtIndex
    state.transportList[index].Extends[extIndex].AreaName = data.AreaName
    state.transportList[index].Extends[extIndex].FreeLine = data.FreeLine
    state.transportList[index].Extends[extIndex].DefalutPrice = data.DefalutPrice
    state.transportList[index].Extends[extIndex].editable = false
    return state
}

c[TYPE.STORE_TRANSPORT_EXTENDS_DELETE] = (state, data, id, oldData, count) => {
    if (data) {
        L('删除运费模板成功...', data)
        const transportIndex = oldData.transportIndex
        const extIndex = oldData.extIndex
        let extend = state.transportList[transportIndex].Extends
        extend.splice(extIndex, 1)
        state.transportList[transportIndex].Extends = extend
    } else {
        L('删除运费模板失败...')
    }
    return state
}



function buildAreaData(state, data) {
    let province = {}, city = {}, county = {}, result = {}
    F(data, (areaId, index)=> {
        //省id
        if (areaId < 36) {
            province[areaId] = state.areaName[areaId]
        } else if ((areaId >= 36 && areaId < 535) || areaId == 45055) {
            city[areaId] = state.areaName[areaId]
        } else {
            county[areaId] = state.areaName[areaId]
        }
    })
    result.province = province
    result.city = city
    result.county = county
    return result
}

const newTransport = {
    Id: null,
    Title: '',
    SendTplId: 1,
    UpdateTime: null,
    Extends: [{
        Id: null,
        AreaId: "",
        TopAreaId: "",
        AreaName: "全国",
        IsDefault: 1,
        TransportId: null,
        TransportTitle: '',
        DefalutPrice: 0,
        FreeLine: 0
    }]
}