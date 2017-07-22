/**
 * Created by kenn on 16/9/13.
 */
import React from 'react'

import {T, L, F} from '../common'
import View from './View'
import RadioCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';

class CheckView extends React.Component {
    display = 'CheckView'

    constructor(props) {
        super(props)

        if (props.multiple) {
            this.state = {
                checked: props.defaultValue || props.defaultValue === 0 ? props.defaultValue : []
            }
        } else {
            this.state = {
                checked: props.defaultValue || props.defaultValue === 0 ? props.defaultValue : -1
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
        checkedAll: false
    }


    static propTypes = {
        name: React.PropTypes.string,
        datas: React.PropTypes.object,
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
    }

    componentWillMount() {
        if (this.props.checked || this.props.checked === 0) {
            //L( this.display, 'checked', this.props.checked )
            this.setState({checked: this.props.checked})
        }
    }

    componentWillReceiveProps(props) {

        if (props.checked || props.checked === 0) {
            //L( this.display, 'checked', props.checked )
            this.setState({checked: props.checked})
        }
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
            fontSize,
            fontColor,
            checkedAll,
        } = this.props

        const {checked} = this.state
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
                    //alignH={'center'}
                    wrap={wrap}
                >

                    {F(datas, (label, value) => {

                        const val = isNumber ? Number(value) : value
                        const check = multiple ? checked.indexOf(val) != -1 : checked == val
                        const size = 24
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
                            <View
                                key={value + 'dfdf'}
                                width={itemWidth || 0}
                                height={itemHeight}
                                hand={true}
                                alignV={'center'}
                                grow={1}
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
                                <div style={{fontSize: fontSize, color: fontColor}}>{label}</div>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    check = (value, e)=> {
        e.stopPropagation()
        e.preventDefault()
        const {multiple, onCheck, required, name, isNumber} = this.props
        let checked = this.state.checked
        if (multiple) {
            const index = checked.indexOf(value)
            if (index == -1) {
                checked.push(value)
            } else {
                if (required) {
                    if (checked.length > 1) {
                        checked.splice(index, 1)
                    }
                } else {
                    checked.splice(index, 1)
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
        L(this.display, 'checked', checked)

        this.setState({checked})
        onCheck && onCheck(name, checked)
    }
}
export default CheckView