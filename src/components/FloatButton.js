/**
 * Created by kenn on 16/9/10.
 */
import React from 'react'


import { T, L } from '../common'

class FloatButton extends React.Component {
    display = 'IconButton'

    state = {
        isDown: false
    }

    static defaultProps = {
        width: 48,
        height: 48,
        color: T.palette.main,
        shadowSize: 15,
        iconColor: T.palette.white600a,
        iconHoverColor: T.palette.white,
        iconSize: 24,
        alignSelf: 'auto',
        margin: 0
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        size: React.PropTypes.number,
        color: React.PropTypes.string,
        shadowSize: React.PropTypes.number,
        alignSelf: React.PropTypes.string,
        iconColor: React.PropTypes.string,
        iconHoverColor: React.PropTypes.string,
        iconSize: React.PropTypes.number,
        icon: React.PropTypes.func,
        style: React.PropTypes.object,
        onTap: React.PropTypes.func
    }

    start = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isDown: true } )
    }

    end = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isDown: false } )
    }

    render() {
        const {
            width,
            height,
            color,
            size,
            shadowSize,
            iconSize,
            iconColor,
            iconHoverColor,
            radius,
            onTap,
            alignSelf,
            margin,
            style
        } = this.props
        const { isDown } = this.state

        const Icon = this.props.icon

        const rootStyle = {
            display: 'flex',
            width: size || width,
            height: size || height,
            position: 'relative',
            textAlign: 'center',
            lineHeight: height + 'px',
            alignSelf,
            margin
        }

        if ( style ) {
            Object.assign( rootStyle, style )
        }

        return (
            <div
                style={style}
                 onTouchTap={onTap}
                 onMouseDown={this.start}
                 onMouseUp={this.end}
            >
                <button
                    style={{
                        width: isDown ? (size || width) - 4 : size || width,
                        height: isDown ? (size || height) - 4 : size || height,
                        backgroundColor: color,
                        boxShadow: isDown ? '0 0 0 grey' : '5px 5px ' + shadowSize + 'px ' + T.palette.grey,
                        transition: 'all .3s',
                        padding: 0,
                        textAlign: 'center',
                        borderRadius: radius || (size || height) / 2,
                        cursor: 'pointer'
                    }}
                >
                    <Icon
                        style={{
                            width: isDown ? iconSize - 4 : iconSize,
                            height: isDown ? iconSize - 4 : iconSize,
                        }}
                        color={iconColor}
                        hoverColor={iconHoverColor}
                    />
                </button>
            </div>

        )
    }
}
export default FloatButton