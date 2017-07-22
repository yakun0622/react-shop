/**
 * Created by kenn on 16/7/4.
 */

import {M, Z, RD, LR, UR, MM, delCache, setCache, getCache} from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'
import {USER} from '../store/api'


export default (state = null, action) => {
    if (c.hasOwnProperty(action.type)) {
        return RD(MM(state), action, c)
    } else {
        return state
    }
}

let c = {}

c[t.USER_LOAD] = (state, data) => {
    // LR(USER, t.USER_LOAD, data)
    if (!state) {
        state = {}
    }

    if (data) {
        state.name = data.MemberName
        state.icon = data.MemberAvatar == '' ? 'default_icon.png' : data.MemberAvatar
        state.id = data.Id
        state.phone = data.MemberMobile
        state.email = data.MemberEmail == '' ? null : data.MemberEmail
        state.sex = data.MemberSex
        state.trueName = data.MemberTruename
    }
    return state
}


c[t.USER_LOGOUT] = (state, data) => {
    // localStorage.removeItem('Authorization')
    delCache('Authorization')
    state = null
    location.href = '/'
    return state
}

c[t.USER_GROUP_LOAD] = (state, data) => {
    if (!state) {
        state = {}
    }

    if (data) {
        state.ownerGroups = Z(data)
    }
    LR(USER, t.USER_GROUP_LOAD, state)
    return state
}

c[t.USER_JION_GROUP_LOAD] = (state, data) => {
    if (!state) {
        state = {}
    }

    if (data) {
        state.joinGroups = Z(data, 'GroupId')
    }
    return state
}

c[t.USER_LOGIN] = (state, data) => {
    //LR(USER, t.USER_LOGIN + '-data', data)
    // localStorage.setItem('Authorization', data)
    setCache('Authorization', data)
    location.href = '/'
    const user = UR()
    LR(USER, t.USER_LOGIN, user)
    state.name = user.name
    return state
}

c[t.USER_REGISTER] = (state, data) => {
    //LR(USER, t.USER_REGISTER + '-data', data)
    // localStorage.setItem('Authorization', data)
    setCache('Authorization', data)
    const user = UR()
    //LR(USER, t.USER_LOGIN, user)
    if (!state) {
        state = {}
    }
    state.name = user.name
    return state
}

c[t.USER_EDIT] = (state, data, id, old) => {
    state.name = old.MemberName
    if (old.MemberAvatar) {
        state.icon = old.MemberAvatar == '' ? 'default_icon.png' : data.MemberAvatar
    }
    state.phone = old.MemberMobile
    state.sex = old.MemberSex
    if (old.MemberEmail) {
        state.email = old.MemberEmail == '' ? null : old.MemberEmail
    }

    LR(USER, t.USER_REGISTER + '-data', data)
    return state
}

c[t.USER_GROUPS_TAG_LOAD] = (state, datas, id, old) => {
    if (!datas) {
        return state
    }
    //自己创建组的标签
    if (datas.ownerGroupTags) {
        datas.ownerGroupTags.forEach((tag) => {
            if (!state.ownerGroups[tag.GroupId].tags) {
                state.ownerGroups[tag.GroupId].tags = {}
            }
            state.ownerGroups[tag.GroupId].tags[tag.TagId] = tag.TagName
        })
    }
    //加入的组,但是顶层组的标签
    if (datas.joinOwnerGroupTags) {
        datas.joinOwnerGroupTags.forEach((tag) => {
            if (!state.joinGroups[tag.GroupId].tags) {
                state.joinGroups[tag.GroupId].tags = {}
            }
            state.joinGroups[tag.GroupId].tags[tag.TagId] = tag.TagName
        })
    }
    // 加入组但是子组的标签
    if (datas.joinGroupTags) {
        datas.joinGroupTags.forEach((tag) => {
            if (!state.joinGroups[tag.GroupId].tags) {
                state.joinGroups[tag.GroupId].tags = {}
            }
            state.joinGroups[tag.GroupId].tags[tag.TagId] = tag.TagName
        })
    }

    //LR(USER, t.USER_GROUPS_TAG_LOAD + '-data', state)
    return state
}

