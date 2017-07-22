/**
 * Created by kenn on 2016/10/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'


import {M, F, D, DD, Q, T, R, L, formatDate} from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    Label,
    ArrowDownIcon,
    ArrowUpIcon,
    Icon,
    CancelIcon,
    VerifiedIcon,
    RemoveCircleIcon,
    ListView,
    Dialog,
    Numbers
} from '../../../components/BaseComponent'
import GoodsDetails from '../../common/ui/GoodsDetails'
export default class StoreOrderListItem extends BaseComponent {
    display = 'StoreOrderListItem'

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        width: 'auto',
        height: 48,
        margin: 0,

        grow: 0,
        alignSelf: 'start',
        showApprovers: false,
        showButton: false,
        showState: true,
        orderInfo: {}
    }

    state = {
        offsetHeight: 0,
        open: false,
        openGoodsDetails: false,
        detailGoodsId: false,
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
        // storeName: React.PropTypes.string,
        groupId: React.PropTypes.number,
        groupName: React.PropTypes.string,
        goodses: React.PropTypes.object,
        buyerName: React.PropTypes.string,
        checked: React.PropTypes.any,
        createTime: React.PropTypes.any,
        onTap: React.PropTypes.func,
        state: React.PropTypes.any,

        onOpen: React.PropTypes.func,
        showState: React.PropTypes.bool,
        orderInfo: React.PropTypes.any,
        onSend: React.PropTypes.func,
        onEditFee: React.PropTypes.func,
    }

    showGoodsList = (goodses, storeId, storeName, state) => {
        if (!goodses) {
            return null
        }
        return (
            <View width={'100%'} orientation={'column'} overflow={'visible'} margin={'8px 0'}>
                {F(goodses, (goods, id) => {
                    return (
                        <ListView
                            key={1 + id}
                            width={'100%'}
                            height={'auto'}
                            hoverColor={T.palette.white}
                            primaryText={goods.GoodsName}
                            secondText={'数量：' + goods.GoodsNum}
                            leftIcon={R(storeId, goods.GoodsImage, 1)}
                            leftIconSize={60}
                            goodsId={goods.GoodsId}
                            onTap={() => this.setState({openGoodsDetails: true, detailGoodsId: goods.GoodsId})}
                            margin={'4px 0 0'}
                            rightIcon={<Label text={'¥' + goods.GoodsPrice}
                                              fontColor={T.palette.gold}
                                              margin={'0 8px'}/>}
                        />


                    )
                })}
            </View>
        )
    }

    onOpen = () => {
        const {onOpen, id} = this.props
        const {open} = this.state

        !open && onOpen && onOpen(id)
        this.setState({open: !open})
    }

    onEditFeeBtn = () => {
        L('onEditFeeBtn......')
        const {onEditFee, orderInfo} = this.props
        onEditFee && onEditFee(orderInfo)
    }

    onSendBtn = () => {
        L('onSendBtn......')
        const {onSend, orderInfo} = this.props
        onSend && onSend(orderInfo)
    }

    orderState = (value) => {
        let state_type = '审批中'
        switch (value) {
            case 0:
                state_type = "已取消"
                break
            case 30:
                state_type = "待发货"
                break
            case 40:
                state_type = "已发货"
                break
            case 50:
                state_type = "已完成"
                break
            default :
                break
        }
        return state_type
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
            groupName,
            goodses,
            createTime,
            buyerName,
            checked,
            state,
            onTap,
            showState,
            orderInfo,
            onSend,
            onEditFee,
        } = this.props

        const labelProps = {
            margin: '0 16px 5px',
            fontSize: T.fontSize.min,
            //width: 320
        }

        const {offsetHeight, open, returnGoodsId, returnNum} = this.state
        let reciverInfo = JSON.parse(orderInfo.ReciverInfo)
        let invoiceInfo = orderInfo.InvoiceInfo ? JSON.parse(orderInfo.InvoiceInfo) : null
        return (
            <View
                width={width}
                height={open ? offsetHeight : height}
                grow={grow}
                alignSelf={alignSelf}
                color={open ? T.palette.minGrey : T.palette.white}
                //hoverColor={T.palette.minGrey}
                margin={margin}
                borderWidth={1}
                borderColor={checked ? T.palette.main : T.palette.lightGrey}
                onTap={onTap}
                overflow={open ? 'visible' : 'hidden'}
                zIndex={open ? 20 : 1}
                transition={'height'}
                style={{position: "relative"}}
            >
                <View ref="root" orientation={'column'} width={'100%'} overflow={'visible'}>
                    <View width={'100%'} height={height} alignV={'center'}>
                        <Label grow={2} width={0} text={orderSn} margin={'0 16px'}/>
                        <Label width={0} grow={1} text={orderInfo.Personal == 1 ? '个人订单' : groupName}
                               fontSize={T.fontSize.small}
                               margin={'0 16px'}
                               fontColor={T.palette.maxGrey}/>
                        <Label text={buyerName} fontSize={T.fontSize.small}
                               margin={'0 16px'}
                               width={0} grow={1}
                               fontColor={T.palette.grey}/>
                        <Label width={0} grow={1} text={createTime} margin={'0 16px'} fontSize={T.fontSize.min}/>
                        <Label width={0} grow={1} text={this.orderState(state)} margin={'0 16px'}
                                                fontSize={T.fontSize.min}/>
                        <Label width={0} grow={1} text={'¥' + orderAmount} margin={'0 16px'} fontColor={T.palette.gold}/>
                        <Label width={0} grow={1} text={orderInfo.ShippingFee == 0 ? '免运费' : '运费：￥' + orderInfo.ShippingFee}
                               margin={'0 16px'} fontSize={T.fontSize.min}/>
                        <View width={0} grow={1} align={'end'}>
                            {(state == 10 || state == 30) &&
                            <Button label={'修改运费'}
                                    color={T.palette.main600a}
                                    hoverColor={T.palette.main}
                                    fontColor={T.palette.white}
                                    radius={0}
                                    fontSize={13}
                                    height={24}
                                    margin={'0 3px'}
                                    onTap={this.onEditFeeBtn}
                            />}
                            {state == 30 &&
                            <Button label={'发  货'}
                                    radius={0}
                                    color={T.palette.main600a}
                                    hoverColor={T.palette.main}
                                    fontColor={T.palette.white}
                                    fontSize={13}
                                    height={24}
                                    onTap={this.onSendBtn}
                            />}
                        </View>

                        <Button width={height - 16} margin={8} height={height - 16}
                                icon={open ? ArrowUpIcon : ArrowDownIcon}
                                borderWidth={1}
                                borderColor={T.palette.lightGrey}
                                hoverColor={T.palette.main600a}
                                radius={300}
                                onTap={this.onOpen}
                        />
                    </View>
                    <View width={'100%'}>

                        <Label grow={1} width={0} {...labelProps} fontColor={'red'} text={'收货信息：'}/>
                        <Label grow={5} width={0} fontSize={T.fontSize.min}
                               text={orderInfo.ReciverName + " " + reciverInfo.phone}/>
                        <Label grow={1} width={0} {...labelProps} fontColor={'red'} text={'收货地址：'}/>
                        <Label grow={5} width={0} fontSize={T.fontSize.min}
                               text={reciverInfo.area + reciverInfo.street}/>
                    </View>

                    {
                        state == 40 && <View width={'100%'}>
                            <Label grow={1} width={0} {...labelProps} fontColor={'red'} text={'发货时间：'}/>
                            <Label grow={5} width={0} fontSize={T.fontSize.min}
                                   text={formatDate(orderInfo.ShippingTime)}/>
                            <Label grow={1} width={0} {...labelProps} fontColor={'red'} text={'发货单号：'}/>
                            <Label grow={5} width={0} fontSize={T.fontSize.min}
                                   text={'【' + orderInfo.ShippingExpressId + '】' + orderInfo.ShippingCode}/>
                        </View>
                    }
                    <View width={'100%'}>
                        <Label grow={1} width={0} {...labelProps} fontColor={'red'} text={'发票信息：'}/>
                        {
                            invoiceInfo ? <Label grow={11} width={0} fontSize={T.fontSize.min}
                                                 text={'[类型] ' + invoiceInfo['类型'] + ' [抬头] ' + invoiceInfo['抬头'] + " [内容] " + invoiceInfo['内容']}/>
                                : <Label grow={11} width={0} fontSize={T.fontSize.min}
                                         text={'无需发票'}/>
                        }
                    </View>
                    {this.showGoodsList(goodses, storeId, groupName, state)}

                </View>

                {this.state.openGoodsDetails &&
                <GoodsDetails
                    buyable={false}
                    goodsId={this.state.detailGoodsId}
                    close={() => this.setState({openGoodsDetails: false, detailGoodsId: false})}
                />
                }
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
        if (this.state.open) {
            const root = ReactDOM.findDOMNode(this.refs.root)
            if (root.offsetHeight != this.state.offsetHeight) {
                this.setState({offsetHeight: root.offsetHeight})
            }
        }
    }
}