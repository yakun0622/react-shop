/**
 * Created by kenn on 16/7/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import HomeIcon from 'material-ui/svg-icons/action/home';
import ProductIcon from 'material-ui/svg-icons/action/view-quilt';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

import {M, F, D, Q, T, L, UR} from '../../common'
import {
    BaseComponent,
    AccountCircle,
    Button,
    ListView,
    View,
    Dialog,
    FloatButton,
    AddIcon,
    TabView,
    GroupIcon,
    ConfirmDialog,
    Snackbar
} from '../../components/BaseComponent'
import WindowResize from '../../components/WindowResize'
import Login from  '../../components/Login'
import Header from  './ui/Header'
import * as TYPE from '../../actions/type'
import {Link} from 'react-router'
const menuWidth = 200

class Shop extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'Shop'
    }


    componentWillMount() {
        this.resetMenu()
    }

    componentDidMount() {
        D(TYPE.AREA_LOAD, Q().query('AreaParentId', 0).limit(40).ok())
    }

    menu(name, key, tabs, links, type) {
        const {
            checkedStoreMenu, checkedStoreChildMenu
        } = this.props

        return (

            <ListView
                key={key}
                checked={checkedStoreMenu == key ? true : false}
                width={menuWidth}
                fold={1}
                indent={0}
                showFoldIcon={true}
                lineIndent={0}
                leftIcon={type == "goodsMenuChecked" ? <ProductIcon/> : <ViewListIcon/>}
                primaryText={name}
                onTap={() => this.selectMenu('checkedStoreMenu', key)}
            >
                <TabView
                    width={menuWidth}
                    key={key * 10}
                    checked={this.state[type]}
                    //fold={checkedStoreMenu == key ? true : false}
                    fold={false}
                    color={T.palette.grey}
                    fontColor={T.palette.white800a}
                    hoverColor={T.palette.maxGrey}
                    hoverFontColor={T.palette.white}
                    orientation={false}
                    tabs={tabs}
                    links={links}
                    onChecked={(checked) => this.selectChild(type, checked, key)}
                />
            </ListView>
        )
    }

    selectChild = (type, checked, key) => {
        //reset
        this.resetMenu()
        let state = this.state
        this.checkedAction('checkedStoreMenu', key)
        state[type] = checked
        this.setState(state)
    }

    selectMenu = (name, key) => {
        //reset
        this.resetMenu()
        this.checkedAction(name, key)
    }

    resetMenu = () => {
        let state = this.state
        state['goodsMenuChecked'] = -1
        state['orderMenuChecked'] = -1
        state['deliverMenuChecked'] = -1
        state['afterSellMenuChecked'] = -1
        state['statisMenuChecked'] = -1
        this.setState(state)
    }

    render() {
        const {
            winWidth,
            winHeight,
            storeInfo,
            checkedStoreMenu
        } = this.props
        L('storeInfo', storeInfo)
        let goodsTabs = ['商品发布', '出售中的商品', '仓库中的商品']
        let goodsLinks = ['/goods-edit', '/goods-list/online', '/goods-list/offline']
        let orderTabs = ['交易订单']
        let orderLinks = ['/order-list']
        let deliverTabs = ['发货地址设置', '默认物流公司', '配送地区设置', '运费模板']
        let deliverLinks = ['/deliver-set', '/express', '/area-set', '/store-transport']
        let afterSellTabs = ['退货管理']
        let afterSellLinks = ['/order-return']
        let statisTabs = ['订单结算']
        let statisLinks = ['/order-bill']

        const user = UR()

        return (
            user && user.storeid ? <div>
                <Header width={winWidth}/>
                <View style={{minHeight: winHeight - 80}} overflow={'visible'}>
                    <View width={menuWidth} orientation={'column'} shadowSize={5} alignSelf={'stretch'}>
                        <Link to={'store-index'}>
                            <ListView
                                key={0}
                                checked={checkedStoreMenu == 0 ? true : false}
                                width={menuWidth}
                                fold={0}
                                indent={0}
                                //showFoldIcon={true}
                                lineIndent={0}
                                leftIcon={<HomeIcon/>}
                                primaryText={'首页'}
                                onTap={() => this.selectMenu('checkedStoreMenu', 0)}
                            />
                        </Link>

                        {this.menu('商品管理', 1, goodsTabs, goodsLinks, 'goodsMenuChecked')}
                        {this.menu('订单管理', 2, orderTabs, orderLinks, 'orderMenuChecked')}
                        {this.menu('发货设置', 3, deliverTabs, deliverLinks, 'deliverMenuChecked')}
                        {this.menu('售后服务', 4, afterSellTabs, afterSellLinks, 'afterSellMenuChecked')}
                        {this.menu('统计管理', 5, statisTabs, statisLinks, 'statisMenuChecked')}
                    </View>
                    <View grow={1} width={0} alignSelf={'stretch'} margin={'0 0 0 3px'}
                          style={{minWidth: 600}}>
                        {this.props.children}
                    </View>
                </View>
                <ConfirmDialog />
            </div> : <div>
                <Login type={3}/>
            </div>
        )
    }
}

export default connect(
    (state)=> {
        return {
            storeInfo: state.store,
            checkedStoreMenu: state.checkedSt.checkedStoreMenu,
            checkedStoreChildMenu: state.checkedSt.checkedStoreChildMenu,
        }
    }
    //bindActionCreators()
)(WindowResize(Shop))