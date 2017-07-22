/**
 * Created by kenn on 16/8/6.
 */
import { M, Z, RD } from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'
import { AREA } from '../store/api'


export default ( state = {}, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}