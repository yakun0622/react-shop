/**
 * Created by wangyakun on 2016/11/19.
 */
import React from 'react'
import {connect} from 'react-redux'
import {
    BaseComponent,
    Button,
    View,
    CheckView,
    AreaForm,
    Form,
    U,
    I,
    Subheader
} from '../../../components/BaseComponent'
import {T, L, F, D} from '../../../common'

import * as TYPE from '../../../actions/type'

class AreaSet extends BaseComponent {

    constructor(props) {
        super(props)
        this.display = 'AreaSet'
        this.state = {
            selectedTop: {},
            topChecked: [],
            secondChecked: [],
            thirdChecked: [],
        }
    }

    componentWillMount() {
        this.setState({})
    }

    componentDidMount() {
        D(TYPE.STORE_OFFPAY_AREA_LOAD)
    }

    save = () => {
        const {checked} = this.props.data
        let areaId = checked.join(',')
        areaId = ',' + areaId + ','
        // L('save......',areaId)
        D(TYPE.STORE_OFFPAY_AREA_SAVE, {areaId: areaId}, 'form')
    }

    render() {
        const {checked} = this.props.data
        // L('AreaSet', checked)
        return (
            <View orientation={'column'} width={'100%'} overflow={'visible'}>
                <Subheader>发货设置 > 配送地区设置 [选择地区，点击最下方保存按钮才能保存]</Subheader>
                <AreaForm name={'areaForm'} type={1} levels={2} checkedActionType={TYPE.STORE_OFFPAY_AREA_LOAD}
                          changeActionType={TYPE.STORE_OFFPAY_AREA_CHANGE} checked={checked}
                          isNumber={true}
                submit={() => this.save()}/>
            </View>
        )
    }
}

export default connect(
    (state)=> {
        return {
            data: {
                checked: state['offpayArea'],
            }
        }
    }
)
(AreaSet)