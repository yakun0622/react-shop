/**
 * Created by wangyakun on 2016/11/19.
 */
import React from 'react'
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider'
import RadioCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import {S, P, M, MM, F, D, Q, T, L, DD, inArray, getCache} from '../common'
import {
    BaseComponent,
    Button,
    View,
    CheckView,
    AreaCheckView,
    Form,
    U,
    I,
    Area,
    Label,
    Dialog
} from './BaseComponent'

import * as TYPE from '../actions/type'

class AreaForm extends React.Component {

    display = 'AreaForm'

    constructor(props) {
        super(props)
        this.state = {
            selectedTop: {},
            topChecked: [],
            secondChecked: [],
            thirdChecked: [],
        }
        this.origin = ['东北', '华东', '华中', '华北', '华南', '海外', '港澳台', '西北', '西南']
    }

    componentWillMount() {
    }

    componentDidMount() {

        const area = getCache('area', 'LS')
        if (!area){
            L('网络请求area')
            D(TYPE.AREA_MULTI_LOAD)
        }
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        submitLabel: '保 存',
        open: false,

        itemHeight: 40,
        fontColor: T.palette.darkBlack,
        fontSize: 15,

        radius: 0,
        margin: 0,
        orientation: 'row',

        required: false,
        isNumber: false,

        wrap: 'nowrap',
        grow: 0,
        order: 0,
        alignSelf: 'auto',
        selectDown: false,
        dropDownOpen: -1,
        levels: 1,
        type: 1,
        checkedAll: false,
        secondData: null,
        changeActionType: '',

    }

    static propTypes = {
        name: React.PropTypes.string,
        datas: React.PropTypes.object,  //一级数据
        label: React.PropTypes.string,
        defaultValue: React.PropTypes.any, //默认值
        isNumber: React.PropTypes.bool,
        close: React.PropTypes.func,
        submitLabel: React.PropTypes.string,
        checked: React.PropTypes.any,

        width: React.PropTypes.any,
        itemWidth: React.PropTypes.number,  //选择项宽度
        itemHeight: React.PropTypes.number,  //选择项高度
        height: React.PropTypes.any,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        margin: React.PropTypes.any,

        submit: React.PropTypes.func,   //点击保存回调函数
        //伸缩容器属性
        wrap: React.PropTypes.string,
        orientation: React.PropTypes.string,

        //伸缩项目属性
        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        style: React.PropTypes.object,

        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,

        type: React.PropTypes.number,    //类型：  1-市区    2-省市
        levels: React.PropTypes.number,    //右侧下拉
        selectDown: React.PropTypes.bool,    //右侧下拉
        parentId: React.PropTypes.any,    //上级key
        secondData: React.PropTypes.any,    //上级key
        changeActionType: React.PropTypes.string,   //更改地区actionType
    }

    /**
     *  处理子节点函数
     * @param pid
     * @param checked
     * @param isAdd true-add false-remove
     * @returns {*}
     */
    handleChildren(pid, checked, isAdd, areaType = 1) {
        const {area_data} = this.props.data
        const {levels, isNumber} = this.props
        const childrenArray = area_data.children
        const regionArray = area_data.region
        let child_new = areaType == 1 ? childrenArray[pid] : regionArray[pid]
        for (let i = 0; i < child_new.length; i++) {
            const index = checked.indexOf(child_new[i])
            if (index != -1) {
                isAdd = false
                break
            }
        }
        F(child_new, (value, key) => {
            // value = isNumber ? Number(value) : value
            value = isNumber && !inArray(this.origin, value) ? Number(value) : value
            let next = childrenArray[value]
            const index = checked.indexOf(value)
            //添加
            if (isAdd && index == -1) {
                checked.push(value)
                if (next && next.length > 0 && levels > 1) {
                    checked = this.handleThird(value, checked, isAdd)
                }
            }

            //移除
            if (!isAdd && index != -1) {
                checked.splice(index, 1)
                if (next && next.length > 0 && levels > 1) {
                    checked = this.handleThird(value, checked, isAdd)
                }

            }

        })
        return checked
    }

    /**
     *  处理子节点函数
     * @param pid
     * @param checked
     * @param isAdd true-add false-remove
     * @returns {*}
     */
    handleThird(pid, checked, isAdd, areaType = 1) {
        const {area_data} = this.props.data
        const {levels, isNumber} = this.props
        const childrenArray = area_data.children
        const regionArray = area_data.region
        let child_new = areaType == 1 ? childrenArray[pid] : regionArray[pid]
        F(child_new, (value, key) => {
            // value = isNumber ? Number(value) : value
            value = isNumber && !inArray(this.origin, value) ? Number(value) : value
            const index = checked.indexOf(value)
            //添加
            if (isAdd && index == -1) {
                checked.push(value)
            }

            //移除
            if (!isAdd && index != -1) {
                checked.splice(index, 1)
            }

        })
        return checked
    }

    checkTop(value, e) {
        e.stopPropagation()
        e.preventDefault()
        let {checked, changeActionType, type, isNumber} = this.props
        let isAdd = true
        if (type == 1) {
            // value = isNumber ? Number(value) : value
            value = isNumber && !inArray(this.origin, value) ? Number(value) : value
            const index = checked.indexOf(value)
            if (index == -1) {

                checked.push(value)
            } else {
                isAdd = false
                checked.splice(index, 1)
            }
            //处理子节点
            // checked = this.handleChildren(value, checked, false, type)
        }
        //处理子节点
        checked = this.handleChildren(value, checked, isAdd, type)

        D(changeActionType, checked)

    }

