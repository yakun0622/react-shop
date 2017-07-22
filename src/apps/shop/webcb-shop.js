/**
 * Created by kenn on 16/7/2.
 */
import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    IndexRoute,
    Link,
    browserHistory
} from 'react-router'
import {
    syncHistoryWithStore
} from 'react-router-redux'
import {
    Provider
} from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from '../../style/theme'

import store from '../../store/main'

import Shop from './Shop'
import {M, F, D, Q, T, L, UR, setCache} from '../../common'

import GoodsEdit from './ui/GoodsEdit'
import StoreIndex from './ui/StoreIndex'
import GoodsList from './ui/GoodsList'
import DeliverSet from './ui/DeliverSet'
import OrderList from './ui/OrderList'
import FreeExpress from  './ui/FreeExpress'
import Express from './ui/Express'
import StoreTransport from './ui/StoreTransport'
import AreaSet from './ui/AreaSet'
import OrderReturn from './ui/RefundReturn'
import OrderBill from './ui/OrderBill'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as TYPE from '../../actions/type'
injectTapEventPlugin();
if (location.search && location.search.indexOf('?html=') != -1) {
    // localStorage.setItem('Authorization', location.search.substr(6))
    setCache('Authorization', location.search.substr(6))
    location.href = '/'
}

class SHCB extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'SHCB'
    }

    componentWillMount() {
        let user = UR()
        if (user && user.storeid) {
            if (user.storeid > 0) {
                D(TYPE.STORE_LOAD, null, user.storeid)
            } else {
                // L('SnackBar OPEN....', 'asasasasass')
                // D(TYPE.SNACKBAR_OPEN, {text: 'aaaaaaa'})
            }
        }
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={theme}>
                <Provider store={store} key="provider">
                    <Shop>
                        {this.props.children}
                    </Shop>
                </Provider>
            </MuiThemeProvider>
        )
    }

}

render(
    <Router history={syncHistoryWithStore(browserHistory, store)} key="router">
        <Route path="/" component={SHCB}>
            <IndexRoute component={StoreIndex}/>
            <Route path="goods-edit" component={GoodsEdit}/>
            <Route path="store-index" component={StoreIndex}/>
            <Route path="goods-list/:type" component={GoodsList}/>
            <Route path="deliver-set" component={DeliverSet}/>
            <Route path="order-list" component={OrderList}/>
            <Route path="express" component={Express}/>
            <Route path="free-express" component={FreeExpress}/>
            <Route path="store-transport" component={StoreTransport}/>
            <Route path="area-set" component={AreaSet}/>
            <Route path="order-return" component={OrderReturn}/>
            <Route path="order-bill" component={OrderBill}/>

        </Route>
    </Router>,
    document.getElementById('container')
)

