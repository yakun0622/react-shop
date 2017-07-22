import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'


import { F, D, T, C, STOREIMG } from '../../../common'
import {
    BaseComponent, View, Button, Image, Label, Numbers,FloatButton,ShoppingCartIcon, Loading
} from '../../../components/BaseComponent'
import ImageCarousel from '../../../components/ImageCarousel'
import Like from '../../home/ui/Like'
import {
    GOODS_DATAS_LOAD,
    CART_ADD,
} from '../../../actions/type'

class DetailsPage extends BaseComponent {
    display = 'DetailsPage'
    isSpecRequired = false

    constructor(props){
        super(props)
        if( props.goodsId ) {
            this.state.checkedGoodsId = props.goodsId
            this.isSpecRequired = true
            if( props.goodses[props.goodsId] && props.goodses[props.goodsId].Specs ) {
                this.state.specChecked = props.goodses[props.goodsId].Specs
            }
        }
    }

    componentWillReceiveProps(props) {
        const { goodsId, goodses } = this.props
        if( goodsId && goodses[goodsId] ) {
            const { specChecked } = this.state
            if( !C(specChecked) && goodses[goodsId].Specs ) {
                this.setState( { specChecked: goodses[goodsId].Specs } )
            }
        }
    }

    static defaultProps = {
        width: 960,
    }

    state = {
        specChecked: {},
        checkedGoodsId: 0,
        isEditSpec: false,
        mainImageIndex: -1,
        attrIndex: -1,
        openDialog: true,
        goodsNum: 1,
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        commonId: React.PropTypes.number,
        goodsId: React.PropTypes.number,
    }

    getGoodsValue( name ) {
        const { goodses, commons, commonId, goodsId } = this.props
        const { checkedGoodsId } = this.state
        if ( checkedGoodsId && goodses[ checkedGoodsId ][ name ] ) {
            return goodses[ checkedGoodsId ][ name ]
        } else {
            return commons[ commonId || goodses[goodsId].GoodsCommonid ][ name ]
        }
    }


    /**
     * 判断规格值是否被选择
     * @param specId
     * @param valueId
     * @returns {*}
     */
    isCheckedSpec( specId, valueId ) {
        return this.state.specChecked[ specId ] && this.state.specChecked[ specId ] == valueId
    }

    /**
     * 规格值选择状态,可以多选
     * @param specId
     * @param valueId
     * @param value
     */
    checkedSpecs( specId, valueId ) {
        const { goodses, commons, commonId, goodsId } = this.props
        const cId = commonId || goodses[goodsId].GoodsCommonid
        let specChecked = this.state.specChecked
        let checkedGoodsId = 0
        //如果有specId,则检查是否存在valueId,如果有则撤除,没有则添加
        //如果valueId撤除后,values为空对象则根据specid撤除规格
        if ( specChecked[ specId ] && specChecked[ specId ] == valueId ) {
            if( this.isSpecRequired ) {
                return
            }
            delete specChecked[ specId ]
        } else {
            specChecked[ specId ] = valueId
        }

        if ( C( specChecked ) == commons[ cId ].Specs.length ) {
            //this.log(goodses)
            F( goodses, ( goods ) => {
                if ( goods.GoodsCommonid == cId &&
                     JSON.stringify( goods.Specs ) == JSON.stringify( specChecked ) ) {
                    checkedGoodsId = goods.Id
                }
            } )
        }
        this.setState( { specChecked, checkedGoodsId } )
    }

    /**
     * 添加到购物车
     * 规格都选择了才可以添加
     */
    addCart() {
        const data = this.props.goodses[ this.state.checkedGoodsId ]
        //this.log( data )
        if ( data ) {
            const { StoreId, StoreName, GoodsName, GoodsPrice, GoodsImage, Id } = data
            let cartData = {
                BuyerId: this.props.user.id,
                StoreId,
                StoreName,
                GoodsId: Id,
                GoodsName,
                GoodsPrice,
                GoodsNum: this.state.goodsNum,
                GoodsImage
            }
            //this.log( data )
            D( CART_ADD, cartData )
        }
    }

    /**
     * 获取收藏数据
     * @returns {*}
     */
    getLikeData() {
        const data = this.props.goodses[ this.state.checkedGoodsId ]
        if ( data ) {
            const { StoreId, StoreName, GoodsName, GoodsPrice, GoodsImage, Id, GoodsSpec } = data
            return {
                StoreId,
                StoreName,
                GoodsId: Id,
                GoodsName,
                GoodsPrice,
                GoodsNum: this.state.goodsNum,
                GoodsImage: GoodsImage,
                GoodsSpec
            }
        }
        return null
    }

