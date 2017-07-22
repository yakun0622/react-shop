/**
 * Created by kenn on 16/9/4.
 */
import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
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

import User from './User'

import { USE_CENTER_URL } from '../config'

import { D, Q, C, UR, L, setCache } from '../../common'
import * as TYPE from '../../actions/type'

import Member from './ui/Member'
import Approve from './ui/Approve'
import Group from './ui/Group'
import Order from './ui/Order'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if( location.search && location.search.indexOf('?html=') != -1 ) {
    // localStorage.setItem('Authorization', location.search.substr(6))
    setCache('Authorization', location.search.substr(6))
    location.href = '/'
}

class UserCenter extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'UserCenter'
    }

    componentWillMount(){
        let user = UR()
        if( user ) {
            D(TYPE.USER_LOAD, null, user.id)
            D( TYPE.PERMISSION )
            D(TYPE.GROUP_OWNER_LOAD, Q().query('GroupOwnerId', user.id).query('GroupParent', 0).limit(100).sort('GroupCtime').ok())
            D(TYPE.GROUP_JOIN_LOAD, Q().add('MemberId', user.id).ok())
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <Provider store={store} key="provider">
                    <User>
                        {this.props.children}
                    </User>
                </Provider>
            </MuiThemeProvider>
        )
    }

    componentDidMount() {

    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={UserCenter}>
            <Route path='member' component={Member} />
            <Route path='group' component={Group} />
            <Route path='approve' component={Approve} />
            <Route path='order' component={Order} />
        </Route>
    </Router>
    , document.getElementById('container')
)

