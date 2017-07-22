/**
 * Created by kenn on 2017/1/11.
 */
import React from 'react'
import { connect } from 'react-redux'


import { M, F, D, Q, T, L, C, STOREIMG } from '../../../common'
import {
    BaseComponent, View, Button, TextField, Label, FloatButton,
    RemoveCircleIcon, VisibilityIcon, ModeEditIcon, EditView, FullDialog, SelectView
} from '../../../components/BaseComponent'
import ImageCarousel from '../../../components/ImageCarousel'
import Album from '../../common/ui/Album'

import {
    GOODS_EDIT_PRICE,
    GOODS_EDIT_NAMES,
    GOODS_EDIT_JINGLE,
    GOODS_EDIT_SPEC_VALUE,
    GOODS_EDIT_SPEC_ADD,
    GOODS_EDIT_SPEC_REMOVE,
    GOODS_EDIT_IMAGES_ADD,
    GOODS_EDIT_MAIN_IMAGE,
    GOODS_EDIT_IMAGE_REMOVE,
    GOODS_EDIT_IMAGE_REPLACE,
    GOODS_EDIT_BODY_ADD,
    GOODS_EDIT_BODY_REMOVE,
    GOODS_EDIT_BODY_EDIT,
    GOODS_EDIT_STORE_SERIAL,
    GOODS_EDIT_STORE_TRANSPORT,
    STORE_TRANSPORT_LOAD,
    GOODS_EDIT_STORAGE,
    GOODS_EDIT_STORAGE_SLARM

} from '../../../actions/type'

class EditGoodsDetails extends BaseComponent {
    display = 'EditGoodsDetails'

    static defaultProps = {
        width: 960,
        height: 'auto',
    }

    state = {
        specChecked: {},
        checkedGoodsIds: [],
        isEditSpec: false,
        mainImageIndex: -1,
        attrIndex: -1,
        openDialog: true
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
    }

    getGoodsValue( name ) {
        const { goods, goodsCommon } = this.props
        const { checkedGoodsIds } = this.state
        let value = null
        switch ( checkedGoodsIds.length ) {
            case 0:
                value = goodsCommon[ name ]
                break
            case 1:
                value = goods[ checkedGoodsIds[ 0 ] ][ name ]
                break
            default:
                checkedGoodsIds.forEach( ( id, i ) => {
                    if ( goods[ id ][ name ] ) {
                        if ( i == 0 ) {
                            value = goods[ id ][ name ]
                        } else if ( name == 'GoodsImages' || name == 'GoodsBody' ) {
                            //this.log( value )
                            if ( value && JSON.stringify( value ) != JSON.stringify( goods[ id ][ name ] ) ) {
                                value = null
                                return
                            }
                        } else if ( value != goods[ id ][ name ] ) {
                            value = null
                            return
                        }
                    }
                } )
                break
        }
        return value === null && name != 'GoodsImages' && name != 'GoodsBody' ? '' : value
    }

    /**
     * 判断规格值是否被选择
     * @param specId
     * @param valueId
     * @returns {*}
     */
    isCheckedSpec( specId, valueId ) {
        return this.state.specChecked[ specId ] && this.state.specChecked[ specId ].indexOf( valueId ) != -1
    }

    /**
     * 规格值选择状态,可以多选
     * @param specId
     * @param valueId
     * @param value
     */
    checkedSpecs( specId, valueId ) {

        let specChecked = this.state.specChecked

        //如果有specId,则检查是否存在valueId,如果有则撤除,没有则添加
        //如果valueId撤除后,values为空对象则根据specid撤除规格
        if ( specChecked[ specId ] ) {
            const index = specChecked[ specId ].indexOf( valueId )
            if ( index != -1 ) {
                specChecked[ specId ].splice( index, 1 )
                if ( !specChecked[ specId ].length ) {
                    delete specChecked[ specId ]
                }
            } else {
                specChecked[ specId ].push( valueId )
            }
        } else {
            specChecked[ specId ] = []
            specChecked[ specId ].push( valueId )
        }

        this.setState( { specChecked, checkedGoodsIds: this.getGoodsIds( specChecked ) } )
    }

