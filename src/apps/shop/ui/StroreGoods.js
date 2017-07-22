/**
 * Created by wangyakun on 16/9/2.
 */
import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { S, P, M, F, D, Q, T, L } from '../../../common'
import {BaseComponent, U, I} from '../../../components/BaseComponent'

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'

class StroreGoods extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'StroreGoods'
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    componentDidMount(){
        D(TYPE.STORE_GOODS_COMMON_LOAD, Q().query('StoreId', 1).query('GoodsState', 1).query('GoodsVerify', 1).ok())
    }

    render() {
        const { goodsCommonList, style } = this.props.data
        const {  } = this.state

        return (
            <div {...rootProps}>
                仓库中的商品....
            </div>
        )
    }
}

const rootProps = {
    style: {}
}

export default connect(
    (state)=> {
        return {
            data: {
                goodsCommonList:       state[ api.GOODS ].goodsCommon,
            }
        }
    }
    //bindActionCreators()
)(StroreGoods)