/**
 * Created by kenn on 16/7/3.
 */

import store from './store/main'
import theme from './style/theme'
import CreatePropsAndStyle from './style/CreatePropsAndStyle'

import api, {CATEGORYS} from './store/api'
import {CONFIRM_DIALOG_OPEN, SEARCH, SEARCH_GOODS_COMMON} from './actions/type'
import {REQUEST_WAIT, OK, ERRMSG} from './store/code'
import rs, {b64toutf8} from 'jsrsasign'
import {IMAGEURL, WEBURL} from './apps/config'
// import Moment from 'moment'
import dateformat from 'dateformat'
export const IMAGEURI = 'http://hi-new.cn/data/upload/shop/store/goods/'
import {STORE_IMAGEURL, DEV} from './apps/config'


/**
 *
 * @param storeId
 * @param urls
 * @param type  默认0，1-缩略图
 * @returns {string}
 * @constructor
 */
export const R = (storeId, urls, type = 0) => {
    if (Array.isArray(urls)) {
        return F(urls, (url, i) => {
            if (!url) {
                return IMAGEURL + 'default_icon.png'
            }
            url = type == 1 ? url.substring(0, url.lastIndexOf('.')) + '_60' + url.substring(url.lastIndexOf('.'), url.length) : url
            return IMAGEURI + storeId + '/' + url
        })
    } else {
        if (!urls) {
            return IMAGEURL + 'default_icon.png'
        }
        urls = type == 1 ? urls.substring(0, urls.lastIndexOf('.')) + '_60' + urls.substring(urls.lastIndexOf('.'), urls.length) : urls
        return IMAGEURI + storeId + '/' + urls
    }
}

export const STOREIMG = ( images ) => {
    if( !images ) {
        return null
    }
    const url = 'http://common.hinewmall.com/images/store/goods/'

    if( typeof images == 'string') {
        return  url + images.split('_')[0] + '/' + images
    } else {
        return images.map(( image ) => {
            return url + image.split('_')[0] + '/' + image
        })
    }
}

export const showDetails = ( id, isCommon = true ) => {
    if( DEV ) {
        window.open('http://localhost:8080/webpack-dev-server/' + (isCommon ? 'c_' : 'g_' ) + id);
    } else {
        // L('domain。。。', window.location.host)
        const domain = window.location.host ? window.location.host : 'www.hinewmall.com'
        // alert(domain)
        window.open('http://' + domain + '/' + (isCommon ? 'c_' : 'g_' ) + id);
    }
}

export $ from './style/SP'
export const getTimestamp = () => {
    return Math.round(new Date().getTime() / 1000);
}
/**
 * reducer 处理函数
 * @param state
 * @param action
 * @param c
 * @returns {*}
 * @constructor
 */
export const RD = (state, action, c) => {
    //如果action 是网络请求
    if (api.hasOwnProperty(action.type)) {
        if (action.code == OK) {
            L('网络请求成功', action.type, action.data)
            state = c[action.type](state, action.data, action.Id, action.requestData, action.count)
        }
    } else {
        //如果不是网络请求则直接调用reducer
        state = c[action.type](state, action.data, action.Id)
    }
    return state
}

/**
 * base主题
 * @type {theme.baseTheme|{fontSize, height, palette}}
 */
export const T = theme.baseTheme

export let S = (...style) => {
    if (style.length != 0) {
        return new CreatePropsAndStyle({}, MM(...style))
    } else {
        return new CreatePropsAndStyle({style: {}})
    }
}

export let P = (props, style = null) => {

    if (props) {
        return new CreatePropsAndStyle(MM(props), style)
    } else {
        return new CreatePropsAndStyle({}, style)
    }
}

/**
 * 获取json对象元素个数
 * @param object
 * @returns {number}
 * @constructor
 */
export const C = (object) => {
    if (object && typeof object == 'object') {
        if (Array.isArray(object)) {
            return object.length
        }
        return Object.keys(object).length
    }

    //let count = 0
    //for( var key in object ) {
    //    ++count
    //}
    return 0
}

/**
 * 遍历对象或数组
 */
