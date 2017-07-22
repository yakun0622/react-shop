/**
 * Created by kenn on 16/9/13.
 */
import React from 'react'
import { connect } from 'react-redux'

import { M, F, D, Q, T, L } from '../common'
import Button from './Button'
import Form from './Form'
import TextField from './TextField'
import CheckView from './CheckView'

import {USER_EDIT, USER_PASSWORD_EXIST, USER_NAME_NOEXIST, USER_EMAIL_NOEXIST} from '../actions/type'

class UserEdit extends React.Component {
    display = 'UserEdit'

    constructor( props ) {
        super( props )
        this.state = {
            isEditPassword: false,
            datas:          {
                MemberTruename: null,
                MemberMobile:   false,
                MemberEmail:    null,
                MemberName:     false,
                MemberSex: 0
            }
        }
        if ( props.user ) {
            this.state.datas.Id = props.user.id
            this.state.datas.MemberTruename = props.user.trueName
            this.state.datas.MemberName = props.user.name
            this.state.datas.MemberMobile = props.user.phone
            this.state.datas.MemberEmail = props.user.email
            this.state.datas.MemberSex = props.user.sex
        }
    }

    static defaultProps = {
        open: false
    }

    static propTypes = {
        close: React.PropTypes.func,
        open:  React.PropTypes.bool
    }

    setFormDatas(name, value){
        const datas = this.state.datas
        datas[name] = value
        this.setState( { datas } )
    }

    close = ()=>{
        const datas = this.state.datas
        delete datas.oldPassword
        delete datas.MemberPasswd
        delete datas.confirmPassword
        this.setState( { isEditPassword: false, datas } )
        this.props.close()
    }

    render() {
        const {
            close,
            open
        } = this.props
        const { datas, isEditPassword } = this.state

        return (
            <Form
                width={500}
                open={open}
                close={this.close}
                modal={true}
                datas={datas}
                label={'用户信息编辑'}
                isSubmitJson={true}
                actionType={USER_EDIT}
            >
                <TextField
                    name={'MemberName'}
                    value={datas.MemberName}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ required: true, minLength: 2, maxLength: 32 }}
                    noexist={USER_NAME_NOEXIST}
                    label={'用户名'}
                />
                <TextField
                    name={'MemberTruename'}
                    value={datas.MemberTruename}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 2, maxLength: 32 }}
                    label={'真实姓名'}
                />
                <CheckView
                    name="MemberSex"
                    checked={datas.MemberSex}
                    label={'性别'}
                    isNumber={true}
                    datas={{ 0: '男', 1: '女' }}
                    onCheck={( name, value ) => this.setFormDatas(name, value)}
                />
                <TextField
                    name={'MemberEmail'}
                    value={datas.MemberEmail}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 6, maxLength: 128 }}
                    noexist={USER_EMAIL_NOEXIST}
                    label={'Email'}
                />
                <Button label={isEditPassword ? '不修改密码' : '修改密码'} margin={16} onTap={this.openPassword} />
                {this.password(datas)}
            </Form>
        )
    }

    password = (datas) => {
        if( this.state.isEditPassword ) {
            return ([
                <TextField
                    key="oldPassword"
                    name={'oldPassword'}
                    type={'password'}
                    value={datas.oldPassword}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 6, maxLength: 64 }}
                    exist={USER_PASSWORD_EXIST}
                    label={'旧密码'}
                />,
                <TextField
                    key="MemberPasswd"
                    name={'MemberPasswd'}
                    type={'password'}
                    value={datas.MemberPasswd}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 6, maxLength: 64, password: datas.confirmPassword }}
                    label={'新密码'}
                />,
                <TextField
                    key="confirmPassword"
                    name={'confirmPassword'}
                    type={'password'}
                    value={datas.confirmPassword}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 6, maxLength: 64, password:  datas.MemberPasswd}}
                    label={'确认新密码'}
                />,
            ])
        }

    }

    openPassword = () => {
        const { isEditPassword } = this.state
        let datas = this.state.datas
        if ( isEditPassword ) {
            delete datas.oldPassword
            delete datas.MemberPasswd
            delete datas.confirmPassword
        } else {
            datas.oldPassword = false
            datas.MemberPasswd = false
            datas.confirmPassword = false
        }

        this.setState( { datas, isEditPassword: !isEditPassword } )
    }
}
export default connect(
    ( state )=> {
        return {
            user: state.user
        }
    }
    //bindActionCreators()
)( UserEdit )