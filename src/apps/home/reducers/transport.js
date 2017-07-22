/**
 * Created by kenn on 2017/1/5.
 */
import { M, Z, RD, LR } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = null, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.TRANSORTFEE] = ( state, data ) => {
    return data
}