/**
 * Created by kenn on 16/7/7.
 */
import React from 'react'
import { connect } from 'react-redux'

import { BaseComponent, Button, StoreIcon, LogoutIcon } from '../../../components/BaseComponent'
import View from '../../../components/View'
import { T, S, D, getCache, UR, L } from '../../../common'

import { USER_LOGOUT } from '../../../actions/type'
import { SHOP_CENTER_URL } from '../../config'

const button = {
    height: 128,
    width: 128,
    iconSize: 80,
    iconPosition: 'top',
    fontColor: T.palette.grey,
    hoverFontColor: T.palette.darkBlack,
    margin: 24,
    color: T.palette.white
}

class SingleUser extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'SingleUser'
    }

    componentDidMount() {

    }

    render() {
        let user = UR()
        return (
            <View width={this.props.width} align={'center'} >
                {user.storeid && <a href={SHOP_CENTER_URL + getCache( 'Authorization' )} target="_blank" >
                    <Button
                        {...button}
                        label="商户中心"
                        icon={StoreIcon}
                    />
                </a>}

                <Button
                    {...button}
                    label="退出登陆"
                    onTap={() => D( USER_LOGOUT )}
                    icon={LogoutIcon}
                />
            </View>
        )
    }
}

export default connect(
    ( state ) => {
        return {
            data: state.user
        }
    }
    //bindActionCreators()
)( SingleUser )