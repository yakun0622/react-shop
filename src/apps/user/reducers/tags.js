/**
 * Created by kenn on 16/9/19.
 */
import { M, MM, Z, RD, LR } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = {}, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( MM(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.TAG_LOAD] = ( state, data ) => {
    if( data ) {
        if( !state.tags ) {
            state.tags = {}
        }
        state.tags = M(state, Z(data))
    }
    return state
}

c[ t.TAG_ADD] = ( state, tagId, id, requestData ) => {
    if( !state.tags ) {
        state.tags = {}
    }
    requestData.Id = tagId
    requestData.TagLock = 1
    state.tags[tagId] = requestData
    return state
}

c[ t.TAG_SAVE] = ( state, data, id, requestData ) => {
    //LR('role', t.TAG_SAVE, requestData)
    state.tags[requestData.Id] = requestData
    return state
}

c[ t.TAG_LOCK] = ( state, data, id ) => {
    state.tags[id].TagLock = 0
    return state
}

c[ t.TAG_UNLOCK] = ( state, data, id ) => {
    state.tags[id].TagLock = 1
    return state
}

/**
 * 组共享标签
 */

c[t.TAG_SHARE_LOAD] = ( state, datas ) => {
    if( !state.shares ) {
        state.shares = []
    }

    //LR('tag', t.TAG_SHARE_LOAD, datas)
    state.shares.splice(state.shares.length, 0, ...datas)
    return state
}

c[t.TAG_SHARE] = ( state, datas, id, oldDatas ) => {
    const groupIds = JSON.parse(oldDatas.GroupIds)

    if( !state.shares ) {
        state.shares = []
    }

    groupIds.forEach(( id ) => {
        state.shares.push({TagId: oldDatas.TagId, GroupId: id})
    })
    return state
}

c[t.TAG_UNSHARE] = ( state, datas, id, oldDatas ) => {
    const groupIds = JSON.parse(oldDatas.GroupIds)

    groupIds.forEach(( groupId ) => {
        state.shares.forEach(( share, i ) => {
            if( share.TagId == oldDatas.TagId && share.GroupId == groupId ) {
                state.shares.splice(i, 1)
            }
        })
    })

    return state
}

/**
 * 角色标签
 */

c[t.TAG_ROLE_LOAD] = ( state, datas ) => {
    if( !datas ) {
        return state
    }

    if( !state.roleTags ) {
        state.roleTags = []
    }
    //LR('tag', t.TAG_SHARE_LOAD, datas)
    state.roleTags.splice(state.roleTags.length, 0, ...datas)
    return state
}

c[t.TAG_ROLE_ADD] = ( state, datas, id, oldDatas ) => {
    const tagIds = JSON.parse(oldDatas.TagIds)

    if( !state.roleTags ) {
        state.roleTags = []
    }

    tagIds.forEach(( id ) => {
        state.roleTags.push({RoleId: oldDatas.RoleId, TagId: id})
    })
    return state
}

c[t.TAG_ROLE_REMOVE] = ( state, datas, id, oldDatas ) => {
    const tagIds = JSON.parse(oldDatas.TagIds)
    LR('tag',t.TAG_ROLE_REMOVE, tagIds)
    tagIds.forEach(( tagId ) => {
        state.roleTags.forEach(( data, i ) => {
            if( data.RoleId == oldDatas.RoleId && data.TagId == tagId ) {
                state.roleTags.splice(i, 1)
            }
        })
    })

    return state
}


