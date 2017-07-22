/**
 * Created by kenn on 16/8/20.
 */
import { M, Z, RD } from '../common'

import * as t from '../actions/type'
import initState from '../store/initState'
import { CONFIRM_DIALOG } from '../store/api'


export default ( state = initState[ CONFIRM_DIALOG ], action ) => {
    switch(action.type) {
        case t.CONFIRM_DIALOG_OPEN:
            return {
                text: action.text,
                action: action.action,
                open: true
            }
            break
        case t.CONFIRM_DIALOG_CANCEL:
            return {open: false}
            break
        default:
            return state
            break
    }
}