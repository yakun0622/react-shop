/**
 * Created by kenn on 16/7/15.
 */
import React from 'react'

import RemoveIcon from 'material-ui/svg-icons/content/remove'
import AddIcon from 'material-ui/svg-icons/content/add'
import View from './View'

import {T, M} from '../common'

export default class Numbers extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'Numbers'
        this.state = {
            value:     1,
            overLeft:  false,
            overRight: false
        }
    }

    static defaultProps = {
        width: 80,
        height: T.height.min,
        margin: 0
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        value: React.PropTypes.number,
        max: React.PropTypes.number,
        alignSelf: React.PropTypes.any,
        onChange: React.PropTypes.func
    }

    componentWillMount() {
        this.props.value &&
        this.setState(
            {
                value: this.props.value
            }
        )
    }

    componentWillReceiveProps( props ) {
        props.value &&
        this.setState(
            {
                value: props.value
            }
        )
    }

    render() {
        const { style, width, height, margin, alignSelf } = this.props

        let buttonStyle = {
            width:  height,
            height: height,
            cursor: 'pointer'
        }

        let inputStyle = {
            width:         width - height * 2,
            height:        height,
            padding:       0,
            borderWidth:   0,
            textAlign:     'center',
            verticalAlign: 'top',
            color: T.palette.maxGrey,
            lineHeight: height + 'px'
        }

        return (
            <View
                width={width}
                height={height}
                borderWidth={1}
                borderColor={T.palette.lightGrey}
                overflow={'hidden'}
                radius={height/2}
                margin={margin}
                alignSelf={alignSelf}
                style={style}
                onTap={this.stop}>
                <RemoveIcon style={buttonStyle}
                            onTouchTap={(e) => this.change(e, 'subtract')}
                            hoverColor={T.palette.darkBlack}
                            color={T.palette.lightGrey}
                />
                <input style={inputStyle} value={this.state.value} onChange={(e) => this.change(e, name)}/>
                <AddIcon style={buttonStyle}
                         onTouchTap={(e) => this.change(e, 'add')}
                         hoverColor={T.palette.darkBlack}
                         color={T.palette.lightGrey}
                />
            </View>
        )
    }

    stop(e){
        e.stopPropagation()
        e.preventDefault()
    }

    change( e, name ) {
        e.stopPropagation()
        e.preventDefault()

        const { max } = this.props

        let value = this.state.value
        switch( name ) {
            case 'add':
                if( !max || value < max ) {
                    ++value
                }
                break
            case 'subtract':
                if( value > 1 ) {
                    --value
                }
                break
            default:
                if( !isNaN( e.target.value ) && (!max || e.target.value <= max) ) {
                    value = e.target.value
                }
                break
        }

        if( value != this.state.value ) {
            this.setState(
                {
                    value: value
                }
            )
            this.props.onChange( value )
        }
    }
}
