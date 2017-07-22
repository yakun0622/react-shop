/**
 * Created by kenn on 16/9/5.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {S, P, M, F, D, Q, T, L, $, UR} from '../../../common'
import {IMAGEURL, WEBURL} from '../../config'
import {BaseComponent, Avatar, Button, UserEdit, LogoutIcon} from '../../../components/BaseComponent'
import View from  '../../../components/View'
import Login from '../../../components/Login'
import Search from  '../../../components/Search'
import * as TYPE from '../../../actions/type'
const headerHeight = 80
class Header extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'Header'
        this.state = {
            openLogin: false,
            openEdit: false
        }
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    componentDidMount() {
        var user = UR()
        if(user){
            D(TYPE.STORE_LOAD, {}, user.storeid)
        }
    }

    render() {
        const {data, style, width, storeInfo} = this.props
        const {openEdit, openLogin} = this.state

        return (
            <View width={width} height={headerHeight} color={T.palette.main} alignV={'center'} alignH={'between'}
                  style={{position: 'fixed', top: 0, left: 0, zIndex: 100}}
            >
                <a href={WEBURL}>
                    <img src={IMAGEURL + 'logo_h_300.png'} style={{marginLeft: 20, width: 128}}/>
                </a>
                <View alignV={'center'}>
                    {
                        storeInfo ? <Button
                            height={40}
                            icon={storeInfo ? IMAGEURL + storeInfo.icon : ''}
                            iconSize={40}
                            label={storeInfo ? storeInfo.storeName : ''}
                            fontColor={T.palette.white600a}
                            hoverFontColor={T.palette.white}
                            margin={20}
                            onTap={() =>this.openDialog('openEdit')}
                        /> : (
                            <Button
                                height={40}
                                iconSize={40}
                                label={'登录'}
                                fontColor={T.palette.white600a}
                                hoverFontColor={T.palette.white}
                                margin={20}
                                onTap={() =>this.openDialog('openLogin')}
                            />
                        )
                    }
                    {
                        storeInfo && <Button
                            width={40}
                            height={40}
                            fontColor={T.palette.white800a}
                            hoverFontColor={T.palette.white}
                            iconSize={40}
                            icon={LogoutIcon}
                            onTap={() => D(TYPE.STORE_LOGOUT)}
                        />
                    }
                </View>

                <UserEdit open={openEdit} close={() => this.closeDialog('openEdit')}/>
                {
                    openLogin &&
                    <Login open={true} close={() => this.closeDialog('openLogin')}/>
                }
            </View>
        )
    }
}

export default connect(
    (state)=> {
        return {
            storeInfo: state.store
        }
    }
    //bindActionCreators()
)(Header)