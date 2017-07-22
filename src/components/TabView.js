/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { Link } from 'react-router'


import { T, L, F } from '../common'
import View from './View'
import Button from './Button'

export default class TabView extends React.Component {
    display = 'TabView'

    state = {
        checked: -1
    }

    static defaultProps = {
        width:     'auto',
        height:    'auto',
        fontSize:  15,

        color: T.palette.transparent,
        hoverColor: T.palette.transparent,
        fontColor: T.palette.darkBlack,
        hoverFontColor: T.palette.main,


        radius:      0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        margin:      0,

        orientation: true,

        tabHeight:    32,
        iconPosition: 'left',
        iconSize:     24,
        toggle:       true,

        grow: 0,
        alignSelf: 'start',

        fold: false, //折叠

        imageSize: 'contain',
        checked: -1,
    }

    static propTypes = {
        //[string, ...]
        tabs:         React.PropTypes.array, // 标签名称
        icons:     React.PropTypes.array,    // 标签图标，与标签名称对应
        links: React.PropTypes.array,        // 标签连接，与标签名称对应
        tabHeight:    React.PropTypes.number,
        tabWidth:    React.PropTypes.number,
        iconPosition: React.PropTypes.string,
        iconSize:     React.PropTypes.number,
        toggle:       React.PropTypes.bool,
        checked: React.PropTypes.any,
        checkedColor: React.PropTypes.string,

        fold: React.PropTypes.bool,

        width:          React.PropTypes.any,
        height:         React.PropTypes.any,
        radius:         React.PropTypes.any,
        borderWidth:    React.PropTypes.number,
        borderColor:    React.PropTypes.string,
        color:          React.PropTypes.string,
        fontSize:       React.PropTypes.number,
        fontColor:      React.PropTypes.string,
        hoverColor:     React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        shadow:         React.PropTypes.any,
        margin:         React.PropTypes.any,
        grow: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        orientation: React.PropTypes.bool, //true 水平  false 垂直

        //style: React.PropTypes.object,

        onChecked:   React.PropTypes.func,
    }

    componentWillMount() {
        if( this.props.onChecked ) {
            this.setState( { checked: this.props.checked } )
        }
    }

    componentWillReceiveProps( props ) {
        if( this.props.onChecked ) {
            this.setState( { checked: props.checked } )
        }
    }

    render() {
        const { width, height, orientation, margin, grow} = this.props
        const { checked } = this.state
        
        if ( this.props.children ) {
            return (
                <View
                    width={width}
                    height={height}
                    orientation={orientation ? 'column' : 'row'}
                    margin={margin}
                    grow={grow}
                    overflow={'visible'}
                >
                    {this.createMenu()}
                    {(checked != -1) && this.props.children[this.state.checked]}
                </View>
            )
        } else {
            return this.createMenu()
        }
    }
    
    //showChildren(){
    //    //L(this.display, this.props.children)
    //    if( !this.props.children ) {
    //        return null
    //    }
    //
    //    if( Array.isArray(this.props.children) ) {
    //        return this.props.children[this.state.checked]
    //    }
    //
    //    return this.props.children
    //}

    tap( checked ) {
        let check = this.setChecked(checked)
        if( check !== false ) {
            if( this.props.onChecked ) {
                this.props.onChecked(check)
                return
            }
            this.setState( { checked: check } )
        }
    }

    setChecked( checked){
        if ( checked == this.state.checked ) {
            if( this.props.toggle ) {
                return -1
            } else {
                return false
            }
        } else {
            return checked
        }
    }

    createMenu() {
        const {
            width,
            height,

            orientation,
            tabWidth,
            tabHeight,
            tabs,
            links,

            grow,
            alignSelf,

            margin,

            fold,
            children
        } = this.props

        return (
            <View
                width={children ? '100%' : width}
                height={orientation ? height : fold ?  0: tabHeight * tabs.length}
                orientation={orientation ? 'row' : 'column'}
                transition={'all'}
                grow={children ? 0 : grow}
                margin={children ?  0: margin}
                alignSelf={alignSelf}
            >
                {F( tabs, ( label, key ) => {
                    if( links && links[key] ) {
                        return <Link key={key + 'link'} to={links[key]} >{this.tab(label, key)}</Link>
                    }
                    return this.tab(label, key)
                } )}
            </View>
        )
    }

    tab(label, key){

        const {
            width,
            color,
            hoverColor,
            fontColor,
            borderWidth,
            borderColor,
            hoverFontColor,
            checkedColor,
            checkedFontColor,
            style,
            radius,

            orientation,
            tabWidth,
            tabHeight,
            icons,
            iconPosition,
            iconSize,
            children
        } = this.props

        const {checked} = this.state

        return (
            <Button
                key={key + 'tab'}
                width={orientation ? tabWidth || 0 : children ? tabWidth : width}
                height={tabHeight}
                icon={icons && icons[ key ]}
                iconPosition={iconPosition}
                iconSize={iconSize}
                label={label}
                color={checked == key ? checkedColor || hoverColor : color}
                hoverColor={checked == key ? checkedColor || hoverColor : hoverColor}
                fontColor={ checked == key ? checkedFontColor || hoverFontColor : fontColor}
                hoverFontColor={checked == key ? checkedFontColor || hoverFontColor : hoverFontColor}
                grow={ orientation ? tabWidth ? 0 : 1 : 0 }
                onTap={() => this.tap( key )}
                radius={radius}
            />
        )
    }
}