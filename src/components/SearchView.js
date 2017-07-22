/**
 * Created by kenn on 16/7/6.
 */
import React from 'react'
import { DG, C, D, L } from '../common'
import SvgSearch from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close'

/**
 * 搜索组件
 *
 * props:
 *  widht
 *  height
 *  type [sting|array] 根据type指定搜索内容, 设置下拉框提示
 *  hint [boolean]     是否展开提示
 */
export default class SearchView extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'SearchView'

        this.state = {
            itemHeight: 'auto',
            value: '',
            opacity: 0,
            isOverItem: false,
            isFocused: false
        }
    }

    static defaultProps = {
        radius: 20,
        margin: 0,
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        margin: React.PropTypes.any,
        radius:React.PropTypes.any,
        grow: React.PropTypes.number,
        type: React.PropTypes.array,
        onSearch: React.PropTypes.func,
        returnWithChange: React.PropTypes.bool
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
            borderRadius: this.props.radius,
            position: 'relative',
            margin: this.props.margin,
            flexFlow: 'row nowrap',

            borderColor,
            borderWidth: borderWidth,
            borderStyle: 'solid',
            overflow: 'hidden',
            flexGrow: 1
        }

        if ( this.props.zIndex ) {
            rootStyle.zIndex = this.props.zIndex
        }

        if ( this.props.grow ) {
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

        if ( this.props.color ) {
            rootStyle[ 'backgroundColor' ] = this.props.color
        }

        let imgStyle = {
            width: height - borderWidth - margin * 2,
            height: height - margin * 2 - borderWidth * 2,
            margin,
            cursor: 'pointer'
        }

        return (
            <div style={rootStyle} >
                <input style={inputStyle}
                       value={this.state.value}
                       name='search'
                       onChange={( e )=>this.change( e.target.value )}
                       onKeyDown={( e ) => this.keyDown( e )}
                />
                {
                    this.state.value != '' ?
                        <CloseIcon style={imgStyle} color="grey"
                                   hoverColor="black"
                                   onClick={(e) => this.touchTap( e,'clear' )} /> : null
                }
                <SvgSearch style={imgStyle} color="grey"
                           hoverColor="black"
                           onClick={(e) => this.touchTap( e )} />
            </div>
        )
    }

    keyDown( e ) {
        if ( e && e.keyCode == 13 ) {
            this.touchTap(e)
        }
    }

    touchTap(e, name ) {
        e.stopPropagation()
        e.preventDefault()

        if( name == 'clear' ) {
            this.setState( {
                value: ''
            } )
            this.props.onSearch && this.props.onSearch(null)
        } else {
            this.props.onSearch && this.props.onSearch(this.state.value)
        }
    }


    change( value ) {
        this.setState( {
            value: value
        } )

        this.props.returnWithChange && this.props.onSearch && this.props.onSearch(value)
    }
}