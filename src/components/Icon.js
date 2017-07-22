/**
 * Created by kenn on 16/9/13.
 */
import React from 'react'

import { T } from '../common'

class Icon extends React.Component {
    display = 'Icon'

    static defaultProps = {
        width: 0,
        height: 0,
        size: 32,
        zIndex: 0,
        margin: 0,
        order: 0,

        shadowSize: 0,
        shadowOffset: 0,
        shadowColor: T.palette.grey,
        radius: 0
    }

    static propTypes = {
        src: React.PropTypes.any,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        size: React.PropTypes.number,
        color: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        shadowSize: React.PropTypes.number,
        shadowOffset: React.PropTypes.number,
        shadowColor: React.PropTypes.string,
        margin: React.PropTypes.any,
        position:React.PropTypes.object,

        //伸缩项目属性
        order: React.PropTypes.number,

        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,
    }

    state = {
        isOver: false
    }

    render() {
        const {
            width,
            height,
            size,
            color,
            hoverColor,
            src,
            radius,
            margin,

            shadowSize,
            shadowOffset,
            shadowColor,

            position,

            order,
            onTap,
            onOver,
            onLeave
        } = this.props

        const rootProps = {
            style: {
                width: width || size,
                height: height || size,
                margin,
                boxShadow: shadowOffset ||
                           shadowSize ? `${shadowOffset}px ${shadowOffset}px ${shadowSize}px ${shadowColor}` : 'none',
                order,
                radius: radius,
                cursor: 'pointer'
            },

            onTouchTap: onTap,
            onMouseLeave: onLeave,
            onMouseOver: onOver
        }

        if( position ) {
            rootProps.style.position = 'absolute'
            if( position.left ) {
                rootProps.style.left = position.left
            }
            if( position.right ) {
                rootProps.style.right = position.right
            }
            if( position.bottom ) {
                rootProps.style.bottom = position.bottom
            }
            if( position.top ) {
                rootProps.style.top = position.top
            }
        }

        switch ( typeof src ) {
            case 'function':
                const Icon = src
                delete rootProps.onMounseOver
                delete rootProps.onMouseLeave
                return <Icon {...rootProps}
                             color={color}
                             hoverColor={hoverColor}
                />
            case 'string':
                return (
                    <img {...rootProps} src={src} />
                )
            default:
                return src
        }
    }

}
export default Icon