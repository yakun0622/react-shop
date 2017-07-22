/**
 * Created by kenn on 16/8/15.
 */
import React from 'react'
import { connect } from 'react-redux'

import { D, Q, T, UR, L } from '../common'
import { BaseComponent, TextField, View, Button, Image, PhoneCode } from './BaseComponent'
import Form from './Form'
import { IMAGEURL } from '../apps/config'
import * as TYPE from '../actions/type'

class Login extends BaseComponent {
    display = 'Login'


    componentWillMount() {
        this.setState( {
            loginDatas:   {
                Account:   false,
                Password: false,
            },
            registerDatas: {
                MemberMobile: false,
                MemberPasswd: false,
                confirmPassword: false,
                PhoneCode: false,
            },
            isLogin: true
        } )
    }

    static propTypes = {
        type: React.PropTypes.number,
        close: React.PropTypes.func,
        style: React.PropTypes.object,
        margin: React.PropTypes.any
    }

    actionType = ( type, isLogin ) => {
        let actionType = TYPE.USER_REGISTER
        if( isLogin ) {
            switch ( type ) {
                case 1:
                    actionType = TYPE.ADMIN_LOGIN
                    break
                case 2:
                    actionType = TYPE.USERADMIN_LOGIN
                    break
                default:
                    actionType = TYPE.USER_LOGIN
                    break
            }
        }

        return actionType
    }

    setData(name, value){
        let datas
        if( this.state.isLogin ) {
            datas = this.state.loginDatas
            datas[name] = value
            this.setState( { loginDatas: datas } )
        }else {
            datas = this.state.registerDatas
            datas[name] = value
            this.setState( { registerDatas: datas } )
        }
    }

    getData(name){
        if( this.state.isLogin ) {
            return this.state.loginDatas[name]
        } else {
            return this.state.registerDatas[name]
        }
    }

    getDatas(){
        if( this.state.isLogin ) {
            return this.state.loginDatas
        } else {
            let datas = this.state.registerDatas
            delete datas.MemberPasswdRe
            return datas
        }
    }

    loginInputs(){
        return [
            <TextField
                key={'account-text'}
                name={'Account'}
                label={'用户名/手机'}
                value={this.getData('Account')}
                onChange={( name, value ) => this.setData(name, value)}
                rules={{required: true, minLength:2, maxLength: 24}}
                exist={TYPE.ACCOUNT_EXIST}
            />,
            <TextField
                key={'password-text'}
                name={'Password'}
                label={'密码'}
                value={this.getData('Password')}
                onChange={( name, value ) => this.setData(name, value)}
                type={'password'}
                rules={{required: true, minLength:6, maxLength: 64}}
            />
        ]
    }

    registerInputs(){
        return [
            <TextField
                key={'MemberMobile-text'}
                name={'MemberMobile'}
                label={'手机'}
                value={this.getData('MemberMobile')}
                onChange={( name, value ) => this.setData(name, value)}
                rules={{required: true, minLength:2, maxLength: 24}}
                noexist={TYPE.USER_PHONE_NOEXIST}
            />,
            <TextField
                key={'MemberPasswd-text'}
                name={'MemberPasswd'}
                label={'密码'}
                value={this.getData('MemberPasswd')}
                onChange={( name, value ) => this.setData(name, value)}
                type={'password'}
                rules={{required: true, minLength:6, maxLength: 64, password: this.getData('confirmPassword')}}
            />,
            <TextField
                key={'confirmPassword-text'}
                name={'confirmPassword'}
                label={'确认密码'}
                value={this.getData('confirmPassword')}
                onChange={( name, value ) => this.setData(name, value)}
                type={'password'}
                rules={{required: true, minLength:6, maxLength: 64, password: this.getData('MemberPasswd')}}
            />,
            <PhoneCode
                key="phoneorder"
                phone={this.getData("MemberMobile")}
                value={this.getData("PhoneCode")}
                onChange={( name, value ) => this.setData('PhoneCode', value)}
            />
        ]
    }

    render() {
        const { type, close, margin, style } = this.props
        const { loginDatas, registerDatas, isLogin } = this.state

        return (
            <View orientation={'column'} alignH={'center'}>
                <Image width={200}  margin={24} src={IMAGEURL + 'logo_login.png'} />
                <Form
                    open={this.props.open}
                    label={isLogin? "登 陆" : '注册新用户'}
                      datas={isLogin ? loginDatas : registerDatas}
                      width={400}
                      submitLabel={isLogin ? "登 陆" : '注 册'}
                      close={close ? () => close() : null}
                      actionType={this.actionType(type, isLogin)}
                      cancelLabel='取 消'
                      isSubmitJson={false}
                      isWait={close ? true : false}
                >
                    {isLogin ? this.loginInputs() : this.registerInputs() }

                </Form>
                <Button
                    fontColor={T.palette.grey}
                    hoverFontColor={T.palette.main}
                    style={{ margin: 8, fontSize: T.fontSize.small }}
                    onTap={() => this.setState( { isLogin: !isLogin } )}
                >{isLogin? '注册新用户' : '登 录'}</Button>
            </View>
        );
    }

    componentDidUpdate() {
        const user = UR()
        if ( user && !this.props.user ) {
            switch ( this.props.type ) {
                //admin
                case 1:

                    break
                //useradmin
                case 2:

                    break
                //shop
                case 3:
                    if (user.storeid > 0){
                        D(TYPE.STORE_LOAD, null, user.storeid)
                    }else{
                        L('SnackBar OPEN....', 'asasasasass')
                        D(TYPE.SNACKBAR_OPEN, {text: 'aaaaaaa'})
                    }
                    D( TYPE.AREA_LOAD, Q().query( 'AreaParentId', 0 ).limit( 40 ).ok() )
                    break
                //usercenter
                case 4:
                    D( TYPE.USER_LOAD, null, user.id )
                    D( TYPE.AREA_LOAD, Q().query( 'AreaParentId', 0 ).limit( 40 ).ok() )
                    D(TYPE.GROUP_OWNER_LOAD, Q().query('GroupOwnerId', user.id).query('GroupParent', 0).limit(100).sort('GroupCtime').ok())
                    break
                //home
                default:
                    break
            }
            this.props.close && this.props.close()
        }
    }

    componentWillUnmount() {
        const user = UR()
        if ( user ) {
            switch ( this.props.type ) {
                //admin
                case 1:

                    break
                //useradmin
                case 2:

                    break
                //shop
                case 3:

                    break
                //usercenter
                case 4:
                    break
                //home
                default:
                    D( TYPE.USER_LOAD, null, user.id )
                    D( TYPE.CART_LOAD, Q().query( 'BuyerId', 1 ).ok() )
                    D( TYPE.ADDRESS_LOAD, Q().query( 'MemberId', 1 ).ok() )
                    D( TYPE.AREA_LOAD, Q().query( 'AreaParentId', 0 ).limit( 40 ).ok() )
                    D( TYPE.LIKE_FOLDER_LOAD )
                    break
            }
        }
    }
}

const rootProps = {
    style: {}
}

export default connect(
    ( state )=> {
        return {
            user: state.user
        }
    }
    //bindActionCreators()
)( Login )