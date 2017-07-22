/**
 * Created by kenn on 16/7/4.
 */

import React from 'react'
import {
    Link
} from 'react-router'
import {
    connect
} from 'react-redux'
import Divider from 'material-ui/Divider';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';

import { BaseComponent, Button } from '../../../components/BaseComponent'
import { D, T, getCache, DG } from '../../../common'
import { USE_CENTER_URL, IMAGEURL } from '../../config'
import Category from '../../common/ui/Category'
import CartAndLike from './CartAndLike'
import SingleUser from './SingleUser'
import Search from '../../../components/Search'
import Login from '../../../components/Login'
import View from '../../../components/View'
import Coopt from './Coopt'

import { SEARCH, SEARCH_SHOP, SEARCH_GOODS, TOGGLECART, SEARCH_CLEAR } from '../../../actions/type'
import { USER, CART } from '../../../store/api'

class Header extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Header'

        this.state = {
            height: 60,
            opacity: 0,

            cartShow: false,
            isCheckedCart: true,
            openLogin: false
        }
    }

    //componentDidMount() {
    //    this.setState({
    //        height: true
    //    })
    //}

    openCart() {
        this.setState( { show: true } )
    }

    closeCart() {
        this.setState( { show: false } )
    }

    open( name ) {
        this.setState( {
            height: 'auto',
            opacity: 1,
            name
        } )
    }

    hidden = () => {
        if ( this.state.height !== 60 ) {
            this.setState( {
                height: 60,
                opacity: 0
            } )
        }
    }

    onCategory = ( key, level ) => {
        if ( this.state.height !== 60 ) {
            this.setState( {
                height: 60,
                opacity: 0
            } )
        }

        //this.props.onTap()

        //Dthis.checkedAction(name,  key)
        let search = this.props.search

        if ( !search ) {
            search = {}
        }
        search.categorys = key
        search.categoryLevel = level
        this.log( key, level )
        DG( search )

    }


    secondHeader() {
        switch ( this.state.name ) {
            case 'user':
                if ( this.props.user ) {
                    return <SingleUser width={this.props.winWidth} />
                }
                break
            case 'category':
                return <Category onTap={this.onCategory} width={this.props.winWidth - 32}
                                 height={this.props.winHeight - 100} />
                break
            default:
                return null
                break
        }
    }

    render() {
        //this.log(localStorage.Authorization)
        const { user, winWidth } = this.props
        let transition = 'all .5s'

        let ToolbarStyle = {
            height: 60,
        }

        const secondHeaderStyle = {
            backgroundColor: T.palette.white800a,
            overflow: 'auto',
            height: this.state.height == 60 ? 0 : 'auto',
            maxHeight: this.props.winHeight - 60,
            transition,
            opacity: this.state.opacity,
            padding: '0 16px 16px'
        }

        //this.log(this.props.user)

        return (

            <div onMouseLeave={this.hidden}
                 style={{
                     position: 'fixed',
                     top: 0,
                     left: 0,
                     //overflow: 'hidden',
                     width: winWidth,
                     zIndex: 12
                 }}
            >
                <View style={ToolbarStyle} color={T.palette.main} alignH={'between'} alignV={'center'} >
                    <View margin={8} alignV={'center'} >
                        <a href="/" >
                            <img src={IMAGEURL + "logo_h_300.png"} style={{ height: 32 }}
                                 onClick={() => D( SEARCH_CLEAR )} />
                        </a>
                        <Button
                            backgroundColor={T.palette.main}
                            label="商品分类"
                            height={28}
                            width={96}
                            fontColor={T.palette.white}
                            margin={'0 24px'}
                            radius={0}
                            borderColor={T.palette.white}
                            borderWidth={1}
                            onOver={this.open.bind( this, 'category' )}
                        />
                    </View>
                    <Search height={28}
                            width={500}
                            borderColor="white"
                            radius={24}
                            margin="23px 20px"
                            type={[ 'goods' ]}
                            hint={true}
                    />

                    <View style={{ marginRight: 24 }} alignV={'center'} height={60} >
                        {user &&
                         <Button
                             onTap={() => this.setState( { cartShow: true, isCheckedCart: false } )}
                             icon={FavoriteIcon}
                             margin={'0 8px'}
                             fontColor={T.palette.white}
                             hoverFontColor={T.palette.darkBlack}
                             iconSize={24}
                         />}
                        {user &&
                         <Button
                             label={this.props.cartCount}
                             onTap={() => this.setState( { cartShow: true, isCheckedCart: true } )}
                             icon={ShoppingCartIcon}
                             iconSize={24}
                             margin={'0 8px'}
                             fontColor={T.palette.white}
                             hoverFontColor={T.palette.darkBlack}
                         />}
                        {user ?
                            <a href={USE_CENTER_URL + getCache( 'Authorization' )}
                               style={{ cursor: 'pointer' }} >
                                <Button
                                    label={user.trueName || user.name}
                                    icon={IMAGEURL + this.props.user.icon}
                                    iconSize={32}
                                    margin={'0 0 0 16px'}
                                    fontColor={T.palette.white}
                                    onOver={this.open.bind( this, 'user' )}
                                />
                            </a> :
                            <Button
                                icon={AccountCircleIcon}
                                iconSize={32}
                                margin={'0 0 0 16px'}
                                fontColor={T.palette.white}
                                hoverFontColor={T.palette.darkBlack}
                                onTap={ () => this.openDialog( 'openLogin' )}
                            />
                        }
                    </View>
                </View>
                <Coopt width={winWidth} />

                <CartAndLike
                    isCheckedCart={this.state.isCheckedCart}
                    onCheckedCart={( isCheckedCart ) => this.setState( { isCheckedCart } )}
                    open={this.state.cartShow}
                    width={this.props.winWidth * 0.9}
                    height={this.props.winHeight}
                    onClose={( cartShow ) => this.setState( { cartShow } )}
                />

                <div style={secondHeaderStyle} >
                    <Divider style={{ marginTop: 0 }} />
                    {this.secondHeader()}
                </div>


                {
                    this.state.openLogin &&
                    <Login open={true} close={() => this.closeDialog( 'openLogin' )} />
                }
            </div>
        )
    }
}

export default connect(
    ( state ) => {
        return {
            user: state[ USER ],
            cartCount: state[ CART ].count,
            search: state.search
        }
    }
    //bindActionCreators()
)( Header )