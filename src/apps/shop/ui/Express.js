/**
 * Created by wangyakun on 2016/11/19.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {S, P, M, MM, F, D, Q, T, L, DD} from '../../../common'
import {BaseComponent, Button, View, CheckView, Form, U, I, Subheader, Divider} from '../../../components/BaseComponent'

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'

class Express extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'Express'
    }

    componentWillMount() {
        this.setState({
            express: {},
            storeExtend: {},
            listCount: 0
        })
    }

    componentDidMount() {
        D(TYPE.EXPRESS_LOAD, Q().limit(1000).ok())
        D(TYPE.STORE_EXTEND_LOAD, Q().ok())
    }

    checkItem(name, checked) {
        const storeExtend = {}
        storeExtend.Express = checked.join(',')
        D(TYPE.STORE_EXTEND_ADD, storeExtend);
    }

    render() {
        const {express, storeExtend} = this.props.data
        let inExpress = []
        let expressList = {}
        if (storeExtend && storeExtend.Express)
            inExpress = storeExtend.Express.split(",")
        F(express, function (obj, key) {
            expressList[key] = obj.EName
        })
        return (
            <View orientation={'column'} width={'100%'} overflow={'visible'}>
                <Subheader>发货设置 > 默认物流公司 [点击自动勾选]</Subheader>
                <Divider/>

                <CheckView name="storeExtend" width={100+'%'} itemWidth={300} datas={expressList} multiple={true}
                           checked={inExpress} wrap={'wrap'}
                           onCheck={this.checkItem}/>
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
                express: state['express'],
                storeExtend: state['storeExtend']
            }
        }
    }
)
(Express)