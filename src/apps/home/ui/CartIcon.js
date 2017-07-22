/**
 * Created by kenn on 16/7/11.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import FlatButton from 'material-ui/FlatButton'
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';

import {BaseComponent} from '../../../components/BaseComponent'
import {D} from '../../../common'
import {GOODS} from '../../../store/api'
import {ADD_GOODS_TO_CART} from '../../../actions/type'

class CartIcon extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'CartIcon'

        this.setTheme()
    }

    render() {
        const {height, width} = this.props

        const rootAttr = {
            style: {
                height: height,
                padding: 0,
                backgroundColor: 'white',
                lineHeight: height + 'px',
                textAlign: this.props.align || 'left'
            },
            hoverColor: 'white',
            rippleColor: 'white',
            icon: <ShoppingCartIcon />,

            onTouchTap: ()=>D(ADD_GOODS_TO_CART, this.props.goodsId)
        }

        return (
            <FlatButton {...rootAttr} />
        )
    }
}

export default connect(
    (state)=> {
        return {
            data: state.user
        }
    }
    //bindActionCreators()
)(CartIcon)