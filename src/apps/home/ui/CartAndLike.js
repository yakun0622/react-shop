/**
 * Created by kenn on 16/7/30.
 */
import React from 'react'
import { connect } from 'react-redux'

import { S, P, M, Q, F, C, D, R, T, MM, MA, DD, showDetails } from '../../../common'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle';
import RadioCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import {
    BaseComponent, FlatButton, Form,
    EditIcon, AddIcon, TextField, CheckView,
    Label,
    Button,
    View,
    Dialog,
    LabelIcon,
    Icon
} from '../../../components/BaseComponent'
import ScollView from '../../../components/ScollView'
import Numbers from '../../../components/Numbers'
import Order from './Order'
import AddGoodsTag from '../../../components/AddGoodsTag'
import GroupSelect from '../../common/ui/GroupSelect'

import { GOODS, CART, LIKE } from '../../../store/api'
import {
    CART_COUNT,
    CART_REMOVE,
    LIKE_FOLDER_ADD,
    LIKE_EDIT_FOLDERNAME,
    LIKE_FOLDER_REMOVE,
    LIKE_REMOVE,
    LIKE_COUNT,
    LIKE_LOAD,
    GOODS_TAG_LOAD,
    TRANSORTFEE
} from '../../../actions/type'


class CartAndLike extends BaseComponent {
    favGoodsNum = {}

    constructor( props ) {
        super( props )
        this.display = 'CartAndLike'
    }

    componentWillMount() {
        this.setState(
            {
                isCheckedCart: this.props.isCheckedCart,
                overItemId: 0,
                cartData: null,
                checkedItemId: [],
                //打开编辑收藏夹对话框
                openEditFoldName: false,
                //打开添加收藏夹对话框
                openAddLikeFolder: false,
                //选择的收藏夹id
                favFoldId: 0,
                //供修改添加收藏夹使用
                likeFolderDatas: {
                    FolderName: null,
                    FolderType: 1
                },
                openAddGoodsTag: false,
                //用于删选标签的组id
                checkedGroupId: 0,
            }
        )
    }

    componentWillReceiveProps( props ) {
        if ( props.data.likeData.fav && !props.data.likeData.fav[ this.state.favFoldId ] ) {
            //this.log( this.props.data.likeData.fav )
            this.setState( {
                favFoldId: Object.keys( props.data.likeData.fav )[ 0 ]
            } )
        }

        this.setState( { isCheckedCart: props.isCheckedCart } )
    }

    /**
     * 选择图标
     * @param e
     * @param name
     */
    checked( e, name ) {
        e.stopPropagation()
        e.preventDefault()
        // this.log( name )
        switch ( name ) {
            case 'cart':
                this.setState( { isCheckedCart: true, checkedItemId: [] } )
                this.props.onCheckedCart( true )
                break
            case 'like':
                this.setState(
                    {
                        isCheckedCart: false,
                        checkedItemId: []
                    }
                )
                this.props.onCheckedCart( false )
                break
            default:
                let checked = this.state.checkedItemId
                if ( checked.indexOf( name ) == -1 ) {
                    checked.push( name )
                } else {
                    checked.splice( checked.indexOf( name ), 1 )
                }
                this.setState(
                    {
                        checkedItemId: checked
                    }
                )
                break
        }
    }

    /**
     * 创建list
     * @param data
     * @returns {XML}
     */
    list( data ) {
        return (
            <View width={'100%'} orientation={'column'}
                  alignH={'stretch'} >
                {F( this.goodsByShop( data ), ( item, storeId ) => {
                    return (
                        <View orientation={'column'} key={storeId + 'l'}
                            alignH={'stretch'}
                        >
                            <p key={storeId + 'lddd'}
                               style={{ fontSize: T.fontSize.small, textAlign: 'center' }} >
                                {item[ Object.keys( item )[ 0 ] ].StoreName}
                            </p>
                            {F( item, ( it, id ) => this.listItem( id, it, storeId ) )}
                        </View>
                    )
                } )}
            </View>
        )
    }

