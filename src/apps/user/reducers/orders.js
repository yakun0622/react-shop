/**
 * Created by wangyakun on 16/7/9.
 */
import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { ORDERS } from '../../../store/api'
import { REQUEST_WAIT } from '../../../store/code'
import { M, Z, RD, LR, F } from '../../../common'


export default ( state = initState[ ORDERS ], action = '' ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( M( state ), action, c )
    } else {
        return state
    }
}

let c = {}

c[t.ORDER_LIST_LOAD] = (state, data, count) => {
    LR(ORDERS, t.ORDER_LIST_LOAD, data)
    if (data != 10) {
        state['orderList'] = Z(data)
        state['count'] = count
    }
    return state
}
