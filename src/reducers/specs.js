/**
 * Created by kenn on 16/7/29.
 */
import { M } from '../common'

import * as TYPE from '../actions/type'
import initState from '../store/initState'
import { SPECS } from '../store/api'
import { REQUEST_WAIT } from '../store/code'

export default (state = initState[SPECS], action) => {

    switch (action.type) {
        case '':


            break
        default:
            return state
            break
    }

    return M(state)
}