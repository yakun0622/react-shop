/**
 * Created by kenn on 16/8/7.
 */
import React from 'react'
import { connect } from 'react-redux'

import { V, L, D, T } from '../common'
import TextFields from 'material-ui/TextField';
import { ERROR_CLEAN } from '../actions/type'
/**
 * isFull
 * value
 * onChange
 * isRequired
 *
 */
class TextField extends React.Component {
    display = 'TextField'


    static defaultProps = {
        value:     '',
        disable:   false,
        fullWidth: true,
        type:      'text',
        isNumber: false,
        lineShow: true,
        fontSize: T.fontSize.normal,
        fontColor: T.palette.darkBlack
    }

    state = {
        value: ''
    }

    static propTypes = {
        name:      React.PropTypes.string.isRequired,
        isNumber: React.PropTypes.bool,
        value:     React.PropTypes.any,
        rules:     React.PropTypes.object,
        disable:   React.PropTypes.bool,
        fullWidth: React.PropTypes.bool,
        label:     React.PropTypes.any,
        lineShow:     React.PropTypes.any,
        type:      React.PropTypes.string,
        fontColor: React.PropTypes.string,
        fontSize: React.PropTypes.number,

        exist:   React.PropTypes.string,
        noexist: React.PropTypes.string,

        onChange: React.PropTypes.func,
        onBlur:   React.PropTypes.func
    }

    componentWillMount() {
        (this.props.value || this.props.value === 0) &&
        this.setState( {
            value: this.props.value + ''
        } )
    }

    componentWillReceiveProps( props ) {
        if ( props.value || props.value === 0 || props.value === '') {
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
            this.props.onChange( name, false )
        } else {
            this.props.onChange( name, value )
        }
    }

    render() {
        const { value } = this.state
        const { label, rules, fullWidth, name, disabled, type, lineShow, fontSize, fontColor, hintText } = this.props
        //console.log( value );
        let root = {
            inputStyle: {fontSize: fontSize, color: fontColor}
        }

        if ( this.props.rows ) {
            root.rows = this.props.rows
            root.multiLine = this.props.multiLine
            root.textareaStyle = { overflow: 'hidden' }
        }

        if ( this.props.rowsMax ) {
            root.rowsMax = this.props.rowsMax
            root.multiLine = true
        }

        if ( this.props.style ) {
            root.style = this.props.style
        }

        if ( this.props.type ) {
            root.type = this.props.type
        }

        if ( this.props.underlineShow ) {
            root.underlineShow = this.props.underlineShow
        }

        if( hintText ) {
            root.hintText = hintText
        }


        return (
            <TextFields
                {...root}
                name={name}
                fullWidth={fullWidth}
                disabled={disabled}
                floatingLabelText={(label || '') + (rules && rules.required && value == '' ? ' *' : '')}
                errorText={Array.isArray( value ) ? value[ 1 ] : ''}
                value={ Array.isArray( value ) ? value[ 0 ] : value }
                type={type}
                onChange={( e )=>this.change( e.target.value )}
                onBlur={() => this.blur( value )}
                underlineShow={lineShow}
                floatingLabelStyle={{color: T.palette.grey}}
                floatingLabelFocusStyle={{color: T.palette.main}}
                hintStyle={{ bottom: 0 }}
            />
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
    }

    blur = ( value ) => {
        const { exist, noexist, name, error } = this.props
        const type = exist || noexist
        if ( type && !Array.isArray( this.state.value ) ) {
            const formdata = new FormData()
            formdata.append( name, value )
            D( type, formdata )
        }
    }
}
export default connect(
    ( state ) => {
        return {
            error: state.error
        }
    }
)( TextField )
