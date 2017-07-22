/**
 * Created by kenn on 16/7/16.
 */

import * as TYPE from '../actions/type'

let verification  = {}

verification[TYPE.GOODS_EDIT_COMMON_NAME] = {
    rules: {
        required: true,
        maxLength: 64,
        minLength: 4
    }
}

verification[TYPE.LIKE_EDIT_FOLDERNAME] = {
    maxLength: 64,
    minLength: 2
}



export default verification