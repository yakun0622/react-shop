/**
 * Created by kenn on 16/7/6.
 */
import React from 'react'
import { connect } from 'react-redux'

import { DG, C, D, L} from '../common'

import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import SvgSearch from 'material-ui/svg-icons/action/search';

import {SEARCH_GOODS, SEARCH_SHOP, SEARCH_CLEAR, SEARCH_GROUP } from '../actions/type'
import { SEARCH } from '../store/api'

/**
 * 搜索组件
 *
 * props:
 *  widht
 *  height
 *  type [sting|array] 根据type指定搜索内容, 设置下拉框提示
 *  hint [boolean]     是否展开提示
 */
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'Search'

        this.state = {
            itemHeight: 'auto',
            value: '',
            opacity: 0,
            isOverItem: false,
            isFocused: false
        }
    }

    static defaultProps = {
        type: ['goods']
    }

    static propTypes={
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        grow: React.PropTypes.number,
        type: React.PropTypes.array,
        onSearch: React.PropTypes.func,
        onClear: React.PropTypes.func,
    }

    componentDidMount() {
    }

    render() {


        let width = this.props.width || 300,
            height = this.props.height || 40,
            borderWidth = this.props.borderWidth || 1,
            borderColor = this.props.borderColor || 'grey',
            margin = 4

        let rootStyle = {
            display: 'flex',
            width,
            height,
            position: 'relative',
            margin: this.props.margin || 0,
            verticalAlign: 'top',
            flexFlow: 'row nowrap'
        }

        if( this.props.zIndex ) {
            rootStyle.zIndex = this.props.zIndex
        }

        if( this.props.grow ) {
            rootStyle.flexGrow = this.props.grow
        }


        let inputStyle = {
            width: 0,
            height: height - borderWidth * 2,
            borderWidth: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            paddingLeft: 8,
            verticalAlign: 'top',
            fontSize: 16,
            flexGrow: '1',
        }


        let outStyle = {
            display: 'flex',
            flexFlow: 'row nowrap',
            height,
            borderColor,
            borderWidth: borderWidth,
            borderStyle: 'solid',
            overflow: 'hidden',
            borderRadius: this.props.radius || 0,
            flexGrow: 1
        }

        if (this.props.color) {
            outStyle['backgroundColor'] = this.props.color
        }

        let imgStyle = {
            width: height - borderWidth - margin * 2,
            height: height - margin * 2 - borderWidth * 2,
            margin,
            cursor: 'pointer'
        }

        return (
            <div style={rootStyle}>
                <div style={outStyle}>
                    <input style={inputStyle}
                           onClick={( e ) => {
                               e.stopPropagation()
                               e.preventDefault()
                           }}
                           value={this.state.value}
                           name='search'
                           onBlur={this.blur.bind(this)}
                           onFocus={this.focus.bind(this)}
                           onChange={(e)=>this.change(e.target.value)}
                           onKeyDown={( e ) => this.keyDown(this.props.type[0], e)}
                    />
                    {
                        this.state.value != '' ?
                            <CloseIcon style={imgStyle} color="white"
                                       hoverColor="black"
                                       onClick={() => this.touchTap(this.props.type[0], 'clear')} /> : null
                    }
                    <SvgSearch style={imgStyle} color="white"
                               hoverColor="black"
                               onClick={() => this.touchTap(this.props.type[0])} />
                </div>
                {this.hintOption()}
            </div>
        )
    }

    hintOption() {
        let itemStyle = {
            width: this.props.width,
            backgroundColor: 'white',
            height: this.state.itemHeight,
            borderRadius: 5,
            overflow: 'hidden',
            opacity: this.state.opacity,
            transition: 'all .5s'
        }

        if (this.props.hint && this.props.type && this.props.type.length >1 && Array.isArray(this.props.type) && (this.state.isFocused || this.state.isOverItem)) {
            let hints = []
            let types = this.props.type
            for (var i = 0; i < types.length; i++) {
                switch (types[i]) {
                    case 'goods':
                        hints.push(this.item('商品', i, this.state.value, 'goods'))
                        break
                    case 'shop':
                        hints.push(this.item('店铺',i, this.state.value, 'shop'))
                        break
                    default:
                        break
                }

                if (i !== types.length - 1) {
                    hints.push(<Divider key={`divider${i}`}/>)
                }
            }


            return <div style={itemStyle}
                        onMouseOver={()=>this.mouseOver()}
                        onMouseLeave={()=>this.mouseLeave()}
            >{hints}</div>
        }
        return null
    }

    item(title, i, text, type) {
        return (<MenuItem key={`${SEARCH_GOODS}${i}`}
                          primaryText={`${title}: ${text}`}
                          rightIcon={<SvgSearch />}
                          onTouchTap={()=>this.touchTap(type)}
        />)
    }

    keyDown(type, e){
        if( e && e.keyCode == 13 ) {
            this.touchTap(type)
        }
    }

    touchTap(type, name){
        this.setState({
            isOverItem: false,
            isFocused: false,
            value: name == 'clear' ? '' : this.state.value
        })

        if( name == 'clear' ) {
            this.props.onClear && this.props.onClear()
            return
        }

        const value = this.state.value

        switch(type) {
            case 'goods':
                let search = this.props.search
                if( !search ) {
                    search = {}
                }

                if( search.keyword == value ) {
                    return
                }
                if( !value || value == '') {
                    if( search.keyword ) {
                        delete search.keyword
                    }
                    if( !C(search) ) {
                        D(SEARCH_CLEAR)
                        return
                    }
                } else {
                    search.keyword = this.state.value
                }
                DG( search )
                break
            case 'group':
                if( value != '' ) {
                    D(SEARCH_GROUP, 'GroupName=' + value)
                }
                break
            default:
                break
        }

        this.props.onSearch && this.props.onSearch()
    }

    mouseOver(){
        if (!this.state.isOverItem) {
            this.setState({
                isOverItem: true
            })
        }
    }

    mouseLeave(){
        if (this.state.isOverItem) {
            this.setState({
                isOverItem: false
            })
        }
    }

    search() {
    }

    focus(e) {
        if (!this.state.isFocused) {
            this.setState({
                isFocused: true,
                opacity:1
            })
        }
    }


    blur(e) {
        if (!this.state.isOverItem && this.state.isFocused) {
            this.setState({
                isFocused: false,
                opacity:0
            })
        }
    }

    change(value) {
        this.setState({
            value: value
        })
    }
}

 export default connect(
     (state)=> {
         return {
             search: state[SEARCH]
         }
     }
 )(Search)