export const F = (object, callback, isObject) => {
    if (!object) {
        return []
    }

    let obj = []
    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            let a = callback(object[i], i)
            if (a) {
                if (isObject) {
                    if (Array.isArray(obj)) {
                        obj = {}
                    }
                    obj[i] = object[i]
                } else {
                    obj.push(a)
                }
            }

            if (a === false) {
                return
            }
        }
    } else {
        for (let key in object) {
            let o = callback(object[key], key)
            if (o) {
                if (isObject) {
                    if (Array.isArray(obj)) {
                        obj = {}
                    }
                    obj[key] = object[key]
                } else {
                    obj.push(o)
                }
            }

            if (o === false) {
                return
            }
        }
    }
    return obj
}


/**
 * dispatch简化函数
 * @param type
 * @param data
 */
export const D = (type, data, Id)=> {
    store.dispatch({
        type,
        data,
        Id
    })
}

/**
 * 打开网络请求确认框
 * text为提示内容, 后面参数照D函数
 * @param text
 * @param action
 */
export const DD = ( text, ...action )=> {
    store.dispatch( {
        type: CONFIRM_DIALOG_OPEN,
        action,
        text
    })
}

/**
 * search请求
 * @param search
 */
export const DG = (search = null, page = 1)=> {
    if (!search) {
        return
    }

    let type = SEARCH_GOODS_COMMON

     //L('DS', SEARCH, search)
    let formData = new FormData()

    formData.append('limit', 20)
    formData.append('offset', page == 1 ? 0 : 20 * (page - 1) - 1)


    if (search.keyword) {
        formData.append('keyword', search.keyword)
    }

    if (search.categorys) {
        formData.append('query', 'GcId' + search.categoryLevel + ':' + search.categorys)
    }

    if (search.coopt) {
        type = SEARCH
        const {brand, price, speces} = search.coopt
        if (brand) {
            //id,...
            let ids = new Array()
            F(brand, (value, key) => {
                ids.push(key)
            })
            formData.append('brands', ids.join(','))
        }
        if (price) {
            let prices = new Array()
            F(price, (value, key) => {
                prices.push(value)
            })
            formData.append('price', prices.join(','))
        }
        if (speces) {
            // 格式:  specValueId:specValue
            let spec = ''
            F(speces, (specData) => {
                F(specData.values, (value, valueId) => {
                    spec += valueId + ':' + value + ','
                })
            })

            formData.append('spec', spec.substr(0, spec.length - 1))
        }
    }
    // L('Search', 'searchData', search)
    // L('Search', 'type', type)
    store.dispatch({
        type,
        data: formData,
        Id: search
    })
}



/**
 * 创建query
 * @type {{q: {query: null, sortBy: Array, orderBy: Array, fields: Array, limit: number, offset: number}, sortBy:
 *     query.sortBy, field: query.field, limit: query.limit, ok: query.ok}}
 */
class creatQuery {
    constructor(query) {
        this.q = query
    }

    add(name, value) {
        if (!this.o) {
            this.o = {}
        }

        this.o[name] = value
        return this
    }

    sort(field, order = 'desc') {
        if (!this.q.sortby) {
            this.q['sortby'] = []
            this.q['order'] = []
        }

        if (this.q.sortby.indexOf(field) == -1) {
            this.q.sortby.push(field)
            this.q.order.push(order)
        }
        return this
    }

    field( field ) {

        if (!this.q.fields) {
            this.q['fields'] = []
        }

        if (this.q.fields.indexOf(field) == -1) {
            this.q.fields.push(field)
        }
        return this
    }

    limit(limit, offset = 0) {
        this.q['limit'] = limit
        this.q['offset'] = offset

        return this
    }

    query(field, value) {
        if (!this.q.query) {
            this.q['query'] = {}
        }

        if (!this.q.query[field]) {
            this.q.query[field] = value
        }
        return this
    }

