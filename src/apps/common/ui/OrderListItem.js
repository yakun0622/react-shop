/**
 * Created by kenn on 2016/10/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'


import { F, D, DD, T, R } from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    Label,
    ArrowDownIcon,
    ArrowUpIcon,
    ListView,
    Dialog,
    Numbers
} from '../../../components/BaseComponent'
import GoodsDetails from './GoodsDetails'
import * as TYPE from '../type'

export default class OrderListItem extends BaseComponent {
    display = 'OrderListItem'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 48,
        margin: 0,

        grow: 0,
        alignSelf: 'start',
        showApprovers: false,
        showButton: false
    }

    state = {
        offsetHeight: 0,
        open: false,
        openGoodsDetails: false,
        returnGoodsId: 0,
        returnNum: 0
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        grow: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        id: React.PropTypes.number,
        orderSn: React.PropTypes.string,
        orderType: React.PropTypes.number,
        orderAmount: React.PropTypes.number,
        storeId: React.PropTypes.number,
        storeName: React.PropTypes.string,
        goodses: React.PropTypes.object,
        isApprove: React.PropTypes.any,
        buyerName: React.PropTypes.string,
        checked: React.PropTypes.any,
        createTime: React.PropTypes.any,
        onTap: React.PropTypes.func,
        state: React.PropTypes.any,

        showApprovers: React.PropTypes.bool,
        onOpen: React.PropTypes.func,
        removeTagPermission:React.PropTypes.bool,
        approvers:React.PropTypes.any,
        currentApproverId: React.PropTypes.any,
    }

    //componentWillReceiveProps( props ) {
    //    const { id, goodses } = this.props
    //    if( goodses && props.goodses ) {
    //        this.setState( { returnData: {orderid: id, goodsesinfo: } } )
    //    }
    //}

    getFontColorByOrderType = () => {
        switch ( this.props.orderType ) {
            case 1:
                return T.palette.orange
                break
            case 2:
                return T.palette.green
                break
            default:
                return T.palette.darkBlack
                break
        }
    }

    goodsReturnRightIcon = ( price, goodsId, goodsNum ) => {
        return (
            <View alignV={'center'} >
                {this.goodsRightIcon( price )}
                <Button label={"退货"}
                        color={T.palette.lightGrey}
                        hoverColor={T.palette.main}
                        fontColor={T.palette.white}
                        fontSize={T.fontSize.small}
                        height={20}
                        margin={'0 4px 0'}
                        onTap={( e ) => this.onCancelButton( e, goodsId, goodsNum )}
                />
            </View>
        )
    }

    goodsRightIcon = ( price ) => {
        return <Label text={'¥' + price}
                      fontColor={T.palette.gold}
                      margin={'0 8px'} />
    }

    removeTag = ( goodsId, tagId, tagName, gId ) => {
        const { id, removeTagPermission } = this.props
        if( removeTagPermission ) {
            DD("确定要删除标签：" + tagName, TYPE.TAG_USER_REMOVE, {GoodsId: goodsId, TagId: tagId}, {orderId: id, goodsId: gId, formData: true})
        }
    }

    showGoodsList = ( goodses, storeId, storeName, state ) => {
        if ( !goodses ) {
            return null
        }
        return (
            <View width={'100%'} orientation={'column'} overflow={'visible'} margin={'8px 0'} >
                {F( goodses, ( goods, id ) => {
                    return (
                        <ListView
                            key={1 + id}
                            width={'100%'}
                            height={'auto'}
                            hoverColor={T.palette.white}
                            primaryText={goods.GoodsName}
                            secondText={'数量：' + goods.GoodsNum}
                            leftIcon={R( storeId, goods.GoodsImage, 1 )}
                            goodsId={goods.GoodsId}
                            onTap={() => this.setState( { openGoodsDetails: true } )}
                            rightIcon={state ==
                                       50 ? this.goodsReturnRightIcon( goods.GoodsPrice,
                                    goods.GoodsId,
                                    goods.GoodsNum ) : this.goodsRightIcon( goods.GoodsPrice )}
                            tags={goods.tags}
                            margin={'4px 0 0'}
                            child={goods.tags &&
                                   <View width={'100%'} >
                                       {F( goods.tags, ( tagName, tagId ) => {
                                           return (
                                               <Label
                                                   key={tagId + 99}
                                                   text={tagName}
                                                   width={'auto'}
                                                   height={20}
                                                   radius={10}
                                                   align={'center'}
                                                   margin={4}
                                                   fontSize={T.fontSize.small}
                                                   color={T.palette.lightGrey}
                                                   style={{ padding: '0 8px' , cursor: 'pointer'}}
                                                   stopEvent={this.props.removeTagPermission}
                                                   onTap={(  ) => this.removeTag(goods.GoodsId, tagId, tagName, id)}
                                               />
                                           )
                                       } )}
                                       {this.state.openGoodsDetails &&
                                        <GoodsDetails
                                            buyable={false}
                                            goodsId={goods.GoodsId}
                                            close={() => this.setState( { openGoodsDetails: false } )}
                                        />
                                       }
                                   </View>
                            }
                        />
                    )
                } )}
            </View>
        )
    }

    onOpen = () => {
        const { onOpen, id } = this.props
        const { open } = this.state

        !open && onOpen && onOpen( id )
        this.setState( { open: !open } )
    }

    onCancelButton = ( e, goodsId, goodsNum ) => {
        const { id, state, goodses } = this.props
        switch ( state ) {
            case 10:
            case 30:
                DD( '确定要取消订单吗？', TYPE.ORDER_USER_CHANG_STATE, 'order_id=' + id + '&state_type=order_cancel', { id } )
                break
            case 40:
                DD( '确定要收货吗？', TYPE.ORDER_USER_CHANG_STATE, 'order_id=' + id + '&state_type=order_affirm', { id } )
                break
            case 50:
                if ( goodsId ) {
                    this.log( goodsId )
                    this.log( goodsNum )
                    this.setState( { returnGoodsId: goodsId, returnNum: goodsNum } )
                } else {
                    let returnData = {
                        orderid: id,
                        goodsinfo: F( goodses, ( goods ) => {
                            return { goodsid: goods.GoodsId, num: goods.GoodsNum }
                        } )
                    }
                    DD( '确定要退掉整个订单吗？', TYPE.ORDER_USER_RETURN, returnData, 'form' )
                }

                break
        }
    }

    getButtonText = () => {
        switch ( this.props.state ) {
            case 10:
            case 30:
                return '取 消'
                break
            case 40:
                return '收 货'
                break
            case 50:
                return '退 货'
                break
            default:
                return null
        }
    }

    approvers = () => {
        const { approvers, currentApproverId, state } = this.props
        if( approvers ) {
            let end = approvers.length -1
            let current = true
            let color = T.palette.main
            return (
                <View alignV={'center'} margin={'4px 16px'}>
                    <Label text={"审批进度： "} fontColor={T.palette.grey}/>
                    {F( approvers, ( approver, i ) => {
                        let name = approver.MemberTruename || approver.MemberName
                        if( i<end ) {
                            name += ' ➤ '
                        }

                        if( approver.RoleId == currentApproverId && current && state < 30 ) {
                            color = T.palette.grey
                            current = false
                        }

                        return (
                            <Label
                                key={i + 'la'}
                                text={name}
                                fontColor={color}
                            />
                        )
                    } )}
                </View>
            )
        }
    }

    render() {
        const {
            width,
            height,
            grow,
            alignSelf,
            margin,

            id,
            orderSn,
            orderAmount,
            storeId,
            storeName,
            goodses,
            showApprovers,
            createTime,
            buyerName,
            checked,
            state,
            onTap
        } = this.props

        const { offsetHeight, open, returnGoodsId, returnNum } = this.state

        return (
            <View
                width={width}
                height={open ? offsetHeight : height}
                grow={grow}
                alignSelf={alignSelf}
                color={T.palette.white}
                hoverColor={T.palette.minGrey}
                margin={margin}
                borderWidth={1}
                borderColor={checked ? T.palette.main : T.palette.lightGrey}
                hand={'hand'}
                onTap={onTap}
                overflow={open ? 'visible' : 'hidden'}
                zIndex={open ? 20 : 1}
                transition={'height'}
                style={{ position: "relative" }}
                onLeave={() => this.setState( { showButton: false } )}
                onOver={() => this.setState( { showButton: true } )}
            >
                <View ref="root" orientation={'column'} width={'100%'} overflow={'visible'} hand={'hand'} >
                    <View width={'100%'} height={height} alignV={'center'} hand={'hand'} >
                        <Label text={orderSn} margin={'0 16px'} fontColor={this.getFontColorByOrderType()} />
                        <Label text={storeName} margin={'0 16px'} width={0} grow={1} fontColor={T.palette.maxGrey} />
                        <Label text={buyerName}
                               margin={'0 16px'}
                               align={'end'}
                               width={60}
                               fontColor={T.palette.grey} />
                        <Label width={96} text={'¥' + orderAmount} margin={'0 16px'} fontColor={T.palette.gold} />
                        {(state != 0 && state != 20 && state != 50) || (state == 50 && goodses) ?
                            <Button label={this.getButtonText()}
                                    color={T.palette.lightGrey}
                                    hoverColor={T.palette.main}
                                    fontColor={T.palette.white}
                                    fontSize={13}
                                    height={24}
                                    onTap={this.onCancelButton}
                            />
                            : null}
                        <Button width={height - 16} margin={8} height={height - 16}
                                icon={open ? ArrowUpIcon : ArrowDownIcon}
                                onTap={this.onOpen}
                        />
                    </View>
                    {showApprovers && this.approvers()}
                    {this.showGoodsList( goodses, storeId, storeName, state )}
                </View>
                <Dialog
                    open={!!returnGoodsId}
                    width={300}
                    rightButton={'退 货'}
                    onRightButton={() => D( TYPE.ORDER_USER_RETURN,
                        { orderid: id, goodsinfo: [ { goodsid: returnGoodsId, num: returnNum } ] } )}
                    close={() => this.setState( { returnGoodsId: 0, returnNum: 0 } )}
                >
                    <View alignH={'center'} orientation={'column'} margin={16}>
                        <Label text={'退货数量'} fontSize={T.fontSize.small} />
                        <Numbers max={returnNum}
                                 value={returnNum}
                                 onChange={( returnNum ) => this.setState( { returnNum } )} />
                    </View>
                </Dialog>
            </View>
        )
    }


    componentDidMount() {
        this.setHeight()
    }

    componentDidUpdate() {
        this.setHeight()
    }

    setHeight() {
        if ( this.state.open ) {
            const root = ReactDOM.findDOMNode( this.refs.root )
            if ( root.offsetHeight != this.state.offsetHeight ) {
                this.setState( { offsetHeight: root.offsetHeight } )
            }
        }
    }
}