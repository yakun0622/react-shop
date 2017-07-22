/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { connect } from 'react-redux'

import { M, F, D, Q, T, L, formatDate } from '../../../common'
import { BaseComponent, View, Button, TabView } from '../../../components/BaseComponent'
import OrderListItem from '../../common/ui/OrderListItem'
import * as TYPE from '../../../actions/type'

class Order extends BaseComponent {
    display = 'Order'

    constructor( props ) {
        super( props )
    }

    state = {
            tabChecked: 0,
            page: 1,
            orderTypeChecked: -1
        }

    static defaultProps = {
        width:     'auto',
        height:    'auto',
        fontColor: T.palette.darkBlack,
        fontSize:  15,

        radius:      0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex:      0,
        margin:      0,

        transition: 'all .3s',

        hand:        false,
        display:     'flex',
        orientation: 'row',
        wrap:        'nowrap',
        grow:        0,
        order:       0,
        alignSelf:   'auto',

        imageSize: 'contain',
    }

    static propTypes = {
        display:        React.PropTypes.string,
        width:          React.PropTypes.any,
        height:         React.PropTypes.any,
        hand:           React.PropTypes.any,
        radius:         React.PropTypes.any,
        borderWidth:    React.PropTypes.number,
        borderColor:    React.PropTypes.string,
        color:          React.PropTypes.string,
        fontSize:       React.PropTypes.number,
        fontColor:      React.PropTypes.string,
        hoverColor:     React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        src:            React.PropTypes.string,
        imageSize:      React.PropTypes.string,
        shadow:         React.PropTypes.any,
        transition:     React.PropTypes.string,
        zIndex:         React.PropTypes.number,
        margin:         React.PropTypes.any,

        //伸缩容器属性
        flow:        React.PropTypes.string,
        wrap:        React.PropTypes.string,
        orientation: React.PropTypes.string,
        align:       React.PropTypes.string,
        alignH:      React.PropTypes.string,
        alignV:      React.PropTypes.string,

        //伸缩项目属性
        grow:      React.PropTypes.number,
        order:     React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        style: React.PropTypes.object,

        onTap:   React.PropTypes.func,
        onOver:  React.PropTypes.func,
        onLeave: React.PropTypes.func,
    }

    componentWillMount() {
        const { checkedGroup } = this.props
        const { tabChecked, page, orderTypeChecked } = this.state
        this.getOrders(checkedGroup, this.getOrderState(tabChecked), orderTypeChecked, page)
    }

    componentWillReceiveProps( props ) {
        const { checkedGroup, checkedGroupChild } = this.props
        const { tabChecked, page, orderTypeChecked } = this.state
        if( checkedGroupChild != props.checkedGroupChild ) {
            this.getOrders(props.checkedGroupChild || checkedGroup, this.getOrderState(tabChecked), orderTypeChecked, page)
        }
    }

    getOrderState = ( tabChecked ) => {
        switch(tabChecked) {
            case 1:
                return 30
                break
            case 2:
                return 40
                break
            case 3:
                return 50
                break
            case 4:
                return '0,20'
                break
            default:
                return 10
                break
        }
    }

    onTabChecked = ( tabChecked ) => {
        const { checkedGroup, checkedGroupChild } = this.props
        const { page, orderTypeChecked } = this.state

        this.getOrders(checkedGroupChild || checkedGroup, this.getOrderState(tabChecked), orderTypeChecked, page)

        this.setState( { tabChecked } )
    }

    getOrders = ( groupId, orderState, orderType, page ) => {
        const { checkedGroup, user, joinGroups } = this.props
        let data = {
            OrderState: orderState,
            GroupId: groupId,
            OrderType: orderType,
            Page: page
        }

        if( joinGroups && joinGroups[checkedGroup] && !(joinGroups[checkedGroup].RolePermission & 16) ) {
            data.MemberId = user.id
        }

        D(TYPE.ORDER_LOAD, data, 'form')
    }

    onOrderItemOpen = ( orderId ) => {
        const { orders, checkedGroup, checkedGroupChild } = this.props
        orders.forEach(( order ) => {
            if( order.Id == orderId && !order.goodses ) {
                D(TYPE.ORDER_GOODSES_LOAD, {OrderId: orderId, GroupId: checkedGroupChild || checkedGroup}, 'form')
            }
        })
    }