    /**
     * 规格区域显示
     * 如果是编辑状态,则可以添加删除编辑规格值
     * 如果不是,则根据规格值选择,设置相应的goods价格、图片、详情等
     * @returns {*}
     */
    specs(specs) {
        if ( specs.length ) {
            return (
                <View orientation={'column'} width={'100%'} margin={'8px 0'} >
                    {F( specs, ( specData, specIndex ) => {
                        const specId = specData.Id
                        return (
                            <View key={specIndex + 'spec'}
                                  style={{ marginTop: 8 }}
                                  orientation={'column'}
                            >
                                <Label
                                    key={specId + 'speclabel'}
                                    text={specData.SpName}
                                    fontColor={T.palette.grey}
                                    fontSize={T.fontSize.small}
                                />
                                <View wrap={'wrap'}
                                      margin={'0 8px'}
                                >
                                    {F( specData.values, ( value ) => {
                                        const valueId = value.Id
                                        const checked = this.isCheckedSpec( specId, valueId )
                                        return (
                                            <Button
                                                key={valueId + 'chip'}
                                                height={24}
                                                radius={12}
                                                label={value.SpValueName}
                                                color={checked? T.palette.main : T.palette.minGrey}
                                                fontColor={checked? T.palette.white : T.palette.maxGrey}
                                                fontSize={T.fontSize.small}
                                                margin={4}
                                                style={{ minWidth: 24 }}
                                                onTap={() => this.checkedSpecs( specId, valueId )}
                                            />
                                        )
                                    } )}
                                </View>
                            </View>
                        )
                    } )}
                </View>
            )
        }
        return null
    }

    category = (  ) => {
        const { commonId, goodsId, commons, goodses, categorys } = this.props
        const comId = commonId || goodses[goodsId].GoodsCommonid
        if( commons[comId] ) {
            const names = commons[comId].GcName.split('&gt;')
            const labelProps = {
                fontColor: T.palette.grey,
                fontSize: T.fontSize.small,
            }
            return <View height={32} alignV={'center'} margin={'4px 0'}>
                <Label text={names[0]} {...labelProps} />
                <Label text={'|'} margin={'0 4px'} {...labelProps}/>
                <Label text={names[1]} {...labelProps} {...labelProps}/>
                <Label text={'|'} margin={'0 4px'} />
                <Label text={names[2]} {...labelProps} {...labelProps}/>
            </View>
        }

        return null
    }

    detailsBody = () => {
        const body = this.getGoodsValue( 'GoodsBody' )
        //this.log(body)
        if( !body ) {
            return null
        }

        if( typeof body == 'string') {
            return <div dangerouslySetInnerHTML={{ __html: body }}
                        ref='body'
                        style={{ backgroundSize: 'cover', backgroundColor:'white', margin: '8px 0' }} >
            </div>
        }

        return (
            <View color={'white'} width={'100%'} orientation={'column'}
                  overflow={'visible'} margin={'8px 0'} >
                {this.getGoodsValue( 'GoodsBody' ).map(( item, i ) => {
                    return this.bodyItem(item, i)
                })}
            </View>
        )
    }

    bodyItem = ( item, i ) => {
        const { width } = this.props
        const itemWidth = width - 16
        switch(item.type) {
            case 'image':
                const images = STOREIMG(item.items)
                return images.map(( image, ii ) => {
                    return  <Image key={'img' + i + ii} width={width} src={image} />
                })
                break
            case 'list':
                let listWidth =  itemWidth
                switch(item.option.column) {
                    case 2:
                        listWidth = (itemWidth - 8) / 2
                        break
                    case 3:
                        listWidth = (itemWidth - 16) / 3
                        break
                }
                return <View wrap={'wrap'} margin={'0 0 0 8px'}>
                    {item.items.map(( it, ii ) => {
                        if( ii%2 ) {
                            return <View
                                key={'list' + i + ii}
                                width={item.option.column}
                                margin={'0 8px 0 0'}
                            >
                                <Label
                                    text={items[ii-1]}
                                    grow={1}
                                    fontColor={T.palette.grey}
                                    fontSize={T.fontSize.small}
                                />
                                <Label
                                    text={it}
                                    grow={3}
                                    fontColor={T.palette.maxGrey}
                                />
                            </View>
                        }
                    })}
                </View>
                break
            default:
                return <Label
                    key={'text' + i}
                    width={itemWidth}
                    text={item.items}
                    fontColor={T.palette.maxGrey}
                    margin={8}
                />
                break
        }
    }

