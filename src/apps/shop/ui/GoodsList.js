/**
 * Created by wangyakun on 16/9/2.
 */
import React from 'react'
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {S, P, M, MM, F, D, Q, T, L, R, DD, UR} from '../../../common'
import {
    BaseComponent,
    View,
    Label,
    Button,
    TabView,
    ListView,
    Form,
    TextField,
    CheckView,
    AccountCircle,
    LockIcon,
    CardView,
    Subheader,
} from '../../../components/BaseComponent'
import GoodsDetails from './../../common/ui/GoodsDetails'
import Paging from '../../../components/Paging'
import StoreGoodsListItem from './StoreGoodsListItem'
import RaisedButton from 'material-ui/RaisedButton'
import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'


class GoodsList extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'GoodsList'
        this.state = {
            detailOpen: false,
            overItemId: 0,
            goodsCommonId: null,
            goodsCommon: {},
            lock: 0,
            goodsType: 'online',
            checkedItemId: [],
            searchType: 1,
            searchValue: null,
            storeClass: null,
            checkedAll: false,
            searchParams: {
                goodsName: ''
            }
        }
        this.type = ''
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    componentDidMount() {
        this.initData()
    }

    componentDidUpdate() {
        if (this.type != this.props.params.type) {
            this.setState({
                searchParams: {
                    goodsName: ''
                }
            })
            this.initData()
        }

    }


    initData = () => {
        this.type = this.props.params.type
        const {goodsName} = this.state.searchParams
        let actionType = ''
        let query = Q()
        query.limit(STORE_GOODS_COMMON_LIMIT)
        if (goodsName)
            query.add('goodsName', goodsName)
        switch (this.props.params.type) {
            case 'online':
                L("online......")
                actionType = TYPE.STORE_GOODS_COMMON_ONLINE_LOAD
                break
            case 'offline':
                L("offline......")
                actionType = TYPE.STORE_GOODS_COMMON_OFFLINE_LOAD
                switch (this.state.lock) {
                    case 1:
                        query.add('type', "lock")
                        break
                    case 2:
                        query.add('type', "WaitVerify")
                        break
                    default :
                        break
                }
                break
            default :
                L("none......")
                break
        }
        D(actionType, query.ok())
    }

    tabChange = (value) => {
        this.setState({
            lock: value,
            searchParams: {
                goodsName: ''
            }
        });
        const {goodsName} = this.state.searchParams
        let query = Q()
        query.limit(STORE_GOODS_COMMON_LIMIT)
        if (goodsName)
            query.add('goodsName', goodsName)
        switch (value) {
            case 1:
                query.add('type', "lock")
                break
            case 2:
                query.add('type', "WaitVerify")
                break
            default :
                break
        }
        D(TYPE.STORE_GOODS_COMMON_OFFLINE_LOAD, query.ok())
    }

    details = (goodsCommonId, goodsCommon) => {
        this.state.goodsCommon = goodsCommon
        this.state.goodsCommonId = goodsCommonId
        this.state.detailOpen = true
        this.setState(this.state)
    }

    /**
     * 选择图标
     * @param e
     * @param name
     */
    checked = (e, id) => {
        e.stopPropagation()
        e.preventDefault()
        let checked = this.state.checkedItemId
        if (checked.indexOf(id) == -1) {
            checked.push(id)
        } else {
            checked.splice(checked.indexOf(id), 1)
        }
        this.setState(
            {
                checkedItemId: checked
            }
        )

    }

    /**
     *全选
     * @param e
     * @param name
     */
    checkedAll = (e) => {
        e.stopPropagation()
        e.preventDefault()
        let {checkedItemId, checkedAll} = this.state
        let {goodsCommonList} = this.props.data
        if (!checkedAll) {
            F(goodsCommonList, (goodsCommon, id) => {
                checkedItemId.push(goodsCommon.Id)
            })

        } else {
            checkedItemId = []
        }
        this.setState(
            {
                checkedItemId: checkedItemId,
                checkedAll: !checkedAll
            }
        )

    }


    list = (data) => {
        const store = UR()
        return <StoreGoodsListItem
            key={'goods' + data.Id}
            alignSelf={'stretch'}
            goodsCommon={data}
            id={data.Id}
            storeId={store.storeid}
            margin={'4px 24px'}
            onOpen={this.onGoodsItemOpen}
            onDelete={this.delete}
            onShow={this.showGoods}
            onUnShow={this.unshowGoods}
        />
    }

    onGoodsItemOpen = (goodsCommonId) => {
        const {goodsCommonList} = this.props.data
        goodsCommonList.forEach((gc) => {
            if (gc.Id == goodsCommonId && !gc.goodses) {
                //D(TYPE.STORE_ORDER_GOODS_LOAD, {OrderId: orderId}, 'form')
            }
        })
    }

    showGoodsList = (goodses) => {
        return (
            <View wrap={'wrap'} overflow={'visible'} zIndex={100}>
                {F(goodses, (goods, id) => {
                    return (
                        <GoodsCard
                            //style=""
                            key={1 + id}
                            width={128}
                            goodsId={goods.GoodsId}
                            name={goods.GoodsName}
                            price={goods.GoodsPrice}
                            tags={goods.tags}
                            image={R(goods.StoreId, goods.GoodsImage)}
                        />
                    )
                })}

            </View>
        )
    }

    delete = (id) => {
        DD('确定删除该商品？', TYPE.STORE_GOODS_DELETE,
            {commonids: id, type: this.type}, 'form')
    }

    unshowGoods = (id) => {
        DD('确定下架该商品？', TYPE.STORE_GOODS_COMMON_UNSHOW, {commonids: id, type: this.type}, 'form')
    }
    showGoods = (id) => {
        DD('确定上架该商品？', TYPE.STORE_GOODS_COMMON_SHOW, {commonids: id, type: this.type}, 'form')
    }

    pagingClick = (page) => {
        D(TYPE.STORE_GOODS_COMMON_ONLINE_LOAD, Q().limit(STORE_GOODS_COMMON_LIMIT, page == 1 ? 0 : STORE_GOODS_COMMON_LIMIT * (page - 1) - 1).ok())
    }

    render() {
        const {goodsCommonList, goodsList, goodsCount} = this.props.data
        const {overItemId, goodsCommonId, goodsCommon, detailOpen, lock, checkedAll} = this.state
        const pageType = this.props.params.type
        let pages = Math.ceil(goodsCount / STORE_GOODS_COMMON_LIMIT)
        const checkAllProps = {
            onTouchTap: (e) => this.checkedAll(e),
            color: "rgb(0, 188, 212)",
            viewBox: '0 0 24 24'
        }

        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <Subheader>商品管理 > {pageType == "offline" ? '仓库中的商品' : '出售中的商品'}</Subheader>
                {
                    pageType == "offline" &&
                    <View>
                        <TabView
                            width={'auto'}
                            grow={1}
                            color={T.palette.lightGrey}
                            fontColor={T.palette.maxGrey}
                            hoverColor={T.palette.grey}
                            hoverFontColor={T.palette.white}
                            checkedColor={T.palette.main}
                            tabs={['仓库中的商品', '违规的商品', '待审核的商品']}
                            margin={8}
                            checked={lock}
                            toggle={false}
                            onChecked={(checked) => this.tabChange(checked)}
                        />
                        {
                            goodsCommonList && <Divider />
                        }

                    </View>
                }
                <View height={50} margin={'4px 24px'}>
                    <p>商品名称：</p>
                    <TextField fullWidth={false}
                               value={this.state.searchParams.goodsName}
                               name={'goodsName'}
                               onChange={(name, value) => this.setFormDatas(name, value, 'searchParams')}
                    />
                    <RaisedButton label="搜索" backgroundColor="#a4c639" style={{margin: 5}}
                                  onTouchTap={() => this.initData()}/>
                </View>

                {
                    //<Divider/>
                    //<View height={50} style={{marginLeft: 5}}>
                    //    {
                    //        checkedAll ? <Checkbox {...checkAllProps}/> : <CheckboxOutlineBlank {...checkAllProps}/>
                    //    }
                    //    <span onTouchTap={(e) => this.checkedAll(e)} style={{cursor: 'default'}}>全选</span>
                    //</View>

                }

                {
                    goodsCommonList && goodsCommonList.length > 0 ?
                        <View width={'100%'} flow={'column'} alignSelf={'stretch'}>
                            <View width={'100%'}>
                                <Label width={0} grow={3} text={'商品名称'} align={'center'} fontColor={T.palette.grey}/>
                                <Label width={0} grow={1} text={'平台货号'} fontColor={T.palette.grey}/>
                                <Label width={0} grow={1} text={'商品价格'} fontColor={T.palette.grey}/>
                                <Label width={0} grow={1} text={'库存量'} fontColor={T.palette.grey}/>
                                <Label width={0} grow={1} text={'发布时间'} fontColor={T.palette.grey}/>
                                <Label width={0} grow={1} text={'操作'} fontColor={T.palette.grey}/>
                            </View>

                            {
                                F(goodsCommonList, (data, id)=>this.list(data))
                            }
                            <Divider />

                            {
                                pages
                                    ?
                                    <View style={{marginTop: 10}}><Paging height={40} max={9} pages={pages}
                                                                          onClick={(page)=>this.pagingClick(page)}/></View>
                                    : null
                            }
                        </View> : <View height={350} alignV={'center'} alignSelf={'center'}
                                        fontColor={T.palette.grey}><WarningIcon color={T.palette.grey}/> 暂无符合条件的数据记录 </View>
                }


                {   detailOpen && <GoodsDetails
                    goodsCommonId={goodsCommonId}
                    close={()=>this.closeDialog('detailOpen')}
                    userInfo={this.props.userInfo}/>
                }

            </View>
        )
    }
}

const STORE_GOODS_COMMON_LIMIT = 10


const priceAttr = {
    style: {
        fontSize: T.fontSize.min,
        color: T.palette.gold,
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                goodsCommonList: state[api.STOREGOODS] ? state[api.STOREGOODS].goodsCommon : null,
                // goodsList: state[api.STOREGOODS] ? state[api.STOREGOODS].goods : null,
                goodsCount: state[api.STOREGOODS] ? state[api.STOREGOODS].count : 0,
            }
        }
    }
    //bindActionCreators()
)(GoodsList)