    /**
     * list Item显示
     * @param id
     * @param it
     * @returns {XML}
     */
    listItem( id, it, storeId ) {
        let image = R( storeId, it.GoodsImage )

        const { overItemId } = this.state
        //this.log(R(storeId, it.GoodsImage))
        return (
            <View key={id}
                  borderWidth={1}
                  borderColor={overItemId == id ? T.palette.main : T.palette.lightGrey}
                  margin={'4px 16px'}
                  orientation={'column'}
                  overflow={'visible'}
            >
                <View
                    width={'100%'}
                    height={48}
                    alignV={'center'}
                    onTap={() => this.showGoodsDetials( it.GoodsId )}
                    onOver={() => this.setState( { overItemId: id } )}
                    onLeave={() => this.setState( { overItemId: 0 } )}
                    style={{position: 'relative'}}
                    overflow={'visible'}
                    alignH={'between'}
                >
                    <View alignV={'center'}>
                        <Icon src={image} margin={8} />
                        <Label text={it.GoodsName} />
                    </View>
                    <View alignV={'center'} overflow={'visible'} margin={'0 16px 0 0'} stopEvent={true}>
                        <Label text={"￥" + it.GoodsPrice} margin={'0 8px 0 0'} fontColor={T.palette.gold}/>
                        <Numbers
                            height={18}
                            value={Number( it.GoodsNum )}
                            onChange={( num ) => this.changeGoodsNum( id, num )}
                            margin={'0 16px 0 0'}
                        />
                        <Checkbox
                            {...checkboxProps}
                            iconStyle={{ opacity: this.state.checkedItemId.indexOf( id ) == -1 ? 0.3 : 1 }}
                            onClick={( e ) => this.checked( e, id )}
                            checked={this.state.checkedItemId.indexOf( id ) == -1 ? false : true}
                        />
                        <Icon
                            src={RemoveIcon}
                            size={24}
                            color={T.palette.lightGrey}
                            hoverColor={T.palette.maxGrey}
                            onTap={( e ) => this.removeItem( e )}
                            margin={'8px 0 0 20px'}
                        />
                    </View>
                </View>
                {this.showTagbyGoodsId( it.GoodsId )}
            </View>
        )

    }

    showTagbyGoodsId = ( goodsId ) => {
        const tags = this.props.goodsTags && this.props.goodsTags[ goodsId ]
        if ( !tags ) {
            return null
        }
        const tagGroupId = this.getTagGroupId()
        return (
            <View margin={'0 50px'} >
                {F( tags, ( tag, tagId ) => {
                    if ( tagGroupId ) {
                        if ( tagGroupId == tag.GroupId ) {
                            return this.tagLabel( 'tag' + tagId + goodsId, tag.TagName )
                        }
                    } else {
                        return this.tagLabel( 'tag' + tagId + goodsId, tag.TagName )
                    }
                } )}
            </View>
        )
    }

    getTagGroupId = () => {
        const { user } = this.props
        const { checkedGroupId } = this.state
        if( !checkedGroupId ) {
            return null
        }
        return (user.ownerGroups && user.ownerGroups[checkedGroupId] && checkedGroupId) || (user.joinGroups && user.joinGroups[checkedGroupId] && user.joinGroups[checkedGroupId].GroupBelong)
    }

    tagLabel = ( key, name ) => {
        return (
            <Button
                key={key}
                label={name}
                height={24}
                radius={12}
                color={T.palette.minGrey}
                fontColor={T.palette.grey}
                margin={'0 2px'}
            />
        )
    }

    /**
     * 收藏夹
     * @param data
     * @returns {XML}
     */
    likeList( data ) {
        const { favFoldId } = this.state
        // this.log('likelist', data.fav)
        if ( data.fav && data.fav[ favFoldId ] && data.fav[ favFoldId ].FolderData ) {
            return this.list( data.fav[ favFoldId ].FolderData )
        }
    }

    /**
     * 显示商品详情
     * @param goodsId
     */
    showGoodsDetials( goodsId ) {
        showDetails( goodsId, false )
    }

    /**
     * 商品数量改变
     * @param id
     * @param num
     */
    changeGoodsNum = ( id, num ) => {

        const { isCheckedCart, favFoldId } = this.state
        if ( isCheckedCart ) {
            D( CART_COUNT, { GoodsNum: num, Id: id }, 'form' )
        } else {
            D( LIKE_COUNT, { GoodsNum: num, folderId: favFoldId, Id: id }, 'form' )
        }
    }

    /**
     * 删除商品
     * @param e
     */
    removeItem( e ) {
        e.stopPropagation()
        if ( this.state.isCheckedCart ) {
            DD( '确定要移除该商品吗？', CART_REMOVE, Number( this.state.favFoldId ), this.state.overItemId )
        } else {
            DD(  '确定要移除该商品吗？', LIKE_REMOVE, { folderId: Number( this.state.favFoldId ), Id: this.state.overItemId }, 'form' )
        }
    }