    /**
     * 根据规格值删选goods, 并返回goodsId数组
     * @returns {*}
     */
    getGoodsIds( specChecked ) {

        let goods = this.props.goods
        if ( !goods || !C( specChecked ) ) {
            return []
        }

        let goodsIds = Object.keys( goods )
        //this.log(goodsIds)
        let gIds = []

        F( specChecked, ( values, specId ) => {
            values.forEach( ( valueId ) => {
                goodsIds.forEach( ( goodsId ) => {
                    if ( goods[ goodsId ].Specs[ specId ] == valueId ) {
                        gIds.push( goodsId )
                    }
                } )
            } )
            goodsIds = gIds
            gIds = []
        } )
        //this.log( goodsIds )
        return goodsIds
    }

    /**
     * 规格区域显示
     * 如果是编辑状态,则可以添加删除编辑规格值
     * 如果不是,则根据规格值选择,设置相应的goods价格、图片、详情等
     * @returns {*}
     */
    specs() {
        const { goodsCommon, goods } = this.props
        const { isEditSpec } = this.state

        const align = isEditSpec ? 'stretch' : 'start'

        if ( goodsCommon.Specs.length ) {
            return (
                <View orientation={'column'} width={'100%'} alignH={align} >
                    {F( goodsCommon.Specs, ( specData, specIndex ) => {
                        const specId = specData.Id
                        return (
                            <View key={specIndex + 'spec'} style={{ marginTop: 8 }} orientation={'column'} alignH={align} >
                                <Label
                                    key={specId + 'speclabel'}
                                    text={specData.SpName}
                                    fontColor={T.palette.grey}
                                    fontSize={T.fontSize.small}
                                />
                                <View wrap={isEditSpec ? 'nowrap' : 'wrap'}
                                      margin={'0 8px'}
                                      alignH={'stretch'}
                                      orientation={isEditSpec ? 'column' : 'row'} >
                                    {F( specData.values, ( value, valueIndex ) => {
                                        const valueId = value.Id
                                        //如果是编辑状态则显示编辑文本框,否则显示选择项
                                        if ( this.state.isEditSpec ) {
                                            return (
                                                <View key={specId + valueId + 'textspan'} width={'100%'}
                                                      alignV={'center'}
                                                >
                                                    <TextField
                                                        name={valueId + ''}
                                                        fullWidth={true}
                                                        key={specId + valueId + 'textfield'}
                                                        value={value.SpValueName}
                                                        onChange={( name, SpValueName ) => D( GOODS_EDIT_SPEC_VALUE,
                                                            { specIndex, valueIndex, SpValueName } )}
                                                    />
                                                    <RemoveCircleIcon
                                                        key={specId + valueId + 'RemoveCircleIcon'}
                                                        style={{ cursor: 'pointer' }}
                                                        color={T.palette.grey}
                                                        hoverColor={T.palette.darkBlack}
                                                        onClick={() => D( GOODS_EDIT_SPEC_REMOVE,
                                                            { specIndex, valueIndex } )}
                                                    />
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <Button
                                                    key={valueId + 'chip'}
                                                    height={24}
                                                    radius={12}
                                                    label={value.SpValueName}
                                                    color={T.palette.minGrey}
                                                    shadowColor={T.palette.main}
                                                    margin={4}
                                                    style={{ minWidth: 24 }}
                                                    shadowSize={this.isCheckedSpec( specId, valueId ) ? 4 : 0}
                                                    onTap={() => this.checkedSpecs( specId, valueId )}
                                                />
                                            )
                                        }
                                    } )}
                                    {this.state.isEditSpec ?
                                        <Button
                                            fontColor={T.palette.grey}
                                            hoverFontColor={T.palette.main}
                                            label={' + 添加新规格值'}
                                            onTap={() => D( GOODS_EDIT_SPEC_ADD, specIndex )}
                                        />
                                        : null
                                    }
                                </View>
                            </View>
                        )
                    } )}
                </View>
            )
        }
        return null
    }