    ok() {
        let str = ''

        if (this.q.query) {
            let query = ''
            F(this.q.query, (value, field) => {
                query += field + ':' + value + ','
            })

            str += 'query=' + encodeURIComponent(query.substring(0, query.length - 1)) + '&'
        }

        if (this.q.fields) {
            str += 'fields=' + encodeURIComponent(this.q.fields.join(',')) + '&'
        }

        if (this.q.sortby) {
            str += 'sortby=' + encodeURIComponent(this.q.sortby.join(',')) + '&'
            str += 'order=' + encodeURIComponent(this.q.order.join(',')) + '&'
        }

        str += (this.q.limit ? 'limit=' + this.q.limit + '&' : '')
            + (this.q.offset ? 'offset=' + this.q.offset + '&' : '')

        if (this.o) {
            for (let key in this.o) {
                str += key + '=' + encodeURIComponent(this.o[key]) + '&'
            }
        }
        if (str != '') {
            return str.substring(0, str.length - 1)
        }
        return null
    }
}
export const Q = (query = {}) => {
    return new creatQuery(query)
}

/**
 * 合并object, 返回新对象, 深度拷贝
 * @param object
 * @returns {*}
 * @constructor
 */
export const MM = (...object) => {
    if(object[0]){
        if (object.length == 1) {
            return JSON.parse(JSON.stringify(object[0]))
        } else {
            return JSON.parse(JSON.stringify(Object.assign({}, ...object)))
        }
    }
}
/**
 * 合并object, 返回新对象, 深度拷贝
 * @param object
 * @returns {*}
 * @constructor
 */
export const M = (...object) => {
    return Object.assign({}, ...object)
}

/**
 * 合并数组，取交集
 * @param array
 * @returns [array]
 */
export const MA = (...arrays) => {
    let a1 = arrays[0]
    arrays.forEach((array, i) => {
        if (i != 0) {
            if (Array.isArray(array)) {
                array.forEach((item) => {
                    if (a1.indexOf(item) == -1) {
                        a1.push(item)
                    }
                })
            } else {
                if (a1.indexOf(array) == -1) {
                    a1.push(array)
                }
            }
        }
    })

    return a1
}

/**
 * 根据字段值取一条数据
 * @param datas
 * @param value
 * @param index
 * @returns {*}
 * @constructor
 */
export const G = ( datas, value, index = 'Id' ) => {
    for (let i = 0; i < datas.length; i++ ){
        if( datas[i][index] == value ) {
            return datas[i]
        }
    }
    return null
}

/**
 * 判断是否是object
 * @param object
 * @returns {boolean}
 */
export const isObject = (object) => {
    return typeof object == 'object' && !Array.isArray(object) ? true : false
}

/**
 * 转换数据
 * @param data
 * @returns {{}}
 * @constructor
 */
export const Z = (data, indexName = 'Id') => {
    let dataObject = {}
    if (data) {
        if (Array.isArray(data)) {
            data.forEach((item)=> {
                dataObject[item[indexName]] = item
                //delete dataObject[item[indexName]][indexName]
            })
        } else {
            dataObject[data[indexName]] = data
            //delete dataObject[data[indexName]][indexName]
        }
    }
    return dataObject
}

/**
 * 转换数据字段名为驼峰写法
 * 用于直接查询数据库，没进行转换的数据，
 * 同时可指定索引数据
 * @param datas
 * @param indexName
 * @returns {*}
 * @constructor
 */
export const K = (datas, indexName = null) => {
    if (!datas) {
        return null
    }
    let news

    if (Array.isArray(datas)) {
        if (indexName) {
            news = {}
        } else {
            news = []
        }
        datas.forEach((data) => {
            const newData = {}
            for (let key in data) {
                let keys = key.split('_')
                let newKey = ''
                keys.forEach((k) => {
                    newKey += k[0].toUpperCase() + k.substring(1, k.length)
                })
                newData[newKey] = data[key]
            }
            if (indexName) {
                news[newData[indexName]] = newData
            } else {
                news.push(newData)
            }
        })
    } else {
        newData = {}
        for (let key in datas) {
            let keys = key.split('_')
            let newkey = ''
            keys.forEach((k) => {
                newkey += k[0].toUpperCase() + k.substring(1, k.length)
            })
            newData[newkey] = datas[key]
        }
        if (indexName) {
            news = {}
            news[newData[indexName]] = newData
        }
    }
    return news
}

/**
 * log
 * @param text
 * @constructor
 */
