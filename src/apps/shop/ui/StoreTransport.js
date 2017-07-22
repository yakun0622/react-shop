/**
 * Created by wangyakun on 16/9/4.
 */
import React from 'react'
import {connect} from 'react-redux'


import {S, P, M, MM, F, D, Q, T, L, DD} from '../../../common'
import {
    BaseComponent,
    View,
    AddIcon,
    FloatButton,
    AreaForm,
    Form,
    TextField,
    Subheader,
} from '../../../components/BaseComponent'
import TransportModel from './TransportModel'
import * as TYPE from '../../../actions/type'

class StoreTransport extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'StoreTransport'
        this.state = {
            addShow: false,
            areaShow: false,
            areaBtnShow: true,
            isAdd: true,
            lock: 0,
            checkedArea: [],
            checkedAreaInfo: null,
            transportList: this.props.data.transportList ? MM(this.props.data.transportList) : null,
            transportIndex: '',
            extIndex: '',
            transport: newTransport
        }
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        if (props.data.checkedArea != this.state.checkedArea) {
            this.setState({checkedArea: props.data.checkedArea})
        }
        if (props.data.checkedAreaInfo != this.state.checkedAreaInfo) {
            this.setState({checkedAreaInfo: props.data.checkedAreaInfo})
        }
    }

    componentDidMount() {
        D(TYPE.STORE_TRANSPORT_LOAD, Q().ok())
    }

    componentDidUpdate() {
    }

    //打开地区选择弹出框
    openAreaDialog = (index, transportIndex) => {
        const state = this.state
        const {transportList} = this.props.data
        state.areaShow = true
        state.extIndex = index
        state.transportIndex = transportIndex
        let checkArea = transportList[transportIndex].Extends[index].AreaId
        let areaIds = []
        if (checkArea != '') {
            let areaIdsStr = checkArea.substring(1, checkArea.length - 1)
            F(areaIdsStr.split(','), (value, key) => {
                areaIds.push(parseInt(value))
            })
        }
        state.checkedArea = areaIds
        this.setState(state)

        L("state", this.state)
    }

    // 地区保存
    saveArea = () => {
        const {checkedAreaInfo} = this.props.data
        const state = this.state
        let areaIds = '', cityNames = '', provinceIds = '', provinceNames = ''
        F(checkedAreaInfo.province, (provinceName, provinceId)=> {
            areaIds += ',' + provinceId
            provinceIds += ',' + provinceId
            provinceNames += provinceName + ','
        })
        F(checkedAreaInfo.city, (cityName, cityId)=> {
            areaIds += ',' + cityId
            cityNames += cityName + ','
        })
        if (areaIds.length > 0) {
            areaIds += ','
        }
        if (provinceIds.length > 0) {
            provinceIds += ','
        }
        let data = {Index: state.transportIndex, ExtIndex: state.extIndex}
        data.AreaName = provinceNames
        data.AreaId = areaIds
        data.TopAreaId = provinceIds
        D(TYPE.STORE_TRANSPORT_EXTENDS_EDIT_AREA_SAVE, data)
        state.checkedArea = []
        this.setState(state)
    }


    render() {
        const state = this.state
        const {transportList} = this.props.data
        // const {transportList} = this.state
        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <Subheader>发货设置 > 运费模板</Subheader>
                {
                    transportList && F(transportList, (transport, index)=> {
                        return <TransportModel style={{marginTop: 3, marginLeft: 3}} onSelectArea={this.openAreaDialog}
                                               data={transport}
                                               index={index}/>
                    })
                }

                {
                    <AreaForm width={700} type={2} levels={2}
                              changeActionType={TYPE.STORE_TRANSPORT_AREA_CHANGE}
                              isNumber={false}
                              open={state.areaShow}
                              close={() => this.closeDialog('areaShow')}
                              checked={state.checkedArea}
                              submit={() => this.saveArea()}/>
                }
                {this.addDialog()}
                <FloatButton
                    icon={AddIcon}
                    onTap={() => this.openDialog('addShow')}
                    style={{position: 'fixed', right: 24, bottom: 24}}
                />
            </View>
        )
    }

    addDialog = () => {
        const {transport} = MM(this.state)
        return <Form
            width={500}
            label={'新增运费模板'}
            open={this.state.addShow}
            datas={transport}
            actionType={TYPE.STORE_TRANSPORT_ADD}
            isSubmitJson={true}
            close={()=> this.closeDialog('addShow')}
        >
            <TextField
                name={'Title'}
                value={ transport.Title}
                label={'模板标题'}
                onChange={(name, value) => this.setFormDatas(name, value, 'transport')}
                rules={{required: true, minLength: 1}}
            />

            <TextField
                name={'AreaName'}
                value={transport.Extends[0].AreaName}
                label={'默认地区'}
                disabled={true}
                rules={{required: true, minLength: 1}}
            />

            <TextField
                name={'DefalutPrice'}
                value={transport.Extends[0].DefalutPrice}
                label={'默认运费（元）'}
                onChange={(name, value) => {
                    transport.Extends[0].DefalutPrice = value
                    this.setState({transport: transport})
                }}
                rules={{required: true, number: true, minLength: 1}}
            />
            <TextField
                name={'FreeLine'}
                value={transport.Extends[0].FreeLine}
                label={'免运费额度（元）'}
                onChange={(name, value) => {
                    transport.Extends[0].FreeLine = value
                    this.setState({transport: transport})
                }}
                rules={{required: true, number: true, minLength: 1}}
            />

        </Form>

    }

}

const newTransport = {
    Id: null,
    Title: '',
    SendTplId: 1,
    UpdateTime: null,
    Extends: [{
        Id: null,
        AreaId: "",
        TopAreaId: "",
        AreaName: "全国",
        IsDefault: 1,
        TransportId: null,
        TransportTitle: '',
        DefalutPrice: 0,
        FreeLine: 0
    }]
}

export default connect(
    (state)=> {
        return {
            data: {
                transportList: state['storeTransport'].transportList,
                listCount: state['storeTransport'].count,
                checkedArea: state['storeTransport'].checkedArea,
                checkedAreaInfo: state['storeTransport'].checkedAreaInfo
            }
        }
    }
)
(StoreTransport)