/**
 * Created by kenn on 2016/10/11.
 */
import { M, Z, RD, MM, LR, C } from '../../../common'

import * as t from '../../../actions/type'

export default ( state = {}, action ) => {
    if ( c.hasOwnProperty( action.type ) ) {
        return RD( MM( state ), action, c )
    } else {
        return state
    }
}

let c = {}


/**
 * 数据格式
 *  {
 *      groupId: {
 *          orderState: {
 *              approveOrderId: {
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
 * @returns {*}
 */
c[ t.APPROVE_ORDER_LOAD ] = ( state, data, option ) => {
    if ( !state[ option.groupId ] ) {
        state[ option.groupId ] = {}
    }
    let stateName
    switch ( option.state ) {
        case 0:
            stateName = 'unapproves'
            break
        case 1:
            stateName = 'passes'
            break
        case 2:
            stateName = 'rejects'
            break
    }

    let approveOrders = null
    let count = 0
    if ( data ) {
        data.approveOrders.forEach( ( approveOrder ) => {
            if ( !approveOrders ) {
                approveOrders = {}
            }
            approveOrders[ approveOrder.Id ] = approveOrder
            data.goodses.forEach( ( goods, i ) => {
                if ( goods.OrderId == approveOrder.OrderId ) {
                    if ( !approveOrders[ approveOrder.Id ].goodses ) {
                        approveOrders[ approveOrder.Id ].goodses = {}
                    }
                    approveOrders[ approveOrder.Id ].goodses[ goods.GoodsId ] = goods

                    if ( data.tags[ i ] ) {
                        data.tags[ i ].forEach( ( tag ) => {
                            if ( !approveOrders[ approveOrder.Id ].goodses[ goods.GoodsId ].tags ) {
                                approveOrders[ approveOrder.Id ].goodses[ goods.GoodsId ].tags = {}
                            }
                            approveOrders[ approveOrder.Id ].goodses[ goods.GoodsId ].tags[ tag.Id ] = tag.TagName
                        } )
                    }
                }
            } )
        } )
        count = data.count
    }
    state[ option.groupId ][ stateName ] = approveOrders
    state[ option.groupId ][ stateName + 'Count' ] = count
    LR( 'approves', t.APPROVE_ORDER_LOAD, approveOrders )

    return state
}

c[ t.APPROVE_ORDER_APPROVE ] = ( state, data, id, oldDatas ) => {
    //LR('approve', t.APPROVE_ORDER_APPROVE, typeof oldDatas)
    const ids = oldDatas.ApproveOrderIds.split( ',' )
    const groupId = oldDatas.GroupId
    const approveState = oldDatas.ApproveState
    ids.forEach( ( id ) => {
        if ( approveState == 1 ) {
            if ( !state[ groupId ].passes ) {
                state[ groupId ].passes = {}
            }
            state[ groupId ].passes[ id ] = state[ groupId ].unapproves[ id ]
            state[ groupId ].passes[ id ].ApproveOrderState = 1
        } else {
            if ( !state[ groupId ].rejects ) {
                state[ groupId ].rejects = {}
            }
            state[ groupId ].rejects[ id ] = state[ groupId ].unapproves[ id ]
            state[ groupId ].rejects[ id ].ApproveOrderState = 2
        }
        delete state[ groupId ].unapproves[ id ]
        if ( !C( state[ groupId ].unapproves ) ) {
            delete state[ groupId ].unapproves
        }
    } )
    return state
}