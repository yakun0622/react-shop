/**
 * Created by kenn on 16/8/6.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { S, P, M, F, D, Q, T, C } from '../../../common'
import {
    BaseComponent, RadioButton, RadioButtonGroup, Step, Stepper, StepButton,
    StepContent, TextField, FlatButton, MenuItem,
    SelectField, GroupRadio, EditIcon, RemoveIcon,
    ScrollView, Dialog, SelectView, Button, CheckView,
    View, Label
}
    from '../../../components/BaseComponent'

import OrderAddressEdit from './OrderAddressEdit'

import { ADDRESS, USER } from '../../../store/api'
import { ADDRESS_ADD, ADDRESS_EDIT, ADDRESS_DEFAULT, ADDRESS_REMOVE, ORDER_ADD, TRANSORTFEE } from '../../../actions/type'

class Order extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Order'
        // this.log( props.user )
        this.state = M(
            this.state, {
                stepIndex: 3,
                defaultAddress: null,
                //是否添加新地址,如是则表单编辑新地址,否则编辑现有地址
                isEdit: false,
                openDialog: false,
                //发票信息,如果为false则表示不开发票
                InvoiceInfo: false,
                OrderMessage: false,
                //是否打开公司支付对话框
                openGroupPay: false,
                //是否是紧急订单
                orderType: 0,
                isSubmit: false,
                //采购原因
                buyReason: null,
            }
        )

        //默认地址id
        this.defaultAddressId = null
    }

    componentWillMount(){
        let feeData = this.props.transportfreeData
        if( feeData ) {
            this.getShippingFee(feeData)
        }
    }

    componentWillReceiveProps(props){
        if( !this.props.transportfreeData && props.transportfreeData ) {
            this.getShippingFee(props.transportfreeData)
        }
    }

    getShippingFee( feeData ) {
        let addressDatas = this.props.datas.address.datas
        if( this.defaultAddressId && addressDatas[this.defaultAddressId] ) {
            feeData.AreaId = addressDatas[this.defaultAddressId].AreaId
            this.log(feeData)
            D(TRANSORTFEE, feeData, 'form')
        }
    }

    /**
     * 获取默认地址id
     * @returns {number}
     */
    getDefaultAddressId() {
        let id = 0
        F(
            this.props.datas.address.datas, ( data, addId ) => {
                if ( data.IsDefault == 1 ) {
                    this.defaultAddressId = addId
                    id = addId
                    return false
                }
            }
        )
        return id
    }

    /**
     * 获取默认地址
     * @param defaultAddress
     */
    getDefaultAddress() {
        const id = this.getDefaultAddressId()
        return id == 0 ? '' : this.props.datas.address.datas[ id ].TrueName + ' '
                              + this.props.datas.address.datas[ id ].MobPhone + ' '
                              + this.props.datas.address.datas[ id ].TelPhone + ' | '
                              + this.props.datas.address.datas[ id ].AreaInfo + ' '
                              + this.props.datas.address.datas[ id ].Address
    }

    editAddress( defaultId ) {

        let data = M( this.props.datas.address.datas[ defaultId ] )
        if ( data.IsDefault == 0 ) {
            data.IsDefault = 1

            D( ADDRESS_DEFAULT, this.putData( data, 'IsDefault' ), defaultId )

            if ( C( this.props.datas.address.datas ) > 1 && this.defaultAddressId != 0 ) {
                let d = M( this.props.datas.address.datas[ this.defaultAddressId ] )
                d.IsDefault = 0
                D( ADDRESS_DEFAULT, d, this.defaultAddressId )
            }
        }
    }

    /**
     * 地址列表
     */
    addressList() {
        const { datas } = this.props.datas.address
        return (
            <RadioButtonGroup {...S()
                .add( 'defaultSelected', this.getDefaultAddressId() + '' )
                .name( 'address' )
                .change( ( defaultAddress ) => this.editAddress( defaultAddress ) )
                .p()}
            >
                {F( datas, ( data, id ) => {
                    return (
                        <RadioButton {
                                         ...S().key( id + 'addr' )
                                               .text(
                                                   data.TrueName + ' '
                                                   + data.MobPhone + ' '
                                                   + data.TelPhone + ' | '
                                                   + data.AreaInfo + ' '
                                                   + data.Address
                                               )
                                               .value( id + '' )
                                               .marginTop( 8 )
                                               .p()
                                     } />
                    )
                } )}
            </RadioButtonGroup>
        )
    }

    close = () => {
        this.setState( { isSubmit: false } )
        this.props.close()
    }

    render() {
        const { ownerGroups, joinGroups, isCart, groupId, transportfee, total } = this.props
        //this.log(this.props.user)
        //this.log( this.props.orderDatas.goods )
        return (
            <Dialog
                open={this.props.open}
                width={800}
                close={this.close}

                rightButton={'个人支付'}
                onRightButton={ () => this.sendOrder( 1 ) }

                leftButton={(ownerGroups || joinGroups) && !isCart && groupId ? '公司支付' : null}
                onLeftButton={() => this.setState( { openGroupPay: true } )}

                title={<View alignV={'end'}>
                    <Label text={'￥' + total} fontSize={36} fontColor={T.palette.white}/>
                    <Label text={'运费：' + (transportfee ? transportfee : '免运费')} fontSize={T.fontSize.normal} fontColor={T.palette.white} margin={'6px 16px'}/>
                </View>}
            >
                {this.dialogBody()}
            </Dialog>
        )
    }

    dialogBody() {

        const { style, total } = this.props
        const { datas } = this.props.datas.address
        const { stepIndex, isSubmit } = this.state
        // this.log( this.props.user )

        if ( isSubmit ) {
            return <div style={S().center().height( 150 ).lineHeight( 150 ).size( 32, 1 ).s()} >订单已提交!!!</div>
        } else {
            return (
                <div {...S().height( 420 ).p()}>
                    <ScrollView width={800} height={420} isLine={true} >
                        <Stepper
                            activeStep={stepIndex}
                            linear={false}
                            orientation='vertical'
                        >
                            <Step >
                                <StepButton onTouchTap={() => this.setState( { stepIndex: 0 } )} >
                                    <span style={{ color: 'grey', marginRight: 16 }} >送货地址</span>
                                    <span>{this.getDefaultAddress()}</span>
                                </StepButton>
                                <StepContent>
                                    {this.addressList()}
                                    <span {...S()
                                        .color( T.palette.main, 1 )
                                        .hand()
                                        .inline( 1 )
                                        .click( () => this.setState( { openDialog: true, isEdit: false } ) )
                                        .p()}>
                                    +添加新地址</span>
                                    {
                                        this.defaultAddressId &&
                                        <EditIcon {...S()
                                            .marginLeft( 16 )
                                            .marginTop( 8 )
                                            .size( 24 )
                                            .inline( 1 )
                                            .hand()
                                            .color( T.palette.lightGrey, 2 )
                                            .color( T.palette.darkBlack, 3 )
                                            .click( () => this.setState( { openDialog: true, isEdit: true } ) )
                                            .p()}
                                        />
                                    }
                                    {
                                        this.defaultAddressId &&
                                        <RemoveIcon {...S()
                                            .marginLeft( 16 )
                                            .marginTop( 8 )
                                            .size( 24 )
                                            .inline( 1 )
                                            .hand()
                                            .color( T.palette.lightGrey, 2 )
                                            .color( T.palette.darkBlack, 3 )
                                            .click(
                                                () => {
                                                    D( ADDRESS_REMOVE, null, Number( this.defaultAddressId ) );
                                                    this.defaultAddressId = null;
                                                    this.setState( {} )
                                                }
                                            )
                                            .p()}
                                        />
                                    }
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton onTouchTap={() => this.setState( { stepIndex: 1 } )} >
                                    <span style={{ color: 'grey', marginRight: 16 }} >支付方式</span>
                                    <span>货到付款</span>
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton onTouchTap={() => this.setState( { stepIndex: 2 } )} >
                                    <span style={{ color: 'grey', marginRight: 16 }} >是否可开发票</span>
                                    <span>{this.state.InvoiceInfo ? '是' : '否'}</span>
                                </StepButton>
                                <StepContent>
                                    <TextField
                                        name="InvoiceInfo"
                                        fullWidth={true}
                                        value={this.state.InvoiceInfo}
                                        onChange={( name, InvoiceInfo ) => this.setState( { InvoiceInfo } )}
                                        label={'发票信息'}
                                    />
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton onTouchTap={() => this.setState( { stepIndex: 3 } )} >
                                    <span style={{ color: 'grey', marginRight: 16 }} >留言</span>
                                </StepButton>
                                <StepContent>
                                    <TextField
                                        name="OrderMessage"
                                        rowsMax={5}
                                        value={this.state.OrderMessage}
                                        onChange={( name, OrderMessage )=>this.setState( { OrderMessage } )}
                                        label={'留言'}
                                        rules={{ maxLength: 255 }}
                                    />
                                </StepContent>
                            </Step>

                        </Stepper>
                    </ScrollView>


                    <OrderAddressEdit
                        open={this.state.openDialog && !this.state.isEdit}
                        isAdd={!this.state.isEdit}
                        onClose={() => this.setState( { openDialog: false } )}
                    />

                    {this.state.isEdit && this.state.openDialog &&
                     <OrderAddressEdit
                         open={true}
                         isAdd={!this.state.isEdit}
                         onClose={() => this.setState( { openDialog: false } )}
                         datas={datas[ this.defaultAddressId ]}
                     />
                    }
                    {this.groupPay()}
                </div>

            )
        }


    }

    /**
     * 公司支付
     * @returns {null}
     */
    groupPay = function () {
        const { openGroupPay, orderType, buyReason } = this.state
        if ( !openGroupPay ) {
            return null
        }

        //this.log(groupCheckedId)


        return (
            <Dialog
                width={500}
                title={'公司采购'}
                open={openGroupPay}
                close={() => this.setState( { openGroupPay: false } )}
                rightButton={'采购'}
                needBlur={false}
                onRightButton={ () => this.sendOrder( 0 )}
            >
                <View width={'100%'} margin={8} orientation={'column'} >
                    <CheckView
                        width={'100%'}
                        datas={{ 0: '计划采购', 1: '紧急采购', 2: '福利采购' }}
                        checked={orderType}
                        onCheck={( name, orderType ) =>this.setState( { orderType } ) }
                    />
                    <TextField
                        name="BuyReason"
                        value={buyReason}
                        label={'采购原因'}
                        onChange={( name, value ) => this.setState( { buyReason: value } )}
                        rules={{ maxLength: 256 }}
                    />
                </View>
            </Dialog>

        )
    }

    sendOrder( IsPersonal ) {
        const { InvoiceInfo, OrderMessage, orderType, buyReason } = this.state
        const { orders, goods } = this.props.orderDatas
        const { ownerGroups, joinGroups, user, groupId } = this.props

        let isOwnerGroup = false
        let groupParentId = 0
        let approveLevel = 0
        let buyerName = user.trueName && user.trueName != '' ? user.trueName : user.name

        let formdata = {}
        let addressData = this.props.datas.address.datas[this.defaultAddressId]
        formdata.AreaId = addressData.AreaId

        let o = F( orders, ( order ) => {

                order.BuyerName = buyerName
                order.BuyerEmail = user.email
                order.BuyerPhone = user.phone

                if ( IsPersonal ) {
                    order.Personal = 1
                } else {
                    order.Personal = 0

                    //设置组
                    order.GroupId = Number( groupId )
                    if ( ownerGroups && ownerGroups[ groupId ] ) {
                        order.GroupName = ownerGroups[ groupId ].GroupName
                        isOwnerGroup = true
                        groupParentId = ownerGroups[ groupId ].GroupParent
                        approveLevel = ownerGroups[ groupId ].ApproveLevel
                    } else if ( joinGroups && joinGroups[ groupId ] ) {
                        order.GroupName = joinGroups[ groupId ].GroupName
                        groupParentId = joinGroups[ groupId ].GroupParent
                        approveLevel = joinGroups[ groupId ].ApproveLevel
                    }
                }

                //发票信息
                if ( InvoiceInfo ) {
                    order.InvoiceInfo = InvoiceInfo
                }

                //留言
                if ( OrderMessage ) {
                    order.OrderMessage = OrderMessage
                }

                //采购原因
                if ( buyReason ) {
                    order.BuyReason = buyReason
                }

                //地址
                order.AddressId = Number( this.defaultAddressId )
                order.ReciverName = addressData.TrueName
                order.ReciverInfo = JSON.stringify({"phone":addressData.MobPhone,"tel_phone":addressData.TelPhone,"area":addressData.AreaInfo,"street":addressData.Address})
                order.ReciverProvinceId = addressData.AreaId
                //是否应急
                order.OrderType = Number( orderType )

                return order
            }
        )

        formdata.IsOwnerGroup = isOwnerGroup
        formdata.GroupParentId = groupParentId
        formdata.ApproveLevel = approveLevel
        formdata.IsCart = this.props.isCart
        formdata.Orders = JSON.stringify( o )
        formdata.Goods = JSON.stringify( this.props.orderDatas.goods )
        formdata.TagIds = this.props.orderDatas.tagIds
        //this.log( 'orderTags',this.props.orderDatas.tagIds )
        //this.log( isOwnerGroup )
        //this.log( groupParentId )
        //this.log( formdata )
        // this.props.close()
        D( ORDER_ADD, formdata, 'form' )
        this.setState( { isSubmit: true } )
    }
}

export default connect(
    ( state )=> {
        return {
            datas: {
                address: state[ ADDRESS ]
            },
            user: state[ USER ],
            ownerGroups: state[ USER ] && state[ USER ].ownerGroups,
            joinGroups: state[ USER ] && state[ USER ].joinGroups,
            transportfee: state.transport
        }
    }
    //bindActionCreators()
)( Order )