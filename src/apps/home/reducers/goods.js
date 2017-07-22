/**
 * Created by kenn on 16/7/7.
 */

import { M, Z, RD, F, LR } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { GOODS } from '../../../store/api'


export default ( state = null, action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.SEARCH_GOODS_COMMON] = ( state, data, id, oldData, count ) => {
    LR('goods', t.SEARCH_GOODS_COMMON, data)
    if( data ) {
        let s = {
            goods:       Z( parseString( data.goods, [ 'GoodsImages', 'GoodsSpec' ] ) ),
            goodsCommon: Z( parseString( data.goodsCommon, [ 'GoodsImages', 'SpecName', 'SpecValue' ] ) ),
            count
        }

        s.goods = createSpec(s.goods, s.goodsCommon)
        return s
    } else {
        return null
    }
}

c[ t.SEARCH] = ( state, data, id, oldData, count ) => {
    if( data ) {
        let s = {
            goods:       Z( parseString( data.goods, [ 'GoodsImages', 'GoodsSpec' ] ) ),
            goodsCommon: Z( parseString( data.goodsCommon, [ 'GoodsImages', 'SpecName', 'SpecValue' ] ) ),
            count
        }

        s.goods = createSpec(s.goods, s.goodsCommon)
        return s
    } else {
        return null
    }

}

//console.log( data );
//"{"691":"男五粒扣马甲","901":"毛10%，粘涤90%","655":"XS","524":"1件","701":"藏青色"}
// SpecName "{"18":"规格","19":"材质","21":"尺寸尺码","39":"起订数","40":"颜色"}"
//SpecValue  "{"18":{"691":"男五粒扣马甲"},"19":{"901":"毛10%，粘涤90%"},"21":{"655":"XS","656":"S","657":"M","658":"L","659":"XL","660":"XXL","661":"XXXL"},"39":{"524":"1件"},"40":{"701":"藏青色","702":"黑色","703":"灰色"}}"


const createSpec = ( goods, goodsCommon ) => {
    F(goods, ( good, goodsId ) => {
        goods[ goodsId ].GoodsSpec = spec( good.GoodsSpec, goodsCommon[good.GoodsCommonid].SpecValue )
    } )

    return goods
}

const spec = ( GoodsSpec, SpecValue ) => {
    if( !GoodsSpec || GoodsSpec == '' || typeof GoodsSpec[ Object.keys( GoodsSpec )[ 0 ] ] != 'string' ) {
        return null
    }

    let spec = {}
    F( GoodsSpec, ( specValue, valueId ) => {
        F( SpecValue, ( valueData, specId ) => {
            if( valueData[ valueId ] ) {
                spec[ specId ] = {}
                spec[ specId ][ valueId ] = specValue
            }
        } )
    } )

    return spec
}




const parseString = ( datas, fields ) => {

    let newDatas

    fields.forEach( ( field ) => {
        if( Array.isArray( datas ) ) {
            newDatas = []
            datas.forEach( ( data ) => {
                if( data[ field ] ) {
                    //如果字符串第一个字符是 '{'或 '[', 则是就是字符串,
                    if( data[ field ].indexOf( '{' ) == 0 || data[ field ].indexOf( '[' ) == 0 ) {
                        data[ field ] = JSON.parse( data[ field ] )
                    } else {
                        data[ field ] = (!data[ field ] || data[ field ] != '') ? data[ field ].split( ',' ) : []
                    }
                    newDatas.push( data )
                }
            } )
        } else {
            if( datas[ field ] ) {
                if( data[ field ].indexOf( '{' ) == 0 ) {
                    datas[ field ] = JSON.parse( data[ field ] )
                } else {
                    datas[ field ] = (!data[ field ] || data[ field ] != '') ? data[ field ].split( ',' ) : []
                }
                newDatas = datas
            }
        }
    } )

    return newDatas
}