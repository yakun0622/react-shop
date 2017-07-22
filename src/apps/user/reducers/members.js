/**
 * Created by kenn on 2016/9/23.
 */
import { MM, Z, RD, C, LR, getTimestamp } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = {}, action ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( MM( state ), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.MEMBER_LOAD ] = ( state, datas ) => {
    if ( datas ) {
        datas.forEach( ( data ) => {

            switch ( data.Status ) {
                case 6:
                    if ( !state.reject ) {
                        state.reject = {}
                    }
                    state.reject[ data.MgId ] = data
                    break
                case 1:
                    if ( !state.apply ) {
                        state.apply = {}
                    }
                    state.apply[ data.MgId ] = data
                    break
                case 2:
                    if ( !state.pass ) {
                        state.pass = {}
                    }
                    state.pass[ data.MgId ] = data
                    break
                case 3:
                    if ( !state.join ) {
                        state.join = {}
                    }
                    state.join[ data.MgId ] = data
                    break
                default:
                    break
            }
        } )
    }
    return state
}

c[ t.MEMBER_PASS ] = ( state, data, id, requestData ) => {
    let mgId = requestData.Id
    let roleId = requestData.RoleId


    if ( roleId ) {
        if ( !state.join ) {
            state.join = {}
        }

        state.join[ mgId ] = state.apply[ mgId ]
        state.join[ mgId ].Status = 3
        state.join[ mgId ].RoleId = roleId

        delete state.apply[ mgId ]
        if ( !C( state.apply ) ) {
            delete state.apply
        }
    } else {
        if ( !state.pass ) {
            state.pass = {}
        }

        state.pass[ mgId ] = state.apply[ mgId ]
        state.pass[ mgId ].Status = 2
        state.pass[ mgId ].JoinTime = getTimestamp()

        delete state.apply[ mgId ]
        if ( !C( state.apply ) ) {
            delete state.apply
        }


    }
    LR( 'member', t.MEMBER_PASS, state )
    return state
}

c[ t.MEMBER_ASSIGN_ROLE ] = ( state, newId, id, requestData ) => {
    let mgId = requestData.Id
    let roleId = requestData.RoleId
    let groupId = requestData.GroupId

    if ( !state.join ) {
        state.join = {}
    }

    if( state.pass && state.pass[mgId] ) {
        state.join[ mgId ] = state.pass[ mgId ]
        delete state.pass[ mgId ]
        if ( !C( state.pass ) ) {
            delete state.pass
        }
    }

    if( state.apply && state.apply[mgId] ) {
        state.join[ mgId ] = state.apply[ mgId ]
        delete state.apply[ mgId ]
        if ( !C( state.apply ) ) {
            delete state.apply
        }
    }

    state.join[ mgId ].Status = 3
    state.join[ mgId ].RoleId = roleId
    state.join[ mgId ].GroupId = groupId
    state.join[ mgId ].StartTime = getTimestamp()


    LR( 'members', t.MEMBER_ASSIGN_ROLE, state )
    return state
}

c[ t.MEMBER_CHANGE_ROLE ] = ( state, newId, id, requestData ) => {
    let mgId = requestData.Id
    let roleId = requestData.RoleId
    let groupId = requestData.GroupId

    state.join[ newId ] = state.join[ mgId ]
    state.join[ newId ].MgId = newId
    state.join[ newId ].RoleId = roleId
    state.join[ newId ].GroupId = groupId
    state.join[ newId ].StartTime = getTimestamp()

    delete  state.join[ mgId ]
    LR( 'members', t.MEMBER_CHANGE_ROLE, state )
    return state
}

c[ t.MEMBER_REMOVE ] = ( state, newId, id, requestData ) => {
    const mgId = requestData.Id
    const status = requestData.Status
    const leaveReason = requestData.LeaveReason
    LR( 'members', t.MEMBER_REMOVE, 11111111 )
    if( !state.reject ) {
        state.reject = {}
    }

    if( status == 0 ) {
        if( state.pass && state.pass[ mgId ] ) {
            state.reject[ mgId ] = state.pass[ mgId ]
            state.reject[ mgId ].Status = 0
            delete state.pass[ mgId ]
            if( !C(state.pass) ) {
                delete state.pass
            }
            state.reject[ mgId ].LeaveReason = leaveReason
            state.reject[ mgId ].LeaveTime = getTimestamp()
        } else {
            delete state.apply[ mgId ]
            if( !C(state.apply) ) {
                delete state.apply
            }
        }
    } else {
        state.reject[ mgId ] = state.join[ mgId ]
        state.reject[ mgId ].Status = 6
        delete state.join[ mgId ]
        if( !C(state.join) ) {
            delete state.join
        }
        state.reject[ mgId ].LeaveReason = leaveReason
        state.reject[ mgId ].LeaveTime = getTimestamp()
    }

    LR( 'members', t.MEMBER_REMOVE, state )
    return state
}