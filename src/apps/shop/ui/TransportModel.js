/**
 * Created by wangyakun on 2017/1/5.
 */
import React from 'react'
import {connect} from 'react-redux'


import {F, T, L, formatDate, D, DD, MM} from '../../../common'
import {SelectView, Button, View, Label, TextField, AreaForm} from '../../../components/BaseComponent'
import * as TYPE from '../../../actions/type'
export default class TransportModel extends React.Component {
    display = 'TransportModel'

    constructor(props) {
        super(props)
        this.state = {
            transportId: '',
            extIndex: '',
            checkedArea: [],
            checkedAreaInfo: null,
            oldData: null,
            addShow: false,
        }
    }

    static defaultProps = {}


    static propTypes = {
        style: React.PropTypes.object,
        onSelectArea: React.PropTypes.func.isRequired,
        data: React.PropTypes.object,
        index: React.PropTypes.number,
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        if (!this.state.oldData) {
            this.setState({oldData: MM(props.data)})
        }
    }

    componentWillUpdate() {
    }

    editArea(index) {
        const {onSelectArea} = this.props
        onSelectArea(index, this.props.index)
    }


    addExt() {
        D(TYPE.STORE_TRANSPORT_EXTENDS_ADD, {Index: this.props.index})
    }

    editExt(extIndex) {
        D(TYPE.STORE_TRANSPORT_EXTENDS_EDITABLE, {Index: this.props.index, ExtIndex: extIndex})
    }

    edit() {
        D(TYPE.STORE_TRANSPORT_EDITABLE, {Index: this.props.index})
    }


    save() {
        const {data, index} = this.props
        data.Index = index
        if (data.Title == '') {
            DD("标题不能为空！！！", TYPE.SIMPLE_ALERT)
            return
        }

        D(TYPE.STORE_TRANSPORT_EDIT_SAVE, data, data.Id)
        this.setState({oldData: null})

    }

    delete() {
        const {index, data} = this.props
        DD('确定删除？该操作不能恢复！', TYPE.STORE_TRANSPORT_DELETE, {
            transportIndex: index,
            extIndex: index,
            id: data.Id
        }, data.Id)
    }

    saveExt(extIndex) {
        const {data, index} = this.props
        const extendInfo = data.Extends[extIndex]
        extendInfo.Index = index
        extendInfo.ExtIndex = extIndex
        if (extendInfo.AreaId == '') {
            DD("地区不能为空！！！", TYPE.SIMPLE_ALERT)
            return
        }

        D(TYPE.STORE_TRANSPORT_EXTENDS_SAVE, extendInfo)
        this.setState({oldData: null})

    }

    deleteExt(index) {
        const transportIndex = this.props.index
        let extend = this.props.data.Extends
        DD('确定删除？该操作不能恢复！', TYPE.STORE_TRANSPORT_EXTENDS_DELETE, {
            transportIndex: transportIndex,
            extIndex: index,
            id: extend[index].Id
        }, 'form')
    }


    changeContent(name, data, index) {
        D(TYPE.STORE_TRANSPORT_EXTENDS_EDIT, {Index: this.props.index, ExtIndex: index, Name: name, Data: data})
    }

    cancelExt(index) {
        const {oldData} = this.state
        const data = {Index: this.props.index, ExtIndex: index}
        const props = this.props
        if (props.data.Extends[index].Id > 0) {
            data.AreaName = oldData.Extends[index].AreaName
            data.FreeLine = oldData.Extends[index].FreeLine
            data.DefalutPrice = oldData.Extends[index].DefalutPrice
        } else {
            data.AreaName = "未添加地区"
            data.FreeLine = 0
            data.DefalutPrice = 0
        }
        D(TYPE.STORE_TRANSPORT_EXTENDS_EDIT_CANCEL, data)
    }

    cancel() {
        const {oldData} = this.state
        const data = {Index: this.props.index}
        data.Title = oldData.Title
        D(TYPE.STORE_TRANSPORT_EDIT_CANCEL, data)
    }

