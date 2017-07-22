/**
 * Created by kenn on 16/9/10.
 */
import React from 'react'

import { M, T, L } from '../common';
import View from './View';

class Button extends React.Component {
    display = 'Button'
    static defaultProps = {
        width:     'auto',
        height:    32,
        fontSize: T.fontSize.normal,
        fontColor: T.palette.darkBlack,
        radius:      4,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex: 0,
        align: 'center',
        grow:        0,
        order:       0,
        alignSelf:   'auto',

        margin: 0,

        shadowSize: 0,
        shadowOffset: 0,
        shadowColor: T.palette.grey,

        iconPosition: 'left',
        iconSize: 16,

        imageSize: 'contain',

        disable: false,
    }

    state = {
        isOver: false
    }

    static propTypes = {
        style:          React.PropTypes.any,
        width:          React.PropTypes.any,
        height:         React.PropTypes.any,
        margin:         React.PropTypes.any,
        hand:           React.PropTypes.any,
        radius:         React.PropTypes.any,
        borderWidth:    React.PropTypes.number,
        borderColor:    React.PropTypes.string,
        color:          React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor:      React.PropTypes.string,
        hoverColor:     React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        src:            React.PropTypes.string,
        imageSize:      React.PropTypes.string,
        shadow:         React.PropTypes.any,
        transition:     React.PropTypes.string,

        disable: React.PropTypes.bool,

        shadowSize: React.PropTypes.number,
        shadowOffset: React.PropTypes.number,
        shadowColor: React.PropTypes.string,
        style: React.PropTypes.object,

        align: React.PropTypes.string,

        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        icon: React.PropTypes.any,
        iconPosition: React.PropTypes.string,
        iconSize: React.PropTypes.number,

        label: React.PropTypes.any,

        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,
    }

    leave = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isOver: false } )

        this.props.onLeave && this.props.onLeave(e)
    }

    over = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isOver: true } )

        this.props.onOver && this.props.onOver(e)
    }

    start = ( e ) => {
        e.stopPropagation()
        this.setState( { isOver: !this.state.isOver } )
        this.props.onStart && this.props.onStart()
    }



    end = ( e ) => {
        e.stopPropagation()
        this.setState( { isOver: !this.state.isOver } )
        this.props.onStart && this.props.onStart()
    }


    icon = ( Icon, iconSize, hoverColor, color ) => {
        const { iconPosition } = this.props

        switch(typeof Icon) {
            case 'function':
                return  <Icon style={{width: iconSize, height: iconSize,
                    order: iconPosition=='left' || iconPosition == 'top' ? -1 : 1}}
                              color={this.state.isOver ? hoverColor || color : color} />
            case 'string':
                return (
                    <img src={Icon} style={{
                        width: iconSize,
                        height: iconSize,
                        order: iconPosition=='left' || iconPosition == 'top' ? -1 : 1,
                        borderRadius: iconSize / 2
                    }} />
                )
            default:
                return Icon
        }
    }

    tap = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.props.onTap && this.props.onTap(e)
    }

    render() {
        const {
            width, height, color, hoverColor, fontColor, borderWidth, borderColor, imageSize, src, align,
            hoverFontColor, style, radius, disable, fontSize, margin,
            shadowSize,
            shadowOffset,
            shadowColor,
            label,
            icon,
            iconPosition,
            iconSize,
            grow,
            alignSelf,
            order,
        } = this.props

        const { isOver } = this.state

        let rootProps = {
            color: isOver ? hoverColor || color : color,
            fontColor: isOver ? hoverFontColor || fontColor : fontColor,
            borderColor,
            onTap: this.tap,
            onOver: this.over,
            onLeave: this.leave,
            onStart: this.start,
            onEnd: this.end
        }

        if( disable ) {
            rootProps = {
                color: color && T.palette.lightGrey,
                fontColor: T.palette.grey,
                borderColor: T.palette.lightGrey,
                onLeave: this.leave,
            }
        }
        return (
            <View width={width}
                  height={height}
                  borderWidth={borderWidth}
                  radius={radius}
                  hand={true}
                  imageSize={imageSize}
                  src={src}
                  grow={grow}
                  order={order}
                  fontSize={fontSize}

                  shadowOffset={shadowOffset}
                  shadowSize={shadowSize}
                  shadowColor={shadowColor}

                  transition={'all'}

                  margin={margin}

                  orientation={iconPosition== 'left' || iconPosition=='right' ? 'row' : 'column'}
                  alignH={align}
                  alignV={'center'}

                  alignSelf={alignSelf}

                  style={style}

                  {...rootProps}
            >
                {
                    icon && this.icon(icon, iconSize, hoverFontColor, fontColor)
                }
                {
                    (label || this.props.children) &&
                    <div style={{margin: 4, fontSize: fontSize}}>{label || this.props.children}</div>
                }

            </View>
        )
    }
}

export default Button