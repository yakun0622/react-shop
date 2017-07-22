/**
 * Created by kenn on 16/9/8.
 */
import { M, Z, RD, LR } from '../common'

import * as t from '../actions/type'
import {OK} from '../store/code'
import API from '../store/api'

import user from '../apps/user/error'


export default ( state = null, action ) => {

    if(  API[action.type] && action.type != t.WAITING ) {
        if( action.code == OK ) {
            if( state && state[action.type] ) {
                delete state[action.type]
                if( Object.keys(state).length == 0 ) {
                    return null
                }
            }
        } else {
            LR('error', action.type, message[action.type])
            if( !state ) {
                state = {}
            }

            state[action.type] = message[action.type]
        }
        return M(state)
    }

    if( action.type == t.ERROR_CLEAN ) {
        let s = state
        delete s[action.data]
        if( Object.keys(s).length == 0 ) {
            return null
        } else {
            return s
        }
    }

    return state
}

const message = Object.assign({}, user)

message[ t.ADDRESS_DEFAULT ] = '设置默认地址失败!'
message[ t.ADDRESS_ADD ] = '设置默认地址失败!'
message[ t.ORDER_ADD ] = '订单提交失败!'
message[ t.SEARCH_GOODS_COMMON ] = '没有查询到商品!'
message[ t.SEARCH ] = '没有查询结果!'
message[ t.ACCOUNT_EXIST ] = '账号不存在!'
message[ t.USER_PHONE_NOEXIST ] = '手机号已存在!'
message[ t.USER_NAME_NOEXIST ] = '用户名已存在!'
message[ t.USER_EMAIL_NOEXIST ] = '邮箱已存在!'
message[ t.USER_PASSWORD_EXIST ] = '密码错误!'