/**
 * Created by kenn on 2017/1/22.
 */
import { M, Z, RD, LR } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = [], action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( state, action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.ALBUM_ADD] = ( state, data ) => {
    LR('album', t.ALBUM_ADD, data)
    if( data ) {
        state.unshift(data)
    }
    return state
}

c[ t.ALBUM_LOAD] = ( state, data, id, oldData, count ) => {
    LR('album', t.ALBUM_ADD, count)
    if( data ) {
        return {images: data, count}
    }
    return state
}

