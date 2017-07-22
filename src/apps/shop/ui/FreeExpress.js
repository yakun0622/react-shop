/**
 * Created by wangyakun on 2016/11/19.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {S, P, M, MM, F, D, Q, T, L, DD, UR} from '../../../common'
import {BaseComponent, Button, TextField, View, CheckView, Form, U, I, Area} from '../../../components/BaseComponent'

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'

class FreeExpress extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'FreeExpress'
    }

    componentWillMount() {
        this.setState({
            StoreFreePrice: 0
        })
    }

    componentDidMount() {
        var user = UR()
        D(TYPE.STORE_LOAD, {}, user.storeid)

    }

    saveFreeFreight(data) {
        D(TYPE.STORE_FREE_FREIGHT_SAVE, {StoreFreePrice: data.StoreFreePrice})
    }

    render() {
        const {store} = this.props.data

        return (
            <View orientation={'column'} width={'100%'} overflow={'visible'}>
                <TextField isNumber={true} name={'StoreFreePrice'} label={'免运费额度'} value={store.StoreFreePrice}
                           onChange={(name, value)=> {
                               D(TYPE.STORE_FREE_FREIGHT_CHANGE, value)
                           }}/>
                <span style={{
                    color: 'grey',
                    marginBottom: '10',
                    marginTop: '10'
                }}>* 默认为0，表示不设置免运费额度，大于0表示购买金额超出改值后将免运费</span>

                <Button style={{
                    marginLeft: '20'
                }} label={'保存'} onTap={()=>this.saveFreeFreight(store)}/>
            </View>
        )
    }
}

const rootProps = {
    style: {
        // width: 500,
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                store: state[api.STORE]
            }
        }
    }
)
(FreeExpress)