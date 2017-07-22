/**
 * Created by kenn on 16/8/20.
 */
import { M, Z, RD } from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'


export default ( state = initState[ 'waiting' ], action ) => {
    switch ( action.type ) {
        case t.WAITING:
            if( state.indexOf(action.data) == -1 ) {
                state.push(action.data)
                return JSON.parse(JSON.stringify(state))
            }
            break
        default:
            if( state.length != 0 ) {
                let index = state.indexOf(action.type)
                if(index != -1){
                    state.splice(index, 1)
                    return JSON.parse(JSON.stringify(state))
                }
            }
            break
    }
    return state
}