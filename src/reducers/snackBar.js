/**
 * Created by kenn on 16/8/20.
 */
import { M, Z, RD } from '../common'

import * as t from '../actions/type'

export default ( state = {}, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.SNACKBAR_OPEN ] = ( state, data ) => {
    state.text = data.text
    state.open = true
    return state
}