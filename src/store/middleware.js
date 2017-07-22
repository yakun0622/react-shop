/**
 * Created by kenn on 16/7/7.
 */

import api from './api'
import { URL } from '../apps/config'
import verification from './verification'
import {REQUEST_WAIT} from './code'
//import {GOODS_EDIT_NAME} from '../actions/type'
import { L, VT, UR, getCache, C} from '../common'



/**
 * 网路请求中间件
 * action结构：
 *          login：是否需要登录
 *          upload：上传相关
 *          args：请求参数
 *          method：请求方式：get,post
 *
 */
const post = ()=>(next)=>(action)=> {

    //判断是否有type对应的API设置,如有则请求网路
    if (api.hasOwnProperty(action.type)) {

        //处理请求数据
        let apiOption = {}
        //api 请求数组
        let request = api[action.type]

        //如果request为字符串, 字符串格式为'method:url | userType',method和userType可省略
        if( typeof request == 'string') {
            let temp1 = request.split(':')
            let temp2 = null
            if( temp1.length == 1 ) {
                temp1 = temp1[0].split('|')
            } else {
                temp2 = temp1[ 1 ].split('|')
            }
            request = {
                url: temp2 ? temp2[0] : temp1[0],
                method: temp2 ? temp1[0] : 'GET',
                userType: temp2 ? temp2[1] || 1 : temp1[1] || 1
            }
        }

        let requestUrl = request.url
        let queryParams = null

        apiOption.method = (request.method ? request.method : 'GET').toUpperCase()
        apiOption.mode = 'cors'
        let headers = {}

        //登录处理
        //用户类型: 0 noNeedLogin 1 user 2 store  3 useradmin 4 admin
        if(!request.hasOwnProperty('userType')){
            request.userType = 1
        }
        const authorization = getCache('Authorization')
        if (request.userType != 0) {
            // if (!localStorage.Authorization) {
            if (!authorization) {
                console.log("NEED_LOGIN  Authorization fail......");
                //终止请求，并提示登录
                // return next({type: 'NEED_LOGIN', data: 'NEED_LOGIN'})
                return next(action)
            } else {
                let token = authorization
                //token 校验
                if(!VT()){
                    console.log("NEED_LOGIN token error.....");
                    // return next({type: 'NEED_LOGIN', data: "token error"})
                    return next(action)
                }
                let login_user = UR();
                if(login_user.type !== request.userType){
                    //console.log("NEED_LOGIN wrong user type...");
                    // return next({type: 'NEED_LOGIN', data: 'wrong user type'})
                }

                headers.Authorization = 'Bearer ' + token
            }
        }
        //if( action.Id == 'file' ) {
        //    headers['Content-Type'] = 'multipart/form-data;boundary=--------------------56423498738365'
        //}
        apiOption.headers = headers



        if (typeof action.data == 'string') {
            queryParams = action.data
        }else if( apiOption.method != 'GET' ){
            //post请求
            if (action.data instanceof FormData) {
                apiOption.body = action.data
            } else if( action.Id == 'form' || (action.Id && action.Id.formData) ) {
                let formData = new FormData()
                for (let key in action.data) {
                    formData.append(key, action.data[key])
                }
                apiOption.body = formData
            } else if ( typeof action.data == 'object' && !Array.isArray(action.data)){
                let formData = new FormData()
                formData.append('data', JSON.stringify(action.data))
                apiOption.body = formData
            }
        }

        //是否有ID，有则加入到URL后部
        if ((action.Id || action.Id == 0) && typeof action.Id != 'object' && action.Id != 'form' && action.Id != 'file') {
            requestUrl += '/' + action.Id
        }
        //处理api_key
        if (queryParams) {
            queryParams = '?' + queryParams + '&api_key=sungoo'
        } else {
            queryParams = '?api_key=sungoo'
        }

        //console.log(URL + requestUrl + queryParams)

        fetch(URL + requestUrl + queryParams, apiOption)
            .then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject(new Error(response.statusText))
                }
            })
            .then(function (response) {
                //L('middleware：', response.json())
                return response.json()
            })
            .then(function (data) {
                //log( action.type, 'USER_LOGIN',  data );
                let newAction = {type: action.type}

                newAction['data'] = data.data
                newAction['code'] = data.code

                if( data.count ) {
                    newAction['count'] = data.count
                }

                if( action.data ) {
                    if( action.data.data ) {
                        newAction.requestData = JSON.parse(action.data.data)
                    } else {
                        newAction.requestData = action.data
                    }
                }

                if( action.Id || action.Id == 0 ) {
                    newAction.Id = action.Id
                }

                if(data.msg ) {
                    newAction['msg'] = data.msg
                }
                //console.log('middle-new', action.type,  newAction );
                return next(newAction)

            })
            .catch(function (error) {
                L('错误信息-middleware：', error)
                return next({type: 'REQUEST_ERROR', error: error})
            });

        return next({type: 'WAITING', data: action.type})
    }

    return next(action)
}

/**
 * 验证中间件
 * 如果有错误将action.data的值为数组, 下标0 为值, 下标1为错误信息
 */
const verify = ()=>(next)=>(action)=> {



    //判断是否有type对应的API设置,如有则请求网路
    if (verification.hasOwnProperty(action.type)) {
        let message = ''
        let data = action.data
        let rules = verification[action.type]


        if (data) {
            for (var rule in rules) {
                switch (rule) {
                    //必填
                    case 'required':
                        if (!data || data.length == 0) {
                            message += '必填! '
                        }
                        break;
                    //必须是数字
                    case 'number':
                        if (data && isNaN(data)) {
                            message += '必须为数字! ';
                        }
                        break;
                    case 'numbers':
                        var validation = true
                        if (data && data.indexOf('-') != -1) {
                            var datas = data.split('-')
                            for (var i = 0; i < datas.length; i++) {
                                if (!isNaN(Number(datas[i]))) {
                                    validation = false
                                }
                            }
                        } else if (data && isNaN(data)) {
                            validation = false
                        }
                        if (!validation) {
                            message += '必须为数字单数字之间可用\'-\'间隔! ';
                        }
                        break
                    case 'minLength':
                        if (data.length) {
                            if (data.length < rules[rule]) {
                                message += '字数不小于' + rules.minLength + '! ';
                            }
                        }
                        break
                    case 'maxLength':
                        if (data.length > rules[rule]) {
                            message += '字数不大于' + rules.maxLength + '! ';
                        }
                        break
                    case 'length':
                        if (data.length != rules[rule]) {
                            message += '字数为' + rules[rule] + '! ';
                        }
                        break
                }
            }
        } else if (rules.required) {
            message += '必填! '
        }

        if (message !== '') {
            action['data'] = [action.data, message]
        }
    }
    return next(action)
}

const log = ( ...text ) => {
    if( text.length == 3 ) {
        if( text[1] == text[0] ) {
            L('middleware', 'TYPE: ' + text[0], text[2])
        }
    } else {
        L('middleware', ...text)
    }
}

export default [verify, post]