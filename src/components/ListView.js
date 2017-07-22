/**
 * Created by kenn on 16/7/30.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import View from './View'
import Label from './Label'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import { D, T, M, L } from '../common'
// import ListItem from './ListItem'


export default class ListView extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'ListView'

        this.state = {
            fold: props.fold
        }
    }

    static defaultProps = {
        width: '100%',
        height: 48,
        minHeight: 0,
        padding: 4,

        checked: false,

        color: 'white',
        hoverColor: T.palette.lightGrey,

        leftIconSize: 32,
        rightIconSize: 32,

        shadowSize: 0,
        shadowColor: T.palette.grey,
        shadowOffset: 0,

        grow: 0,

        orientation: true,
        childOrientation: 0,  // 子列表排列方向  0 垂直 1 水平
        fold: 1,  //  0 无折叠  1 折起  2 展开
        showFoldIcon: false,   //强制显示折叠图标'

        margin: 0,

        indent: 8, //子列表缩进
        lineIndent: 8, //选中时底部线条缩进
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        minHeight: React.PropTypes.number,
        color: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        shadowSize: React.PropTypes.number,
        shadowOffset: React.PropTypes.number,
        shadowColor: React.PropTypes.string,

        checked: React.PropTypes.bool,

        indent: React.PropTypes.number,
        lineIndent: React.PropTypes.number,
        margin: React.PropTypes.any,

        fold: React.PropTypes.number,
        showFoldIcon: React.PropTypes.bool,

        orientation: React.PropTypes.bool,
        align: React.PropTypes.string,
        grow: React.PropTypes.number,

        leftIcon: React.PropTypes.any,
        leftIconSize: React.PropTypes.number,
        leftIconColor: React.PropTypes.string,
        leftIconHoverColor: React.PropTypes.string,
        onLeftIcon: React.PropTypes.func,

        rightIcon: React.PropTypes.any,
        rightIconSize: React.PropTypes.number,
        rightIconColor: React.PropTypes.string,
        rightIconHoverColor: React.PropTypes.string,
        onRightIcon: React.PropTypes.func,

        primaryText: React.PropTypes.any,
        primaryColor: React.PropTypes.string,
        secondText: React.PropTypes.any,
        child: React.PropTypes.any,

        onTap: React.PropTypes.func
    }

    componentWillReceiveProps( props ) {
        if ( this.props.fold != props.fold ) {
            this.setState( { fold: props.fold } )
        }
    }

    render() {
        const {
            children,        // 子组件
            child,           // 自定义item
            orientation,
            width,
            height,
            minHeight,

            checked,

            leftIcon,
            leftIconSize,
            leftIconColor,
            leftIconHoverColor,
            onLeftIcon,

            rightIcon,
            rightIconSize,
            rightIconColor,
            rightIconHoverColor,
            onRightIcon,

            primaryText,
            primaryColor,
            secondText,
            margin,

            align,
            grow,

            showFoldIcon,

            color,
            hoverColor,
            shadowSize,
            shadowColor,
            shadowOffset,
            indent,
            lineIndent
        } = this.props


        const { fold } = this.state

        return (
            <View
                width={width}
                orientation={'column'}
                alignH={'stretch'}
                grow={grow}
                style={{ minHeight }}
                margin={margin}
                shadowSize={shadowSize}
                shadowOffset={shadowOffset}
                shadowColor={shadowColor}
            >
                <View
                    width={'100%'}
                    height={minHeight || height}
                    color={color}
                    hoverColor={hoverColor}
                    orientation={orientation ? 'row' : 'column'}
                    alignH={align}
                    alignV={'center'}
                    onTap={this.tap}
                    hand={true}
                    transition={'all'}
                >
                    {leftIcon && this.icon( leftIcon, leftIconSize, leftIconColor, leftIconHoverColor, onLeftIcon )}
                    <View
                        width={0}
                        orientation={'column'}
                        grow={1}
                        alignH={align}
                        alignV={'center'}
                        hand={true}
                    >
                        {primaryText ?
                            <Label
                                fontColor={primaryColor}
                                text={primaryText}
                                stopEvent={false}
                            /> : null}

                        {secondText ?
                            <Label
                                text={secondText}
                                fontSize={T.fontSize.small}
                                fontColor={T.palette.grey}
                                stopEvent={false}
                            /> : null}
                        {child}
                    </View>
                    {rightIcon &&
                     this.icon( rightIcon, rightIconSize, rightIconColor, rightIconHoverColor, onRightIcon )}
                    {(showFoldIcon || (children && fold)) ?
                     this.icon( MoreIcon, 24, T.palette.grey, null, null, 'fold' ): null}
                </View>
                <div style={{
                    height: 3,
                    width: '100%',
                    marginTop: -3,
                    backgroundColor: T.palette.main, opacity: checked ? 1 : 0,
                    transition: 'opacity .3s',
                    marginLeft: lineIndent,
                    zIndex: 100
                }}
                />
                {fold == 0 || fold == 2 ?
                    <View wrap={'wrap'} style={{ paddingLeft: indent }} >
                        {children}
                    </View> : null
                }
            </View>
        )
    }

    tap = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        //L(this.display, 'fdfdfddfdf')
        //L(this.display, 'fold', this.state.fold)
        if ( this.props.fold ) {
            this.state.fold == 1 ? this.setState( { fold: 2 } ) : this.setState( { fold: 1 } )
        }

        this.props.onTap && this.props.onTap()
    }

    /**
     * 左右图标
     * @param Icon  可传function object url
     * @param size
     * @returns {*}
     */
    icon( Icon, size, color, hoverColor, onTouchTap, name ) {

        switch ( typeof Icon ) {
            case 'function':
                const iconProps = {
                    color,
                    hoverColor,
                    style: {
                        margin: 4,
                        width: size,
                        height: size,
                    },
                    onTouchTap
                }
                if ( name == 'fold' ) {
                    iconProps.style.transform =
                        'rotate(' + (this.state.fold ? this.state.fold == 1
                            ? 0 : 180 : this.props.checked ? 180 : 0) + 'deg)'
                }

                return <Icon {...iconProps}/>
                break
            case 'string':
                return <div onTouchTap={( e ) => onTouchTap( e )} style={{
                    width: size,
                    height: size,
                    margin: 4,
                    backgroundSize: 'contain',
                    backgroundImage: 'url(' + Icon + ')',
                }} />
                break
            default:
                return Icon
                break
        }
    }
}

const initHeight = 48
const minHeight = 32
const iconSizeMin = 24
const iconSizeNormal = 32
const iconSizeMax = 48