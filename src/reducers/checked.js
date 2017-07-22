/**
 * Created by kenn on 16/6/30.
 */
import * as TYPE from '../actions/type'

export default (state = {
    overCategory: 0,
    groupRootCheckedId : null,
    groupCheckedId : null,
    userMenuChecked : 1,
    checkArea: null
}, action)=> {
    switch (action.type) {
        case TYPE.CHECKED:
            //console.log(action)
            let checked = {}
            checked[action.field] = action.key

            return Object.assign({}, state, checked)
            break

        case TYPE.CHECKEDS:
            let checkeds = {}
            checkeds[action.field] = state.hasOwnProperty(action.field) ? state[action.field].push(action.key) : [action.key]

            return Object.assign({}, state, checkeds)
            break

        case TYPE.OVER_CATEGORY:
            //console.log('fsdf')
            let ch = {}
            ch[action.field] = action.key

            return Object.assign({}, state, ch)
            break
        default:
            return state
            break
    }

}