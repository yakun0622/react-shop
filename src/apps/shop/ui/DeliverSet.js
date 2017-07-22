/**
 * Created by wangyakun on 16/9/4.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {S, P, M, MM, F, D, Q, T, L, DD} from '../../../common'
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
    Area,
    Subheader
} from '../../../components/BaseComponent'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import  {lightBlue300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox';

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'

class DeliverSet extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'DeliverSet'
        this.state = {
            editShow: false,
            datas: {
                Id: null,
                SellerName: '',
                Address: '',
                Telphone: '',
                AreaId: null,
                CityId: null,
                ProvinceId: null,
                AreaInfo: '',
                IsDefault: 0,
            },
            isAdd: true,
            defaultAddressId: 0,
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {
    }

    componentDidMount() {
        D(TYPE.DADDRESS_LOAD)
    }

    /**
     * 删除发货地址
     * @param value 发货地址ID
     */
    removeDAddress(value) {
        DD("确认删除该收获地址？操作将不能还原！", TYPE.DADDRESS_DELETE_BY_ID, {}, value)
    }

    /**
     * 设置默认发货地址
     * @param value 发货地址ID
     */
    setDefaultDaddress(value) {
        L('发货地址ID', value)
        this.setState({defaultAddressId: value})
        D(TYPE.DADDRESS_SET_DEFAULT, {}, value)
    }

    showDialog(type, data) {
        const state = this.state
        state.editShow = true
        if (type != "add") {
            state.isAdd = false
            state.datas.Id = data.Id
            state.datas.AreaId = data.AreaId
            state.datas.CityId = data.CityId
            state.datas.ProvinceId = data.ProvinceId
            L('ProvinceId', data.ProvinceId)
            state.datas.SellerName = data.SellerName
            state.datas.Address = data.Address
            state.datas.Telphone = data.Telphone
            state.datas.AreaInfo = data.AreaInfo
            state.datas.IsDefault = data.IsDefault
        } else {
            state.isAdd = true
            state.datas.Id = null
            state.datas.SellerName = false
            state.datas.Address = false
            state.datas.Telphone = false
            state.datas.AreaId = null
            state.datas.CityId = null
            state.datas.ProvinceId = null
            state.datas.AreaInfo = false
            state.datas.IsDefault = 0
        }
        this.setState(state)
        L('state========', this.state)
    }


    render() {
        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <Subheader>发货设置 > 发货地址设置</Subheader>
                <View margin={'5px 0 5px auto'}>
                    <Button style={{float: 'right', marginRight: 50}}
                            onTap={()=> this.showDialog('add')}
                            color={lightBlue300}
                            hoverColor={lightBlue300}>新增地址</Button>
                </View>
                <Divider/>
                <hr />
                {
                    this.renderTable()
                }
                {
                    this.editDialog()
                }
            </View>
        )
    }

    renderTable() {
        const {daddressList} = this.props.data
        return <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: 50}}>是否默认</TableHeaderColumn>
                    <TableHeaderColumn>联系人</TableHeaderColumn>
                    <TableHeaderColumn style={{width: 400}}>发货地址</TableHeaderColumn>
                    <TableHeaderColumn>电话</TableHeaderColumn>
                    <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    F(daddressList, (item, key) => {
                        return <TableRow key={key}>
                            <TableRowColumn style={{width: 50}}>
                                <Checkbox name={'default'} checked={Number(item.IsDefault) == 1}
                                          label={item.IsDefault == 1 && "默认"}
                                          onCheck={() => this.setDefaultDaddress(key)}/>
                            </TableRowColumn>
                            <TableRowColumn>{item.SellerName}</TableRowColumn>
                            <TableRowColumn style={{width: 400}}>{item.AreaInfo}{' '}{item.Address}</TableRowColumn>
                            <TableRowColumn>{item.Telphone}</TableRowColumn>
                            <TableRowColumn>
                                <View>
                                    <Button onTap={()=>this.showDialog('edit', item)} color={lightBlue300}
                                            margin={'0 5px'}>编辑</Button>
                                    <Button onTap={()=> this.removeDAddress(key)} color={lightBlue300}>删除</Button>
                                </View>

                            </TableRowColumn>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    }

    area(areaInfo, areaId, cityId, districtId) {
        const state = this.state
        state.datas.AreaInfo = areaInfo
        state.datas.ProvinceId = areaId   //省
        state.datas.CityId = cityId   //市
        state.datas.AreaId = districtId   //区县
        this.setState(state)
    }

    editDialog() {
        const {datas} = MM(this.state)
        // L('ssssssss=======', datas.AreaId)
        return <Form
            width={500}
            label={this.state.isAdd ? '新增发货地址' : '编辑发货地址'}
            open={this.state.editShow}
            datas={datas}
            actionType={this.state.isAdd ? TYPE.DADDRESS_ADD_SAVE : TYPE.DADDRESS_EDIT_SAVE}
            isSubmitJson={true}
            close={()=> this.setState({editShow: false})}
        >
            <TextField
                name={'SellerName'}
                rowsMax={10}
                value={datas.SellerName}
                onChange={(name, value) => this.setFormDatas(name, value, 'datas')}
                label={'联系人'}
                rules={{required: true, minLength: 2, maxLength: 255}}
            />
            <Area
                areaId={datas.ProvinceId}
                cityId={datas.CityId}
                districtId={datas.AreaId}
                width={420}
                onChange={(areaInfo, areaId, cityId, districtId) => this.area(areaInfo, areaId, cityId, districtId)}
                isRequired={true}/>
            <TextField
                name={'Address'}
                rowsMax={10}
                value={datas.Address}
                onChange={(name, value) => this.setFormDatas(name, value, 'datas')}
                label={'地址'}
                rules={{required: true, minLength: 2, maxLength: 255}}
            />
            <TextField
                name={'Telphone'}
                rowsMax={10}
                value={datas.Telphone}
                onChange={(name, value) => this.setFormDatas(name, value, 'datas')}
                label={'电话'}
                rules={{required: true, minLength: 2, maxLength: 255}}
            />
        </Form>
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
                daddressList: state[api.DADDRESS].daddress,
                listCount: state[api.GOODS].count
            }
        }
    }
)
(DeliverSet)