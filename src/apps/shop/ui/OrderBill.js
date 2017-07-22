/**
 * Created by wangyakun on 2017-01-23
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {S, P, M, MM, F, D, Q, T, L, DD, formatDate} from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    Form,
    TextField,
    Area,
    Subheader,
    Paging,
} from '../../../components/BaseComponent'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import  {lightBlue300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider'
import * as TYPE from '../../../actions/type'


const STORE_ORDER_BILL_LIMIT = 10
class OrderBill extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'OrderBill'
        this.state = {}
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {
    }

    componentDidMount() {
        D(TYPE.STORE_ORDER_BILL_LOAD, Q().limit(STORE_ORDER_BILL_LIMIT).ok())
    }

    render() {
        const {listCount} = this.props.data
        let pages = Math.ceil(listCount / STORE_ORDER_BILL_LIMIT)
        return (

            <View width={'100%'} style={{minWidth: 600}} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <Subheader>统计管理 > 订单结算</Subheader>
                <Divider/>
                <hr />
                {
                    this.renderTable()
                }
                {
                    pages > 0
                        ?
                        <View margin={10}><Paging height={40} max={9} pages={pages}
                                                  onClick={(page)=>this.pagingClick(page)}/></View>
                        : null
                }
            </View>
        )
    }

    renderTable() {
        const {orderBillList} = this.props.data
        return <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>结算单号</TableHeaderColumn>
                    <TableHeaderColumn style={{width: 200}}>起止时间</TableHeaderColumn>
                    <TableHeaderColumn>本期应收</TableHeaderColumn>
                    <TableHeaderColumn>结算状态</TableHeaderColumn>
                    <TableHeaderColumn>付款日期</TableHeaderColumn>
                    <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    F(orderBillList, (item, key) => {
                        return <TableRow key={key}>
                            <TableRowColumn>{item.Id}</TableRowColumn>
                            <TableRowColumn
                                style={{width: 200}}>
                                {formatDate(item.ObStartDate, 'yyyy-mm-dd')} ~ {formatDate(item.ObEndDate, 'yyyy-mm-dd')}</TableRowColumn>
                            <TableRowColumn>{item.ObResultTotals}</TableRowColumn>
                            <TableRowColumn>{this.randerState(item.ObState)}</TableRowColumn>
                            <TableRowColumn>{item.ObPayDate > 0 ? item.ObPayDate : ''}</TableRowColumn>
                            <TableRowColumn>
                                <View>
                                    <Button color={lightBlue300}>查看</Button>
                                </View>

                            </TableRowColumn>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    }

    pagingClick = (page) => {
        let query = Q()
        query.limit(STORE_ORDER_BILL_LIMIT, page == 1 ? 0 : STORE_ORDER_BILL_LIMIT * (page - 1))
        D(TYPE.STORE_ORDER_BILL_LOAD, query.ok())
    }

    randerState = (state) => {
        let value = "待店家确认"
        switch (state) {
            case 2:
                value = '店家已确认'
                break
            case 3:
                value = '平台已审核'
                break
            case 4:
                value = '结算完成'
                break
            default:
                break

        }
        return value
    }


}

const rootProps = {
    style: {
        // width: 500,
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                orderBillList: state['orderBill'].orderBillList,
                listCount: state['orderBill'].count
            }
        }
    }
)
(OrderBill)