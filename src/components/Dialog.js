/**
 * Created by kenn on 16/9/13.
 */
import React from 'react'


import { T, L } from '../common'
import Dialogs from 'material-ui/Dialog'
import View from './View'
import Button from './Button'
import CloseIcon from 'material-ui/svg-icons/navigation/close';

export default class Dialog extends React.Component {
    display = 'Dialog'

    static defaultProps = {
        width: 'auto',
        //open:  false,
        modal: false,
        color: T.palette.white,
        bodyPadding: 0,
        needBlur: true
    }

    static propTypes = {
        width:         React.PropTypes.any,
        height:        React.PropTypes.any,
        open:          React.PropTypes.any,
        modal:         React.PropTypes.bool,
        leftButton:    React.PropTypes.any,
        onLeftButton:  React.PropTypes.func,
        rightButton:   React.PropTypes.any,
        onRightButton: React.PropTypes.func,
        color:         React.PropTypes.string,
        close:         React.PropTypes.func,
        bodyPadding: React.PropTypes.any,
        text: React.PropTypes.any,
        needBlur: React.PropTypes.bool
    }

    render() {
        const {
            width,
            title,
            leftButton,
            onLeftButton,
            rightButton,
            onRightButton,
            open,
            color,
            modal,
            bodyPadding,
            close,
            text
        } = this.props

        //const { isOver } = this.state


        return (
            <Dialogs
                open={open || false}
                onRequestClose={close}
                contentStyle={{ width, maxWidth: 'none' }}
                bodyStyle={{ padding: bodyPadding, backgroundColor: color }}
                modal={modal}
                overlayStyle={{ backgroundColor: T.palette.black700a }}
                autoDetectWindowHeight={true}
            >
                <View
                    height={48}
                    alignV={'center'}
                    style={{ position: 'absolute', top: -48, left: 0, right: 0 }}
                >
                    <div style={{ fontSize: T.fontSize.max, color: 'white' }} >{title}</div>
                    <div style={{ flexGrow: 1 }} />
                    {
                        leftButton && this.createButton( leftButton, onLeftButton, 8 )
                    }
                    {
                        rightButton && this.createButton( rightButton, onRightButton, 0 )
                    }
                    {modal &&
                     <CloseIcon style={{ width: 32, height: 32, marginLeft: 16, cursor: 'pointer' }}
                                color={T.palette.white600a}
                                hoverColor={T.palette.white}
                                onTouchTap={close} />
                    }
                </View>
                {text ? <p style={{margin: 20, textAlign: 'center'}}>{text}</p>: null}
                {this.props.children}
            </Dialogs>
        )
    }

    createButton = ( Buttons, onTap, margin ) => {

        if ( typeof Buttons == 'string' ) {
            return <Button label={Buttons}
                           height={40}
                           fontColor={T.palette.white600a}
                           hoverFontColor={T.palette.white}
                           align={'center'}
                           onTap={onTap}
                           margin={'0 ' + margin + 'px 0 0'}
            />
        } else if ( typeof buttons == 'function' ) {
            return <Button
                style={{ width: 40, height: 40, marginRight: margin }}
                color={T.palette.white600a}
                hoverColor={T.palette.white}
                onTouchTap={onTap}
            />
        }
        return buttons
    }

    componentDidUpdate(){
        if( this.props.needBlur ) {
            if( this.props.open ) {
                document.getElementById( 'container' ).className = 'blur'
            } else {
                document.getElementById( 'container' ).removeAttribute( "class" )
            }
        }
    }

    componentWillUnmount(){
        if( this.props.needBlur ) {
            document.getElementById( 'container' ).removeAttribute( "class" )
        }
    }
}
