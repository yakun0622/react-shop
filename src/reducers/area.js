/**
 * Created by kenn on 16/8/6.
 */
import { M, Z, RD, setCache, L } from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'
import { AREA } from '../store/api'


export default ( state = initState[ AREA ], action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.AREA_LOAD ] = ( state, data ) => {
    return M(state, Z(data))
}