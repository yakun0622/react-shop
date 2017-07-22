/**
 * Created by kenn on 16/7/18.
 */
import { M } from '../common'

import * as TYPE from '../actions/type'
import { REQUEST_WAIT, OK } from '../store/code'

export default (state = null, action) => {

    if( action.code == OK ) {
        switch (action.type) {
            case TYPE.BRANDS_LOAD:
                if( action.data ) {
                    let brands = {}
                    action.data.forEach(( brand ) => {
                        brands[brand.Id] = brand.BrandName
                    })
                    return brands
                }
                return null
                break
            default:
                return state
                break
        }
    }

    return state
}