/**
 * Created by kenn on 16/8/25.
 */

import { T } from '../common'

export default class CreatePropsAndStyle {
    constructor( props, style ) {

        this.props = props
        if ( style ) {
            if ( props.style ) {
                this.props.style = M( props.style, style )
            } else {
                this.props[ 'style' ] = style
            }
        }
        //console.log(style)
    }

    /********************************************************************
     * 样式
     ********************************************************************/
    position( value ) {
        switch ( value ) {
            case 1:
                this.props.style[ 'position' ] = 'absolute'
                break
            case 2:
                this.props.style[ 'position' ] = 'fixed'
                break
            default:
                this.props.style[ 'position' ] = 'relative'
                break
        }
        return this
    }

    top( value ) {
        this.props.style[ 'top' ] = value
        return this
    }

    left( value ) {
        this.props.style[ 'left' ] = value
        return this
    }

    right( value ) {
        this.props.style[ 'right' ] = value

        return this
    }

    bottom( value ) {
        this.props.style[ 'bottom' ] = value

        return this
    }

    marginRight( value ) {
        this.props.style[ 'marginRight' ] = value
        return this
    }

    marginTop( value ) {
        this.props.style[ 'marginTop' ] = value
        return this
    }

    marginBottom( value ) {
        this.props.style[ 'marginBottom' ] = value
        return this
    }

    marginLeft( value ) {
        this.props.style[ 'marginLeft' ] = value
        return this
    }

    block() {
        this.props.style[ 'display' ] = 'block'
        return this
    }

    inline( align = 0 ) {

        switch ( align ) {
            case 1:
                this.props.style[ 'verticalAlign' ] = 'middle'
                break
            case 2:
                this.props.style[ 'verticalAlign' ] = 'bottom'
                break
            default:
                this.props.style[ 'verticalAlign' ] = 'top'
                break
        }
        this.props.style[ 'display' ] = 'inline-block'

        return this
    }