export const L = (...text) => {

    switch (text.length) {
        case 2:
            console.log('%c' + text[0] + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'font-size: 13px; color: yellow;')
            console.log(text[1]);
            break
        case 3:
            console.log('%c' + text[0] + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'font-size: 13px; color: yellow;')
            console.log('%c' + text[1], 'font-size: 13px; color: #80CBC4;')
            console.log(text[2]);
            break
        default:
            console.log('%c' + 'log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'font-size: 13px; color: yellow;')
            console.log(text[0]);
            break
    }
}

/**
 * 打印reducerlog
 * @param name
 * @param type
 * @param data
 * @constructor
 */
export const LR = (name, type, data) => {
    L('REDUCER.' + name, type, data)
}

/**
 * 数据验证
 * @param data
 * @param rules
 * @returns {*}
 * @constructor
 */
export const V = (data, rules) => {

    if (data === false) {
        return false
    }

    let message = ''
    if (data) {
        //data = data===0 ? "0" : data
        for (var rule in rules) {
            switch (rule) {
                //必填
                case 'required':
                    if (!rules.hasOwnProperty('number') || !rules.hasOwnProperty('number')) {
                        if (!data || data.length == 0) {
                            message += '必填! '
                        }
                    }
                    break;
                //必须是数字
                case 'number':
                    if (data && isNaN(data)) {
                        message += '必须为数字! ';
                    } else {
                        data = Number(data)
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
                        data = data.substr(0, rules[rule])
                    }
                    break
                case 'length':
                    if (data.length != rules[rule]) {
                        if (data.length > rules[rule]) {
                            data = data.substr(0, rules[rule])
                        }
                        if (data.length < rules[rule]) {
                            message += '字数为' + rules[rule] + '! ';
                        }
                    }
                    break
            }
        }
    } else if (rules.required) {
        message += '必填! '
    }

    if (message !== '') {
        return [data, message]
    }
    return data
}


/**
 * read blob url
 * @param blob
 * @returns {*}
 */
export function createObjectURL(blob) {
    if (window.URL) {
        return window.URL.createObjectURL(blob);
    } else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(blob);
    } else {
        return null;
    }
}


/**
 * dataURL转换为Blob对象
 * @param dataurl
 * @returns {*}
 */
export function dataURLtoBlob(dataurl) {
    //log(dataurl)
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}


export function readBlobAsDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) {
        callback(e.target.result);
    };
    a.readAsDataURL(blob);
}


/**
 * 判断是否是string
 * @param string
 * @returns {boolean}
 */
export function ISS(string) {
    return typeof string == 'string' ? true : false
}

/**
 * 判断是否是array
 * @param array
 * @returns {boolean}
 */
export function ISA(array) {
    return Array.isArray(array)
}

/**
 * 判断是否是object
 * @param object
 * @returns {boolean}
 */
export function ISO(object) {
    return typeof object == 'object' && !Array.isArray(object) ? true : false
}

/**
 * 判断是否想等
 * @param object 数组或对象
 * @returns {boolean}
 */
export function ISE(o1, o2) {
    if (typeof o1 != 'object' || typeof o2 != 'object') {
        return false
    }

    if (ISO(o1) && ISO(o2)) {
        for (let key in o1) {
            if (typeof o1[key] == 'object' && !ISE(o1[key], o2[key])) {
                return false
            }

            if (o1[key] != o2[key]) {
                return false
            }
        }
    } else if (ISA(o1) && ISA(o2)) {
        o1.forEach((value, i) => {
            if (typeof value == 'object' && !ISE(value, o2[i])) {
                return false
            }

            if( value != o2[i] ) {
                return false
            }
        })
    } else {
        return false
    }
    return true
}


/**
 * 验证token是否有效
 * @constructor
 */
export const VT = () => {
    // let token = localStorage.Authorization
    let token = getCache('Authorization')
    return rs.jws.JWS.verifyJWT(token, rsaPublicKey, {alg: ['RS256']});
}

/**
 * 根据token获取用户信息
 * @returns {{}}
 * @constructor
 */
