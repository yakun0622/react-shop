/**
 * Created by kenn on 16/8/13.
 */
import { MM, Z, RD, LR, F } from '../../../common'

import * as t from '../../../actions/type'
import initState from '../../../store/initState'


export default ( state = { count: 0 }, action ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( MM( state ), action, c )
    } else {
        return state
    }
}

let c = {}

c[ t.ORDER_ADD ] = ( state ) => {
    // LR(ORDER, t.ORDER_ADD, data );
    return state
}
/**
 * 数据格式
 *  {
 *      groupId: {
 *          orderState: {
 *              orderId: {
 *                  ......
 *                  goodses: {
 *                      goodsId: {
 *                          ......
 *                          tags: {tagId : tagName}
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *  }
 * @param state
 * @param data
 * @param option
 * @param rData
 * @returns {*}
 */
c[ t.ORDER_LOAD ] = ( state, data, option, oldData, count ) => {
    //LR("orders", t.ORDER_LOAD, data );
    if ( data ) {
        state.datas = data
        state.count = count
    } else {
        state.datas = null
        state.count = 0
    }

    return state
}

c[ t.ORDER_GOODSES_LOAD ] = ( state, data, option, oldData, count ) => {

    if ( data ) {
        LR("orders", t.ORDER_GOODSES_LOAD, data );
        data.goodses.forEach( ( goods, i ) => {

            state.datas.forEach(( order, dataIndex ) => {
                if( order.Id == oldData.OrderId ) {
                    if( data.approvers ) {
                        let approverIds = data.approversIds.split(',')
                        let newApprovers = []
                        approverIds.forEach(( id ) => {
                            data.approvers.forEach(( approver ) => {
                                if( approver.RoleId == id ) {
                                    newApprovers.push(approver)
                                }
                            })
                        })
                        state.datas[dataIndex].approvers = newApprovers
                        state.datas[dataIndex].currentApproverId = data.currentApproverId
                    }

                    if( !state.datas[dataIndex].goodses ) {
                        state.datas[dataIndex].goodses = {}
                    }

                    state.datas[dataIndex].goodses[goods.Id] = goods

                    if( data.tags[i] ) {
                        state.datas[ dataIndex ].goodses[goods.Id].tags = {}
                        data.tags[i].forEach(( tag ) => {
                            state.datas[ dataIndex ].goodses[goods.Id].tags[tag.Id] = tag.TagName
                        })
                    }
                }
            })
        } )
    }

    return state
}

c[ t.ORDER_USER_CHANG_STATE ] = ( state, data, option ) => {
    state.datas.forEach(( data, i ) => {
        if( data.Id == option.id ) {
            state.datas.splice(i, 1)
            state.count -= 1
        }
    })


    return state
}

c[ t.TAG_USER_REMOVE ] = ( state, data, option, tagData ) => {
    state.datas.forEach(( data, i ) => {
        if( data.Id == option.orderId ) {
            LR('order', t.TAG_USER_REMOVE, state.datas[i].goodses[option.goodsId])
            delete state.datas[i].goodses[option.goodsId].tags[tagData.TagId]
            return false
        }
    })
    return state
}