    getShopIds( data ) {
        let ids = []
        F(
            data, ( item, id ) => {
                if ( ids.indexOf( item.StoreId ) == -1 ) {
                    ids.push( item.StoreId )
                }
            }
        )

        return ids
    }

    /**
     * 根据商家分类
     * @param data
     * @returns {{}}
     */
    goodsByShop( data ) {

        let ids = this.getShopIds( data )

        let newData = {}

        ids.forEach( ( i ) => {
            F( data, ( item, id ) => {
                if ( i == item.StoreId ) {
                    if ( newData[ i ] ) {
                        newData[ i ][ id ] = item
                    } else {
                        newData[ i ] = {}
                        newData[ i ][ id ] = item
                    }
                }
            } )
        } )

        return newData
    }

    /**
     * 计算结算价
     * @returns {number}
     */
    getTotalPrice() {
        const { checkedItemId, isCheckedCart, favFoldId } = this.state
        const carts = this.props.data.cartData
        let likes
        if ( this.props.data.likeData.fav && this.props.data.likeData.fav[ favFoldId ] &&
             this.props.data.likeData.fav[ favFoldId ].FolderData ) {
            likes = this.props.data.likeData.fav[ favFoldId ].FolderData
        }
        const ckeckedItemLength = checkedItemId.length

        let total = 0

        F( isCheckedCart ? carts : likes, ( item, id ) => {
            if ( ckeckedItemLength ) {
                //如果有选择项
                if ( checkedItemId.indexOf( id ) != -1 ) {
                    total += item.GoodsNum * item.GoodsPrice
                }
            } else {
                //没有选择项
                total += item.GoodsNum * item.GoodsPrice
            }
        } )

        return Math.round( total * 100 ) / 100
    }

    render() {
        if ( this.props.style ) {
            rootProps.style = M( rootProps.style, props.style )
        }
        const { data, open, width, height, ownerGroups, joinGroups } = this.props
        const { cartData, likeData } = this.props.data
        const { isCheckedCart, overItemId, favFoldId, openAddGoodsTag, checkedGroupId } = this.state
        //this.log(this.props.goodsTags )

        //const goodsIds = this.getGoodsIdsByFavfolder()

        return (
            <Drawer
                width={width}
                docked={false}
                open={open}
                onRequestChange={( open ) => this.props.onClose( open )}
            >
                <View width={'100%'} >
                    <View width={0} grow={1} orientation={'column'} >
                        <View width={'100%'} height={60} >
                            {
                                this.state.isCheckedCart
                                    ? null
                                    : this.likeTitle()
                            }
                        </View>
                        <Divider />
                        <ScollView width={width - sideWidth} height={height - headerHeight} >
                            {
                                isCheckedCart
                                    ? this.list( cartData )
                                    : this.likeList( likeData )
                            }
                        </ScollView>
                    </View>
                    <View width={sideWidth} orientation={'column'} height={height} >
                        <View height={headerHeight} width={sideWidth} >
                            <Button
                                icon={ShoppingCartIcon}
                                iconSize={32}
                                width={0}
                                grow={1}
                                height={60}
                                color={T.palette.main}
                                fontColor={isCheckedCart ? T.palette.white : T.palette.white600a}
                                radius={0}
                                onTap={( e ) => this.checked( e, 'cart' )}
                            />

                            <Button
                                icon={FavoriteIcon}
                                iconSize={32}
                                width={0}
                                grow={1}
                                height={60}
                                color={T.palette.main}
                                fontColor={isCheckedCart ? T.palette.white600a : T.palette.white}
                                radius={0}
                                onTap={( e ) => this.checked( e, 'like' )}
                            />
                        </View>
                        <div style={S().width( sideWidth ).inline().s()} >
                            <p {...totalPriceProps}>{"￥" + this.getTotalPrice()}</p>
                            <FlatButton {...totalButtonProps} onClick={() => this.openDialog()} />
                        </div>
                        {
                            !isCheckedCart && this.getGoodsIdsByFavfolder() &&
                            <GroupSelect
                                width={sideWidth - 20}
                                ownerGroups={ownerGroups}
                                joinGroups={joinGroups}
                                label={'选择公司'}
                                color={T.palette.transparent}
                                fontColor={T.palette.maxGrey}
                                margin={'20px 10px 0'}
                                checked={checkedGroupId}
                                onChecked={( checkedGroupId ) => this.setState( { checkedGroupId } )}
                            />
                        }
                        {
                            !isCheckedCart && this.getGoodsIdsByFavfolder() &&
                            <Button
                                width={sideWidth - 20}
                                icon={LabelIcon}
                                iconSize={24}
                                hoverFontColor={T.palette.main}
                                label={'添加标签'}
                                margin={'24px 0'}
                                onTap={() => this.setState( { openAddGoodsTag: true } )}
                            />
                        }
                    </View>


                </View>

                <Order
                    open={this.state.openDialog}
                    total={this.getTotalPrice()}
                    transportfreeData={this.state.openDialog ? this.getShippingFeeData() : null}
                    orderDatas={this.getOrderDatas()}
                    isCart={this.state.isCheckedCart}
                    groupId={checkedGroupId}
                    close={() => this.setState( { openDialog: false } )}
                />

                <Dialog
                    width={600}
                    open={openAddGoodsTag}
                    close={() => this.setState( { openAddGoodsTag: false } )}
                >
                    <AddGoodsTag goodsIds={this.getGoodsIdsByFavfolder()}
                                 close={() => this.setState( { openAddGoodsTag: false } )} />
                </Dialog>

            </Drawer>
        )
    }

