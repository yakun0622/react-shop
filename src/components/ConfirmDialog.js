/**
 * Created by kenn on 16/8/20.
 */
import React from 'react'
import { connect } from 'react-redux'


import {  D, T } from '../common'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import { CONFIRM_DIALOG } from '../store/api'
import { CONFIRM_DIALOG_CANCEL } from '../actions/type';

class ConfirmDialog extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'ConfirmDialog'
    }

    static defaultProps = {
        modal: false,
        width: 400,
        height: 300
    }

    confirm = () => {
        const action = this.props.action
        if( action ) {
            D(...action)
            D(CONFIRM_DIALOG_CANCEL)
        }
    }

    render() {
        const { modal, open, width, height, action, text } = this.props

        return (
            <Dialog
                modal={modal}
                open={open}
                style={{zIndex: 2000}}
                contentStyle={{maxWidth: 'none', minWidth:'none', width}}
                bodyStyle={{borderRadius: 30, height}}
                overlayStyle={{opacity: 0.7, backgroundColor: 'black'}}

                onRequestClose={() => D(CONFIRM_DIALOG_CANCEL)}
            >
                {text}
                <FlatButton
                    label='确 定'
                    style={{width, height: 40, color: T.palette.white, position: 'absolute', bottom: -50, left: 0}}
                    backgroundColor={T.palette.grey}
                    hoverColor={T.palette.main}
                    onTouchTap={this.confirm}
                />
            </Dialog>
        )
    }
}

export default connect(
    ( state )=> {
        return {
            open: state[CONFIRM_DIALOG].open,
            action: state[CONFIRM_DIALOG].action,
            text: state[CONFIRM_DIALOG].text
        }
    }
)( ConfirmDialog )