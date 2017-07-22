/**
 * Created by kenn on 16/7/16.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { BaseComponent, Button, View, SelectView, FullDialog } from '../../../components/BaseComponent'
import { D, DD, T, M, F, C, MM, Q } from '../../../common'
import Category from '../../common/ui/Category'
import EditGoodsDetails from './EditGoodsDetails'

import * as TYPE from '../../../actions/type'

class GoodsEdit extends BaseComponent {
    display = 'GoodsEdit'

    state = {}

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    componentDidMount() {
        if ( !this.props.categorys || !C( this.props.categorys ) ) {
            D( TYPE.CATEGORY_LOAD )
        }
    }

    checkedCategory( GcId3, level ) {
        if ( level == 3 ) {
            const { categorys } = this.props
            const GcId2 = this.getBy( categorys, 'GcParentId', GcId3 )
            const GcId1 = this.getBy( categorys, 'GcParentId', GcId2 )
            const GcName = this.getBy( categorys, 'GcName', GcId3 )

            D( TYPE.BRANDS_LOAD, 'class_id=' + GcId3 )
            D( TYPE.TYPES_LOAD,  Q().add('GcId1', GcId1).add('GcId2', GcId2).add('GcId3', GcId3).ok())
            D( TYPE.GOODS_EDIT_SELECT_CATEGORY, { GcId1, GcId2, GcId3, GcName } )
        }
    }

    getTypeSelectData() {
        const data = {}
        F( this.props.types, ( type, id ) => {
            data[ id ] = this.getTypeString(type)
        } )
        return data
    }

    getTypeString(type) {
        return type.TypeName + "(" + type.desc + ')'
    }

    onCheckedType = ( id ) => {
        const { goodsCommon } = this.props.goodsEdit
        const data = { typeId: id, specs: this.props.types[ id ].Specs }
        if ( goodsCommon.TypeId != id ) {
            DD( '已编辑的商品数据将丢失，确实要重新选择类型吗？', TYPE.GOODS_EDIT_COMMON_TYPE, data )
        }
    }

    setGoodsByCommon = ( goods, ...names ) => {
        const { goodsEdit } = this.props
        names.forEach( ( name ) => {
            if ( goods[ name ] == '' || !goods[ name ] ) {
                goods[ name ] = goodsEdit.goodsCommon[ name ]
            }
        } )
    }

    error = ( text ) => {
        return <View fontColor={T.palette.error} fontSize={T.fontSize.big} >{text}</View>
    }

    onButton = ( name ) => {
        const { goodsEdit, storeInfo } = this.props
        switch ( name ) {
            case 'save':
                let GoodsCommon = MM( goodsEdit.goodsCommon )

                if( GoodsCommon.GoodsName == '' ) {
                    FullDialog(this.error('商品名称必须填写！！'))
                    return
                }

                if( GoodsCommon.GoodsImage == '' ) {
                    FullDialog(this.error('商品主图必须设置！！'))
                    return
                }

                if( !GoodsCommon.GoodsPrice ) {
                    FullDialog(this.error('商品价格必须设置！！'))
                    return
                }

                const Goodses = []
                const SpecValues = []
                let formData = new FormData()

                GoodsCommon.StoreName = storeInfo.storeName
                //this.log(GoodsCommon)
                F( MM(goodsEdit.goods), ( goods ) => {
                    goods.StoreName = storeInfo.storeName
                    this.setGoodsByCommon( goods,
                        'GoodsName',
                        'GoodsJingle',
                        'GoodsImage',
                        'GcId1',
                        'GcId2',
                        'GcId3',
                        'GcName',
                        'GoodsPrice',
                        'GoodsSerial',
                        'StoreName',
                        'TransportId',
                        'GoodsStorage',
                        'GoodsStorageSlarm' )

                    const specTemp = {}
                    F( goods.Specs, ( spec, specId ) => {
                        let value = ''
                        GoodsCommon.Specs.forEach( ( spec ) => {
                            if ( spec.Id == specId ) {
                                spec.values.forEach( ( valueData ) => {
                                    if ( valueData.Id == goods.Specs[ specId ] ) {
                                        value = valueData.SpValueName
                                    }
                                } )
                            }
                        } )
                        specTemp[ specId ] = [ goods.Specs[ specId ], value ]
                    } )
                    goods.Specs = JSON.stringify( specTemp )

                    this.log(goods.Specs)

                    goods.GoodsImages = goods.GoodsImages.join( ',' )
                    goods.GoodsBody = JSON.stringify( goods.GoodsBody )
                    Goodses.push( goods )
                } )

                delete GoodsCommon.GoodsStorage
                delete GoodsCommon.GoodsStorageSlarm

                let specErr = null
                if( GoodsCommon.Specs.length > 0 ) {
                    F(GoodsCommon.Specs, ( spec ) => {
                        if( spec.values.length > 0 ) {
                            spec.values.forEach(( val ) => {
                                if( val.SpValueName == '' ) {
                                    specErr = '商品规格值必须填写！！'
                                }
                            })
                            SpecValues.push(...spec.values)
                        } else {
                            specErr = '商品规格值必须填写！！'
                        }
                    })

                    if( specErr ) {
                        FullDialog(this.error(specErr))
                        return
                    }

                    if( SpecValues.length > 0 ) {
                        formData.append('SpecValues', JSON.stringify(SpecValues))
                    }
                }

                GoodsCommon.Specs = JSON.stringify( GoodsCommon.Specs )
                this.log('common',GoodsCommon.Specs)
                GoodsCommon.GoodsImages = GoodsCommon.GoodsImages.join( ',' )
                GoodsCommon.GoodsBody = JSON.stringify( GoodsCommon.GoodsBody )

                formData.append( 'GoodsCommon', JSON.stringify( GoodsCommon ) )
                formData.append( 'Goodses', JSON.stringify( Goodses ) )
                //D( TYPE.GOODS_EDIT_SAVE, formData )

                break
            case 'edit':
                this.setState( { isEditGoods: true } )
                break
            default:
                DD( '已编辑的商品数据将丢失，确实要取消吗？', TYPE.GOODS_EDIT_INIT )
                break
        }
    }


    render() {
        const { types, brands } = this.props

        const { goodsCommon } = this.props.goodsEdit

        const isEditGoods = !!goodsCommon.GcId3

        return (
            <View orientation={'column'}
                  width={0}
                  grow={1}
                  style={{ padding: '0 8px 8px' }}
                  alignH={'center'}
                  color={T.palette.lightGrey} >
                <View width={960} align={'between'} height={40} >
                    <Button
                        label={goodsCommon.GcName ? '分类: ' + goodsCommon.GcName : '请选择分类'}
                        margin={'0 8px 0 0'}
                        hoverFontColor={T.palette.main}
                    />

                    {goodsCommon.GcId3 && brands ?
                        <SelectView
                            width={200}
                            label={goodsCommon.BrandName ? '品牌: ' + goodsCommon.BrandName : '请选择品牌'}
                            hoverFontColor={T.palette.main}
                            required={true}
                            margin={'0 8px'}
                            items={brands}
                            onChecked={( id ) => D( TYPE.GOODS_EDIT_COMMON_BRAND, { id, name: brands[ id ] } ) }
                        />
                        : null
                    }

                    {goodsCommon.GcId3 ?
                        <SelectView
                            width={300}
                            required={true}
                            margin={'0 8px'}
                            hoverFontColor={T.palette.main}
                            label={goodsCommon.TypeId ? '类型: ' + this.getTypeString(types[goodsCommon.TypeId]) : '请选择类型'}
                            items={this.getTypeSelectData()}
                            onChecked={this.onCheckedType}
                        />
                        : null
                    }


                    {isEditGoods &&
                     <View>
                         <Button
                             width={48}
                             label={'取消'}
                             color={T.palette.grey}
                             fontColor={T.palette.white}
                             hoverColor={T.palette.main}
                             onTap={() => this.onButton( 'cancel' )}
                         />
                         <Button
                             width={48}
                             label={'保存'}
                             color={T.palette.grey}
                             fontColor={T.palette.white}
                             hoverColor={T.palette.main}
                             margin={'0 0 0 8px'}
                             onTap={() => this.onButton( 'save' )}
                         />
                     </View>
                    }
                </View>
                {isEditGoods ?
                    <EditGoodsDetails />
                    :
                    <Category
                        color={T.palette.darkBlack}
                        onTap={this.checkedCategory.bind( this )}
                    />
                }
            </View>
        )
    }

    onRequestClose() {
        this.setState( {
            open: false
        } )
    }
}

export default connect(
    ( state ) => {
        return {
            storeInfo: state.store,
            goodsEdit: state.goodsEdit,
            categorys: state.categorys,
            types: state.types,
            brands: state.brands
        }
    }
    //bindActionCreators()
)( GoodsEdit )