/**
 * Created by kenn on 2016/9/23.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T, L } from '../../../common'
import { BaseComponent, View, Button, ListView, CardView } from '../../../components/BaseComponent'
import { IMAGEURL } from '../../config'
import * as API from '../../../store/api'
import * as TYPE from '../../../actions/type'

class Home extends BaseComponent {
    display = 'Home'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        fontColor: T.palette.darkBlack,
        fontSize: 15,

        radius: 0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex: 0,
        margin: 0,

        transition: 'all .3s',

        hand: false,
        display: 'flex',
        orientation: 'row',
        wrap: 'nowrap',
        grow: 0,
        order: 0,
        alignSelf: 'auto',

        imageSize: 'contain',
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
    }

    componentWillMount() {
        this.setState( {} )
    }

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    render() {
        const {
            width,
            height,
            searchGroups
        } = this.props

        const {} = this.state

        if ( searchGroups ) {
            return this.search()
        } else {
            return <div>用户信息</div>
        }
    }

    search() {
        const { searchGroups, applyGroups } = this.props
        return (
            <View width={'100%'} alignH={'center'} >
                <View wrap={'wrap'} alignH={'center'}>
                    {
                        F( searchGroups, ( group, id ) => {
                            if( !applyGroups || !applyGroups[id] ) {
                                return (
                                    <ListView
                                        key={id + 'gm'}
                                        width={400}
                                        margin={20}
                                        leftIcon={group.GroupLogo || (IMAGEURL + 'default.png')}
                                        primaryText={group.GroupName}
                                        rightIcon={
                                            <Button
                                                label={'申请加入'}
                                                margin={8}
                                                onTap={() => D( TYPE.GROUP_MEMBER_APPLY,
                                                    this.formdata( 'GroupId', group.Id ),
                                                    group )} />
                                        }
                                        shadowSize={16}
                                    />
                                )
                            }
                        } )
                    }

                </View>
            </View>
        )
    }
}
export default connect(
    ( state )=> {
        return {
            applyGroups: state.groups.applyGroups,
            searchGroups: state.groups.search ? state.groups.search.datas : null,
            searchGroupsCount: state.groups.search ? state.groups.search.count : 0
        }
    }
    //bindActionCreators()
)( Home )