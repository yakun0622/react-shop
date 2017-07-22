/**
 * Created by kenn on 16/7/18.
 */
import { M, LR } from '../common'

import * as TYPE from '../actions/type'
import { REQUEST_WAIT } from '../store/code'

export default (state = {1: {Name: '服装', specs: {1: '颜色', 2: '规格'}}}, action) => {

    switch (action.type) {
        case TYPE.TYPES_LOAD:
            if( action.code ) {
                LR('type', TYPE.TYPES_LOAD, action.data)
                let datas = {}
                action.data.forEach(( type ) => {
                    datas[type.TypeId] = type
                    const desc = []
                    type.Specs.forEach(( item, i ) => {
                        if( i%2 == 1  ) {
                            desc.push(item)
                        }
                    })
                    datas[type.TypeId].desc = desc.join('/')
                })
                return datas
            }
            return state
            break
        //case TYPE.obj:
        //
        //
        //    break
        default:
            return state
            break
    }
}