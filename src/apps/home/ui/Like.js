/**
 * Created by kenn on 16/7/15.
 */
import React from 'react'
import { connect } from 'react-redux'

import { S, P, M, F, D, Q, T, DD } from '../../../common'
import { BaseComponent, Form, GroupRadio, TextField, CheckView } from '../../../components/BaseComponent'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';


import { LIKE, GOODS, GOODS_COMMON } from '../../../store/api'
import {
    LIKE_ADD, LIKE_REMOVE, LIKE_REMOVE_ALL, LIKE_FOLDER_ADD
} from '../../../actions/type'

let style = {}

/**
 * 收藏组件
 * 如果是下啦菜单则组件没有收藏功能
 * props
 *  addData   添加的数据
 *  type     收藏类型, 默认0 商品  1 通用商品  2 店铺
 *  GoodsNum
 *  GoodsPrice
 *  FavImage
 *
 *  onTap
 */
class Like extends BaseComponent {

    static defaultProps = {
        type: 0
    }

    constructor( props ) {
        super( props )
        this.display = 'Like'

        this.state = {
            favFoldId: props.data.likeData ? Object.keys( props.data.likeData )[ 0 ] : 0,
            isEditName: false,
            openDialog: false,
            favFolderData: {
                FolderName: false,
                FolderType: 1
            },
        }
    }

    /**
     * 收藏夹菜单点击事件,
     * @param folderId
     * @param name
     * @param favId      favId不为false则是已收藏,则撤除, 否则添加
     */
    tap( folderId, name, favId ) {

        const { onTap } = this.props

        if ( favId ) {
            D( LIKE_REMOVE, {folderId, Id: favId}, 'form' )
        } else {
            D( LIKE_ADD, this.createFavData( folderId, name ) )
        }

        onTap && onTap( folderId, name )
    }

    /**
     * 是否已经被收藏,检查所有文件夹
     * @returns {boolean}
     */
    hasLiked() {
        const { addData } = this.props
        if ( !addData ) {
            return false
        }
        const { likeData } = this.props.data

        let isLiked = false
        F( likeData, ( folderData, folderId ) => {
            F( folderData.FolderData, ( data, id ) => {
                if ( data.GoodsId == addData.GoodsId ) {
                    isLiked = true
                    return false
                }
            } )
            if ( isLiked ) {
                return false
            }
        } )
        return isLiked
    }

    /**
     * 创建收藏夹数据
     * @param FolderId
     * @param FolderName
     * @returns {*}
     */
    createFavData( FolderId, FolderName ) {
        if ( this.props.addData ) {
            let data = this.props.addData
            data.FolderId = Number( FolderId )
            data.FolderName = FolderName
            return data
        }
    }

    render() {
        return <div>
            {this.likeView()}
            {this.addDialog()}
        </div>
    }

