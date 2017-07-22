/**
 * Created by kenn on 16/9/13.
 */
import React from 'react'

import {T, L, F, D, inArray, C} from '../common'
import View from './View'
import CheckView from './CheckView'
import RadioCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Popover from 'material-ui/Popover';
import * as COLORS from 'material-ui/styles/colors'

class AreaCheckView extends React.Component {
    display = 'AreaCheckView'

    constructor(props) {
        super(props)

        if (props.multiple) {
            this.state = {
                checked: props.defaultValue || props.defaultValue === 0 ? props.defaultValue : [],
                checkedTop: {}
            }
        } else {
            this.state = {
                checked: props.defaultValue || props.defaultValue === 0 ? props.defaultValue : -1,
                checkedTop: {}
            }
        }

    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        itemHeight: 40,
        fontColor: T.palette.darkBlack,
        fontSize: 15,

        radius: 0,
        margin: 0,
        orientation: 'row',

        multiple: false,
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

        checked: React.PropTypes.any,
        checkedAll: React.PropTypes.bool,

        width: React.PropTypes.any,
        itemWidth: React.PropTypes.number,  //选择项宽度
        itemHeight: React.PropTypes.number,  //选择项高度
        height: React.PropTypes.any,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        margin: React.PropTypes.any,

        multiple: React.PropTypes.bool,    //多选设置
        onCheck: React.PropTypes.func,

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

        type: React.PropTypes.number,    //类型：1-省市  2-市区
        levels: React.PropTypes.number,    //右侧下拉
        selectDown: React.PropTypes.bool,    //右侧下拉
        parentId: React.PropTypes.any,    //上级key
        secondData: React.PropTypes.any,    //上级key
        changeActionType: React.PropTypes.string,   //更改地区actionType
    }

    componentWillMount() {
        this.setState({secondData: null, checkedAll: false})
        if (this.props.checked || this.props.checked === 0) {
            //L( this.display, 'checked', this.props.checked )
            this.setState({checked: this.props.checked})
        }
        if (this.props.secondData) {
            this.setState({secondData: this.props.secondData})
        }
    }

    componentWillReceiveProps(props) {

        if (props.checked || props.checked === 0) {
            this.setState({checked: props.checked})
        }
    }

    dropDownOpen = (event, parentId) => {
        this.setState({
            dropDownOpen: parentId,
            anchorEl: event.currentTarget,
        })
    }
    dropDownClose = () => {
        this.setState({dropDownOpen: -1})
    }

