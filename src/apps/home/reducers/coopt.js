/**
 * Created by kenn on 16/7/8.
 */
import { M, Z, RD, LR, F } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'
import { COOPTS } from '../../../store/api'


export default ( state = initState[ COOPTS ], action ) => {
    if( c.hasOwnProperty(action.type) ) {
        return RD( M(state), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.SEARCH_GOODS_COMMON] = ( state, data ) => {
    if( data.brands ) {
        state.brand = Z(data.brands)

    } else {
        delete state.brand
    }
     LR(COOPTS, '品牌列表', data)

    if( data.speces ) {
        let speces = {}
        F(data.speces, (specData)=>{
            speces[specData.Id] = {
                SpName: specData.SpName,
                values: {}
            }
            F(data.specValues, (value)=>{
                if( value.SpId == specData.Id ) {
                    speces[specData.Id].values[value.Id] = value.SpValueName
                }
            })
        })
        state.speces = speces
    } else {
        delete state.speces
    }

    state.price = ['0~10', '11~50', '51~100', '101~500', '501~1000', '1001~5000', '10000~100000', '100000~']

    return state
}