    /**
     * 根据收藏夹获取相应的goodsIds
     * @returns {*}
     */
    getGoodsIdsByFavfolder() {
        const { overItemId, checkedItemId, favFoldId } = this.state
        const { likeData } = this.props.data

        if ( overItemId && likeData.fav[ favFoldId ].FolderData[ overItemId ] ) {
            return [ likeData.fav[ favFoldId ].FolderData[ overItemId ].GoodsId ]
        }

        const goodsIds = []
        if ( checkedItemId.length > 0 ) {
            checkedItemId.forEach( ( favId ) => {
                goodsIds.push( likeData.fav[ favFoldId ].FolderData[ favId ].GoodsId )
            } )
            return goodsIds
        }

        if ( favFoldId && likeData.fav && likeData.fav[ favFoldId ] && likeData.fav[ favFoldId ].FolderData ) {
            F( likeData.fav[ favFoldId ].FolderData, ( data ) => {
                goodsIds.push( data.GoodsId )
            } )
            if ( goodsIds.length > 0 ) {
                return goodsIds
            }
        }
        return null
    }

    /**
     * 设置选择的收藏夹id
     * 并初始化likeFolderDatas
     * @param favFoldId
     */
    setFavFoldId( favFoldId ) {
        this.setState( {
            favFoldId,
            likeFolderDatas: {
                FolderName: false,
                FolderType: 1
            }
        } )
    }

    /**
     * 创建收藏夹title
     * @returns {XML}
     */
    likeTitle() {
        const { favFoldId, openEditFoldName, openAddLikeFolder } = this.state

        return (
            <View alignV={'center'} margin={'0 0 0 24px'} >
                <SelectField value={favFoldId} onChange={( e, index, favFoldId ) => this.setFavFoldId( favFoldId )} >
                    {
                        F(
                            this.props.data.likeData.fav, ( data, id ) => {
                                return <MenuItem key={id + 'liketitle'} value={id} primaryText={data.FolderName} />
                            }
                        )
                    }
                </SelectField>
                <EditIcon {...S()
                    .marginLeft( 8 )
                    .color( T.palette.grey, 2 )
                    .color( T.palette.darkBlack, 3 )
                    .hand()
                    .tap( () => this.openDialog( 'openEditFoldName' ) )
                    .p()} />
                <AddIcon {...S()
                    .marginLeft( 8 )
                    .color( T.palette.grey, 2 )
                    .color( T.palette.darkBlack, 3 )
                    .hand()
                    .tap( () => this.openDialog( 'openAddLikeFolder' ) )
                    .p()}/>
                <RemoveIcon {...S()
                    .marginLeft( 8 )
                    .color( T.palette.grey, 2 )
                    .color( T.palette.darkBlack, 3 )
                    .hand()
                    .tap( () => DD( '将会连同收藏夹下的内容一起删除, 确定要删除吗?', LIKE_FOLDER_REMOVE, null, favFoldId ) )
                    .p()}/>
                {this.editLikeFolderName()}
            </View>
        )
    }

