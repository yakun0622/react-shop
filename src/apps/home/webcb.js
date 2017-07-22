/**
 * Created by kenn on 16/7/2.
 */
import React from 'react'
import {
    render
} from 'react-dom'

import {
    Provider
} from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from '../../style/theme'

import store from '../../store/main'

import Home from './home'
import { D, Q } from '../../common'
import { CATEGORY_LOAD, MEMBER_LOAD } from '../../actions/type'

if ( location.search && location.search.indexOf( '?html=' ) != -1 ) {
    localStorage.setItem( 'Authorization', location.search.substr( 6 ) )
    location.href = '/'
}

class CB extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'CB'
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={theme} >
                <Provider store={store} key="provider" >
                    <Home>
                        {this.props.children}
                    </Home>
                </Provider>
            </MuiThemeProvider>
        )
    }

    componentWillMount() {
        D( CATEGORY_LOAD )
    }
}

render( <CB />,
    document.getElementById( 'container' )
)



