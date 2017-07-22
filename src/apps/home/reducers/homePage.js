/**
 * Created by kenn on 16/8/12.
 */
import { M, Z, RD } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { HOME_PAGE } from '../../../store/api'


export default ( state = initState[ HOME_PAGE ], action ) => {
    if( c.hasOwnProperty( action.type ) ) {
        return RD( state, action, c )
    } else {
        return state
    }
}

let c = {}

//c[ t.AREA_LOAD ] = ( state, data ) => {
//    return M( state, Z( data ) )
//}