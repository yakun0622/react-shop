/**
 * Created by kenn on 16/9/8.
 */
import React from 'react'
import { connect } from 'react-redux'


import { D, Q, T, L } from '../common'
import TextField from './TextField'
import Button from './Button'

import { PHONE_CODE, ERROR_CLEAN, PHONE_GET_CODE } from '../actions/type'

const codeLength = 6
const codeOutTime = 3

class PhoneCode extends React.Component {
    display = 'PhoneCode'

    static defaultProps = {
        width:     'auto',
        name:      'PhoneCode',
        fullWidth: true,
        phone:     false,
    }

    static propTypes = {
        width:     React.PropTypes.any,
        value:     React.PropTypes.any,
        fullWidth: React.PropTypes.bool,
        phone:     React.PropTypes.any,

        onChange: React.PropTypes.func,
        onBlur:   React.PropTypes.func
    }

    state = {
        value:   '',
        disable: false,
        time:    codeOutTime
    }

    //componentWillMount() {
    //    this.setState( {} )
    //}
    //
    componentWillReceiveProps( props ) {
        if ( props.error && props.error[ PHONE_CODE ] ) {
            this.setState( { value: [ this.state.value, props.error[ PHONE_CODE ] ] } )
        }
    }

    render() {
        const { fullWidth, onChange, phone, value } = this.props
        const { disable, time } = this.state

        return (
            <div style={{
                display:    'flex',
                width:      fullWidth ? '100%' : width,
                height:     phone ? 'auto' : 0,
                transition: 'height .3s',
                overflow:   'hidden'
            }} >
                <TextField
                    fullWidth={true}
                    name={'PhoneCode'}
                    label={'短信验证码'}
                    value={ value }
                    onChange={( name, value )=>onChange(name, value)}
                />
                <Button
                    width={128}
                    label={disable ? time : '获取验证码'}
                    alignSelf={'end'}
                    disable={disable}
                    onTap={this.tap}
                />
            </div>
        )
    }

    tap = () => {
        D(PHONE_GET_CODE, null, this.props.phone)

        this.setState( { disable: true } )

        this.time = setInterval( () => {
            if( this.state.time > 0 ) {
                this.setState( { time: this.state.time - 1 } )
            } else {
                clearInterval(this.time)
                this.setState( { time: codeOutTime, disable: false } )
            }
        }, 1000 )
    }

    //componentDidUpdate() {
    //    if( this.time && !this.state.disable ) {
    //    }
    //}

    //blur( value ) {
    //    if ( !Array.isArray( value ) ) {
    //        const formdata = new FormData()
    //        formdata.append( 'PhoneCode', Number( value ) )
    //        D( PHONE_CODE, value )
    //    }
    //}
}

export default connect(
    ( state )=> {
        return {
            error: state.error
        }
    }
    //bindActionCreators()
)( PhoneCode )