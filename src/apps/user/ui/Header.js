/**
 * Created by kenn on 16/9/5.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { S, P, M, F, D, Q, T, getCache } from '../../../common'
import { IMAGEURL, WEBURL } from '../../config'
import { BaseComponent, Avatar, Button, UserEdit, LogoutIcon } from '../../../components/BaseComponent'
import View from  '../../../components/View'

import Search from  '../../../components/Search'
import {GROUP_SEARCH_CLEAR, USER_LOGOUT} from  '../../../actions/type'

const headerHeight = 60
class Header extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Header'
    }

    componentWillMount() {
        this.setState( {

        } )
    }

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    render() {
        const { data, style, width, userInfo } = this.props
        const { openDialog } = this.state

        return (
            <View width={width} height={headerHeight} color={T.palette.main} alignV={'center'} alignH={'between'}
                  style={{position: 'fixed', top: 0, left: 0}} zIndex={100}
            >
                <a href={WEBURL+getCache('Authorization')}>
                    <img src={IMAGEURL + 'logo_h_300.png'} style={{ marginLeft: 20, width: 96 }} />
                </a>

                <Search radius={24} width={500} height={24}
                        borderColor='white' type={[ 'group' ]}
                        onClear={(  ) => D(GROUP_SEARCH_CLEAR)}
                />
                <View alignV={'center'}>
                    <Button
                        height={32}
                        icon={IMAGEURL + userInfo.icon}
                        iconSize={32}
                        label={userInfo.trueName || userInfo.name}
                        fontColor={T.palette.white600a}
                        hoverFontColor={T.palette.white}
                        margin={20}
                        onTap={() =>this.openDialog()}
                    />
                    <Button
                        width={40}
                        height={40}
                        fontColor={T.palette.white800a}
                        hoverFontColor={T.palette.white}
                        iconSize={40}
                        icon={LogoutIcon}
                        onTap={(  ) => D(USER_LOGOUT)}
                    />
                </View>

                <UserEdit open={openDialog} close={() => this.closeDialog()} />
            </View>
        )
    }
}

export default connect(
    ( state )=> {
        return {
            userInfo: state.user
        }
    }
    //bindActionCreators()
)( Header )