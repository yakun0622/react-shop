/**
 * Created by wangyakun on 16/9/4.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import  {lightBlue300} from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {S, P, M, F, D, Q, T, L, Z, formatDate} from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    TabView,
    ListView,
    Form,
    TextField,
    CheckView,
    AccountCircle,
    LockIcon,
    CardView,
    KeyIcon,
} from '../../../components/BaseComponent'
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import * as TYPE from '../../../actions/type'
class Deliver extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'Deliver'
        this.state = {
            datas: {
                OrderId: props.orderId,
                ShippingCode: '',
                InvoiceCode: '',
                InvoiceNumber: '',
                DeliverExplain: '',
                ShippingExpressId: false,
                ReciverName: '',
                ReciverArea: '',
                ReciverStreet: '',
                ReciverMobPhone: '',
                ReciverTelPhone: '',
                DaddressId: '',
            },
            daddress: {
                DaddressId: '',
                SellerName: '',
                Telphone: '',
                AreaInfo: '',
                Address: '',
            },
            loading: false,
            finished: false,
            stepIndex: 0,
            expressType: null,
            addressOpen: false,
        }
    }

    componentWillReceiveProps(props) {
    }

    componentWillMount() {
        // L("componentWillMount.....")
        D(TYPE.DADDRESS_LOAD)

        const orderId = this.props.orderId
        // let formdata = new FormData()
        // formdata.append('order_id', orderId)
        D(TYPE.ORDER_SEND_LOAD, {order_id: orderId}, 'form')
    }

    componentDidMount() {
        const {daddressInfo, orderInfo} = this.props.datas
        const state = this.state
        L('daddressInfo....', daddressInfo)
        if (daddressInfo) {
            state.datas.DaddressId = daddressInfo.Id
            state.datas.SellerName = daddressInfo.SellerName
            state.datas.Telphone = daddressInfo.Telphone
            state.datas.AreaInfo = daddressInfo.AreaInfo
            state.datas.Address = daddressInfo.Address
            this.setState(state)
        }
    }

    selectExpress = (event, index, value) => {
        const {datas} = this.state
        datas["ShippingExpressId"] = value
        this.setState({datas})
    }

    getStepContent = (stepIndex) => {
        const state = this.state
        const {daddressInfo, orderInfo} = this.props.datas
        let reciverInfo = JSON.parse(orderInfo.ReciverInfo)
        switch (stepIndex) {
            case 0:

                return (
                    <View width={'100%'}>
                        <View grow={1} flow={'column'} alignSelf={'stretch'}>
                            <p>订单编号：{orderInfo.OrderSn}</p>
                            <p>运费：{orderInfo.ShippingFee == 0 ? '免运费' : "￥" + orderInfo.ShippingFee}</p>
                            <p>下单时间：{formatDate(orderInfo.AddTime)}</p>
                            <p>
                                收货人信息：{orderInfo.ReciverName + " "}{ reciverInfo.phone ? reciverInfo.phone : ""}</p>
                            <p>收货人地址：{reciverInfo.address}</p>

                        </View>
                        <View grow={1} flow={'column'} alignSelf={'stretch'}>

                            <TextField
                                name={'InvoiceCode'}
                                value={this.state.datas.InvoiceCode}
                                onChange={(name, value) => this.setFormDatas(name, value)}
                                rules={{required: true, minLength: 2, maxLength: 32}}
                                label={'发票代码'}
                            />
                            <TextField
                                name={'InvoiceNumber'}
                                value={this.state.datas.InvoiceNumber}
                                onChange={(name, value) => this.setFormDatas(name, value)}
                                rules={{required: true, minLength: 2, maxLength: 32}}
                                label={'发票号码'}
                            />
                            <TextField
                                name={'DeliverExplain'}
                                value={this.state.datas.DeliverExplain}
                                onChange={(name, value) => this.setFormDatas(name, value)}
                                label={'发货备忘'}
                            />
                        </View>
                    </View>

                );
            case 1:
                return (
                    daddressInfo ?
                        <View width={'100%'}>
                            <View grow={5} flow={'column'} alignSelf={'stretch'}>
                                <p>
                                    发货人：{state.daddress.SellerName ? state.daddress.SellerName : daddressInfo.SellerName}</p>
                                <p>联系电话：{state.daddress.Telphone ? state.daddress.Telphone : daddressInfo.Telphone}</p>
                                <p>
                                    发货地址：{state.daddress.AreaInfo ? state.daddress.AreaInfo : daddressInfo.AreaInfo}{state.daddress.Address ? state.daddress.Address : daddressInfo.Address}</p>
                            </View>
                            <View grow={1}>
                                <Button icon={<EditIcon/>}
                                        onTap={()=> {
                                            this.setState({addressOpen: true})
                                        }}
                                        iconPosition={'left'} label={'编辑'} shadowSize={10} shadowOffset={3}
                                        radius={0}
                                />
                            </View>
                        </View> : <View width={'100%'} height={200} alignV={'center'} alignH={'c'} alignSelf={'center'}
                                        fontColor={T.palette.grey}><WarningIcon color={T.palette.grey}/> 请进入地址管理中添加发货地址后再操作
                    </View>
                );
            case 2:
                return (
                    <View>
                        <SelectField
                            value={this.state.datas.ShippingExpressId}
                            onChange={this.selectExpress}
                            floatingLabelText="物流公司"
                        >
                            {
                                this.expressItems()
                            }
                        </SelectField>
                        <TextField
                            name={'ShippingCode'}
                            value={this.state.datas.ShippingCode}
                            onChange={(name, value) => this.setFormDatas(name, value)}
                            rules={{required: true, minLength: 2, maxLength: 32}}
                            label={'物流单号'}
                        />
                    </View>
                );
            case 3:
                return
        }
    }

    submitDeliver = () => {
        const {daddressInfo} = this.props.datas
        const state = this.state
        const orderId = this.props.orderId
        let data = {}
        data.order_id = orderId
        data.shippingExpressId = state.datas.ShippingExpressId
        data.shippingCode = state.datas.ShippingCode
        data.invoiceNumber = state.datas.InvoiceNumber
        data.invoiceCode = state.datas.InvoiceCode
        data.deliverExplain = state.datas.DeliverExplain
        data.daddressId = state.datas.DaddressId ? state.datas.DaddressId : daddressInfo.Id
        D(TYPE.ORDER_SEND_ADD, data, 'form')
        this.props.onRequestClose()
    }

    expressItems = () => {
        const {myExpressList, expressList} = this.props.datas
        let myExpress = {}
        let expressArray = myExpressList[0].Express.split(",")
        let items = []
        F(expressArray, (expressId, index) => {
            myExpress[expressId] = expressList[expressId].EName
            items.push(<MenuItem key={expressId} value={expressId} primaryText={expressList[expressId].EName}/>)
        })
        return items
    }

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state
        if (stepIndex >= 2) {
            this.submitDeliver()
            return
        }
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    deliverContent = () => {

        const {finished, stepIndex} = this.state
        const contentStyle = {margin: '0 16px', overflow: 'hidden'}

        if (finished) {
            this.props.onRequestClose()
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="上一步"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? '完成' : '下一步'}
                        primary={true}
                        onTouchTap={this.handleNext}
                    />
                    <RaisedButton
                        label={'取消'}
                        primary={true}
                        onTouchTap={this.props.onRequestClose}
                        style={{float: 'right'}}
                    />
                </div>
            </div>
        );
    }

    render() {

        const {orderInfo, daddressList} = this.props.datas
        const {stepIndex, loading} = this.state
        return (
            <div>
                {
                    orderInfo && <Dialog {...dialogProps}
                                         open={true}
                                         onRequestClose={this.props.onRequestClose}>
                        <Stepper activeStep={stepIndex}>
                            <Step>
                                <StepLabel>确认收货信息<br />及交易详情</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>确认发货信息</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>选择物流服务</StepLabel>
                            </Step>
                        </Stepper>
                        <ExpandTransition loading={loading} open={true}>
                            {this.deliverContent()}
                        </ExpandTransition>
                    </Dialog>
                }
                {
                    this.daddressList(daddressList)
                }
            </div>
        )
    }

    daddressList = (daddressList) => {
        return <Dialog {...dialogProps}
                       open={this.state.addressOpen}
                       onRequestClose={()=> {
                           this.setState({addressOpen: false})
                       }}>
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>联系人</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 300}}>发货地址</TableHeaderColumn>
                        <TableHeaderColumn>电话</TableHeaderColumn>
                        <TableHeaderColumn>操作</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        F(daddressList, (item, key) => {
                            return <TableRow key={key}>
                                <TableRowColumn>{item.SellerName}</TableRowColumn>
                                <TableRowColumn style={{width: 300}}>{item.AreaInfo}{' '}{item.Address}</TableRowColumn>
                                <TableRowColumn>{item.Telphone}</TableRowColumn>
                                <TableRowColumn>
                                    <View>
                                        <Button color={lightBlue300} onTap={()=> {
                                            this.selectDaddress(item)
                                        }}>选择</Button>
                                    </View>

                                </TableRowColumn>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </Dialog>
    }

    selectDaddress = (daddress) => {
        const state = this.state
        state.datas.DaddressId = daddress.Id
        state.daddress.SellerName = daddress.SellerName
        state.daddress.AreaInfo = daddress.AreaInfo
        state.daddress.Address = daddress.Address
        state.daddress.Telphone = daddress.Telphone
        state.addressOpen = false
        this.setState(state)
    }
}

const rootProps = {
    style: {}
}

const dialogProps = {
    modal: false,
    contentStyle: {
        maxWidth: 'none',
        width: 800
    },
    bodyStyle: {
        padding: 24
    },
    autoScrollBodyContent: true
}

export default connect(
    (state)=> {
        return {
            datas: {
                orderInfo: state['storeDeliver'].orderInfo,
                daddressInfo: state['storeDeliver'].daddressInfo,
                expressList: Z(state['storeDeliver'].expressList),
                myExpressList: state['storeDeliver'].myExpressList,
                daddressList: state['daddress'].daddress
            }
        }
    }
    //bindActionCreators()
)(Deliver)