    editLikeFolderName() {
        const { openEditFoldName, openAddLikeFolder, likeFolderDatas, favFoldId } = this.state
        const { fav } = this.props.data.likeData

        let datas = {}
        if ( openEditFoldName ) {
            datas.FolderName = !likeFolderDatas.FolderName ? fav[ favFoldId ].FolderName : likeFolderDatas.FolderName
            datas.Id = Number( favFoldId )
        } else {
            datas.FolderName = likeFolderDatas.FolderName
            datas.FolderType = likeFolderDatas.FolderType
        }

        if ( openEditFoldName || openAddLikeFolder ) {
            return (
                <Form
                    open={true}
                    datas={datas}
                    width={500}
                    label={openAddLikeFolder ? '添加收藏夹' : '修改标签名称'}
                    isSubmitJson={true}
                    close={() => this.closeDialog( openEditFoldName ? 'openEditFoldName' : 'openAddLikeFolder' )}
                    actionType={openAddLikeFolder ? LIKE_FOLDER_ADD : LIKE_EDIT_FOLDERNAME} >
                    <TextField
                        name={'FolderName'}
                        onChange={( name, value ) => this.setFormDatas( name, value, 'likeFolderDatas' )}
                        label={'标签名称'}
                        rules={{ required: true, maxLength: 64, minLength: 2 }}
                        value={datas.FolderName}
                    />
                    {openAddLikeFolder &&
                     <CheckView
                         checked={datas.FolderType}
                         name={'FolderType'}
                         label="标签类型"
                         isNumber={true}
                         datas={{ 1: '商品收藏', 0: '店铺收藏' }}
                         onCheck={( name, value ) => this.setFormDatas( name, value, 'likeFolderDatas' )}
                     />}
                </Form>
            )
        }
        return null
    }

    getShippingFeeData = () => {
        let datas = this.getGoodsDatas()
        let ids = this.getShopIds( datas )
        let goodseses = []
        let goodsNumses = []
        let amounts = []
        ids.forEach( ( storeId ) => {
            let goodses = []
            let amount = 0
            let goodsNumsTemp = []
            F( datas, ( goods ) => {
                if ( storeId == goods.StoreId ) {
                    goodses.push( goods.GoodsId )
                    goodsNumsTemp.push( goods.GoodsNum )
                    amount = Math.round( (amount + goods.GoodsPrice * goods.GoodsNum) * 100 ) / 100
                }
            } )
            goodseses.push( goodses.join( ',' ) )
            goodsNumses.push( goodsNumsTemp )
            amounts.push( amount )
        } )

        return {
            Goodseses: JSON.stringify( goodseses ),
            GoodsNumses: JSON.stringify( goodsNumses ),
            Amounts: JSON.stringify( amounts )
        }

    }

    getGoodsDatas = () => {
        const { cartData, likeData } = this.props.data
        const { checkedItemId, isCheckedCart, favFoldId } = this.state
        let datas
        if ( isCheckedCart ) {
            datas = MM( cartData )
        } else {
            if ( !favFoldId || !likeData.fav || !likeData.fav[ favFoldId ].FolderData ) {
                return null
            }
            datas = MM( likeData.fav[ favFoldId ].FolderData )
        }

        if ( checkedItemId.length ) {
            let goods = {}
            F( datas, ( item, id ) => {
                //如果有选择项
                if ( checkedItemId.indexOf( id ) != -1 ) {
                    goods[ id ] = item
                }
            } )

            return goods
        }

        return datas
    }

    /**
     * 生成点单数据,拆分订单
     * @returns {Array}
     *
     * **********
     * 还没有计算运费和佣金
     */
    getOrderDatas() {
        const { cartData, likeData, goodsData } = this.props.data
        const { favFoldId, isCheckedCart, checkedItemId, checkedGroupId } = this.state
        let datas = this.getGoodsDatas()

        //如果有选择,则根据选择
        if ( checkedItemId.length != 0 ) {
            let temp = {}
            checkedItemId.forEach( ( id ) => {
                if ( datas[ id ] ) {
                    temp[ id ] = datas[ id ]
                } else {
                    return null
                }
            } )
            datas = temp
        }

        let ids = this.getShopIds( datas )
        // this.log('getOrderDatas', goodsData)
        let newData = []
        let goodses = []
        let tagIds = []
        ids.forEach( ( i ) => {
                let order = {}
                let goods = []
                let tags = []
                let amount = 0
                let needSetTags = true
                F( datas, ( item ) => {
                    if ( i == item.StoreId ) {
                        order.StoreId = item.StoreId
                        order.StoreName = item.StoreName
                        //运费
                        //order.ShippingFee = 0

                        amount += item.GoodsPrice * item.GoodsNum

                        if ( item.CartType ) {
                            delete item.CartType
                        }

                        delete item.Id
                        delete item.StoreName
                        //item.GcId = goodsData[id].GcId3

                        goods.push( item )

                        //获取标签id
                        if ( needSetTags && this.props.goodsTags && checkedGroupId ) {
                            if ( this.props.goodsTags[ item.GoodsId ] ) {
                                F( this.props.goodsTags[ item.GoodsId ], ( tag, id ) => {
                                    if ( tag.GroupId == this.getTagGroupId() ) {
                                        tags = MA( tags, id )
                                    }
                                } )
                            } else {
                                needSetTags = false
                                tags = []
                            }
                        }
                    }
                } )

                order.PaymentCode = 'offline'
                order.OrderAmount = amount
                order.GoodsAmount = amount

                newData.push( order )
                goodses.push( goods )

                if ( tags.length == 0 ) {
                    tagIds.push( "" )
                } else {
                    tagIds.push( tags.join( ',' ) )
                }
            }
        )

        return { orders: newData, goods: goodses, tagIds: tagIds.join( '|' ) }
    }

