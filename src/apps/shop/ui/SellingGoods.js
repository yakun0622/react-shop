/**
 * Created by wangyakun on 16/9/2.
 */
import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import  {lightBlue300} from 'material-ui/styles/colors';


import { S, P, M, F, D, Q, T, L, R } from '../../../common'
import {BaseComponent, U, I} from '../../../components/BaseComponent'
import GoodsDetails from '../../common/ui/GoodsDetails'
import Paging from '../../../components/Paging'

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'
import { GOOD_LIST_LIMIT } from '../../config'

class SellingGoods extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'SellingGoods'
        this.state = {
            detailOpen: false,
            overItemId: 0,
            goodsCommonId: null,
            goodsCommon: {},
        }
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    componentDidMount(){
        D(TYPE.GOODS_COMMON_LIST_LOAD, Q().query('StoreId', 1).query('GoodsState', 1).query('GoodsVerify', 1).ok())
    }

    getGoodsByCommonId = (commonId) => {
        let goods = {}
        F(this.props.data.goodsList, ( data, id ) => {
            if( data.GoodsCommonid == commonId ) {
                goods[id] = data
            }
        })

        return goods
    }

    getGoodsStockByCommonId = (commonId) => {
        let stock = 0
        F(this.props.data.goodsList, ( data, id ) => {
            if( data.GoodsCommonid == commonId ) {
                stock += data.GoodsStorage
            }
        })

        return stock
    }

    details = (goodsCommonId, goodsCommon) => {
        this.state.goodsCommon = goodsCommon
        this.state.goodsCommonId = goodsCommonId
        this.state.detailOpen = true
        this.setState(this.state)
    }

    render() {
        const { goodsCommonList, goodsList, goodsCount } = this.props.data
        const { overItemId, goodsCommonId, goodsCommon,detailOpen } = this.state
        let pages = Math.ceil( goodsCount / GOOD_LIST_LIMIT )
        this.log("goodsCount", goodsCount)

        const priceAttr = {
            style: {
                fontSize: T.fontSize.min,
                color: T.palette.gold,
            }
        }

        return (
            <div {...rootProps}>
                {
                    F(goodsCommonList, (data, id)=>{
                        return <div>

                            <Card
                                style={S().marginTop(10).width(900).ok()}
                                 onMouseEnter={() => this.setState({overItemId: id})}
                                 onMouseLeave={() => this.setState({overItemId: 0})}
                                    >
                                <CardHeader
                                    title={data.GoodsName}
                                    titleColor={lightBlue300}
                                    titleStyle={S().size(12,1).width(300).ok()}
                                    subtitle={"平台货号：" + id}
                                    subtitleStyle={S().size(8,1).ok()}
                                    avatar={R(data.StoreId, data.GoodsImage, 1)}
                                    actAsExpander={false}
                                    showExpandableButton={true}
                                    />
                                <CardText style={{marginLeft:400,marginTop:-85}}>
                                    <p {...priceAttr}>{'￥' + data.GoodsPrice}</p>
                                    <p {...priceAttr}>{'库存：' + this.getGoodsStockByCommonId(id)}</p>
                                </CardText>
                                {overItemId == id &&
                                    <CardActions style={S().marginTop(-25).ok()}>
                                        <IconButton tooltip="查看"
                                                    tooltipPosition="top-center"
                                                    onClick={()=>this.details(id, data)}>
                                            <SearchIcon />
                                        </IconButton>
                                        <IconButton tooltip="删除"
                                                    tooltipPosition="top-center"
                                                    onClick={()=>this.log("delete...")}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton tooltip="编辑"
                                                    tooltipPosition="top-center"
                                                    onClick={()=>this.log("edit...")}>
                                            <EditIcon />
                                        </IconButton>
                                    </CardActions>
                                    }
                                <CardText expandable={true}>
                                    商品列表....
                                </CardText>
                            </Card>
                            {   detailOpen &&
                                <GoodsDetails
                                    goodsCommonId={goodsCommonId}
                                    goodsCommon={goodsCommon}
                                    goods={this.getGoodsByCommonId(goodsCommonId)}
                                    open={true}
                                    onRequestClose={()=>this.closeDialog('detailOpen')}
                                    userInfo={this.props.userInfo}
                                    />
                            }

                        </div>
                    })
                }
                {
                    pages
                        ? <Paging height={40} max={9} pages={pages} onClick={(page)=>this.pagingClick(page)}/>
                        : null
                }

            </div>
        )
    }
}

const rootProps = {
    style: {
        width:  460,
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                goodsCommonList:       state[ api.GOODS ].goodsCommon,
                goodsList:       state[ api.GOODS ].goods,
                goodsCount:    state[ api.GOODS ].count
            }
        }
    }
    //bindActionCreators()
)(SellingGoods)