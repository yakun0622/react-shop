/**
 * Created by kenn on 2017/1/15.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { V, L, D, T } from '../common'
import Label from './Label'
import View from './View'
import { ERROR_CLEAN } from '../actions/type'
/**
 * isFull
 * value
 * onChange
 * isRequired
 */
class TextEdit extends React.Component {
    display = 'TextEdit'
    constructor(props){
        super(props)
        this.state = {
            value: '',
            textareaHeight: 32,
            editToggle: null
        }

        if( props.editToggle !== null ) {
            this.state.editToggle = props.editToggle
        }
    }

    static defaultProps = {
        width: 300,
        height: 32,
        value: '',
        disable: false,
        fullWidth: false,
        type: 'text',
        isNumber: false,
        borderWidth: 1,
        borderColor: T.palette.lightGrey,
        fontSize: T.fontSize.normal,
        fontColor: T.palette.darkBlack,
        margin: 0
    }


    static propTypes = {
        name: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        isNumber: React.PropTypes.bool,
        value: React.PropTypes.any,
        rules: React.PropTypes.object,
        disable: React.PropTypes.bool,
        fullWidth: React.PropTypes.bool,
        label: React.PropTypes.any,
        hintText: React.PropTypes.string,
        lineShow: React.PropTypes.any,
        type: React.PropTypes.string,
        fontColor: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        grow: React.PropTypes.number,
        editToggle: React.PropTypes.any,

        exist: React.PropTypes.string,
        noexist: React.PropTypes.string,

        onChange: React.PropTypes.func,
        onBlur: React.PropTypes.func
    }

    componentWillMount() {
        (this.props.value || this.props.value === 0) &&
        this.setState( {
            value: this.props.value + ''
        } )
    }

    componentWillReceiveProps( props ) {
        if ( props.value || props.value === 0 || props.value === '' ) {
            this.setState( { value: props.value + '' } )
        }
    }

    value( value, rules ) {
        if ( rules ) {
            return V( value, rules )
        }
        return value
    }


    change( value ) {
        const { rules, name, exist, noexist, error } = this.props
        value = this.value( value, rules )

        if ( error && ((exist && error[ exist ]) || (noexist && error[ noexist ])) ) {
            D( ERROR_CLEAN, exist || noexist )
        }

        if ( Array.isArray( value ) ) {
            this.setState( { value } )
            this.props.onChange( false, name )
        } else {
            this.props.onChange( value, name )
        }
    }

    render() {
        const { value, editToggle } = this.state
        const {
            label, rules, fullWidth, name, disabled, type, fontSize, fontColor,
            hintText, width, height, borderWidth, borderColor, rows, margin, grow
        } = this.props
        let root = {
            style: {
                width: '100%',
                height,
                borderWidth: 0,
                color: fontColor,
                fontSize,
            },
            type,
            name,
            onBlur: () => this.blur( value ),
            onChange: ( e ) => this.change( e.target.value ),
            value: Array.isArray( value ) ? value[ 0 ] : value
        }

        if ( hintText ) {
            root.placeholder = hintText
        }

        if ( rows ) {
            root.style.height = this.state.textareaHeight + 15
            root.style.zIndex = 2
            root.style.minHeight = 32
        }

        if( editToggle !== null ) {
            root.autoFocus = true
        }

        L(this.display, Array.isArray( value ) ? value[ 0 ] : value == '' ? hintText || '' : value)
        return (
            <View
                width={fullWidth ? '100%' : width}
                grow={grow}
                margin={margin}
            >
                {label &&
                 <View fullWidth={true} >
                     <Label text={label} fontSize={T.fontSize.small} fontColor={T.palette.grey} />
                     {Array.isArray( value ) &&
                      <Label text={value[ 1 ]} fontSize={T.fontSize.small} fontColor={T.palette.error} />
                     }
                 </View>
                }
                <View
                    width={'100%'}
                    alignV={'center'}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                >
                    {rows ?
                        <View style={{ position: 'relative', minHeight: 32 }} width={'100%'} >
                            {(editToggle === null || editToggle === true) &&
                             <textarea
                                 {...root}
                             /> }
                            <div ref='textarea'
                                 onClick={ editToggle === null ? null : ( e ) => this.setState( { editToggle: true } )}
                                 style={{
                                     width: width,
                                     color: Array.isArray( value ) || value != '' ? fontColor : hintText ? T.palette.grey : fontColor,
                                     overflowY: 'auto',
                                     overflowX: 'hidden',
                                     wordBreak: 'break-all',
                                     position: editToggle === false ? 'static' : 'absolute',
                                     fontSize,
                                     top: 0,
                                     left: 0,
                                     minHeight: 32
                                 }} >
                                {Array.isArray( value ) ? value[ 0 ] : value == '' ? hintText || '' : value}
                            </div>
                        </View>

                        :
                        <input
                            {...root}
                        />
                    }
                </View>

            </View>
        )
    }

    componentDidUpdate() {
        if ( !Array.isArray( this.state.value ) ) {
            if ( (this.props.exist || this.props.noexist) && this.props.error ) {
                const type = this.props.exist || this.props.noexist
                if ( this.props.error[ type ] ) {
                    this.setState( { value: [ this.state.value, this.props.error[ type ] ] } )
                    this.props.onChange( this.props.name, false )
                }
            }

            if ( this.props.name == 'confirmPassword' && this.props.rules && this.props.rules.password &&
                 this.state.value != this.props.rules.password ) {
                this.setState( { value: [ this.state.value, '密码不一致' ] } )
                this.props.onChange( this.props.name, false )
            }
        }

        if ( this.props.rows ) {
            let textarea = ReactDOM.findDOMNode( this.refs.textarea )
            //L( this.display, textarea.scrollHeight )
            if ( textarea.scrollHeight != this.state.textareaHeight ) {
                this.setState( { textareaHeight: textarea.scrollHeight } )
            }

        }
    }

    blur = ( value ) => {
        const { exist, noexist, name, error, onBlur } = this.props
        const type = exist || noexist
        if ( type && !Array.isArray( this.state.value ) ) {
            const formdata = new FormData()
            formdata.append( name, value )
            D( type, formdata )
        }
        if( this.state.editToggle !== null ) {
            this.setState( { editToggle: false } )
        }
        onBlur && onBlur( value )
    }
}
export default connect(
    ( state ) => {
        return {
            error: state.error
        }
    }
)( TextEdit )