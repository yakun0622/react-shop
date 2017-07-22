/**
 * Created by kenn on 16/9/12.
 */
import React from 'react'

import { T, L } from '../common'

const URL = 'images/'

export default class Image extends React.Component {
    display = 'Image'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',

        radius: 0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        color: T.palette.transparent,
        zIndex: 0,
        margin: 0,

        hand: false,
        grow: 0,
        order: 0,
        alignSelf: 'auto',
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        hand: React.PropTypes.any,
        radius: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        color: React.PropTypes.string,
        src: React.PropTypes.string,
        imageSize: React.PropTypes.number,
        shadow: React.PropTypes.any,
        zIndex: React.PropTypes.number,
        margin: React.PropTypes.any,

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
        this.setState( {} )
    }

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    render() {
        const {
            width,
            height,
            color,
            borderWidth,
            borderColor,
            imageSize,
            src,
            grow,
            margin,
            style,
            radius,
            onTap,
            onOver,
            onLeave
        } = this.props

        const rootProps = {
            style: {
                display: 'inline-block',
                width: imageSize || width,
                height: imageSize || height,
                margin,
                border: `${borderWidth}px solid ${borderColor}`,
                backgroundColor: color,
                borderRadius: radius,
                flexGrow: grow
            },
            onTouchTap: onTap,
            onMouseLeave: onLeave,
            onMouseOver: onOver,
        }

        if ( style ) {
            Object.assign( rootProps.style, style )
        }

        if ( imageSize ) {
            rootProps.style.backgroundImage = 'url(' + src + ')'
            rootProps.style.backgroundSize = imageSize

            return <div {...rootProps} />
        } else {
            rootProps.src = src
            return <img {...rootProps} />
        }
    }
}