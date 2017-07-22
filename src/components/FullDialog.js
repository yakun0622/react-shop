/**
 * Created by kenn on 2017/1/22.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {
    Provider
} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from '../style/theme'
import store from '../store/main'

const winWidth = document.documentElement.clientWidth
const winHeight = document.documentElement.clientHeight

let dialog = document.getElementById( 'full_dialog' )
let body = document.getElementById( 'full_dialog_body' )
let it

export default ( component, modal ) => {
    if ( component ) {
        dialog.style.width = winWidth + 'px'
        dialog.style.height = winHeight + 'px'
        document.getElementById( 'container' ).className = 'blur'


        dialog.onclick = ( e ) => {
            e.stopPropagation()
            if ( !modal ) {
                close()
            }
        }

        body.onclick = stop
        dialog.style.backgroundColor = 'rgba(255,255,255,0.85)'
        dialog.style.opacity = 1

        ReactDOM.render(
            <MuiThemeProvider muiTheme={theme} >
                <Provider store={store} key="provider" >
                    {component}
                </Provider>
            </MuiThemeProvider>
            , body )

        it = setInterval((  ) => {
            if( body.offsetHeight < winHeight ) {
                dialog.style.alignItems = 'center'
            } else {
                dialog.style.alignItems = 'flex-start'
            }
        }, 1000)
    } else {
        close()
    }
}

const stop = ( e ) => {
    e.stopPropagation()
}

const close = () => {
    dialog.style.backgroundColor = 'rgba(255,255,255,0)'
    dialog.style.opacity = 0
    document.getElementById( 'container' ).removeAttribute( "class" )
    let t = setTimeout( () => {
        dialog.style.width = 0
        dialog.style.height = 0
        body.innerHTML = ''
        clearTimeout( t )
        clearInterval(it)
    }, 350 )
}