    onButtonTap = ( name ) => {
        switch ( name ) {
            case 'plan':
                this.setOrderType( 0 );
                break
            case 'emergency':
                this.setOrderType( 1 )
                break
            case 'welfare':
                this.setOrderType( 2 )
                break
            default:
                break
        }
    }

    hasPermission = (needPermission) => {
        const { ownerGroups, joinGroups, checkedGroup } = this.props
        if( ownerGroups && ownerGroups[checkedGroup] ) {
            return true
        } else {
            return !!(joinGroups[checkedGroup].RolePermission & needPermission)
        }
    }

    setOrderType( orderType ) {
        const { checkedGroupChild, checkedGroup } = this.props
        const { tabChecked, orderTypeChecked } = this.state
        if ( orderTypeChecked !== orderType ) {
            this.getOrders(checkedGroupChild || checkedGroup, this.getOrderState(tabChecked), orderType, 1)
            this.setState( { orderTypeChecked: orderType, page: 1  } )
        } else {
            this.getOrders(checkedGroupChild || checkedGroup, this.getOrderState(tabChecked), -1, 1)
            this.setState( { orderTypeChecked: -1, page: 1  } )
        }
    }

    render() {
        const {
            width,
            height,
            orders,
        } = this.props

        const { tabChecked, orderTypeChecked } = this.state

        return (
            <View
                width={0} grow={1} orientation={'column'} margin={16} overflow={'visible'}
            >
                <TabView
                    alignSelf={'stretch'}
                    color={T.palette.lightGrey}
                    hoverColor={T.palette.main}
                    fontColor={T.palette.darkBlack}
                    hoverFontColor={T.palette.white}
                    tabs={[ '审批中', '未发货', '已发货', '完成', '取消' ]}
                    checked={tabChecked}
                    toggle={false}
                    onChecked={this.onTabChecked}
                />
                <View margin={16}>
                    <Button
                        label={'计划订单'}
                        color={orderTypeChecked == 0 ? T.palette.darkBlack : T.palette.white}
                        fontColor={orderTypeChecked == 0 ? T.palette.white : T.palette.darkBlack}
                        width={96}
                        height={24}
                        radius={12}
                        margin={'0 4px 4px 24px'}
                        onTap={() => this.onButtonTap( 'plan' )}
                    />
                    {this.hasPermission(8) &&
                     <Button
                         label={'应急订单'}
                         color={orderTypeChecked == 1 ? T.palette.orange : T.palette.white}
                         fontColor={orderTypeChecked == 1 ? T.palette.white : T.palette.orange}
                         width={96}
                         height={24}
                         radius={12}
                         margin={'0 4px 4px'}
                         onTap={() => this.onButtonTap( 'emergency' )}
                     />
                    }
                    {this.hasPermission(32) &&
                     <Button
                         label={'福利订单'}
                         color={orderTypeChecked == 2 ? T.palette.green : T.palette.white}
                         fontColor={orderTypeChecked == 2 ? T.palette.white : T.palette.green}
                         width={96}
                         height={24}
                         radius={12}
                         margin={'0 4px 4px'}
                         onTap={() => this.onButtonTap( 'welfare' )}
                     />
                    }
                </View>
                {F( orders, ( order, i ) => {
                    return (
                        <OrderListItem
                            key={'order' + order.Id}
                            alignSelf={'stretch'}
                            id={order.Id}
                            orderSn={order.OrderSn}
                            orderType={order.OrderType}
                            orderAmount={order.OrderAmount}
                            storeId={order.StoreId}
                            buyerName={order.BuyerName}
                            goodses={order.goodses}
                            storeName={order.StoreName}
                            state={order.OrderState}
                            createTime={formatDate(order.AddTime)}
                            margin={'4px 24px'}
                            showApprovers={true}
                            onOpen={this.onOrderItemOpen}
                            approvers={order.approvers}
                            currentApproverId={order.currentApproverId}
                            removeTagPermission={this.hasPermission(1)}
                        />
                    )
                } )}
            </View>
        )
    }
}
export default connect(
    ( state )=> {
        return {
            user: state.user,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
            joinGroups: state.groups.joinGroups,
            ownerGroups: state.groups.ownerGroups,
            permission: state.permission,
            orders: state.orders.datas
        }
    }
    //bindActionCreators()
)( Order )