    submit = () => {
        const {submit, close} = this.props
        submit && submit()
        close && close()
    }

    render() {
        const {
            style,
            data,
            label,
            width,
            margin,
            submitLabel,
            modal,
            open,
            type,
        } = this.props

        const area_data = data.area_data
        //省份list
        let topAreaList = {}
        if (type == 1) {
            F(area_data.parent, (obj, key) => {
                if (obj == 0) {
                    topAreaList[key] = area_data.name[key]
                }
            })
        } else {
            F(area_data.region, (obj, key) => {
                topAreaList[key] = key
            })
        }
        //如果是dialog,则用dialog显示
        if (this.props.close) {
            return (
                <Dialog
                    modal={modal}
                    width={width}
                    close={() => this.props.close()}
                    open={open}
                    title={label}
                    bodyPadding={8}
                    rightButton={submitLabel}
                    onRightButton={() => this.submit()}
                >
                    {
                        <View orientation={'column'} width={'100%'} overflow={'visible'}>
                            {F(topAreaList, (topAreaName, topAreaId) => {
                                let topArea = {}
                                topArea[topAreaId] = topAreaName
                                return this.listArea(topAreaId, topArea)
                            })}
                        </View>
                    }
                </Dialog>
            )
        } else {
            // L(this.display, this.props.datas)
            return (
                <View width={'100%'} alignH={'center'} orientation={'column'} style={style} margin={margin}>
                    <Label
                        text={label}
                        fontSize={18}
                    />
                    {
                        <View orientation={'column'} width={'100%'} overflow={'visible'}>
                            {F(topAreaList, (topAreaName, topAreaId) => {
                                let topArea = {}
                                topArea[topAreaId] = topAreaName
                                return this.listArea(topAreaId, topArea)
                            })}
                        </View>
                    }

                    {
                        <Button
                            color={T.palette.darkBlack}
                            hoverColor={T.palette.main}
                            fontColor={T.palette.minGrey}
                            hoverFontColor={T.palette.white}
                            onTap={() => this.submit()}
                            width={width}
                            height={T.height.normal}
                        >
                            {submitLabel}
                        </Button>
                    }
                </View>
            );
        }

    }

    listArea(topAreaId, topArea) {
        const {data, type, checked, levels, changeActionType} = this.props
        // L('listArea   checked', checked)
        const area_data = data.area_data

        const checkedIconStyle = {
            width: 24,
            height: 24,
            position: 'absolute',
            top: 0,
            left: 0
        }
        const iconStyle = {
            overflow: 'hidden',
            width: 0,
            height: 0,
            position: 'absolute',
            top: 12,
            left: 12
        }
        const check = this.isChecked(topAreaId)
        return <View orientation={'column'} width={'100%'} overflow={'visible'} key={topAreaId}>
            <View width={'100%'}>
                <View width={150}
                      key={topAreaId + 'top'}
                      hand={true}
                      alignV={'center'}
                      onTap={(e) => this.checkTop(topAreaId, e)}>
                    <div style={{
                        display: 'flex',
                        marginRight: 8,
                        width: 24,
                        height: 24,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <RadioUncheckedIcon style={{width: 24, height: 24}} color={T.palette.grey}/>
                        <RadioCheckedIcon style={check ? checkedIconStyle : iconStyle}
                                          color={T.palette.main}/>
                    </div>
                    <div style={{fontSize: 14, color: T.palette.darkBlack}}>{topArea[topAreaId]}</div>
                </View>
                <View grow={1} width={0}>
                    <AreaCheckView name={"secondArea" + topAreaId} itemWidth={150} parentId={topAreaId}
                                   datas={area_data}
                                   multiple={true}
                                   wrap={'wrap'} levels={levels} type={type}
                                   onCheck={this.checkItem}
                                   secondData={this.buildSecondData(type, topAreaId)}
                                   isNumber={true}
                                   checked={checked}
                                   changeActionType={changeActionType}/>
                </View>
            </View>
            <Divider width={"100%"}/>
        </View>
    }

    /**
     * 判断节点是否被勾选
     * @param value
     * @returns {boolean}
     */
    isChecked(value) {
        const {data, type, isNumber, checked} = this.props

        // const {checked} = this.state
        const area_data = data.area_data
        if (!checked) {
            return false
        }

        let children = area_data.children
        let region = area_data.region
        children = type == 1 ? children : region
        if (inArray(checked, children[value])) {
            return true
        } else {
            value = isNumber && !inArray(this.origin, value) ? Number(value) : value
            // L('isChecked', checked, value)
            return checked.indexOf(value) != -1
        }
    }

    buildSecondData = (type, pid) => {
        const {area_data} = this.props.data
        let secondData = {}
        let children = area_data.children
        let region = area_data.region
        if (type == 1) {
            F(children[pid], (childrenId, key) => {
                let lastData = {}
                F(children[childrenId], (id, index) => {
                    lastData[id] = area_data.name[id]
                })
                secondData[childrenId] = lastData
            })
        } else if (type == 2) {
            F(region[pid], (childrenId, key) => {
                let lastData = {}
                F(children[childrenId], (id, index) => {
                    lastData[id] = area_data.name[id]
                })
                secondData[childrenId] = lastData
            })
        } else {
            L('未制定类型')
        }
        return secondData
    }

}

export default connect(
    (state)=> {
        let area = getCache('area', 'LS')
        return {
            data: {
                area_data: area ? JSON.parse(area) : state['areaMulti'],
            }
        }
    }
)
(AreaForm)