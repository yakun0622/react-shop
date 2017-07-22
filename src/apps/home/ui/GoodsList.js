/**
 * Created by kenn on 16/7/10.
 */
import React from 'react'
import { connect } from 'react-redux'

import { M, Z, F, R, Q, DG, T } from '../../../common'

import { BaseComponent } from '../../../components/BaseComponent'
import Paging from '../../../components/Paging'
import GoodsCard from './GoodsCard'

import { GOODS, SEARCH, CATEGORYS } from '../../../store/api'
import { SEARCH_GOODS_COMMON } from '../../../actions/type'

import { GOOD_LIST_LIMIT } from '../../config'

class GoodList extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'GoodList'

        this.setTheme()
    }

    pagingClick( page ) {
        document.getElementsByTagName('body')[0].scrollTop = 0
        DG( this.props.data.search, page )
    }

    render() {
        const { commons, goodsCount } = this.props.data

        let pages = goodsCount > GOOD_LIST_LIMIT ? Math.ceil( goodsCount / GOOD_LIST_LIMIT ) : null

        const rootAttr = {
            style: {
                width: 1100,
                margin: '60px auto'
            }
        }

        // const isSearch = this.isSearch()

        return (
            <div {...rootAttr}>
                {F( commons, ( data, id ) => {
                    //this.log(data)
                    return <GoodsCard
                        key={id}
                        image={R( data.StoreId, data.GoodsImage )}
                        title={data.GoodsName}
                        price={data.GoodsPrice}
                        likes={data.GoodsCollect || 0}
                        goods={this.getGoodsByCommonId( id )}
                        goodsCommonId={id}
                        goodsCommon={data}
                        userInfo={this.props.userInfo}
                    />
                } )}
                {pages && pages> 1
                    ? <Paging
                        width={500}
                        height={40}
                        max={9}
                        pages={pages}
                        margin={'24px 300px'}
                        onClick={( page ) => this.pagingClick( page )}
                    />
                    : null
                }
            </div>

        )
    }

    getGoodsByCommonId( commonId ) {
        let goods = {}
        F( this.props.data.goods, ( data, id ) => {
            if ( data.GoodsCommonid == commonId ) {
                goods[ id ] = data
            }
        } )

        return goods
    }
}

export default connect(
    ( state ) => {
        return {
            user: state.user,
            data: {
                commons: state.goods && state.goods.goodsCommon,
                goods: state.goods && state.goods.goods,
                search: state[ SEARCH ],
                categoryId: state[ SEARCH ][ CATEGORYS ] && state[ SEARCH ][ CATEGORYS ],
                categoryLevel: state[ SEARCH ].hasOwnProperty( 'categoryLevel' )
                    ? state[ SEARCH ][ 'categoryLevel' ]
                    : null,
                goodsCount: state.goods && state.goods.count
            }
        }
    }
    //bindActionCreators()
)( GoodList )