    mainImageChange = ( image, goodsIds, index ) => {
        if ( image ) {
            D( GOODS_EDIT_MAIN_IMAGE, { image, goodsIds, index } )
            this.setState( { mainImageIndex: 0 } )
        }
    }

    imageTool() {
        const { goods, goodsCommon } = this.props
        const { checkedGoodsIds, mainImageIndex } = this.state
        const buttonProps = {
            width: 0,
            grow: 1,
            color: T.palette.black700a,
            hoverColor: T.palette.darkBlack,
            fontColor: 'white',
            radius: 0
        }

        //判断是主图，以及图片是否上传了9张
        let mainGoodsImage = null
        let showAddButton = true
        if ( mainImageIndex != -1 ) {
            if ( checkedGoodsIds.length > 0 ) {
                if ( goods[ checkedGoodsIds[ 0 ] ].GoodsImages[ mainImageIndex ] !=
                     goods[ checkedGoodsIds[ 0 ] ].GoodsImage ) {
                    mainGoodsImage = goods[ checkedGoodsIds[ 0 ] ].GoodsImages[ mainImageIndex ]
                }
                if ( goods[ checkedGoodsIds[ 0 ] ].GoodsImages.length > 9 ) {
                    showAddButton = false
                }
            } else {
                if ( goodsCommon.GoodsImages[ mainImageIndex ] != goodsCommon.GoodsImage ) {
                    mainGoodsImage = goodsCommon.GoodsImages[ mainImageIndex ]
                }
                if ( goodsCommon.GoodsImages.length >= 9 ) {
                    showAddButton = false
                }
            }
        }

        //onChange={( images, imageNames ) => D( GOODS_EDIT_IMAGES_ADD, { images, goodsIds: checkedGoodsIds, imageNames
        // } )}

        return (
            <View radius={'0 16px 16px 0'} width={280} height={32} style={{ position: 'absolute', top: 30, left: 0 }} >
                {mainImageIndex != -1 &&
                 <Button
                     {...buttonProps}
                     label={mainGoodsImage ? '设为主图' : '主图'}
                     onTap={() => this.mainImageChange( mainGoodsImage, checkedGoodsIds, mainImageIndex )}
                 />
                }
                {showAddButton &&
                 <Button
                     {...buttonProps}
                     label={'添加'}
                     onTap={() => FullDialog( <Album onChecked={( images ) => D( GOODS_EDIT_IMAGES_ADD,
                         { images, goodsIds: checkedGoodsIds } )} /> )}
                 />
                }
                {mainImageIndex != -1 &&
                 <Button
                     {...buttonProps}
                     label={'替换'}
                     onTap={( images, imageNames ) => FullDialog(
                         <Album
                             max={1}
                             onChecked={( images ) => D( GOODS_EDIT_IMAGE_REPLACE,
                                 { image: images[ 0 ], index: mainImageIndex, goodsIds: checkedGoodsIds } )}
                         /> )}
                 />
                }
                {mainImageIndex != -1 &&
                 <Button
                     {...buttonProps}
                     label={'删除'}
                     onTap={() => D( GOODS_EDIT_IMAGE_REMOVE, { index: mainImageIndex, goodsIds: checkedGoodsIds } )}
                 />
                }
            </View>
        )
    }

    overMainImage = ( mainImageIndex ) => {
        if ( mainImageIndex != this.state.mainImageIndex ) {
            this.setState( { mainImageIndex } )
        }
    }

