/**
 * Created by wangyakun on 16/9/2.
 */
import React from 'react'
import {connect} from 'react-redux'


import {S, P, M, F, D, Q, T, L} from '../../../common'
import {BaseComponent, U, I, Label,Subheader, Divider} from '../../../components/BaseComponent'
import View from '../../../components/View'
import BadgeBtn from '../../../components/BadgeBtn'

import * as TYPE from '../../../actions/type'

class StoreIndex extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'StoreIndex'
    }

    componentWillMount() {
        D(TYPE.STORE_STATIC)
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    render() {
        const {storeStatic} = this.props.data
        return (
            <View width={'100%'} overflow={'visible'} margin={'10px 0 0 10px'} orientation={'column'} alignH={'stretch'}>
                <Label text={'商家管理中心 > 首页'} margin={'0 0 15px'} fontColor={T.palette.grey}/>
                <Divider/>
                <View width={'100%'} margin={'10px'}>
                    <View grow={1} width={0} overflow={'visible'}
                          style={{borderStyle:'none solid solid none'}} borderWidth={1}
                          borderColor={T.palette.lightGrey} orientation={'column'} alignH={'stretch'} key={1}>
                        <Label text={'店铺及商品提示'}/>
                        <Subheader>您需要关注的店铺信息以及待处理事项</Subheader>
                        <View>
                            <BadgeBtn key={1} num={storeStatic ? storeStatic.online : 0}
                                      label="出售中" linkTo={'/goods-list/online'}/>
                            {
                                //<BadgeBtn num={storeStatic ? storeStatic.waitverify : 0} label="发布待平台审核" linkTo={'/goods-list/offline'} key={2}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.verifyfail : 0} label="平台审核失败" linkTo={'/goods-list/offline'} key={3}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.offline : 0} label="仓库中已审核" linkTo={'/goods-list/offline'} key={4}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.lockup : 0} label="违规下架" linkTo={'/goods-list/offline'} key={5}/>
                            }
                        </View>
                    </View>

                    <View grow={1} width={0} overflow={'visible'}
                          style={{borderStyle:'none none solid none'}} borderWidth={1}
                          borderColor={T.palette.lightGrey}
                          margin={'0 0 0 10px'} orientation={'column'} alignH={'stretch'} key={2}>
                        <Label text={'交易提示'}/>
                        <Subheader>您需要立即处理的交易订单</Subheader>
                        <View>
                            <BadgeBtn num={storeStatic ? storeStatic.payment : 0}
                                      label="待付款" key={7}/>
                            <BadgeBtn num={storeStatic ? storeStatic.delivery : 0} label="待发货" key={8}/>
                            <BadgeBtn num={storeStatic ? storeStatic.bill_confirm : 0} label="待确认账单" key={13}/>
                            {
                                //<BadgeBtn num={storeStatic ? storeStatic.refund_lock : 0} label="售前退款" key={9}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.refund : 0} label="售后退款" key={10}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.return_lock : 0} label="售前退货" key={11}/>
                                //<BadgeBtn num={storeStatic ? storeStatic.return : 0} label="售后退货" key={12}/>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const rootProps = {
    style: {}
}

export default connect(
    (state)=> {
        return {
            data: {
                storeStatic: state.store ? state.store.storeStatic : null,
            }
        }
    }
    //bindActionCreators()
)(StoreIndex)