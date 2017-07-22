/**
 * Created by wangyakun on 16/9/4.
 */
import React from 'react'
import {connect} from 'react-redux'
import {S, P, M, MM, F, D, Q, T, L, R, UR, formatDate} from '../../../common'
import {
    BaseComponent,
    View,
    Label,
    TabView,
    Form,
    TextField,
    Subheader,
    FloatButton,
    SearchIcon,
    DatePicker,
} from '../../../components/BaseComponent'
import Paging from '../../../components/Paging'
import GoodsCard from '../../common/ui/GoodsCard'
import StoreOrderListItem from './StoreOrderListItem'
import * as TYPE from '../../../actions/type'
import Deliver from './Deliver'
const STORE_ORDERS_LIMIT = 10
class OrderList extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'OrderList'
        this.state = {
            storeId: 0,
            detailOpen: false,
            deliverOpen: false,
            shippingFeeOpen: false,
            overItemId: 0,
            slideIndex: 0,
            stateType: '',
            lock: 0,
            checkedItemId: [],
            orderId: null,
            deliverOrderId: null,
            shippingFeeData: {
                Id: '',
                OrderId: '',
                ShippingFeeOld: false,
                ShippingFee: false,
                OrderSn: '',
                BuyerName: '',
                GroupName: '',
            },
            searchParams: {
                OrderSn: ''
            }
        }
    }

    componentWillMount() {
        var user = UR()
        L('user...', user)
        if (user) {
            this.setState({storeId: user.id})
        } else {
            L('用户未登录....')
        }

    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    componentDidMount() {
        const {stateType} = this.state.stateType
        this.loadData(stateType)
    }

    tabChange = (value) => {
        let state_type = ""
        switch (value) {
            case 1:
                state_type = "state_new"
                break
            case 2:
                state_type = "state_approve_pass"
                break
            case 3:
                state_type = "state_send"
                break
            case 4:
                state_type = "state_success"
                break
            case 5:
                state_type = "state_cancel"
                break
            default :
                break
        }
        this.setState({
            lock: value,
            slideIndex: value,
            stateType: state_type
        })
        this.loadData(state_type)
    }

    loadData = (stateType) => {
        L('stateType', stateType)
        let query = Q()
        query.limit(STORE_ORDERS_LIMIT)
        query.add('state_type', stateType ? stateType : '')
        D(TYPE.STORE_ORDERS_LOAD, query.ok())
    }


    /**
     * 选择图标
     * @param e
     * @param name
     */
    checked = (e, id) => {
        e.stopPropagation()
        e.preventDefault()
        let checked = this.state.checkedItemId
        if (checked.indexOf(id) == -1) {
            checked.push(id)
        } else {
            checked.splice(checked.indexOf(id), 1)
        }
        this.setState(
            {
                checkedItemId: checked
            }
        )

    }

    showGoodsList = (goodses) => {
        return (
            <View wrap={'wrap'} overflow={'visible'} zIndex={100}>
                {F(goodses, (goods, id) => {
                    return (
                        <GoodsCard
                            style=""
                            key={1 + id}
                            width={128}
                            goodsId={goods.GoodsId}
                            name={goods.GoodsName}
                            price={goods.GoodsPrice}
                            tags={goods.tags}
                            image={R(goods.StoreId, goods.GoodsImage)}
                        />
                    )
                })}

            </View>
        )
    }

    pagingClick = (page) => {
        let query = Q()
        query.limit(STORE_ORDERS_LIMIT, page == 1 ? 0 : STORE_ORDERS_LIMIT * (page - 1))
        query.add('state_type', this.state.stateType)
        D(TYPE.STORE_ORDERS_LOAD, query.ok())
    }

    onOrderItemOpen = (orderId) => {
        const {orderList} = this.props.data
        orderList.forEach((order) => {
            if (order.Id == orderId && !order.goodses) {
                D(TYPE.STORE_ORDER_GOODS_LOAD, {OrderId: orderId}, 'form')
            }
        })
    }

    render() {
        const {orderList, orderCount} = this.props.data
        const {lock, deliverOrderId, stateType, deliverOpen, searchParams} = this.state
        let pages = Math.ceil(orderCount / STORE_ORDERS_LIMIT)


        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <Subheader>订单管理 > 交易订单</Subheader>
                <View>
                    <TabView
                        width={'auto'}
                        grow={1}
                        color={T.palette.lightGrey}
                        fontColor={T.palette.maxGrey}
                        hoverColor={T.palette.grey}
                        hoverFontColor={T.palette.white}
                        checkedColor={T.palette.main}
                        tabs={['所有订单', '审批中', '待发货', '已发货', '已完成', '已取消']}
                        margin={8}
                        checked={lock}
                        toggle={false}
                        onChecked={(checked) => this.tabChange(checked)}
                    />
                </View>
                <View height={50} margin={'4px 24px'} color={T.palette.minGrey}>
                    <p>订单编号</p>
                    <TextField fullWidth={false}
                               value={searchParams.OrderSn}
                               name={'OrderSn'}
                               onChange={(name, value) => this.setFormDatas(name, value, 'searchParams')}
                    />
                    <p>下单人</p>
                    <TextField fullWidth={false}
                               value={searchParams.OrderSn}
                               name={'OrderSn'}
                               style={{width: 100}}
                               onChange={(name, value) => this.setFormDatas(name, value, 'searchParams')}
                    />
                    <p>下单时间 </p>
                    <DatePicker autoOk={true} cancelLabel={'取消'} container={'inline'}/>
                    <FloatButton
                        size={40}
                        icon={SearchIcon}
                        onTap={() => this.loadData(stateType)}
                        backgroundColor="#a4c639" style={{margin: 5}}
                    />
                </View>
                {
                    <View grow={1} flow={'column'} alignSelf={'stretch'}>
                        <View width={'100%'}>
                            <Label width={0} grow={2} text={'订单编号'} align={'center'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'所属项目'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'下单人'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'下单时间'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'订单状态'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'订单总额'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'运费'} fontColor={T.palette.grey}/>
                            <Label width={0} grow={1} text={'操作'} fontColor={T.palette.grey}/>
                        </View>

                        {
                            orderList ? F(orderList, (order, i) => {
                                return (
                                    <StoreOrderListItem
                                        key={'order' + order.Id}
                                        alignSelf={'stretch'}
                                        id={order.Id}
                                        orderSn={order.OrderSn}
                                        orderType={order.OrderType}
                                        orderAmount={order.OrderAmount}
                                        storeId={order.StoreId}
                                        buyerName={order.BuyerName}
                                        goodses={order.goodses}
                                        groupName={order.GroupName}
                                        state={order.OrderState}
                                        createTime={formatDate(order.AddTime)}
                                        margin={'4px 24px'}
                                        showApprovers={true}
                                        onOpen={this.onOrderItemOpen}
                                        removeTagPermission={false}
                                        showState={stateType ? false : true}
                                        orderInfo={order}
                                        onEditFee={this.openShippingFeeEdit}
                                        onSend={this.openSend}
                                    />
                                )
                            }) : <View height={350} alignV={'center'} alignSelf={'center'}
                                       fontColor={T.palette.grey}> 暂无符合条件的数据记录 </View>
                        }

                        {
                            pages > 0
                                ?
                                <View margin={10}><Paging height={40} max={9} pages={pages}
                                                          onClick={(page)=>this.pagingClick(page)}/></View>
                                : null
                        }
                    </View>
                }
                {
                    deliverOpen && <Deliver
                        onRequestClose={()=>this.closeDialog('deliverOpen')}
                        orderId={deliverOrderId}
                    />
                }
                {
                    this.editShippingFee()
                }
            </View>
        )
    }

    ordersList = (orderList) => {
        const {stateType} = this.state
        L('orderList', orderList)
        if (orderList) {
            F(orderList, (order, i) => {
                return (
                    <StoreOrderListItem
                        key={'order' + order.Id}
                        alignSelf={'stretch'}
                        id={order.Id}
                        orderSn={order.OrderSn}
                        orderType={order.OrderType}
                        orderAmount={order.OrderAmount}
                        storeId={order.StoreId}
                        buyerName={order.BuyerName}
                        goodses={order.goodses}
                        groupName={order.GroupName}
                        state={order.OrderState}
                        createTime={formatDate(order.AddTime)}
                        margin={'4px 24px'}
                        showApprovers={true}
                        onOpen={this.onOrderItemOpen}
                        removeTagPermission={false}
                        showState={stateType ? false : true}
                        orderInfo={order}
                        onEditFee={this.openShippingFeeEdit}
                        onSend={this.openSend}
                    />
                )
            })
        } else {
            return null
        }
    }

    openSend = (orderInfo) => {
        const state = this.state
        state.deliverOrderId = orderInfo.Id
        state.deliverOpen = true
        this.setState(state)
    }

    openShippingFeeEdit = (orderInfo) => {
        const state = this.state
        state["shippingFeeOpen"] = true
        state["shippingFeeData"]["Id"] = orderInfo.Id
        state["shippingFeeData"]["OrderId"] = orderInfo.Id
        state["shippingFeeData"]["ShippingFeeOld"] = orderInfo.ShippingFee
        state["shippingFeeData"]["OrderSn"] = orderInfo.OrderSn
        state["shippingFeeData"]["BuyerName"] = orderInfo.BuyerName
        state["shippingFeeData"]["GroupName"] = orderInfo.GroupName
        this.setState(state)
    }

    editShippingFee = () => {
        const {shippingFeeData} = MM(this.state)
        return <Form
            width={500}
            label={'修改运费'}
            datas={shippingFeeData}
            open={this.state.shippingFeeOpen}
            actionType={TYPE.ORDER_SHIPPINGFEE_EDIT}
            isSubmitJson={true}
            close={()=> this.setState({shippingFeeOpen: false})}
        >
            <TextField
                name={'OrderSn'}
                rowsMax={10}
                value={shippingFeeData.hasOwnProperty('OrderSn') ? shippingFeeData.OrderSn : ''}
                label={'订单编号'}
                disabled={true}
            />
            <TextField
                name={'GroupName'}
                rowsMax={10}
                value={shippingFeeData.hasOwnProperty('GroupName') ? shippingFeeData.GroupName : ''}
                label={'买家公司'}
                disabled={true}
            />
            <TextField
                name={'BuyerName'}
                rowsMax={10}
                value={shippingFeeData.hasOwnProperty('BuyerName') ? shippingFeeData.BuyerName : ''}
                label={'下单人'}
                disabled={true}
            />
            <TextField
                name={'ShippingFeeOld'}
                rowsMax={10}
                value={shippingFeeData.hasOwnProperty('ShippingFeeOld') ? shippingFeeData.ShippingFeeOld + '元' : '0元 '}
                label={'原运费（元）'}
                disabled={true}
            />
            <TextField
                name={'ShippingFee'}
                rowsMax={10}
                value={shippingFeeData.hasOwnProperty('ShippingFee') ? shippingFeeData.ShippingFee : ''}
                label={'运费（元）'}
                onChange={(name, value) => this.setFormDatas(name, value, 'shippingFeeData')}
                rules={{number: true, minLength: 1, required: true}}
            />
        </Form>
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                orderList: state['storeOrders'].orderList,
                goodses: state['storeOrders'].goodses,
                orderCount: state['storeOrders'].count,
            }
        }
    }
    //bindActionCreators()
)(OrderList)