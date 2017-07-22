/**
 * Created by kenn on 16/6/30.
 */
import React from 'react'
import {
    connect
} from 'react-redux'

import { BaseComponent, LinearProgress, View } from '../../components/BaseComponent'
import WindowResize from '../../components/WindowResize'
import ConfirmDialog from '../../components/ConfirmDialog'
import { D, Q, C, UR, T } from '../../common'
import {
    USER_LOAD,
    CART_LOAD,
    ADDRESS_LOAD,
    AREA_LOAD,
    LIKE_LOAD,
    LIKE_FOLDER_LOAD,
    USER_GROUP_LOAD,
    USER_JION_GROUP_LOAD
} from '../../actions/type'
import { SEARCH } from '../../store/api'
import Header from './ui/Header'
import GoodsList from './ui/GoodsList'
import HomePage from './ui/HomePage'
import DetailsPage from '../../apps/common/ui/DetailsPage'

import { USER } from '../../store/api'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let goodsId = location.pathname.substring(1).split('_')
let detailProps = {}
if( goodsId.length == 2 && !isNaN(goodsId[1])) {
    if( goodsId[0] == 'g' ) {
        detailProps['goodsId'] = Number(goodsId[1])
    } else if(goodsId[0] == 'c') {
        detailProps['commonId'] = Number(goodsId[1])
    }

} else {
    detailProps = null
}

class Home extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Home'
        this.state = {}
    }

    componentWillMount() {
        //this.setState(store.getState())
    }


    componentDidMount() {
        let user = UR()
        if ( user ) {
            D( USER_LOAD, null, user.id )
            D( USER_GROUP_LOAD, Q().query('GroupOwnerId', user.id).query('GroupParent', 0).ok() )
            D( USER_JION_GROUP_LOAD, Q().add("MemberId", user.id).add("status", 3).ok() )
            D( CART_LOAD, Q().query( 'BuyerId', 1 ).ok() )
            D( ADDRESS_LOAD, Q().query( 'MemberId', 1 ).ok() )
            D( AREA_LOAD, Q().query( 'AreaParentId', 0 ).limit( 40 ).ok() )
            D( LIKE_FOLDER_LOAD )
        }
    }

    render() {
        const {
            add,
            user,
            winWidth,
            winHeight,
            search,
            waiting
        } = this.props
        //this.log(user)

        return (
            <View width={winWidth} alignH={'center'}>
                <Header winWidth={winWidth} winHeight={winHeight}/>
                {
                    search
                        ? <GoodsList userInfo={user}/>
                        : detailProps
                            ? <DetailsPage {...detailProps} />
                            :<HomePage width={winWidth} height={winHeight - 80}/>
                }
                {this.props.children}
                {
                    waiting.length != 0 &&
                    <LinearProgress
                        color={T.palette.orange}
                        style={{ position: 'fixed', top: 60, left: 0, width: winWidth, height: 2 }}
                        mode="indeterminate"/>
                }
                <ConfirmDialog />
            </View>
        )
    }
}


export default connect( ( state ) => {
    return {
        search: state[ SEARCH ],
        user: state[ USER ],
        waiting: state[ 'waiting' ]
    }
} )( WindowResize( Home ) )