    getGroupIds = () => {
        const groupIds = []
        const { user } = this.props
        if ( user.ownerGroups ) {
            F( user.ownerGroups, ( group, id ) => {
                groupIds.push( id )
            } )
        }
        if ( user.joinGroups ) {
            F( user.joinGroups, ( group ) => {
                if( groupIds.indexOf(group.GroupBelong) == -1 ) {
                    groupIds.push( group.GroupBelong )
                }
            } )
        }
        return groupIds
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        //this.log(this.props.user)
        const { checkedItemId, isCheckedCart, favFoldId } = this.state
        if ( isCheckedCart && checkedItemId.length != 0 ) {
            checkedItemId.forEach( ( id ) => {
                if ( !this.props.cartData[ id ] ) {
                    this.setState( { checkedItemId: [] } )
                    return
                }
            } )
        }
        const likeData = this.props.data.likeData
        if ( favFoldId && likeData && likeData.fav[ favFoldId ].FolderData ) {
            let goodsNum = Object.keys( likeData.fav[ favFoldId ].FolderData ).length
            if ( !this.favGoodsNum.hasOwnProperty( favFoldId + '' ) || this.favGoodsNum[ favFoldId ] < goodsNum ) {
                this.favGoodsNum[ favFoldId ] = goodsNum
                D( GOODS_TAG_LOAD, this.goodsTagLoadQuery( likeData.fav[ favFoldId ].FolderData ) )
            } else if ( !this.isLoaded( GOODS_TAG_LOAD, favFoldId ) ) {
                this.load( GOODS_TAG_LOAD,
                    this.goodsTagLoadQuery( likeData.fav[ favFoldId ].FolderData ),
                    null,
                    favFoldId )
            }
        }

    }

    goodsTagLoadQuery = ( favFoldGoods ) => {
        let goodsIds = []
        F( favFoldGoods, ( data ) => {
            goodsIds.push( data.GoodsId )
        } )
        return Q().add( 'GoodsIds', goodsIds.join( ',' ) ).add( 'GroupIds', this.getGroupIds().join( ',' ) ).ok()
    }
}

//删除图标属性
const removeListItemProps = S()
    .size( 24 )
    .position( 1 )
    .top( -12 )
    .right( -12 )
    .color( T.palette.black300a, 2 )
    .color( 'black', 3 )
    .p()

//header高度
const headerHeight = 64
//购物车和收藏图标
const iconSize = 32
const sideWidth = 256

//item checkbox 属性
const checkboxProps =
    S().inline( 1 ).size( 18 )
       .add( 'checkedIcon', <RadioCheckedIcon /> )
       .add( 'uncheckedIcon', <RadioUncheckedIcon color="grey" /> )
       //.checked()
       .p()

//总计价格
const totalPriceProps = S().color( T.palette.gold, 1 ).size( 32, 1 ).center().p()

//结算按钮
const totalButtonProps = S()
    .text( '结 算' )
    .width( sideWidth - 32 )
    .marginLeft( 16 )
    .color( T.palette.orange )
    .radius( 8 )
    .p()

export default connect(
    ( state ) => {
        return {
            goodsTags: state.goodsTags,
            error: state.error,
            user: state.user,
            ownerGroups: state.user && state.user.ownerGroups,
            joinGroups: state.user && state.user.joinGroups,
            data: {
                cartData: state[ CART ].datas,
                likeData: state[ LIKE ],
                goodsData: state[ GOODS ]
            }
        }
    }
    //bindActionCreators()
)( CartAndLike )