    detailsBody = () => {
        const { width, cacheImages } = this.props
        const { checkedGoodsIds, openDialog } = this.state
        const bodyDatas = this.getGoodsValue( 'GoodsBody' )

        return (
            <View color={'white'} width={'100%'} margin={'16px 0'} orientation={'column'}
                  overflow={'visible'} >
                {bodyDatas && bodyDatas.length > 0 && F( bodyDatas, ( bodyData, i ) => {
                    return (
                        <EditView
                            key={'ev' + i}
                            width={width}
                            data={bodyData}
                            onChange={( data ) => D( GOODS_EDIT_BODY_EDIT,
                                { goodsIds: checkedGoodsIds, body: data, index: i } )}
                            onRemove={() => D( GOODS_EDIT_BODY_REMOVE, { goodsIds: checkedGoodsIds, index: i } )}
                        />
                    )
                } )}

                {bodyDatas &&
                 <EditView
                     width={width}
                     height={200}
                     data={bodyDatas[ bodyDatas.length - 1 ]}
                     onAdd={( data ) => D( GOODS_EDIT_BODY_ADD,
                         { goodsIds: checkedGoodsIds, body: data } )}
                 />}

                {!bodyDatas &&
                 <View width={'100%'} height={300} orientation={'column'} alignH={'center'} alignV={'center'} >
                     <Label
                         text={'您选择了多个规格产品且详情页设置不同，现不能进行同时设置，如需同时设置，清除前面的设置，再同时设置！'}
                     />
                     <Button
                         width={128}
                         height={40}
                         color={T.palette.main}
                         hoverColor={T.palette.orange}
                         label={'清除设置'}
                         onTap={() => D( GOODS_EDIT_BODY_REMOVE, { goodsIds: checkedGoodsIds, index: -1 } )}
                     />
                 </View>
                }
            </View>
        )
    }

    getTransportData = () => {
        if ( !this.props.storeTransports ) {
            return {}
        }

        const data = {}
        this.props.storeTransports.forEach( ( tr ) => {
            data[ tr.Id ] = tr.Title
        } )
        return data
    }

