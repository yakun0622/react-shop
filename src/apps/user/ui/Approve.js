/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { connect } from 'react-redux'

import { M, F, D, Q, T, L, formatDate } from '../../../common'
import {
    BaseComponent, View, Button,
    TabView, FloatButton, Paging, DoneAllIcon,
Dialog, TextField
}
    from '../../../components/BaseComponent'
import OrderListItem from '../../common/ui/OrderListItem'
import * as TYPE from '../../../actions/type'

class Approve extends BaseComponent {
    display = 'Approve'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
    }

    state = {
        tabChecked: 0,
        checkedApproveOrderIds: [],
        orderTypeChecked: -1,
        page: 1,
        openApproveDialog: false,
        //审批理由
        ApproveOrderReason: null,
    }

    componentWillMount() {
        this.getApproveOrders( 0 )
    }

    /**
     * 请求审批订单数据
     * @param state 0 未审批 1 通过  2未通过
     */
    getApproveOrders = ( approveState, orderType, orderSn, page = 1 ) => {
        const { checkedGroup, joinGroups, ownerGroups } = this.props

        let q = Q()
        q.add( "ApproveState", approveState )

        //用于reducer配置数据
        const option = { groupId: checkedGroup, state: approveState }

        if ( orderSn ) {
            q.add( 'OrderSn', orderSn )
        } else {
            if ( joinGroups && joinGroups[ checkedGroup ] ) {
                option.isOwner = false
                q.add( 'RoleId', joinGroups[ checkedGroup ].RoleId )
                q.add( 'GroupBelong', joinGroups[ checkedGroup ].GroupBelong || joinGroups[ checkedGroup ].GroupId )
                //this.log('getApproveOrders', joinGroups[ checkedGroup ].GroupBelong)
            }

            if ( ownerGroups && ownerGroups[ checkedGroup ] ) {
                option.isOwner = true
                q.add( 'GroupId', checkedGroup )
            }

            if ( orderType > -1 ) {
                q.add( 'OrderType', orderType )
            }
        }


        q.add('Page', page)

        D( TYPE.APPROVE_ORDER_LOAD, q.ok(), option )
    }

    onTabChecked = ( tabChecked ) => {
        this.getApproveOrders( tabChecked )
        this.setState( { tabChecked, checkedApproveOrderIds:  []  } )
    }

    orderList = () => {
        const approves = this.getApproves()
        //this.log( 'approve', approves )
        if ( !approves ) {
            return null
        }
        const { roleTags, joinGroups, checkedGroup } = this.props
        let ownerRoleTags = null
        const isJoinGroup = joinGroups && joinGroups[ checkedGroup ]
        if ( roleTags && isJoinGroup ) {
            roleTags.forEach( ( roleTag ) => {
                if ( roleTag.RoleId == joinGroups[ checkedGroup ].RoleId ) {
                    if ( !ownerRoleTags ) {
                        ownerRoleTags = []
                    }
                    ownerRoleTags.push( roleTag.TagId )
                }
            } )
        }

        //根据标签删选goods
        return F( approves, ( approve, id ) => {
            let goodses = {}
            let orderAmount = 0

            if ( isJoinGroup ) {
                F( approve.goodses, ( goods, id ) => {
                    //如果goods有标签，则需要有对应标签的审批人审批
                    if ( goods.tags ) {
                        //如果角色也有标签， 则删选有对应的标签商品
                        if ( ownerRoleTags ) {
                            ownerRoleTags.forEach( ( tagId ) => {
                                if ( goods.tags[ tagId ] && !goodses[ id ] ) {
                                    goodses[ id ] = goods
                                    orderAmount += goods.GoodsPrice * goods.GoodsNum
                                }
                            } )
                        }
                    } else {
                        goodses[ id ] = goods
                        orderAmount += goods.GoodsPrice * goods.GoodsNum
                    }
                } )
            } else {
                goodses = approve.goodses
                orderAmount = approve.OrderAmount
            }

            return (
                <OrderListItem
                    key={'approve' + id}
                    alignSelf={'stretch'}
                    id={approve.Id}
                    orderSn={approve.OrderSn}
                    orderType={approve.OrderType}
                    orderAmount={orderAmount}
                    storeId={approve.StoreId}
                    storeName={approve.StoreName}
                    goodses={goodses}
                    createTime={formatDate(approve.Ctime)}
                    buyerName={approve.BuyerName}
                    margin={'4px 24px'}
                    isApprove={true}
                    checked={this.state.checkedApproveOrderIds.indexOf( id ) != -1}
                    onTap={() => this.onOrderListItem( id )}
                />
            )
        } )
    }

    hasPermission = (needPermission) => {
        const { ownerGroups, joinGroups, checkedGroup } = this.props
        if( ownerGroups && ownerGroups[checkedGroup] ) {
            return true
        } else {
            return !!(joinGroups[checkedGroup].RolePermission & needPermission)
        }
    }

    onOrderListItem = ( approveId ) => {
        const ids = this.state.checkedApproveOrderIds
        const index = ids.indexOf( approveId )
        index == -1 ? ids.push( approveId ) : ids.splice( index, 1 )
        this.setState( { checkedApproveOrderIds: ids } )
    }

    showTabContent = () => {
        const { tabChecked } = this.state

        return (
            <View key={tabChecked + 'appr'} width={'100%'} orientation={'column'} overflow={'visible'} >
                {this.orderList()}
            </View>
        )
    }

    getApproves = () => {
        const { unapproves, passes, rejects } = this.props
        const { tabChecked } = this.state

        let approves = unapproves
        switch ( tabChecked ) {
            case 1:
                approves = passes
                break
            case 2:
                approves = rejects
                break
        }

        return approves
    }

    onButtonTap = ( name ) => {
        switch ( name ) {
            case 'selectAll':
                const approves = this.getApproves()
                this.setState( { checkedApproveOrderIds: approves ? Object.keys( approves ) : [] } )
                break
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

    setOrderType( orderType ) {
        const { tabChecked, orderTypeChecked } = this.state
        if ( orderTypeChecked !== orderType ) {
            this.getApproveOrders( tabChecked, orderType )
            this.setState( { orderTypeChecked: orderType, checkedApproveOrderIds:  []  } )
        } else {
            this.getApproveOrders( tabChecked )
            this.setState( { orderTypeChecked: -1, checkedApproveOrderIds:  []  } )
        }
    }

    getPagesByOrderState = () => {
        const { tabChecked } = this.state
        let count = 0
        switch ( tabChecked ) {
            case 1:
                count = this.props.passesCount || 0
                break
            case 2:
                count = this.props.rejectsCount || 0
                break
            default:
                count = this.props.unapprovesCount || 0
                break
        }
        const pages = count / 20
        if ( pages < 1 ) {
            return null
        }

        return Math.ceil( pages )
    }

    getGroup = (  ) => {
        const { checkedGroup, joinGroups, ownerGroups } = this.props
        if( joinGroups && joinGroups[checkedGroup] ) {
            return joinGroups[checkedGroup]
        } else {
            return ownerGroups[checkedGroup]
        }
    }

    onApprove =( isPass ) => {
        const { checkedApproveOrderIds, ApproveOrderReason, tabChecked, orderTypeChecked, page } = this.state

        if( checkedApproveOrderIds.length == 0 ) {
            return
        }

        const { unapproves } = this.props

        const formdata = {}
        if( ApproveOrderReason ) {
            formdata.ApproveOrderReason = ApproveOrderReason
        }

        if( isPass ) {
            formdata.ApproveState = 1
        } else {
            formdata.ApproveState = 2
        }
        const group = this.getGroup()
        formdata.GroupId = group.GroupId
        formdata.GroupParentId = group.GroupParent
        formdata.ApproveLevel = group.ApproveLevel


        formdata.ApproveOrderIds = checkedApproveOrderIds.join(',')

        const tagIds = []
        const orderTypes = []
        const orderIds = []
        checkedApproveOrderIds.forEach(( id ) => {
            tagIds.push(unapproves[id].TagIds)
            orderTypes.push(unapproves[id].OrderType)
            orderIds.push(unapproves[id].OrderId)
        })

        formdata.TagIds = tagIds.join('|')
        formdata.OrderTypes = orderTypes.join(',')
        formdata.OrderIds = orderIds.join(',')

        D(TYPE.APPROVE_ORDER_APPROVE, formdata, 'form')
        this.getApproveOrders(tabChecked, orderTypeChecked, null, page)
        this.setState( { openApproveDialog: false, checkedApproveOrderIds: [] } )
    }

    setPage = ( page ) => {
        const { tabChecked, orderTypeChecked } = this.state
        this.getApproveOrders(tabChecked, orderTypeChecked, null, page)

        this.setState( { page } )
    }

    render() {
        const { tabChecked, orderTypeChecked, page,
            checkedApproveOrderIds, openApproveDialog, ApproveOrderReason } = this.state
        //this.log( unapproves )
        const pages = this.getPagesByOrderState()
        return (
            <View width={0} grow={1} orientation={'column'} margin={16} overflow={'visible'}>
                <TabView
                    alignSelf={'stretch'}
                    color={T.palette.lightGrey}
                    hoverColor={T.palette.main}
                    fontColor={T.palette.darkBlack}
                    hoverFontColor={T.palette.white}
                    tabs={[ '未审批', '已审批', '未通过' ]}
                    checked={tabChecked}
                    toggle={false}
                    onChecked={this.onTabChecked}
                />
                <View alignSelf={'stretch'} margin={'16px 0'} alignH={'between'} >
                    <View>
                        <Button
                            height={24}
                            label={'全部选择'}
                            fontColor={T.palette.grey}
                            hoverFontColor={T.palette.main}
                            margin={'0 4px 4px'}
                            onTap={() => this.onButtonTap( 'selectAll' )}
                        />
                        <Button
                            height={24}
                            label={'取消选择'}
                            fontColor={T.palette.grey}
                            hoverFontColor={T.palette.main}
                            margin={'0 4px 4px'}
                            onTap={() => this.setState( { checkedApproveOrderIds: [] } )}
                        />
                    </View>
                    <View>
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


                </View>
                {this.showTabContent()}
                {
                    pages && <Paging
                        width={450}
                        max={5}
                        pages={pages}
                        checked={page}
                        alignSelf={'center'}
                        onClick={this.setPage}
                    />
                }
                {
                    checkedApproveOrderIds.length != 0 && tabChecked == 0 &&
                    <FloatButton
                        icon={DoneAllIcon}
                        style={{position: 'fixed', right: 24, bottom: 24}}
                        onTap={(  ) => this.setState( { openApproveDialog: true } )}
                    />
                }
                <Dialog
                    title={'审批'}
                    width={450}
                    open={openApproveDialog}
                    close={() => this.setState( { openApproveDialog: false } )}
                    leftButton={'通过'}
                    rightButton={'拒绝'}
                    onLeftButton={this.onApprove.bind(this, true)}
                    onRightButton={this.onApprove.bind(this, false)}
                >
                    <TextField
                        name={'ApproveOrderReason'}
                        label={'留言'}
                        rowsMax={5}
                        value={ApproveOrderReason}
                        onChange={( name, value ) => this.setState( { ApproveOrderReason: value } )}
                        rules={{maxLength: 255}}
                    />
                </Dialog>
            </View>

        )
    }
}
export default connect(
    ( state )=> {
        let unapproves, passes, rejects
        let unapprovesCount = 0, passesCount = 0, rejectsCount = 0

        const approves = state.approves[ state.checkedSt.checkedGroup ]

        if ( approves ) {
            unapproves = approves.unapproves
            passes = approves.passes
            rejects = approves.rejects
            unapprovesCount = approves.unapprovesCount
            passesCount = approves.passesCount
            rejectsCount = approves.rejectsCount

        }

        return {
            user: state.user,
            checkedGroup: state.checkedSt.checkedGroup,
            ownerGroups: state.groups.ownerGroups,
            joinGroups: state.groups.joinGroups,
            unapproves,
            passes,
            rejects,
            unapprovesCount,
            passesCount,
            rejectsCount,
            roleTags: state.tags.roleTags
        }
    }
    //bindActionCreators()
)( Approve )