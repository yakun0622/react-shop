/**
 * Created by kenn on 2016/10/16.
 */
import { M, Z, RD, MM, LR, F } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = { goodses: {}, commons: {} }, action ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( MM( state ), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.GOODS_DATAS_LOAD ] = ( state, data ) => {
    if ( data ) {
        let goodses = parseString( data.Goodses, [ 'GoodsImages', 'GoodsSpec', 'GoodsBody' ] )
        let common = parseString( data.GoodsCommon, [ 'GoodsImages', 'SpecName', 'SpecValue', 'GoodsBody' ] )

        //LR( 'goodsdata', t.GOODS_DATAS_LOAD, data.Goodses )
        createSpec( goodses, common )
        Object.assign( state.goodses, Z(goodses) )
        Object.assign( state.commons, Z(common) )
        return state
    }
    return state
}


//"{"691":"男五粒扣马甲","901":"毛10%，粘涤90%","655":"XS","524":"1件","701":"藏青色"}
// SpecName "{"18":"规格","19":"材质","21":"尺寸尺码","39":"起订数","40":"颜色"}"
//SpecValue
// "{"18":{"691":"男五粒扣马甲"},"19":{"901":"毛10%，粘涤90%"},"21":{"655":"XS","656":"S","657":"M","658":"L","659":"XL","660":"XXL","661":"XXXL"},"39":{"524":"1件"},"40":{"701":"藏青色","702":"黑色","703":"灰色"}}"

const createSpec = ( goodses, common ) => {
    if( !common.GoodsImages ) {
        common.GoodsImages = [common.GoodsImage]
    }

    if ( common.SpecValue ) {
        common.Specs = []
        F( common.SpecValue, ( value, specId ) => {
            let spec = { Id: specId, SpName: common.SpecName[ specId ], values: [] }
            F( value, ( val, id ) => {
                spec.values.push( { Id: id, SpValueName: val } )
            } )
            common.Specs.push( spec )
        } )
    } else {
        return
    }

    goodses.forEach(( goods, i ) => {
        if( goods.GoodsSpec ) {
            goods.Specs = {}

            F(goods.GoodsSpec, ( value, id ) => {
                F(common.Specs, ( spec ) => {
                    let r = false
                    F(spec.values, ( value ) => {
                        if( value.Id == id ) {
                            goods.Specs[spec.Id] = value.Id
                            r = true
                            return false
                        }
                    })
                    if( r ) {
                        return false
                    }
                })
            })
            goodses[i] = goods
        }
    })
}

const parseString = ( datas, fields ) => {
    let newDatas = null

    fields.forEach( ( field ) => {
        if ( Array.isArray( datas ) ) {
            newDatas = []
            datas.forEach( ( data ) => {
                if ( data[ field ] ) {
                    //如果字符串第一个字符是 '{'或 '[', 否则是就是字符串,
                    if ( data[ field ].indexOf( '{' ) == 0 || data[ field ].indexOf( '[' ) == 0 ) {
                        if ( data[ field ] == '{}' || data[ field ] == '[]' ) {
                            data[ field ] = null
                        } else {
                            data[ field ] = JSON.parse( data[ field ] )
                        }

                    } else if(field != 'GoodsBody'){
                        data[ field ] =  (data[ field ] && data[ field ] != '') ? data[ field ].split( ',' ) : null
                    }
                }
                newDatas.push( data )
            } )
        } else {
            //LR( 'goodsdata', field, datas[field] )
            if ( datas[ field ] ) {
                if ( datas[ field ].indexOf( '{' ) == 0 || datas[ field ].indexOf( '[' ) == 0 ) {
                    if ( datas[ field ] == '{}' || datas[ field ] == '[]' ) {
                        datas[ field ] = null
                    } else {
                        datas[ field ] = JSON.parse( datas[ field ] )
                    }
                } else if(field != 'GoodsBody'){
                    datas[ field ] = (datas[ field ] && datas[ field ] != '') ? datas[ field ].split( ',' ) : null
                }
            }
            newDatas = datas
        }
    } )

    return newDatas
}