    render() {
        const {
            width,
            height,
            goods,
            goodsCommon,
            storeTransports
        } = this.props
        const { checkedGoodsIds, isEditSpec, mainImageIndex } = this.state

        const images = STOREIMG( this.getGoodsValue( 'GoodsImages' ) )
        const transport = this.getTransportData()
        //this.log( goodsCommon )
        return (
            <View
                width={width}
                height={height}
                margin={16}
                overflow={'visible'}
                orientation={'column'}
            >
                <View width={width} style={{ position: 'relative' }} overflow={'visible'} color={'white'} >
                    <ImageCarousel
                        width={450}
                        height={450}
                        max={images ? images.length : 0}
                        images={images}
                        checked={mainImageIndex}
                        onRequestImageIndex={this.overMainImage}
                    />
                    {this.imageTool()}

                    <View orientation={'column'} width={0} grow={1} margin={8} >
                        <View alignSelf={'end'} alignV={'center'} width={128} >
                            <Label text={"￥"} fontColor={T.palette.gold} fontSize={T.fontSize.max} />
                            <TextField
                                lineShow={false}
                                name="goodsPrice"
                                fontSize={T.fontSize.max}
                                fontColor={T.palette.gold}
                                style={{ height: T.height.min }}
                                hintText={'填写价格'}
                                value={this.getGoodsValue( 'GoodsPrice' )}
                                onChange={( name, value ) => D( GOODS_EDIT_PRICE,
                                    { value, goodsIds: checkedGoodsIds } )}
                            />
                        </View>
                        <TextField
                            lineShow={false}
                            hintText={'填写商品名称'}
                            fontSize={T.fontSize.big}
                            style={{ height: T.height.min }}
                            value={this.getGoodsValue( 'GoodsName' )}
                            name="goodsName"
                            onChange={( name, value ) => D( GOODS_EDIT_NAMES, { value, goodsIds: checkedGoodsIds } )}
                        />
                        <TextField
                            lineShow={false}
                            hintText={'填写商品简介'}
                            fontSize={T.fontSize.small}
                            fontColor={T.palette.grey}
                            style={{ height: T.height.min }}
                            value={this.getGoodsValue( 'GoodsJingle' )}
                            name="GoodsJingle"
                            onChange={( name, value ) => D( GOODS_EDIT_JINGLE, { value, goodsIds: checkedGoodsIds } )}
                        />
                        <View>
                            <TextField
                                lineShow={false}
                                fullWidth={false}
                                hintText={'填写商家商品编号'}
                                fontSize={T.fontSize.small}
                                fontColor={T.palette.grey}
                                style={{ height: T.height.min }}
                                value={this.getGoodsValue( 'GoodsSerial' )}
                                name="GoodsJingle"
                                onChange={( name, value ) => D( GOODS_EDIT_STORE_SERIAL,
                                    { value, goodsIds: checkedGoodsIds } )}
                            />
                            {checkedGoodsIds.length == 0 &&
                             <SelectView
                                 width={300}
                                 required={true}
                                 margin={'0 8px'}
                                 height={T.height.min}
                                 fontColor={T.palette.grey}
                                 hoverFontColor={T.palette.darkBlack}
                                 fontSize={T.fontSize.small}
                                 label={goodsCommon.TransportTitle.length ? '运费模板: ' +
                                                                     goodsCommon.TransportTitle : '选择运费模板(默认免运费)'}
                                 items={transport}
                                 onChecked={( id ) => D( GOODS_EDIT_STORE_TRANSPORT, { id, title: transport[ id ] } )}
                             />
                            }
                        </View>

                        {this.specs()}
                        {!goodsCommon.TypeId || checkedGoodsIds.length ?
                            <View alignH={'center'} margin={'8px 0'} >
                                <Label
                                    text={'库存:'}
                                    fontColor={T.palette.grey}
                                    fontSize={T.fontSize.small}
                                    height={T.height.min}
                                />
                                <TextField
                                    lineShow={false}
                                    fullWidth={false}
                                    fontSize={T.fontSize.small}
                                    fontColor={T.palette.grey}
                                    style={{ height: T.height.min, margin: '0 8px', width: 100 }}
                                    value={this.getGoodsValue( 'GoodsStorage' )}
                                    name="GoodsStorageSlarm"
                                    onChange={( name, value ) => D( GOODS_EDIT_STORAGE,
                                        { value, goodsIds: checkedGoodsIds } )}
                                />
                                <Label
                                    text={'库存报警值:'}
                                    fontColor={T.palette.grey}
                                    fontSize={T.fontSize.small}
                                    height={T.height.min}
                                />
                                <TextField
                                    lineShow={false}
                                    fullWidth={false}
                                    fontSize={T.fontSize.small}
                                    fontColor={T.palette.grey}
                                    style={{ height: T.height.min, margin: '0 8px' }}
                                    value={this.getGoodsValue( 'GoodsStorageSlarm' )}
                                    name="GoodsStorageSlarm"
                                    onChange={( name, value ) => D( GOODS_EDIT_STORAGE_SLARM,
                                        { value, goodsIds: checkedGoodsIds } )}
                                />
                            </View>
                            : null}
                    </View>
                    <FloatButton
                        icon={isEditSpec ? VisibilityIcon : ModeEditIcon}
                        size={40}
                        style={{ position: 'absolute', bottom: -10, right: -10 }}
                        onTap={() => this.setState( { isEditSpec: !isEditSpec } )}
                    />
                </View>
                {this.detailsBody()}
            </View>
        )
    }

    componentDidMount() {
        D( STORE_TRANSPORT_LOAD )
    }
}

export default connect(
    ( state ) => {
        return {
            storeTransports: state.storeTransport.transportList,
            cacheImages: state.goodsEdit.images,
            goods: state.goodsEdit.goods,
            goodsCommon: state.goodsEdit.goodsCommon,
        }
    }
    //bindActionCreators()
)( EditGoodsDetails )