    margin( ...value ) {
        switch ( value.length ) {
            case 1:
                this.props.style[ 'margin' ] = value[ 0 ]
                break
            case 2:
                this.props.style[ 'margin' ] = `${value[ 0 ]}px ${value[ 1 ]}px`
                break
            case 3:
                this.props.style[ 'margin' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`
                break
            default:
                this.props.style[ 'margin' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`
                break
        }
        return this
    }

    padding( ...value ) {
        switch ( value.length ) {
            case 1:
                this.props.style[ 'padding' ] = value[ 0 ]
                break
            case 2:
                this.props.style[ 'padding' ] = `${value[ 0 ]}px ${value[ 1 ]}px`
                break
            case 3:
                this.props.style[ 'padding' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`
                break
            default:
                this.props.style[ 'padding' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`
                break
        }
        return this
    }

    border( width = 1, color = T.palette.darkBlack, lineType = 'solid' ) {
        this.props.style[ 'border' ] = `${width}px ${lineType} ${color}`
        return this
    }

    z( value ) {
        this.props.style[ 'zIndex' ] = value
        return this
    }


    center( type = 0 ) {
        switch ( type ) {
            case 1:
                this.props.style[ 'marginLeft' ] = 'auto'
                this.props.style[ 'marginRight' ] = 'auto'

                break
            case 2:
                this.props.style[ 'backgroundPosition' ] = 'center'
                break
            default:
                this.props.style[ 'textAlign' ] = 'center'
                break
        }

        return this
    }

    width( value, isMinOrMax = 0 ) {
        switch ( isMinOrMax ) {
            case 1:
                //min
                this.props.style[ 'minWidth' ] = value
                break
            case 2:
                //max
                this.props.style[ 'maxWidth' ] = value
                break
            default:
                this.props.style[ 'width' ] = value
                break
        }
        return this
    }

    height( value, type=0 ) {
        type ? this.props[ 'height' ] = value : this.props.style[ 'height' ] = value
        return this
    }

    size( value, i = 0 ) {

        switch ( i ) {
            case 1:
                this.props.style[ 'fontSize' ] = value
                break
            case 2:
                this.props.style[ 'backgroundSize' ] = value || 'contain'
                break
            case 3:
                this.props[ 'size' ] = value
                break
            default:
                this.props.style[ 'width' ] = value
                this.props.style[ 'height' ] = value
                break
        }

        return this
    }

    grow(value = 1){
        this.props.style[ 'flexGrow' ] = value
        return this
    }

    lineHeight( value ) {
        this.props.style[ 'lineHeight' ] = value + 'px'

        return this
    }

    hand() {
        this.props.style[ 'cursor' ] = 'pointer'
        return this
    }

    /**
     *
     * @param value
     * @param type    默认为背景色, 1为字体颜色, 2为属性color, 3为属性hoverColor
     * @returns {CreatStyle}
     */
    color( value, type ) {
        switch ( type ) {
            case 1:
                this.props.style[ 'color' ] = value
                break
            case 2:
                this.props[ 'color' ] = value
                break
            case 3:
                this.props[ 'hoverColor' ] = value
                break
            case 4:
                this.props[ 'backgroundColor' ] = value
                break
            default:
                this.props.style[ 'backgroundColor' ] = value
                break
        }

        return this
    }

    opacity( value ) {
        this.props.style[ 'opacity' ] = value
        return this
    }

    shadow( size = 5, x = 0, y = 0, color = 'grey' ) {
        this.props.style[ 'boxShadow' ] = x + 'px ' + y + 'px ' + size + 'px ' + color
        return this
    }

    transition( name = 'all', time = 0.3 ) {
        this.props.style[ 'transition' ] = name + ' ' + time + 's '
        return this
    }

    radius( ...value ) {

        switch ( value.length ) {
            case 1:
                //console.log(value[0])
                this.props.style[ 'borderRadius' ] = value[ 0 ]
                break
            case 2:
                this.props.style[ 'borderRadius' ] = `${value[ 0 ]}px ${value[ 1 ]}px`
                break
            case 3:
                this.props.style[ 'borderRadius' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`
                break
            default:
                this.props.style[ 'borderRadius' ] = `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`
                break
        }
        return this
    }

    image( url, type = 0 ) {
        if ( type ) {
            this.props[ 'src' ] = url
        } else {
            this.props.style[ 'backgroundImage' ] = 'url(' + url + ')'
            this.props.style[ 'backgroundRepeat' ] = 'no-repeat'
        }

        return this
    }

    icon(icon, type = 0){
        switch(type) {
            case 1:
                this.props[ 'leftIcon' ] = icon
                break
            case 2:
                this.props[ 'rightIcon' ] = icon
                break
            default:
                this.props[ 'icon' ] = icon
                break
        }
        return this
    }

    overflow( value = 'hidden', xy = null ) {
        switch ( xy ) {
            case 0:
                this.props.style[ 'overflow-x' ] = value
                break
            case 1:
                this.props.style[ 'overflow-y' ] = value
                break
            default:
                this.props.style[ 'overflow' ] = value
                break
        }
        return this
    }

    float(value) {
        this.props.style[ 'float' ] = value
        return this
    }

    //flex  *************************


    /********************************************************************
     * 属性
     ********************************************************************/
    key( key1, key2 = '' ) {
        this.props[ 'key' ] = '' + key1 + key2
        return this
    }

    open() {
        this.props[ 'open' ] = true
        return this
    }


    text( value, name = 0 ) {
        switch ( name ) {
            case 1:
                this.props[ 'primaryText' ] = value
                break
            case 2:
                this.props[ 'secondText' ] = value
                break
            case 3:
                this.props[ 'floatingLabelText' ] = value
                break
            default:
                this.props[ 'label' ] = value
                break
        }

        return this
    }

    name( value = 'sun' ) {
        this.props[ 'name' ] = value
        return this
    }

    fullWidth() {
        this.props[ 'fullWidth' ] = true
        return this
    }

    checked( isChecked = true ) {
        this.props[ 'checked' ] = isChecked
        return this
    }

    add( name, value, isProps = true ) {
        if ( isProps ) {
            this.props[ name ] = value
        } else {
            if ( !this.props.style )
                this.props[ 'style' ] = {}

            this.props.style[ name ] = value
        }


        return this
    }

    /**
     * 鼠标进出事件
     */
    over( enterCallback, leaveCallback = null ) {
        this.props[ 'onMouseEnter' ] = ( e ) => {
            e.stopPropagation()
            e.preventDefault()

            enterCallback()
        }

        if ( leaveCallback !== false ) {
            this.props[ 'onMouseLeave' ] = ( e ) => {
                e.stopPropagation()
                e.preventDefault()
                leaveCallback ? leaveCallback() : enterCallback()
            }
        }

        return this
    }

    click( callback, isStop = true ) {
        this.props[ 'onClick' ] = ( e ) => {
            this.isStop( e, isStop )
            callback()
        }
        return this
    }

    tap( callback, isStop = true ) {
        this.props[ 'onTouchTap' ] = ( e ) => {
            this.isStop( e, isStop )
            callback()
        }
        return this
    }

    stop(events = 0) {
        switch (events){
            case 1:
                this.props.onClick = ( e ) => this.isStop( e )
                this.props.onTouchTap = ( e ) => this.isStop( e )
                break
            case 2:
                this.props.onMouseLeave = ( e ) => this.isStop( e )
                this.props.onMouseEnter = ( e ) => this.isStop( e )
                break
            default:
                this.props.onClick = ( e ) => this.isStop( e )
                this.props.onTouchTap = ( e ) => this.isStop( e )
                this.props.onMouseLeave = ( e ) => this.isStop( e )
                this.props.onMouseEnter = ( e ) => this.isStop( e )
                break
        }
        return this
    }

    isStop( e, isStop = true ) {
        if ( isStop ) {
            e.stopPropagation()
        }
        e.preventDefault()
    }

    error( value ) {
        if ( Array.isArray( value ) ) {
            this.props[ 'errorText' ] = value[ 1 ]
        } else {
            this.props[ 'errorText' ] = ''
        }
        return this
    }

    value( value ) {
        if ( Array.isArray( value ) ) {
            this.props[ 'value' ] = value[ 0 ]
        } else {
            this.props[ 'value' ] = value
        }
        return this
    }

    change( callback ) {
        this.props[ 'onChange' ] = ( e, value ) => {
            callback( value || (e.target ? e.target.value : e) )
        }
        return this
    }

    rules( rules ) {
        this.props[ 'rules' ] = rules
        return this
    }

    ok() {
        let keys = Object.keys( this.props )
        if ( keys.length == 1 && keys[ 0 ] == 'style' ) {
            return this.props.style
        } else {
            return this.props
        }
    }

    p() {
        return this.props
    }

    s() {
        return this.props.style
    }
}