/**
 * Created by kenn on 16/8/25.
 */
import React from 'react'
import { T, L } from '../common'

/**
 * @param width
 */
class View extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'View'
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        fontColor: T.palette.darkBlack,
        fontSize: T.fontSize.normal,

        radius: 0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex: 0,
        margin: 0,

        shadowSize: 0,
        shadowColor: T.palette.grey,
        shadowOffset: 0,

        overflow: 'hidden',

        hand: false,
        display: 'flex',
        orientation: 'row',
        wrap: 'nowrap',
        grow: 0,
        order: 0,
        alignSelf: 'auto',

        imageSize: 'contain',

    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        fullWidth: React.PropTypes.any,
        height: React.PropTypes.any,
        hand: React.PropTypes.any,
        overflow: React.PropTypes.string,
        radius: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        src: React.PropTypes.string,
        imageSize: React.PropTypes.string,
        shadowSize: React.PropTypes.number,
        shadowOffset: React.PropTypes.number,
        shadowColor: React.PropTypes.string,
        shadow: React.PropTypes.string,
        hoverShadow: React.PropTypes.string,
        transition: React.PropTypes.string,
        zIndex: React.PropTypes.number,
        margin: React.PropTypes.any,

        //伸缩容器属性
        flow: React.PropTypes.string,
        wrap: React.PropTypes.string,
        orientation: React.PropTypes.string,
        align: React.PropTypes.string,
        alignH: React.PropTypes.string,
        alignV: React.PropTypes.string,

        //伸缩项目属性
        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        style: React.PropTypes.object,

        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,
        onDown: React.PropTypes.func,
        onUp: React.PropTypes.func,

        stopEvent: React.PropTypes.any,
    }

    state = {
        isOver: false,
    }

    tap = ( e ) => {
        this.props.stopEvent && e.stopPropagation()
        this.props.onTap && this.props.onTap(e)
    }

    leave = ( e ) => {
        this.props.stopEvent && e.stopPropagation()
        this.setState( { isOver: false } )

        this.props.onLeave && this.props.onLeave(e)
    }

    over = ( e ) => {
        this.props.stopEvent && e.stopPropagation()

        !this.state.isOver && this.setState( { isOver: true } )
        this.props.onOver && this.props.onOver(e)
    }

    down = ( e ) => {
        this.props.stopEvent && e.stopPropagation()
        this.props.onDown && this.props.onDown(e)
    }



    up = ( e ) => {
        this.props.stopEvent && e.stopPropagation()
        this.props.onUp && this.props.onUp(e)
    }

    /**
     * 设置简写align
     * @param rootProps
     */
    align = ( rootProps ) => {
        const align = this.props.align.trim().split( ' ' )
        this.setAlign( rootProps, align[ 0 ], true )

        if ( align[ 1 ] ) {
            this.setAlign( rootProps, align[ 1 ], false )
        }
    }

    /**
     * 根据排列方向设置align
     * @param rootProps
     * @param align
     * @param isH
     */
    setAlign = ( rootProps, align, isH ) => {
        if ( this.props.orientation.indexOf( 'row' ) == -1 ) {
            if ( isH ) {
                this.setAlignC( rootProps, align )
            } else {
                this.setAlignM( rootProps, align )
            }
        } else {
            if ( isH ) {
                this.setAlignM( rootProps, align )
            } else {
                this.setAlignC( rootProps, align )
            }
        }
    }

    /**
     * 设置主轴对齐
     * @param rootProps
     * @param align
     */
    setAlignM = ( rootProps, align ) => {
        rootProps.style.justifyContent = this.parseAlign( align )
    }

    /**
     * 设置交差轴对齐
     * @param rootProps
     * @param align
     */
    setAlignC = ( rootProps, align ) => {
        const a = this.parseAlign( align.trim() )
        if ( a != 'space-between' ) {
            rootProps.style.alignItems = a
        }
        if ( this.props.wrap != 'nowrap' ) {
            rootProps.style.alignContent = a
        }
    }

    parseAlign = ( param ) => {
        switch ( param ) {
            case 'start':
                return 'flex-start'
            case 'end':
                return 'flex-end'
            case 'between':
                return 'space-between'
            default:
                return param
                break
        }
    }


    render() {
        const {
            display,
            width,
            fullWidth,
            height,
            hand,
            color,
            fontColor,
            hoverColor,
            hoverFontColor,
            radius,
            borderWidth,
            borderColor,
            shadowSize,
            shadowOffset,
            shadowColor,
            shadow,
            hoverShadow,
            zIndex,
            transition,
            margin,
            fontSize,
            overflow,

            flow,
            wrap,
            orientation,
            grow,
            order,
            align,        //  简写格式： "H" | "H V"
            alignH,       //  水平对齐 start | s | center | c | end | e | between | b，可简写
            alignV,       //  垂直对齐 start | s | center | c | end | e | between | b | stretch | h ，可简写
            alignSelf,    //  垂直对齐 start | s | center | c | end | e | between | b | stretch | h | baseline | l，可简写

            src,
            imageSize,
            style,
        } = this.props

        const { isOver } = this.state

        const rootProps = {
            style: {
                display,
                width: fullWidth ? '100%' : width,
                height,
                margin,
                fontSize,
                color: fontColor,
                flexFlow: orientation + ' ' + wrap,
                transition: transition ? transition + ' .3s' : null,
                order,
                flexGrow: grow,
                alignSelf: alignSelf == 'auto' ? alignSelf : this.parseAlign( alignSelf.trim() ),
                cursor: hand ? 'pointer' : 'auto',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                borderRadius: radius,
                border: `${borderWidth}px solid ${borderColor}`,
                zIndex: zIndex,
                overflow,
            },
            onTouchTap: this.tap,
            onMouseLeave: this.leave,
            onMouseOver: this.over,
            onMouseDown: this.down,
            onMouseUp: this.up,
        }

        if( flow ) {
            rootProps.style.flexFlow = flow
        }

        alignH && this.setAlign( rootProps, alignH.trim(), true )
        alignV && this.setAlign( rootProps, alignV.trim(), false )
        align && this.align( rootProps )

        if ( src ) {
            rootProps.style.backgroundImage = 'url(' + src + ')'
            rootProps.style.backgroundSize = imageSize
        }

        if ( color )
            rootProps.style.backgroundColor = color

        if ( hoverColor ) {
            rootProps.onMouseLeave = this.leave
            rootProps.onMouseOver = this.over
            rootProps.onMouseDown = this.start
            rootProps.onMouseUp = this.end
            rootProps.style.backgroundColor = isOver ? hoverColor || color : color || hoverColor
        }

        if ( hoverFontColor ) {
            if ( !hoverColor ) {
                rootProps.onMouseLeave = this.leave
                rootProps.onMouseOver = this.over
                rootProps.onMouseDown = this.start
                rootProps.onMouseUp = this.end
            }
            rootProps.style.color = isOver ? hoverFontColor || fontColor : fontColor || hoverFontColor
        }

        if( shadow || shadowSize || shadowOffset ) {
            rootProps.style.boxShadow = shadow || `${shadowOffset}px ${shadowOffset}px ${shadowSize}px ${shadowColor}`
        }

        if( hoverShadow ) {
            if ( !hoverColor ) {
                rootProps.onMouseLeave = this.leave
                rootProps.onMouseOver = this.over
                rootProps.onMouseDown = this.start
                rootProps.onMouseUp = this.end
            }
            rootProps.style.boxShadow = hoverShadow
        }

        if ( style )
            Object.assign( rootProps.style, style )

        return (
            <div {...rootProps}>
                {this.props.children}
            </div>
            )
    }
}

export default View