    render() {
        const {data, style, index} = this.props
        const state = this.state
        return (
            <View width={'98%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}
                  borderWidth={1} borderColor={T.palette.lightGrey} style={style}>
                <View style={contentStyle} alignV={'center'} height={50}>
                    <View width={0} grow={7}>
                        <TextField name={'Title'} label={'模板标题'} fullWidth={false}
                                   disabled={!data.editable}
                                   onChange={(name, value) => {
                                       D(TYPE.STORE_TRANSPORT_EDIT, {Index: index, Name: name, Value: value})
                                   }}
                                   style={{marginLeft: 20, width: 150}} value={data.Title}
                                   isNumber={true}></TextField>
                    </View>

                    <Label grow={1} fontSize={T.fontSize.small}
                           fontColor={T.palette.grey}>{formatDate(data.UpdateTime)}</Label>
                    <View width={0} grow={2} style={{float: 'right'}}>
                        {
                            data.editable ? <View>
                                <Button {...btnProps} onTap={()=>this.save()}>保存</Button>
                                <Button {...btnProps} onTap={()=>this.cancel()}>取消</Button>
                            </View> : <View>
                            <Button {...btnProps} onTap={()=>this.addExt()}>添加</Button>
                            <Button {...btnProps} onTap={()=>this.edit()}>修改</Button>
                            <Button {...btnProps} onTap={()=>this.delete()}>删除</Button>
                            </View>
                        }


                    </View>

                </View>
                {
                    F(data.Extends, (ext, index) => {
                        return <View style={contentStyle} width={'97%'} alignV={'center'} height={55}
                                     margin={'0 0 0 30px'}>
                            <View grow={4} width={0} alignV={'center'}>
                                <Label>{ext.AreaName}</Label>
                            </View>
                            <View grow={3} width={0} alignV={'center'}>
                                <TextField name={'DefalutPrice'} label={'默认运费(元)'} fullWidth={false}
                                           disabled={!ext.editable}
                                           onChange={(name, value) => this.changeContent(name, Number(value), index)}
                                           style={{marginLeft: 20, width: 150}} value={ext.DefalutPrice}
                                           isNumber={true}></TextField>
                                <TextField name={'FreeLine'} label={'免运费额度(元)'} fullWidth={false}
                                           disabled={!ext.editable}
                                           onChange={(name, value) => this.changeContent(name, Number(value), index)}
                                           isNumber={true} style={{marginLeft: 20, width: 150}}
                                           value={ext.FreeLine}></TextField>

                            </View>
                            <View alignV={'center'} grow={2} width={0}>
                                {
                                    ext.editable &&
                                    <View><Button {...btnProps}
                                                  onTap={() => this.editArea(index)}>选择地区</Button>
                                        <Button {...btnProps} onTap={() => this.saveExt(index)}>保存</Button>
                                        <Button {...btnProps}
                                                onTap={() => this.cancelExt(index)}>取消</Button>
                                    </View>
                                }
                                {
                                    !ext.editable && <View>
                                        <Button {...btnProps}
                                                onTap={() => this.editExt(index)}>编辑</Button>
                                        <Button {...btnProps}
                                                onTap={() => this.deleteExt(index)}>删除</Button>
                                    </View>

                                }


                            </View>

                        </View>
                    })
                }

            </View>
        )
    }
}

const contentStyle = {
    borderBottomWidth: '1px',
    borderBottomColor: T.palette.lightGrey
}

const btnProps = {
    color: T.palette.minGrey,
    fontColor: T.palette.grey, radius: 0,
    hoverColor: T.palette.grey,
    hoverFontColor: T.palette.white,
    fontSize: T.fontSize.small,
    height: T.fontSize.small + 10,
    margin: '0 5px',
    shadowSize: 5,
    shadowOffset: 1,
    shadowColor: T.palette.lightGrey,
}