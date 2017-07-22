/**
 * Created by kenn on 16/7/4.
 */


import { Z, M } from '../../../common'

import * as TYPE from '../../../actions/type'
import initState from '../../../store/initState'
import {CATEGORYS} from '../../../store/api'
import {OK} from '../../../store/code'

export default (state = [], action) => {
    const { data, code, Id, } = action

    switch (action.type) {
        case TYPE.CATEGORY_LOAD:
            if( code == OK ) {
                return data
            } else {
                return null
            }
            break
        default:
            return state
            break
    }

    return state
}