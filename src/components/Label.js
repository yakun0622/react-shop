/**
 * Created by kenn on 16/9/11.
 */
import React from 'react'
import { T } from '../common'
import {parseArgs} from './common'

class Label extends React.Component {
    display = 'TextView'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        fontSize: T.fontSize.normal,
        fontColor: T.palette.darkBlack,
        color: T.palette.transparent,
        grow: 0,
        fullWidth: false,
        align: 'start',
        margin: 0,
        wrap: true,
        radius: 0,
        stopEvent: false,
        alignSelf: 'auto',
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        color: React.PropTypes.string,
        fontColor: React.PropTypes.string,
        fontSize: React.PropTypes.number,

        fullWidth: React.PropTypes.bool,
        stopEvent: React.PropTypes.bool,
        radius: React.PropTypes.any,

        align: React.PropTypes.string,
        alignSelf: React.PropTypes.string,

        grow: React.PropTypes.number,
        wrap: React.PropTypes.any,
        text: React.PropTypes.any,

        style: React.PropTypes.object,
        margin: React.PropTypes.any,
        onTap: React.PropTypes.func,
    }

    onTap = ( e ) => {
        this.props.stopEvent && e.stopPropagation()
        e.preventDefault()
        this.props.onTap && this.props.onTap()
    }


    render() {
        const {
            width,
            height,
            color,
            fontColor,
            radius,
            grow,
            style,
            align,
            fontSize,
            fullWidth,
            text,
            margin,
            wrap,
            alignSelf
        } = this.props

        const s = {
            display: 'flex',
            width: fullWidth ? '100%' : width,
            height,
            fontSize,
            color: fontColor,
            flexGrow: grow,
            backgroundColor: color,
            whiteSpace: wrap ? 'normal' : 'nowrap',
            alignItems: 'center',
            margin,
            justifyContent: parseArgs(align),
            overflow: 'hidden',
            borderRadius: radius,
            alignSelf: parseArgs(alignSelf)
        }

        return (
            <div style={style ? Object.assign( s, style ) : s} onTouchTap={this.onTap} >
                { text || this.props.children }
            </div>
        )
    }
}
export default Label