export const UR = () => {
    let user = null
    // let token = localStorage.Authorization
    let token = getCache('Authorization')
    if (token) {
        if (VT()) {
            let info = token.split(".");
            let deData = b64toutf8(info[1]);
            user = eval("(" + deData + ")")
            return user
        }
    }
    return user
}

/**
 * 数组是否被包含,是返回true,不是返回false
 */
export const inArray = (standard, arr) => {
    if (!(standard instanceof Array) || !(arr instanceof Array)) return false
    if (standard.length < arr.length) return false
    for (let i = 0, len = arr.length; i < len; i++) {
        if (standard.indexOf(arr[i]) == -1) return false
    }
    return true
}

/**
 * 设置客户端缓存
 * @param name
 * @param value
 * @param type  类型：不指定时默认存cookie, LS-缓存至localStorage
 */
export function setCache(name, value, type) {
    if (!type) {
        const exdays = 2    //过期天数
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        setCookie(name, value, d.toUTCString())
    }
    //缓存至localStorage
    if (type == 'LS'){
        setLocalStorage(name, value)
    }
}

/**
 * 获取客户端缓存
 * @param name
 * @param type  类型：不指定时 从cookie获取数据,  LS-缓存至localStorage
 */
export function getCache(name, type) {
    if (!type) {
        return getCookie(name)
    }
    //缓存至localStorage
    if (type == 'LS'){
        return getLocalStorage(name)
    }
}

/**
 * 删除客户端缓存
 * @param name
 * @param type  类型：不指定时 从cookie获取数据
 */
export function delCache(name, type) {
    if (!type) {
        return delCookie(name)
    }
    //缓存至localStorage
    if (type == 'LS'){
        delLocalStorage(name)
    }
}

/**
 * 从cookie删除
 * @param name
 */
function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var value = getCookie(name)
    if (value != null)
        document.cookie = name + "=" + value + ";expires=" + exp.toUTCString()
}

function setCookie(name, value, expires) {
    var d = new Date()
    const exdays = 2
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toUTCString()
    var expires = "expires=" + expires
    document.cookie = name + "=" + value + "; " + expires
}

/**
 * localStorage相关操作
 * @param name
 * @param value
 */
function setLocalStorage(name, value) {
    let string = ''
    if(value && typeof value == 'object'){
        L('setLocalStorage', 'object')
        string = JSON.stringify(value)
    }else {
        string = value
    }
    localStorage.setItem(name, string)
}


function getLocalStorage(name) {
    return localStorage.getItem(name)
}

function delLocalStorage(name) {
    localStorage.removeItem(name)
}
/**
 *从cookie获取数据
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    var name = name + "="
    var cookieAll = document.cookie.split(';')
    for (var i = 0; i < cookieAll.length; i++) {
        var cookie = cookieAll[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1)
        if (cookie.indexOf(name) != -1) return cookie.substring(name.length, cookie.length)
    }
    return ""
}

/**
 * 格式化时间函数
 * @param timestamp 时间戳
 * @param format 格式 yyyy mm dd HH MM ss
 * @returns {*}
 */
export function formatDate( timestamp, format ) {
    if ( timestamp.toString().length == 10 ) {
        timestamp = timestamp * 1000
    }
    var time = new Date(timestamp)

    return dateformat(time, format || 'yyyy-mm-dd HH:MM:ss')
}

export const rsaPublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw14mMW+Z0v3FyH+JcpdE1BxfCaO8rbCKYE/4OHaaQBlW8WYo4ETsiqE42gwA5Xk34NoLo3x4YglTRlP6KgNgndY/rdZ1gqEmmSMrVi/3sYfSJeyorx+uSfUOTdAeRqQDntgMWuCzZC1xXWuKup0NErf5Vj9XisMUUEd2RrooW+0wu4px/8WFVEyxHFO6akF4Dos4eKcoyeqqCIsDC8Li7z28TI/dZ5UvUVx5Ep2bkvJANTOTyOkN7JMSqvT7+WZhHZKUiaZS2IJ/UrelXSePzLDtd802H/6PLij1k50Cd+fOuFc0eV8zep6WnSg5eIAun2WHmDHDfGaZUetSuuGWCQIDAQAB\n-----END PUBLIC KEY-----"