/**
 * Created by kenn on 16/9/7.
 */
import React from 'react'
import { T } from '../common'

var create = {

    /********************************************************************
     * 样式
     ********************************************************************/
    setStyle( key, value ){
        if ( !this.props.style ) {
            this.props.style = {}
        }
        this.props.style[ key ] = value
    },

    position( value ) {
        switch ( value ) {
            case 1:
                this.setStyle( 'position', 'absolute')
                break
            case 2:
                this.setStyle( 'position', 'fixed')
                break
            default:
                this.setStyle( 'position', 'relative')
                break
        }
        return this
    },

    top( value ) {
        this.setStyle( 'top', value)
        return this
    },

    left( value ) {
        this.setStyle( 'left', value)
        return this
    },

    right( value ) {
        this.setStyle( 'right', value)

        return this
    },

    bottom( value ) {
        this.setStyle( 'bottom', value)

        return this
    },

    marginRight( value ) {
        this.setStyle( 'marginRight', value)
        return this
    },

    marginTop( value ) {
        this.setStyle( 'marginTop', value)
        return this
    },

    marginBottom( value ) {
        this.setStyle( 'marginBottom', value)
        return this
    },

    marginLeft( value ) {
        this.setStyle( 'marginLeft', value)
        return this
    },

    block() {
        this.setStyle( 'display', 'block')
        return this
    },

    inline( align = 0 ) {

        switch ( align ) {
            case 1:
                this.setStyle( 'verticalAlign', 'middle')
                break
            case 2:
                this.setStyle( 'verticalAlign', 'bottom')
                break
            default:
                this.setStyle( 'verticalAlign', 'top')
                break
        }
        this.setStyle( 'display', 'inline-block')

        return this
    },

    margin( ...value ) {
        switch ( value.length ) {
            case 1:
                this.setStyle( 'margin', value[ 0 ])
                break
            case 2:
                this.setStyle( 'margin', `${value[ 0 ]}px ${value[ 1 ]}px`)
                break
            case 3:
                this.setStyle( 'margin', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`)
                break
            default:
                this.setStyle( 'margin', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`)
                break
        }
        return this
    },

    padding( ...value ) {
        switch ( value.length ) {
            case 1:
                this.setStyle( 'padding', value[ 0 ])
                break
            case 2:
                this.setStyle( 'padding', `${value[ 0 ]}px ${value[ 1 ]}px`)
                break
            case 3:
                this.setStyle( 'padding', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`)
                break
            default:
                this.setStyle( 'padding', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`)
                break
        }
        return this
    },

    border( width = 1, color = T.palette.darkBlack, lineType = 'solid' ) {
        this.setStyle( 'border', `${width}px ${lineType} ${color}`)
        return this
    },

    z( value ) {
        this.setStyle( 'zIndex', value)
        return this
    },


    center( type = 0 ) {
        switch ( type ) {
            case 1:
                this.setStyle( 'marginLeft', 'auto')
                this.setStyle( 'marginRight', 'auto')
                break
            case 2:
                this.setStyle( 'backgroundPosition', 'center')
                break
            default:
                this.setStyle( 'textAlign', 'center')
                break
        }
        return this
    },

    width( value, isMinOrMax = 0 ) {
        switch ( isMinOrMax ) {
            case 1:
                //min
                this.setStyle( 'minWidth', value)
                break
            case 2:
                //max
                this.setStyle( 'maxWidth', value)
                break
            default:
                this.setStyle( 'width', value)
                break
        }
        return this
    },

    height( value, isMinOrMax = 0 ) {
        switch ( isMinOrMax ) {
            case 1:
                //min
                this.setStyle( 'minHeight', value)
                break
            case 2:
                //max
                this.setStyle( 'maxHeight', value)
                break
            default:
                this.setStyle( 'height', value)
                break
        }
        return this
    },

    size( value, i = 0 ) {

        switch ( i ) {
            case 1:
                this.setStyle( 'fontSize', value)
                break
            case 2:
                this.setStyle( 'backgroundSize', value || 'contain')
                break
            default:
                this.setStyle( 'width', value)
                this.setStyle( 'height', value)
                break
        }

        return this
    },

    grow( value = 1){
        this.setStyle( 'flexGrow', value)
        return this
    },

    lineHeight( value ) {
        this.setStyle( 'lineHeight', value + 'px')
        return this
    },

    hand() {
        this.setStyle( 'cursor', 'pointer')
        return this
    },

    color( value, type ) {
        switch ( type ) {
            case 1:
                this.setStyle( 'color', value)
                break
            default:
                this.setStyle( 'backgroundColor', value)
                break
        }
        return this
    },


    opacity( value ) {
        this.setStyle( 'opacity', value)
        return this
    },

    shadow( size = 5, x = 0, y = 0, color = 'grey' ) {
        this.setStyle( 'boxShadow', x + 'px ' + y + 'px ' + size + 'px ' + color)
        return this
    },

    transition(  time = 0.3,  name = 'all' ) {
        this.setStyle( 'transition', name + ' ' + time + 's ')
        return this
    },

    radius( ...value ) {
        switch ( value.length ) {
            case 1:
                //console.log(value[0])
                this.setStyle( 'borderRadius', value[ 0 ])
                break
            case 2:
                this.setStyle( 'borderRadius', `${value[ 0 ]}px ${value[ 1 ]}px`)
                break
            case 3:
                this.setStyle( 'borderRadius', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px`)
                break
            default:
                this.setStyle( 'borderRadius', `${value[ 0 ]}px ${value[ 1 ]}px ${value[ 2 ]}px ${value[ 3 ]}px`)
                break
        }
        return this
    },

    image( url ) {
        this.setStyle( 'backgroundImage', 'url(' + url + ')')
        this.setStyle( 'backgroundRepeat', 'no-repeat')
        return this
    },

    overflow( value = 'hidden', xy = null ) {
        switch ( xy ) {
            case 0:
                this.setStyle( 'overflow-x', value)
                break
            case 1:
                this.setStyle( 'overflow-y', value)
                break
            default:
                this.setStyle( 'overflow', value)
                break
        }
        return this
    },


    /********************************************************************
     * 属性
     ********************************************************************/
    pGrow(value = 1){
        this.props.grow = value
        return this
    },

    icon( icon, type = 0 ){
        switch ( type ) {
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
    },

    pColor( value, type = 0 ) {
        switch ( type ) {
            case 1:
                this.props[ 'backgroundColor' ] = value
                break
            default:
                this.props[ 'color' ] = value
                break
        }
        return this
    },

    hoverColor(value) {
        this.props.hoverColor = value
        return this
    },

    checkedColor(value){
        this.props.checkedColor= value
        return this
    },

    fontColor(value){
        this.props.fontColor=value
        return this
    },

    src(value){
        this.props.src = value
        return this
    },

    pSize(value){
        this.props.size = value
        return this
    },


    key( key1, key2 = '' ) {
        this.props[ 'key'] = '' + key1 + key2
        return this
    },

    open() {
        this.props[ 'open' ] = true
        return this
    },


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
    },

    name( value = 'sun' ) {
        this.props[ 'name' ] = value
        return this
    },

    fullWidth() {
        this.props[ 'fullWidth' ] = true
        return this
    },

    checked( isChecked = true ) {
        this.props[ 'checked' ] = isChecked
        return this
    },

    /**
     * 鼠标进出事件
     */
    over( enterCallback, leaveCallback = null ) {
        this.props[ 'onMouseOver' ] = ( e ) => {
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
    },

    click( callback, isStop = true ) {
        this.props[ 'onClick' ] = ( e ) => {
            this.isStop( e, isStop )
            callback()
        }
        return this
    },

    tap( callback, isStop = true ) {
        this.props[ 'onTouchTap' ] = ( e ) => {
            this.isStop( e, isStop )
            callback()
        }
        return this
    },

    stop( events = 0 ) {
        switch ( events ) {
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
    },

    isStop( e, isStop = true ) {
        if ( isStop ) {
            e.stopPropagation()
        }
        e.preventDefault()
    },

    error( value ) {
        if ( Array.isArray( value ) ) {
            this.props[ 'errorText' ] = value[ 1 ]
        } else {
            this.props[ 'errorText' ] = ''
        }
        return this
    },

    value( value ) {
        if ( Array.isArray( value ) ) {
            this.props[ 'value' ] = value[ 0 ]
        } else {
            this.props[ 'value' ] = value
        }
        return this
    },

    type(type){
        this.props.type = type
        return this
    },

    change( callback ) {
        this.props[ 'onChange' ] = ( value, name ) => {
            callback( value , name )
        }
        return this
    },

    /**
     * 设置验证规则
     * 可以用可变参数设置，如果是一个参数则是object
     * @param rules
     * @returns {createPropsAndStyle}
     */
    rules( ...rules ) {
        if ( rules.length == 1 ) {
            if ( this.props.rules ) {
                this.props.rules = Object.assign( this.rules, rules[ 0 ] )
            } else {
                this.props[ 'rules' ] = rules[ 0 ]
            }
        } else {
            if ( !this.props.rules ) {
                this.props.rules = {}
            }
            for ( let i = 0; i < rules.length; i++ ) {
                if ( i % 2 == 0 ) {
                    this.props.rules[ rules[ i ] ] = rules[ i + 1 ]
                }
            }
        }

        return this
    },

    add( name, value, isProps = true ) {
        if ( isProps ) {
            this.props[ name ] = value
        } else {
            this.setStyle( name, value)
        }
        return this
    },

    /**********************************************************************
     * 子对象
     * @param children
     */
    /**
     * 添加
     * @param children
     */
    append(...children){
        if( !this.childs ) {
            this.childs = []
        }
        this.childs.splice(this.childs.length, 0, children)
        return this
    },

    /**
     * 插入
     * @param index
     * @param children
     */
    insert(index, ...children){
        this.childs.splice(index, 0, ...children)
    },

    /**
     * 创建
     * @param isStyle
     * @returns {*}
     */
    ok(isStyle = false){
        if( isStyle ) {
            return this.props.style
        }

        if ( this.element ) {
            const Element = this.element
            delete this.element
            if ( this.props.style && Object.keys( this.props.style ).length == 0 ) {
                delete this.props.style
            }
            return <Element {...this.props} >{this.childs || null}</Element>
        } else {
            return this.props
        }
    }
}

/**
 *  创建元素或创建属性
 *  如果args第一个值为react 元素类型function 则ok函数返回react对象，且args第二个值开始都必须是子元素react对象
 *  如果args第一个值为对象则是创建属性或样式初始值，第二个值为判断是属性还是样式, true 为属性
 *  创建属性或样式是只能传两个参数
 */
class Creator {
    constructor( ...args) {
        if( args.length > 0 ) {
            if( typeof args[0] == 'function' ) {
                this.element = args[0]
                if( args.length > 1 ) {
                    args.shift()
                    this.childs = args
                }
            } else if( args.length == 2 ) {
                if( args[1] ) {
                    for ( let key in args[0] ) {
                        if ( key == 'style' ) {
                            this.props.style = {}
                            for ( let k in args[0].style ) {
                                this.props.style[ k ] = args[0].style[ k ]
                            }
                        } else {
                            this.props[ key ] = args[0][ key ]
                        }
                    }
                } else {
                    this.props.style = {}

                    for ( let key in args[1] ) {
                        this.props.style[ key ] = args[1][ key ]
                    }
                }
            }
        }
    }

    props = {}
    __proto__ = create
}

export default function ( ...args ) {

    if( typeof args[0] == 'object') {
        if( args.length > 2 ) {
            return null
        }
        if( typeof args[1] == 'undefined' ) {
            args[1] = true
        }
    }
    return new Creator( ...args )
}
