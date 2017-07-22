/**
 * Created by kenn on 16/7/30.
 */
import { M, Z, RD, LR, F } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { CART } from '../../../store/api'


export default ( state = initState[ CART ], action ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( M( state ), action, c )
    } else {
        return state
    }
}

let c = {}

//加载
c[ t.CART_LOAD ] = ( state, data ) => {
    let count = 0

    data.forEach( ( item ) => {
        count += item.GoodsNum
    } )

    state.count = count

    state.datas = Z( data )
    return state
}

//移除
c[ t.CART_REMOVE ] = ( state, data, id ) => {
    state.count -= state.datas[ id ].GoodsNum
    delete state.datas[ id ]
    return state
}

//添加
c[ t.CART_ADD ] = ( state, data ) => {
    if ( state.datas[ data.Id ] ) {
        state.count += data.GoodsNum - state.datas[ data.Id ].GoodsNum
    } else {
        state.count += data.GoodsNum
    }
    state.datas[ data.Id ] = data
    return state
}
//改变数量
c[ t.CART_COUNT ] = ( state, data, id, requestData ) => {
    let goodsNum = requestData.GoodsNum
    if ( goodsNum < state.datas[ requestData.Id ].GoodsNum ) {
        state.count -= 1
    } else {
        state.count += 1
    }

    state.datas[ requestData.Id ].GoodsNum = goodsNum
    return state
}

//订单提交后清除购买的商品
c[ t.ORDER_ADD ] = ( state, data, id, rData ) => {
    if ( rData.IsCart ) {
        const goods = JSON.parse( rData.Goods )
        // LR( CART, t.ORDER_ADD, state.datas )
        goods.forEach( ( goodses ) => {
            goodses.forEach( ( g ) => {
                F( state.datas, ( c, id ) => {
                    if ( c.GoodsId == g.GoodsId ) {
                        delete state.datas[ id ]
                    }
                } )
            } )
        } )
    }
    return state
}
