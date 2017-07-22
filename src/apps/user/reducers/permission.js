/**
 * Created by kenn on 16/9/17.
 */
import { M, Z, RD, LR } from '../../../common'

import {PERMISSION} from '../../../actions/type'
import {OK} from '../../../store/code'

export default ( state = null, action ) => {
    if( action.type == PERMISSION && action.code == OK ) {
        return action.data
    }
    return state
}