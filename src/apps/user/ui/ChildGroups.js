/**
 * Created by kenn on 2016/9/25.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T, L } from '../../../common'
import { BaseComponent, View, Button } from '../../../components/BaseComponent'

import * as API from '../../../store/api'
import * as TYPE from '../../../actions/type'

class ChildGroups extends BaseComponent {
    display = 'ChildGroups'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        parent: React.PropTypes.number,
    }

    render() {
        const {
            width,
            height,
        } = this.props

        return (
            <View
                width={width}
                height={height}
            >

            </View>
        )
    }
}
export default connect(
    ( state )=> {
        return {
            data: state.user
        }
    }
    //bindActionCreators()
)( ChildGroups )