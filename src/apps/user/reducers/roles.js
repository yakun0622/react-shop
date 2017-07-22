/**
 * Created by kenn on 16/9/16.
 */
import { M, MM, Z, RD, LR } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = null, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( MM(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.ROLE_LOAD] = ( state, data ) => {
    if( data ) {
        if( !state ) {
            state = {}
        }
        state = M(state, Z(data))
    }
    return state
}

c[ t.ROLE_ADD] = ( state, roleId, id, requestData ) => {
    if( !state ) {
        state = {}
    }
    requestData.Id = roleId
    requestData.RoleLock = 1
    state[roleId] = requestData
    return state
}

c[ t.ROLE_EDIT] = ( state, data, id, requestData ) => {
    //LR('role', t.ROLE_EDIT, requestData)
    state[requestData.Id] = requestData
    return state
}

c[ t.ROLE_LOCK] = ( state, data, id ) => {
    state[id].RoleLock = 0
    return state
}

c[ t.ROLE_UNLOCK] = ( state, data, id ) => {
    state[id].RoleLock = 1
    return state
}