    render() {
        const {
            width,
            goodsId,
            goodses,
            commonId,
            commons,
            user
        } = this.props

        const { checkedGoodsId, goodsNum } = this.state

        const comId = commonId || (goodses[goodsId] && goodses[goodsId].GoodsCommonid)

        if( comId && commons[comId] ) {
            const images = STOREIMG( this.getGoodsValue( 'GoodsImages' ) )
            return <View
                width={width}
                orientation={'column'}
            >
                {this.category()}
                <View width={width} style={{ position: 'relative' }} overflow={'visible'} color={'white'}>
                    <ImageCarousel
                        width={450}
                        height={450}
                        max={images ? images.length : 0}
                        images={images}
                    />

                    <View orientation={'column'} width={0} grow={1} margin={8} overflow={'visible'}  >
                        <Label
                            text={"￥" + this.getGoodsValue( 'GoodsPrice' )}
                            fontColor={T.palette.gold}
                            fontSize={T.fontSize.max}
                            margin={'0 0 8px 0'}
                            alignSelf={'end'}
                        />
                        <Label
                            width={'80%'}
                            fontSize={T.fontSize.big}
                            text={this.getGoodsValue( 'GoodsName' )}
                        />
                        <Label
                            fontSize={T.fontSize.small}
                            fontColor={T.palette.grey}
                            text={this.getGoodsValue( 'GoodsJingle' )}
                        />

                        <View margin={'8px 0'}>
                            <Label
                                fontColor={T.palette.grey}
                                fontSize={T.fontSize.small}
                                text={'商家:'}
                                margin={'0 4px 0 0'}
                            />
                            <Label
                                fontSize={T.fontSize.small}
                                fontColor={T.palette.maxGrey}
                                text={this.getGoodsValue( 'StoreName' )}
                            />
                        </View>

                        {this.specs(commons[comId].Specs)}
                        {!!checkedGoodsId &&
                         <Label
                             text={'库存: ' + this.getGoodsValue( 'GoodsStorage' )}
                             fontColor={T.palette.grey}
                             fontSize={T.fontSize.small}
                             height={T.height.min}
                             margin={'8px 0'}
                         />}

                        {!!checkedGoodsId && user &&
                         <View
                             width={'100%'}
                             alignV={'center'}
                             alignH={'between'} overflow={'visible'}
                         >
                             <Numbers
                                 width={128}
                                 value={goodsNum}
                                 onChange={( goodsNum ) => this.setState( { goodsNum } )}
                             />
                             <View alignV={'center'} overflow={'visible'}>
                                 <FloatButton
                                     size={40}
                                     icon={ShoppingCartIcon}
                                     margin={'0 8px'}
                                     onTap={() => this.addCart() }
                                 />
                                 <Like addData={this.getLikeData()} />
                             </View>
                         </View>
                        }
                    </View>
                </View>
                {this.detailsBody()}
            </View>
        } else {
            return <Loading label={'正在加载...'} margin={24}/>
        }
    }

    componentDidMount() {
        const { goodsId, commonId, goodses, commons } = this.props
        if ( commonId && !commons[ commonId ] ) {
            D( GOODS_DATAS_LOAD, 'GoodsCommonId=' + commonId )
        } else if ( goodsId && !goodses[ goodsId ] ) {
            D( GOODS_DATAS_LOAD, 'GoodsId=' + goodsId )
        }
        document.body.style.backgroundColor = T.palette.minGrey

    }

    body = null

    componentDidUpdate(){
        if( !this.body ) {
            this.body = ReactDOM.findDOMNode( this.refs.body )
            if( this.body ) {
                let imgs = this.body.getElementsByTagName( "img" )
                F( imgs, ( img ) => {
                    //this.log(img)
                    img.style.width = this.props.width + 'px'
                } )
            }
        }
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = T.palette.white
    }
}

export default connect(
    ( state ) => {
        return {
            user: state.user,
            goodses: state.goodsDatas.goodses,
            commons: state.goodsDatas.commons,
            categorys: state.categorys
        }
    }
    //bindActionCreators()
)( DetailsPage )