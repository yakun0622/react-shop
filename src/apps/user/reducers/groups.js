/**
 * Created by kenn on 16/9/15.
 */
import { M, MM, Z, RD, UR, F, LR } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'


export default ( state = {}, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( MM(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.GROUP_OWNER_LOAD] = ( state, data ) => {
    if( data ) {
        state.ownerGroups = Z(data)
    }
    return state
}

c[ t.GROUP_JOIN_LOAD] = ( state, datas ) => {
    if( datas ) {
        datas.forEach(( data ) => {

            switch(data.Status) {
                case 0:
                    if( !state.rejectGroups ) {
                        state.rejectGroups = {}
                    }
                    state.rejectGroups[data.GroupId] = data
                    break
                case 1:
                    if( !state.applyGroups ) {
                        state.applyGroups = {}
                    }
                    state.applyGroups[data.GroupId] = data
                    break
                case 2:
                    if( !state.passGroups ) {
                        state.passGroups = {}
                    }
                    state.passGroups[data.GroupId] = data
                    break
                case 3:
                    if( !state.joinGroups ) {
                        state.joinGroups = {}
                    }
                    state.joinGroups[data.GroupId] = data
                    break
                default:
                    break
            }
        })
    }
    //LR('groups', t.GROUP_JOIN_LOAD, state)
    return state
}

c[ t.GROUP_CHILD_LOAD] = ( state, data ) => {
    if( !state.childGroups ) {
        state.childGroups = {}
    }
    state.childGroups = M(state.childGroups, Z(data))
    return state
}

c[ t.GROUP_ADD] = ( state, groupId, id, requestData ) => {
    if( requestData.GroupParent == 0 ) {
        if( !state.ownerGroups ) {
            state.ownerGroups = {}
        }
        requestData.Id = groupId
        state.ownerGroups[groupId] = requestData
    } else {
        if( !state.childGroups ) {
            state.childGroups = {}
        }
        requestData.Id = groupId
        state.childGroups[groupId] = requestData
    }
    LR('group', t.GROUP_ADD, state)
    return state
}

c[ t.GROUP_EDIT] = ( state, data, id, requestData ) => {
    if( state.ownerGroups[id] ) {
        state.ownerGroups[id] = requestData
    } else if( state.joinGroups[id] ) {
        state.joinGroups[id] = requestData
    } else {
        state.childGroups[id] = requestData
    }
    return state
}

c[t.SEARCH_GROUP] = ( state, data, id, old, count ) => {
    if( !state.search ) {
        state.search = {}
    }


    state.search.datas = Z(data)
    state.search.count = count

    F( state.search.datas, ( group, id ) => {
        if( state.joinGroups && state.joinGroups[id] ) {
            delete state.search.datas[id]
            state.search.count -= 1
        }
        if( state.applyGroups && state.applyGroups[id] ) {
            delete state.search.datas[id]
            state.search.count -= 1
        }
        if( state.passGroups && state.passGroups[id] ) {
            delete state.search.datas[id]
            state.search.count -= 1
        }
    } )

    return state
}

c[t.GROUP_SEARCH_CLEAR] = ( state ) => {
    if( state.search ) {
        delete state.search
    }
    return state
}

c[t.GROUP_MEMBER_APPLY] = ( state, data, group ) => {
    if( !state.applyGroups ) {
        state.applyGroups = {}
    }

    group.MgId = data
    group.RoleId = 0
    group.status = 1
    state.applyGroups[group.Id] =group
    return state
}





