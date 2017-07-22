/**
 * Created by kenn on 16/7/11.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';

import { S, D, M, R, F, C, T } from '../../../common'

import { BaseComponent, View } from '../../../components/BaseComponent'
import ImageCarousel from '../../../components/ImageCarousel'
import ScollView from '../../../components/ScollView'
import Numbers from '../../../components/Numbers'
import Like from '../../home/ui/Like'

import { CART_ADD, GOODS_DATAS_LOAD } from '../../../actions/type'

let dialogWidth = 1040
const dialogHeight = 530
let width = 520
const mainWidthToggle = 200
let bodyWidth = width + mainWidthToggle
const mainWidth = dialogWidth - width - 24

const nameWidth = dialogWidth - width - 24 - 150

const detailsBackLeftIcon = {
    style: {
        margin: "4px 10px",
        width: 40,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 20
    },
    color: T.palette.grey,
    hoverColor: T.palette.darkBlack
};

const detailsBackRightIcon = {
    style: {
        margin: "4px 10px",
        width: 40,
        height: 40
    },
    color: T.palette.grey,
    hoverColor: T.palette.darkBlack

}

let bodyAttrStyle = {
    margin: 20
}

const goodsNameStyle = {
    color: T.palette.darkBlack,
    fontSize: T.fontSize.big,
    //fontWeight: 900,
    margin: '48px 0 8px 0'
};

const goodsJingleStyle = {
    color: T.palette.maxGrey,
    margin: '0 0 20px 1px',
}

const goodsPriceStyle = {
    color: T.palette.gold,
    fontSize: 30,
    position: 'absolute',
    top: 20,
    right: 20,
    margin: 0
}

const specNameStyle = {
    fontSize: T.fontSize.small,
    display: 'inline-block',
    height: T.height.min,
    lineHeight: T.height.min + 'px',
}

class GoodsDetails extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'GoodsDetails'

        this.state = {
            open: false,
            secondOpen: false,
            goodsId: props.goodsId || null,
            specChecked: props.goodsId &&
                         props.goodses[ this.props.goodsId ] ? props.goodses[ props.goodsId ].GoodsSpec : {},
            goodsNum: 1
        }
    }

    static defaultProps = {
        buyable: true
    }

    static propTypes = {
        goodsId: React.PropTypes.number,
        goodsCommonId: React.PropTypes.number,
        buyable: React.PropTypes.any,
    }

    getGoodsImages() {
        const { goodsId, goodsCommons, goodses, goodsCommonId } = this.props
        return R( goodsId ? goodses[ goodsId ].StoreId : goodsCommons[ goodsCommonId ].StoreId,
            this.getGoodsAttr( 'GoodsImages' ) )
    }

    componentDidMount() {
        let body = ReactDOM.findDOMNode( this.refs.body )
        let imgs = body.getElementsByTagName( "img" )
        F( imgs, ( img ) => {
            img.style.width = bodyWidth + 'px'
        } )
    }


    render() {
        const { goodsCommonId, goodsCommons, goodses, goodsId, user, buyable } = this.props
        const hasGoodsData = !!(goodsCommonId ? goodsCommons[ goodsCommonId ] : (goodses[ goodsId ] &&
                                                                                 goodsCommons[ goodses[ goodsId ].GoodsCommonid ]))

        if ( hasGoodsData ) {
            goodsNameStyle[ 'width' ] = this.state.open ? nameWidth - mainWidthToggle / 2 : nameWidth
        }

        return (
            <Dialog
                modal={false}
                open={true}
                contentStyle={{ width: dialogWidth, maxWidth: 'none', maxHeight: 'none' }}
                bodyStyle={{ padding: 8 }}
                autoScrollBodyContent={true}
                autoDetectWindowHeight={true}
                onRequestClose={()=>this.props.close()}
            >
                {hasGoodsData ?
                    <View width={dialogWidth - 16} height={dialogHeight} >
                        <ImageCarousel
                            width={dialogHeight}
                            height={dialogHeight}
                            images={this.getGoodsImages()}
                            max={3}
                        />

                        <p style={goodsPriceStyle} >{"￥" + this.getGoodsAttr( 'GoodsPrice' )}</p>
                        <div {...S()
                            .inline()
                            .marginLeft( this.state.open ? mainWidthToggle + 8 : 8 )
                            .position()
                            .width( this.state.open ? mainWidth - mainWidthToggle : mainWidth )
                            .transition()
                            .p()}
                        >
                            <p style={M( goodsNameStyle )} >{this.getGoodsAttr( 'GoodsName' )}</p>
                            <p style={goodsJingleStyle} >{this.getGoodsAttr( 'GoodsJingle' )}</p>
                            {this.spec()}
                        </div>

                        {this.isCheckedAllSpec() && user &&
                         <div>
                             <Numbers
                                 {...S()
                                     .change( ( goodsNum ) => this.setState( { goodsNum } ) )
                                     .position( 1 )
                                     .bottom( 16 )
                                     .left( this.state.open ? mainWidthToggle + 540 : 540 )
                                     .width( 128 )
                                     .transition()
                                     .value( this.state.goodsNum )
                                     .p()}
                             />
                             {buyable &&
                              <FloatingActionButton
                                  {...S()
                                      .position( 1 )
                                      .bottom( 30 )
                                      .right( 100 )
                                      .click( () => this.addCart() )
                                      .p()}
                              >
                                  <ShoppingCartIcon />
                              </FloatingActionButton>
                             }
                             {buyable &&
                              <Like addData={this.getLikeData()}
                                    style={{ position: 'absolute', right: 30, bottom: 30 }} />
                             }
                         </div>
                        }

                        <Drawer open={this.state.open} width={bodyWidth} >
                            {
                                this.state.open ?
                                    <ArrowBackIcon {...detailsBackLeftIcon}
                                                   onClick={()=>this.handleToggle( 0 )} />
                                    :
                                    <ArrowForwardIcon {...detailsBackLeftIcon}
                                                      onClick={()=>this.handleToggle( 0 )} />
                            }
                            <ScollView width={bodyWidth} height={534} >
                                <div dangerouslySetInnerHTML={{ __html: goodsCommons[ this.getGoodsCommonId() ].GoodsBody }}
                                     ref='body'
                                     style={{ backgroundSize: 'cover' }} >

                                </div>
                            </ScollView>

                        </Drawer>

                        <Drawer width={580} openSecondary={true} open={this.state.secondOpen} >
                            {
                                this.state.secondOpen ?
                                    <ArrowForwardIcon {...detailsBackRightIcon}
                                                      onClick={()=>this.handleToggle( 1 )} />
                                    :
                                    <ArrowBackIcon {...detailsBackRightIcon}
                                                   onClick={()=>this.handleToggle( 1 )} />
                            }

                            <Divider />
                        </Drawer>
                    </View>
                    : '没有该商品！！'
                }
            </Dialog>
        )
    }

    /**
     * 获取收藏数据
     * @returns {*}
     */
    getLikeData() {
        const data = this.props.goodses[ this.state.goodsId ]
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
     * 添加到购物车
     * 规格都选择了才可以添加
     */

    addCart() {
        const data = this.props.goodses[ this.state.goodsId ]
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
     * 根据field取值
     * 如果state.goodsId有设置,则取goods的数据
     * 否则取goodsCommon的数据
     * @param field
     */
    getGoodsAttr( field ) {
        if ( this.state.goodsId && this.props.goodses[ this.state.goodsId ][ field ] ) {
            return this.props.goodses[ this.state.goodsId ][ field ]
        } else {
            const commonId = this.props.goodsCommonId || this.props.goodses[ this.state.goodsId ].GoodsCommonid
            return this.props.goodsCommons[ commonId ][ field ]
        }
    }

    getGoodsCommonId = () => {
        const { goodsId, goodsCommonId, goodses } = this.props
        if ( goodsCommonId ) {
            return goodsCommonId
        } else {
            return goodses[ goodsId ].GoodsCommonid
        }
    }


    /**
     * spec显示
     * @returns {XML}
     */
    spec() {
        let specValue = this.props.goodsCommons[ this.getGoodsCommonId() ].SpecValue
        let specName = this.props.goodsCommons[ this.getGoodsCommonId() ].SpecName

        return (
            <div>
                {F( specValue, ( data, specId ) => {
                    return (
                        <div key={specId + 'root'} style={{ margin: '0 0 0 1px' }} >
                            <span key={specId + 'specname'} style={specNameStyle} >{specName[ specId ]}</span>
                            <div >
                                {F( data, ( value, id ) => {
                                    const specValueStyle = {
                                        display: 'inline-block',
                                        margin: '0  0 8px 12px',
                                        height: T.height.min,
                                        verticalAlign: 'top',
                                        lineHeight: T.height.min + 'px',
                                        backgroundColor: T.palette.minGrey,
                                        boxShadow: this.isCheckedSpec( specId, id )
                                            ? '0 0 4px ' + T.palette.main
                                            : '0 0 0 white'
                                    }

                                    const specValueLabelStyle = {
                                        height: T.height.min,
                                        lineHeight: T.height.min + 'px',
                                        fontSize: T.fontSize.small
                                    }

                                    return (
                                        <Chip
                                            onTouchTap={( e ) => this.checkedSpec( e, specId, id, value )}
                                            style={specValueStyle}
                                            labelStyle={specValueLabelStyle}
                                            key={id + 'chip'}
                                        >
                                            {
                                                this.isObject( value ) ?
                                                    <Avatar src="images/uxceo-128.jpg" />
                                                    : null
                                            }
                                            {value}
                                        </Chip>
                                    )
                                } )
                                }
                            </div>
                        </div>
                    )
                } )
                }
            </div>
        )
    }

    /**
     * 判断spec值是否被选择
     * @param specId
     * @param id
     * @returns {boolean}
     */
    isCheckedSpec( specId, id ) {
        //this.log( this.state.specChecked )
        return !!(this.state.specChecked[ specId ] && this.state.specChecked[ specId ][ id ])
    }

    /**
     * 根据规格选择获取goodsData
     * @returns {null}
     */
    getCheckedGoodsId() {
        const goodsCommonId = this.getGoodsCommonId()
        let commonSpecNames = C( this.props.goodsCommons[ goodsCommonId ].SpecName )

        if ( C( this.state.specChecked ) != commonSpecNames ) {
            return null
        }

        const { goodses } = this.props

        let goodsIds = F( goodses, ( goodsData, goodsId ) => {
            if ( goodsData.GoodsCommonid == goodsCommonId ) {
                return goodsId
            }
        } )
        //this.log(goodsIds.length)
        let gIds = []
        //let ids = []

        if ( commonSpecNames ) {
            F( this.state.specChecked, ( specData, specId ) => {
                F( specData, ( v, valueId ) => {
                    goodsIds.forEach( ( goodsId ) => {
                        if ( goodses[ goodsId ].GoodsSpec
                             && goodses[ goodsId ].GoodsSpec[ specId ]
                             && goodses[ goodsId ].GoodsSpec[ specId ][ valueId ] ) {

                            gIds.push( goodsId )
                        }
                    } )
                } )
                goodsIds = gIds
                gIds = []
            } )
        }

        if ( goodsIds.length == 1 ) {
            return goodsIds[ 0 ]
        }

        return null
    }

    /**
     * 设置state.checkedSpec
     * @param e
     * @param specId
     * @param id
     * @param value
     */
    checkedSpec( e, specId, id, value ) {
        e.preventDefault()
        e.stopPropagation()

        let specChecked = this.state.specChecked
        let goodsId = this.state.goodsId
        if ( specChecked[ specId ] ) {
            if ( specChecked[ specId ][ id ] ) {
                delete specChecked[ specId ]
            } else {
                specChecked[ specId ] = {}
                specChecked[ specId ][ id ] = value
            }
        } else {
            specChecked[ specId ] = {}
            specChecked[ specId ][ id ] = value
        }

        if ( C( specChecked ) ) {
            if ( this.isCheckedAllSpec() ) {
                this.log( 'checkedSpec', this.getCheckedGoodsId() )
                goodsId = this.getCheckedGoodsId()
            }
        } else {
            if ( this.props.goodsId ) {
                specChecked = this.props.goodses[ this.props.goodsId ].Spec
                goodsId = this.props.goodsId
            } else {
                goodsId = 0
            }
        }

        this.setState( {
            specChecked: specChecked,
            goodsId: goodsId
        } )
    }

    /**
     * 判断spec是否已经全部选择
     * @returns {boolean}
     */
    isCheckedAllSpec() {
        const specChecked = this.state.specChecked

        for ( var specId in this.props.goodsCommons[ this.getGoodsCommonId() ].SpecName ) {
            if ( !specChecked[ specId ] ) {
                return false
            }
        }
        return true
    }


    /**
     * 详情页
     * @param goodsId
     * @param goodsCommonId
     * @param data
     * @returns {Array}
     */
    body() {
        let bodys = []
        //this.log(this.getGoodsAttr('GoodsBody'))
        F( this.getGoodsAttr( 'GoodsBody' ), ( value, i ) => {
            //如果是字符串, 则是图片, 如果是对象则根据type判断
            if ( this.isString( value ) ) {
                bodys.push( <img key={'body' + i} src={value} style={{ width: bodyWidth, marginLeft: 20 }} /> )
            } else {
                switch ( value.type ) {
                    case 0:
                        let attrWidth = bodyWidth / value.rows
                        bodys.push(
                            <div key={'body0' + i} style={bodyAttrStyle} >
                                {
                                    F( value.data, ( attr, attrIndex )=> {
                                        return (
                                            <span key={'body0' + attrIndex}
                                                  style={{
                                                      display: 'inline-block',
                                                      width: attrWidth,
                                                      verticalAlign: 'top',
                                                      margin: '6px 0',
                                                      wordWrap: 'break-word',
                                                      wordBreak: 'pre',
                                                      whiteSpace: 'nowrap',
                                                      overflow: 'hidden'
                                                  }}
                                            >
                                                {attr}
                                            </span>
                                        )
                                    } )
                                }
                            </div>
                        )
                        break
                    case 1:

                        break
                    default:

                        break
                }
            }
        } )

        return bodys
    }

    handleToggle( name ) {
        switch ( name ) {
            case 0:
                this.setState( { open: !this.state.open } );
                break
            case 1:
                this.setState( { secondOpen: !this.state.secondOpen } );
                break
            default:

                break
        }
    }

    componentDidMount() {
        document.getElementById( 'container' ).className = 'blur'
        const { goodsCommonId, goodsCommons, goodsId, goodses } = this.props
        if ( goodsCommonId && !goodsCommons[ goodsCommonId ] ) {
            D( GOODS_DATAS_LOAD, 'GoodsCommonId=' + goodsCommonId )
            return
        }

        if ( goodsId ) {
            if ( !goodses[ goodsId ] ) {
                D( GOODS_DATAS_LOAD, 'GoodsId=' + goodsId )
                return
            }
            if ( !goodsCommons[ goodses[ goodsId ].GoodsCommonid ] ) {
                D( GOODS_DATAS_LOAD, 'GoodsCommonId=' + goodses[ goodsId ].GoodsCommonid )
            }
        }
    }

    componentDidUpdate() {
        const { goodsId, specChecked } = this.state
        const { goodsCommonId, goodsCommons, goodses } = this.props
        if ( goodsId && !C( specChecked ) && this.props.goodses[ goodsId ] &&
             this.props.goodses[ goodsId ].GoodsSpec ) {
            this.setState( { specChecked: this.props.goodses[ goodsId ].GoodsSpec } )
        }

        if ( goodsCommonId && goodsCommons[ goodsCommonId ] && !goodsCommons[ goodsCommonId ].SpecName && !goodsId ) {
            F( goodses, ( goods ) => {
                if ( goods.GoodsCommonid == goodsCommonId ) {
                    this.setState( { goodsId: goods.Id } )
                }
            } )
        }
    }

    componentWillUnmount() {
        document.getElementById( 'container' ).removeAttribute( "class" )
    }
}

export default connect(
    ( state )=> {
        return {
            user: state.user,
            goodses: state.goodsDatas.goodses,
            goodsCommons: state.goodsDatas.goodsCommons,
        }
    }
    //bindActionCreators()
)( GoodsDetails )