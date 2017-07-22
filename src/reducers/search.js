/**
 * Created by kenn on 16/7/9.
 */
import { M, Z, RD, LR } from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'
import { SEARCH, CATEGORYS } from '../store/api'

export default ( state = initState[ SEARCH ], action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.SEARCH_GOODS_COMMON] = ( state, data, search ) => {
     LR(SEARCH, t.SEARCH, search)

    return search
}

c[ t.SEARCH] = ( state, data, search ) => {
    // LR(SEARCH, t.SEARCH, search)
    return search
}

c[ t.SEARCH_CLEAR] = () => {
    return null
}

c[ t.SEARCH_CATEGORY] = ( state, data, id ) => {
    if( !state ) {
        state = {}
    }
    // LR(SEARCH, t.SEARCH_CATEGORY, id)
    state[CATEGORYS] = id
    state['categoryLevel'] = data
    return state
}