    /**
     * 收藏菜单
     * @returns {XML}
     */
    likeView() {
        const hasliked = this.hasLiked()
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><FavoriteIcon color={hasliked ? T.palette.main : T.palette.grey } /></IconButton>}
                style={M( style, this.props.style || {} )}
                iconStyle={{ width: 30, height: 30 }}
            >
                {this.items( hasliked )}
            </IconMenu>
        )
    }

    setFolderData( name, value ) {
        let favFolderData = this.state.favFolderData
        if ( name == 'FolderType' ) {
            value = Number( value )
        }

        favFolderData[ name ] = value
        this.setState( { favFolderData } )
    }

    /**
     * 收藏夹添加和名称编辑dialog
     * @returns {*}
     */
    addDialog() {
        //const { fav } = this.props.data.likeData
        const { isEditName, favFoldId, openDialog, favFolderData } = this.state
        // this.log(favFolderData.FolderType)
        if ( openDialog ) {
            return (
                <Form modal={true}
                      open={true}
                      width={500}
                      close={() => this.setState( { openDialog: false } )}
                      datas={favFolderData}
                      isSubmitJson={true}
                      label="添加收藏夹"
                      actionType={LIKE_FOLDER_ADD}
                >
                    <TextField
                        name="FolderName"
                        value={favFolderData.FolderName}
                        label={'标签名称'}
                        onChange={( name, value ) => this.setFolderData( name, value )}
                        rules={{ maxLength: 64, required: true }}
                    />
                    <CheckView
                        name={'FolderType'}
                        datas={{ 1: '商品收藏', 0: '店铺收藏' }}
                        checked={favFolderData.FolderType}
                        isNumber={true}
                        onCheck={( name, value ) => this.setFolderData( name, value )}
                    />
                </Form>
            )
        }

        return null
    }

    /**
     * 根据商品id查看是否被收藏
     * @param folderId
     * @returns {boolean}
     */
    isLiked( folderId ) {
        const { addData } = this.props
        if ( !addData ) {
            return false
        }
        const { likeData } = this.props.data
        let isLiked = false
        F( likeData[ folderId ].FolderData, ( data ) => {
            if ( data.GoodsId == addData.GoodsId ) {
                isLiked = data.Id
                return false
            }
        } )
        //this.log(addData)
        //this.log(isLiked)
        return isLiked
    }

    items( hasLiked ) {
        let items
        const { addData } = this.props

        items = F(
            this.props.data.likeData, ( data, folderId ) => {
                // this.log('items',this.isLiked( folderId ))
                let isLike = this.isLiked( folderId )
                return <MenuItem
                    {...S()
                        .key( folderId )
                        .value( folderId )
                        .text( data.FolderName, 1 )
                        .checked( !!isLike )
                        .color( T.palette.darkBlack, 1 )
                        .tap( () => this.tap( folderId, data.FolderName, isLike ) )
                        .p()}/>
            }
        )


        items.push(
            <MenuItem
                {...S()
                    .key( 'remmm' )
                    .text( '+ 添加新标签', 1 )
                    .value( -1 )
                    .size( T.fontSize.small, 1 )
                    .color( T.palette.grey, 1 )
                    .tap( () => this.setState( { openDialog: true } ) )
                    .p()}/>
        )

        if ( hasLiked ) {
            items.push(
                <MenuItem
                    {...S()
                        .key( 'refdfddsmmm' )
                        .text( '× 取消全部', 1 )
                        .value( -1 )
                        .size( T.fontSize.small, 1 )
                        .color( T.palette.grey, 1 )
                        .tap( () => DD( '确定要在所有文件夹中取消该商品吗?',
                            LIKE_REMOVE_ALL,
                            this.formdata( { GoodsId: addData.GoodsId, Id: 0 } ),
                            'form' ) )
                        .p()}
                />
            )
        }

        return items
    }

    // createData( favFoldName ) {
    //     const { goodsId, storeId } = this.props
    //     const { goodsData } = this.props.data
    //     let storeData = {}
    //     return {
    //         FolderName: favFoldName,
    //         FolderType: 0,
    //         FolderData: {
    //             StoreId: storeId || goodsData[ goodsId ].StoreId,
    //             StoreName: goodsData[ goodsId ].StoreName,
    //             GoodsId: goodsId || null,
    //             GoodsName: goodsId ? goodsData[ goodsId ].GoodsName : null,
    //             GoodsNum: 1,
    //             GoodsPrice: goodsId ? goodsData[ goodsId ].GoodsPrice : null,
    //             FavImage: goodsId ? goodsData[ goodsId ].GoodsImage : storeData[ storeId ].StoreImage,
    //         }
    //     }
    // }
}

export default connect(
    ( state )=> {
        return {
            data: {
                likeData: state[ LIKE ].fav,
                goodsData: state[ LIKE ].goodsDatas,
                goodsCommonData: state[ LIKE ].commonDatas,
            }
        }
    }
    //bindActionCreators()
)( Like )