/**
 * Created by kenn on 16/8/6.
 */
import { M, Z, RD, LR } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { ADDRESS } from '../../../store/api'


export default ( state = initState[ ADDRESS ], action ) => {
    if( c.hasOwnProperty( action.type ) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }

}

let c = {}

c[ t.ADDRESS_LOAD ] = ( state, data ) => {
    state['datas'] = Z(data)
    return state
}

c[ t.ADDRESS_DEFAULT ] = ( state, data, id, requestData ) => {
    state.datas[id] = M(state.datas[id ], requestData)

    return state
}

c[ t.ADDRESS_REMOVE ] = ( state, data, id, requestData ) => {
    delete state.datas[id]
    return state
}

c[ t.ADDRESS_ADD ] = ( state, data, id, requestData ) => {
    requestData.Id = data
    requestData.IsDefault = 0
    state.datas[data] = requestData
    LR(ADDRESS, t.ADDRESS_ADD, data )
    return state
}
