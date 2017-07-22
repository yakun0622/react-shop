/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T, L } from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    TabView,
    ListView,
    Form,
    TextField,
    CheckView,
    AccountCircle,
    LockIcon,
    CardView,
} from '../../../components/BaseComponent'
import Role from './Role'
import Tag from './Tag'

import * as TYPE from '../type'

class Group extends BaseComponent {
    display = 'Group'

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
        height: React.PropTypes.any,

    }

    componentWillMount() {
        this.setState( {
            checked: 0,
        } )
    }

    componentWillReceiveProps( props ) {

    }

    render() {
        const {
            width,
            height,
            checkedGroup,
        } = this.props
        const { checked } = this.state

        return (
            <TabView
                width={0}
                grow={1}
                tabs={[ '角色', '标签' ]}
                color={T.palette.lightGrey}
                hoverColor={T.palette.main}
                fontColor={T.palette.darkBlack}
                hoverFontColor={T.palette.white}
                toggle={false}
                margin={24}
                checked={checked}
                onChecked={( checked ) => this.setState( { checked } )}
            >
                <Role />
                <Tag />
            </TabView>
        )
    }


}
export default connect(
    ( state )=> {
        return {
            roles: state.roles,
            permission: state.permission,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
        }
    }
    //bindActionCreators()
)( Group )