    render() {
        const {
            width,
            height,
            itemWidth,
            itemHeight,
            color,
            hoverFontColor,
            label,
            orientation,
            wrap,
            grow,

            isNumber,

            multiple,

            style,
            margin,
            radius,
            onTap,
            datas,
            levels,
            type,
            parentId,
            checkedAll,
            checked,
            secondData,
        } = this.props
        //一级数据
        let topData = {}
        if (type == 1) {
            // 市-区类型
            F(datas.parent, (pid, key) => {
                if (parentId == pid) {
                    topData[key] = datas.name[key]
                }
            })
        } else {
            // 省-市类型
            F(datas.region[parentId], (provinceId, index) => {
                topData[provinceId] = datas.name[provinceId]
            })
        }

        return (
            <View width={width} margin={margin} grow={grow} orientation={'column'}>
                {
                    label &&
                    <div style={{
                        fontSize: T.fontSize.min,
                        color: checked == -1 || (Array.isArray(checked) && checked.length == 0)
                            ? T.palette.grey : T.palette.main
                    }}>
                        {label}
                    </div>
                }
                <View
                    width={'100%'}
                    height={height}
                    orientation={orientation}
                    //alignH={'start'}
                    wrap={wrap}
                >

                    {F(topData, (label, value) => {
                        const val = isNumber ? Number(value) : value
                        {/*const check = multiple ? checked.indexOf(val) != -1 : checked == val*/
                        }
                        const check = this.isChecked(val)
                        const size = 16
                        const checkedIconStyle = {
                            width: size,
                            height: size,
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
                        return (
                            <View width={itemWidth} alignV={'center'} key={value}>
                                <View
                                    key={value + 'dfdf'}
                                    width={itemWidth - 20}
                                    height={itemHeight}
                                    hand={true}
                                    alignV={'center'}
                                    onTap={(e) => this.check(val, e)}
                                >
                                    <div style={{
                                        display: 'flex',
                                        marginRight: 8,
                                        width: size,
                                        height: size,
                                        position: 'relative',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <RadioUncheckedIcon style={{width: size, height: size}} color={T.palette.grey}/>
                                        <RadioCheckedIcon style={check ? checkedIconStyle : iconStyle}
                                                          color={T.palette.main}/>
                                    </div>
                                    <div style={{fontSize: T.fontSize.small}}>{label}</div>

                                </View>
                                {
                                    this.renderArrow(val)
                                }
                            </View>


                        )
                    })}
                </View>
            </View>
        )
    }

    renderArrow = (val) => {
        const {levels, secondData} = this.props
        if(levels > 1 && C(secondData[val])){
            return <View margin={'0 15px 0 0'}>
                <ArrowDownIcon style={{cursor: 'pointer'}}
                               onTouchTap={(event) => this.dropDownOpen(event, val)}/>
                {
                    this.dropDowmView(val)
                }
            </View>
        }
    }


    isChecked(value) {
        const {multiple, datas, checked} = this.props
        // value = isNumber ? Number(value) : value
        if (!checked) {
            return false
        }
        // const {checked} = this.state
        let children = datas.children
        if (inArray(checked, children[value])) {
            return true
        } else {
            return multiple ? checked.indexOf(value) != -1 : checked == value
        }
    }

    getChildren(pid) {
        const {datas} = this.props
        const children = datas.children
        return children[pid]
    }

    /**
     *  处理子节点函数
     * @param pid
     * @param checked
     * @param type 1-add 2-remove
     * @returns {*}
     */
    handleChildren(pid, checked, type) {
        const {levels} = this.props
        if (levels <= 1) {
            return checked
        }


        const children = this.getChildren(pid)
        F(children, (value, key) => {
            // value = value + ''
            const index = checked.indexOf(value)
            if (type == 1) {
                if (index == -1)
                    checked.push(value)
            } else {
                if (index != -1)
                    checked.splice(index, 1)
            }

        })
        return checked
    }


    check = (value, e)=> {
        if (e) {
            e.stopPropagation()
            e.preventDefault()
        }
        const {multiple, onCheck, required, name, isNumber} = this.props
        let {checked, checkedTop} = this.state
        if (multiple) {
            const index = checked.indexOf(value)
            if (index == -1) {
                checked.push(value)
                //处理子节点
                checked = this.handleChildren(value, checked, 1)
            } else {
                if (required) {
                    if (checked.length > 1) {
                        checked.splice(index, 1)
                        //处理子节点
                        checked = this.handleChildren(value, checked, 2)
                    }
                } else {
                    checked.splice(index, 1)
                    //处理子节点
                    checked = this.handleChildren(value, checked, 2)
                }
            }
        } else {
            if (checked === value) {
                if (!required) {
                    checked = -1
                }
            } else {
                checked = value
            }
        }

        this.setState({checked})
        D(this.props.changeActionType, checked)
    }

    checkItems = (name, checked) => {
        D(this.props.changeActionType, checked)
    }

    dropDowmView = (parentId) => {
        let {dropDownOpen} = this.state
        let {checked, secondData} = this.props
        return <Popover
            open={dropDownOpen == parentId ? true : false}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.dropDownClose}
        >
            <CheckView name={"childId" + parentId} itemWidth={110} datas={secondData ? secondData[parentId] : null}
                       multiple={true}
                       wrap={'wrap'} width={250} fontSize={8} fontColor={COLORS.indigo800}
                       checked={checked}
                       isNumber={true}
                       onCheck={this.checkItems}/>
        </Popover>
    }

}
export default AreaCheckView