/**
 * Created by kenn on 2017/2/2.
 */
import React from 'react'
import { connect } from 'react-redux'


import { M, F, D, Q, T, L } from '../common'
import View from './View'
import Label from './Label'

import CircularProgress from 'material-ui/CircularProgress';

class Loading extends React.Component {
    display = 'Loading'

    static defaultProps = {
        size: 32,
        color: T.palette.main
    }

    static propTypes = {
        size: React.PropTypes.number,
        label: React.PropTypes.string,
        color: React.PropTypes.string,
        margin: React.PropTypes.any,
    }

    render() {
        const {
            size,
            color,
            label,
            margin
        } = this.props

        return <View alignH={'center'} margin={margin} orientation={'column'}>
                <CircularProgress size={size} color={color} />
                {label && <Label text={label} margin={'8px 0 0 0'}/>}
            </View>

    }
}
export default connect(
    ( state ) => {
        return {
            data: state.user
        }
    }
    //bindActionCreators()
)( Loading )