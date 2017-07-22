/**
 * Created by kenn on 2016/10/3.
 */
import { M, Z, RD, MM, F } from '../common'

import * as t from '../actions/type'

export default ( state = null, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( MM(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.GOODS_TAG_LOAD] = ( state, data ) => {
    if( data ) {
        if( !state ) {
            state = {}
        }
        data.forEach(( d ) => {
            if( !state[d.GoodsId] ) {
                state[d.GoodsId] = {}
            }
            state[d.GoodsId][d.TagId] = d
        })
    }
    return state
}

c[ t.GOODS_TAG_SAVE] = ( state, data, datas ) => {

    if( !state ) {
        state = {}
    }

    F( datas, ( tags, goodsId ) => {
        if( !state[goodsId] ) {
            state[goodsId] = {}
        }
        state[goodsId] = M(state[goodsId], tags)
    } )
    return state
}