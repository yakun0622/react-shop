/**
 * Created by kenn on 16/6/30.
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as home from '../apps/home/reducers/main'
import * as shop from '../apps/shop/reducers/main'
import * as user from '../apps/user/reducers/main'
import * as common from '../reducers/main'
import * as appCommon from '../apps/common/reducers/main'

import initState from './initState'

import middle from './middleware'


export default createStore(
    combineReducers(
        Object.assign( {
                routing: routerReducer,
            },
            common,
            appCommon,
            home,
            shop,
            user
        )
    ),

    initState,

    compose(
        applyMiddleware( ...middle ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

