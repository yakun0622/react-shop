/**
 * Created by kenn on 16/9/4.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T, L, UR } from '../../common'
import {
    BaseComponent,
    AccountCircle,
    Button,
    ListView,
    View,
    Dialog,
    FloatButton,
    AddIcon,
    TabView,
    GroupIcon,
    ConfirmDialog
} from '../../components/BaseComponent'
import WindowResize from '../../components/WindowResize'
import Header from  './ui/Header'
import Home from  './ui/Home'
import Login from  '../../components/Login'

import GroupEdit from  './ui/GroupEdit'
import * as TYPE from '../../actions/type'
import { IMAGEURL } from  '../config'
const menuWidth = 200
const childMenuWidth = 220

class User extends BaseComponent {
    didLoad = {}
    //不需要显示子组的菜单项
    unShowChildGroupsByMenu = {}

    constructor( props ) {
        super( props )
        this.display = 'User'
    }

    componentWillMount() {

        this.setState( {
            openGroupEdit: false,
            groupDepth: 0,
            menuChecked: -1,
            applyAndPassGroup: false,
        } )
    }

    render() {
        const {
            winWidth,
            winHeight,
            user,
            ownerGroups,
            childGroups,
            joinGroups,
            checkedGroup,
            checkedGroupChild,
            checkedJoinGroup
        } = this.props
        const { openGroupEdit, applyAndPassGroup, menuChecked } = this.state

        const childGroupElement = this.childGroups( checkedGroup )

        if ( user ) {
            return (
                <div>
                    <Header width={winWidth} />
                    <View  style={{minHeight: winHeight - 80}} overflow={'visible'}>
                        <View width={menuWidth} orientation={'column'} shadowSize={5} alignSelf={'stretch'} >
                            {this.ownerGroups()}
                            {this.joinGroups()}
                            {this.passGroups()}
                            {this.applyGroups()}
                        </View>
                        <View grow={1} width={0} alignSelf={'stretch'} overflow={'visible'}>
                            {this.content()}
                        </View>
                        {
                            childGroupElement &&
                            ((!this.unShowChildGroupsByMenu[checkedGroup] ||
                              this.unShowChildGroupsByMenu[checkedGroup]>= 0) &&
                            this.unShowChildGroupsByMenu[checkedGroup] !== menuChecked)  &&
                            <View width={childMenuWidth} orientation={'column'} alignSelf={'stretch'} >
                                {childGroupElement}
                            </View>
                        }
                    </View>
                    <View
                        width={winWidth}
                        height={128}
                        color={T.palette.main}
                    >

                    </View>

                    {this.showGroupButton()}

                    <GroupEdit
                        ownerId={checkedGroup ? joinGroups && joinGroups[checkedGroup] ? joinGroups[checkedGroup].GroupOwnerId : user.id :user.id}
                        ownerName={checkedGroup ? joinGroups && joinGroups[checkedGroup] ? joinGroups[checkedGroup].GroupOwnerName : user.name :user.name}
                        parentId={checkedGroupChild || checkedGroup || 0}
                        belongId={this.getBelongId()}
                        groupLevels={this.getGroupLevels()}
                        open={openGroupEdit}
                        close={() => this.closeDialog( 'openGroupEdit' )}
                    />
                    <Dialog
                        width={500}
                        open={applyAndPassGroup ? true : false}
                        text={applyAndPassGroup}
                        close={() => this.setState( { applyAndPassGroup: false } )}
                    >
                        <div></div>
                    </Dialog>
                    <ConfirmDialog />
                </div>
            )
        } else {
            return <Login type={4} />
        }
    }

    /**
     * 根据权限显示添加组按钮
     * @returns {*}
     */
    showGroupButton() {
        const { joinGroups, checkedGroup } = this.props
        if ( this.state.menuChecked != -1 || ( joinGroups
                                               && joinGroups[ checkedGroup ]
                                               && !(joinGroups[ checkedGroup ].RolePermission & 1)) ) {
            return null
        }

        return <FloatButton
            icon={AddIcon}
            onTap={() => this.openDialog( 'openGroupEdit' )}
            style={{ position: 'fixed', right: 24, bottom: 24 }}
        />
    }

    /**
     * 获取groupLevels
     * 用于组编辑
     */
    getGroupLevels() {
        const { joinGroups, checkedGroup, checkedGroupChild, childGroups } = this.props
        if ( checkedGroupChild ) {
            return childGroups[ checkedGroupChild ].GroupLevels + 1
        } else if ( checkedGroup ) {
            if ( joinGroups && joinGroups[ checkedGroup ] ) {
                return joinGroups[ checkedGroup ].GroupLevels + 1
            } else {
                return 2
            }
        } else {
            return 1
        }
    }

    /**
     * 获取groupBelongId
     * 用于组编辑
     * @returns {*}
     */
    getBelongId() {
        const { ownerGroups, joinGroups, checkedGroup } = this.props
        if ( !checkedGroup ) {
            return 0
        }

        if ( ownerGroups && ownerGroups[ checkedGroup ] ) {
            return checkedGroup
        } else {
            joinGroups[ checkedGroup ].GroupBelong
        }
    }

    /**
     * 内容区域
     */
    content() {
        const { checkedGroupChild, checkedGroup, checkedJoinGroup, children } = this.props

        if ( checkedGroup || checkedJoinGroup ) {
            if ( this.state.menuChecked != -1 ) {
                return children
            }
            return <div>群组信息</div>
        } else {
            return <Home />
        }
        return null
    }

    /**
     * 自创群组菜单
     * @returns {XML}
     */
    ownerGroups() {
        const { ownerGroups, checkedGroup } = this.props
        return F( ownerGroups, ( data, id ) => {
            return (
                <ListView
                    key={id}
                    checked={id == checkedGroup ? true : false}
                    width={menuWidth}
                    fold={0}
                    indent={0}
                    showFoldIcon={true}
                    lineIndent={0}
                    leftIcon={data.GroupLogo || GroupIcon}
                    leftIconSize={24}
                    leftIconColor={T.palette.grey}
                    primaryText={data.GroupName}
                    onTap={() => this.onGroup( data.Id, checkedGroup, 'checkedGroup' )}
                >
                    {this.menu( id, 'owner' )}
                </ListView>
            )
        } )
    }


    /**
     * 加入并在工作中的组
     * @returns {*}
     */
    joinGroups() {
        const { joinGroups, checkedGroup } = this.props
        if ( !joinGroups ) {
            return null
        }

        return (<ListView
            color={T.palette.lightGrey}
            height={24}
            primaryText={'工作中'}
            primaryColor={T.palette.maxGrey}
            fold={0}
            indent={0}
            margin={"8px 0 0"}
        >
            {F( joinGroups, ( data, id ) => {
                //this.log('joinGroups', id)
                return (
                    <ListView
                        key={id}
                        checked={id == checkedGroup ? true : false}
                        width={menuWidth}
                        fold={0}
                        indent={0}
                        showFoldIcon={true}
                        lineIndent={0}
                        leftIcon={data.GroupLogo || GroupIcon}
                        leftIconSize={24}
                        leftIconColor={T.palette.grey}
                        primaryText={data.GroupName}
                        onTap={() => this.onGroup( data.GroupId, checkedGroup, 'checkedGroup' )}
                    >
                        {this.menu( id, 'join' )}
                    </ListView>

                )
            } )}
        </ListView>)
    }

    /**
     * 申请通过的组，但未分配工作
     * @returns {*}
     */
    passGroups() {
        const { passGroups } = this.props
        if ( !passGroups ) {
            return null
        }

        return (
            <ListView
                color={T.palette.lightGrey}
                height={24}
                primaryText={'通过申请'}
                primaryColor={T.palette.maxGrey}
                indent={0}
                margin={"8px 0 0"}
            >
                {F( passGroups, ( group, id ) => {
                    return (
                        <ListView
                            key={id + 'ag'}
                            leftIcon={group.GroupLogo || GroupIcon}
                            primaryText={group.GroupName}
                            onTap={() => this.setState( {
                                applyAndPassGroup: group.GroupName + ',正在为您安排合适的角色，请耐心等待!'
                            } )}
                        />
                    )
                } )}
            </ListView>
        )
    }

    /**
     * 申请中的组
     * @returns {*}
     */
    applyGroups() {
        const { applyGroups } = this.props

        //this.log(applyGroups)
        if ( !applyGroups ) {
            return null
        }

        return (
            <ListView
                color={T.palette.lightGrey}
                height={24}
                primaryText={'申请中'}
                primaryColor={T.palette.maxGrey}
                indent={0}
                margin={"8px 0 0"}
            >
                {F( applyGroups, ( group, id ) => {
                    return (
                        <ListView
                            key={id + 'ag'}
                            leftIcon={group.GroupLogo || GroupIcon}
                            primaryText={group.GroupName}
                            onTap={() => this.setState( { applyAndPassGroup: group.GroupName + ',正在受理您的申请，请耐心等待!' } )}
                        />
                    )
                } )}

            </ListView>
        )
    }

    /**
     * 组菜单
     * @param checkedId
     * @param groupId
     * @returns {XML}
     */
    menu( groupId, name ) {
        const {
            checkedGroup, joinGroups, permission
        } = this.props

        let tabs = []
        let links = []
        if( name == 'owner' ) {
            tabs = [ '成员管理', '组织管理', '审批管理', '订单管理' ]
            links = [ '/member', '/group', '/approve', '/order' ]
            this.unShowChildGroupsByMenu[groupId] =  2
        }else {
            F( permission, ( label, code ) => {
                const p = joinGroups[ groupId ].RolePermission & Number( code )
                if ( p != 0 ) {
                    switch ( label ) {
                        case '成员管理':
                            tabs.push( label )
                            links.push( '/member' )
                            break
                        case '组织管理':
                            tabs.push( label )
                            links.push( '/group' )
                            break
                        case '审批':
                        case '应急审批':
                            if ( links.indexOf( '/approve' ) == -1 ) {
                                tabs.push( '审批管理' )
                                links.push( '/approve' )
                                this.unShowChildGroupsByMenu[groupId] =  tabs.length - 1
                                //this.log('menuper', this.unShowChildGroupsByMenu)
                            }
                            break
                    }
                }
            } )
            tabs.push( '订单管理' )
            links.push( '/order' )
        }
        //this.log('menu',checkedGroup)
        //this.log('menugroupid',groupId)

        return (
            <TabView
                width={menuWidth}
                checked={this.state.menuChecked}
                fold={checkedGroup == groupId ? false : true }
                color={T.palette.grey}
                fontColor={T.palette.white800a}
                hoverColor={T.palette.maxGrey}
                hoverFontColor={T.palette.white}
                orientation={false}
                tabs={tabs}
                links={links}
                onChecked={( checked ) => this.setState( { menuChecked: checked } )}
            />
        )
    }

    /**
     * 遍历子群组
     * @param parent
     */
    childGroups( parent ) {
        if ( !parent ) {
            return null
        }
        const { childGroups, checkedGroupChild } = this.props
        const elements = F( childGroups, ( data, id ) => {
            if ( data.GroupParent == parent ) {
                return (
                    <ListView
                        key={id}
                        height={28}
                        checked={id == checkedGroupChild ? true : false}
                        leftIcon={data.GroupLogo || GroupIcon}
                        leftIconSize={16}
                        primaryColor={T.palette.maxGrey}
                        leftIconColor={T.palette.grey}
                        primaryText={data.GroupName}
                        onTap={() => this.onGroup( data.Id, checkedGroupChild, 'checkedGroupChild' )}
                    >
                        {this.childGroups( data.Id )}
                    </ListView>
                )
            }
        } )

        if ( elements.length == 0 ) {
            return null
        }

        return elements
    }

    /**
     * 点击群组时， 加载相应数据
     * 分享状态
     * @param groupId
     * @param checkedGroup
     * @param name
     */
    onGroup = ( groupId, checkedGroup, name ) => {

        if ( !this.hasLoad( groupId, this.props.roles ) ) {
            D( TYPE.ROLE_LOAD, Q().query( 'group_id', groupId ).ok() )
        }
        if ( !this.hasLoad( groupId, this.props.tags ) ) {
            D( TYPE.TAG_LOAD, Q().query( 'group_id', groupId ).ok() )
        }
        D( TYPE.MEMBER_LOAD, Q().add( 'GroupId', groupId ).ok() )
        if ( name == 'checkedGroupChild' && groupId != checkedGroup ) {
            let hasLoadChildTag = false
            F( this.props.shareTags, ( data ) => {
                if ( data.GroupId == groupId ) {
                    hasLoadChildTag = true
                    return false
                }
            } )
            if ( !hasLoadChildTag ) {
                D( TYPE.TAG_SHARE_LOAD, 'GroupId=' + groupId )
            }
        }
        //this.log( groupId, checkedGroup )
        if ( name == "checkedGroup" ) {
            if( groupId != checkedGroup ) {
                this.checkedAction( 'checkedGroupChild', false )
                this.loadGroupChild( groupId, name )
            }

            if( checkedGroup ) {
                this.setState( { menuChecked: -1 } )
            }
        }

        this.checkedAction( name, groupId == checkedGroup ? false : groupId )
    }

    /**
     * 判断是否已加载数据
     * @param groupId
     * @returns {*}
     */
    hasLoad = ( groupId, datas ) => {
        if ( !datas ) {
            return null
        }
        let has = false
        F( datas, ( data ) => {
            if ( data.GroupId == groupId ) {
                has = true
                return false
            }
        } )
        return has
    }


    componentDidUpdate() {
        this.loadShareTag()
        this.loadRoleTag()
    }

    /**
     * 加载角色标签id对应数据
     */
    loadRoleTag() {

        const { roles, error } = this.props
        const checkedGroup = this.props.checkedGroupChild || this.props.checkedGroup
        if ( !roles || !checkedGroup ) {
            return
        }

        if ( !this.didLoad[ TYPE.TAG_ROLE_LOAD + checkedGroup ] || (error && error[ TYPE.TAG_ROLE_LOAD ]) ) {
            const roleIds = F( roles, ( role, id ) => {
                if ( role.GroupId == checkedGroup ) {
                    return role.Id
                }
            } )
            if ( roleIds.length != 0 ) {
                this.didLoad[ TYPE.TAG_ROLE_LOAD + checkedGroup ] = true
                D( TYPE.TAG_ROLE_LOAD, Q().add( 'RoleId', roleIds.join( ',' ) ).ok() )
            }
        }

    }

    /**
     * 加载共享标签关系对应数据
     */
    loadShareTag() {
        const { shareTags, checkedGroup, checkedGroupChild, childGroups, joinGroups, ownerGroups, error } = this.props
        if ( !childGroups ) {
            return
        }

        if ( !this.didLoad[ TYPE.TAG_SHARE_LOAD + checkedGroup ] || (error && error[ TYPE.TAG_SHARE_LOAD ]) ) {

            //获取ids，子群组id集合
            const ids = []
            let belong = checkedGroup

            if ( joinGroups && joinGroups[ checkedGroup ] ) {
                belong = joinGroups[ checkedGroup ].GroupBelong
                ids.push( checkedGroup )
            }

            F( childGroups, ( group, id ) => {
                if ( group.GroupBelong == belong ) {
                    ids.push( group.Id )
                }
            } )

            //this.log(ids)

            if ( ids.length == 0 ) {
                return
            }
            this.didLoad[ TYPE.TAG_SHARE_LOAD + checkedGroup ] = true
            D( TYPE.TAG_SHARE_LOAD, Q().add( 'GroupId', ids.join( ',' ) ).ok() )
        }
    }

    /**
     * 加载子组
     * @param checked
     */
    loadGroupChild( checked, name ) {
        const { joinGroups } = this.props
        //this.log('loadGroupChild',checked)
        let groupId = checked
        let level = 0
        if ( name == 'join' ) {
            if ( joinGroups[ groupId ].parent != 0 ) {
                groupId = joinGroups[ groupId ].GroupBelong
                level = joinGroups[ groupId ].GroupLevel
            }
        }

        let loaded = false
        F( this.props.childGroups, ( data ) => {
            if ( data.GroupBelong == groupId ) {
                loaded = true
                return false
            }
        } )
        if ( !loaded ) {
            D( TYPE.GROUP_CHILD_LOAD,
                Q().query( 'GroupBelong', groupId ).query( 'GroupLevels.gt', level ).limit( 1000 ).ok() )

        }
    }
}

export default connect(
    ( state )=> {
        return {
            user: state.user,
            tags: state.tags.tags,
            roles: state.roles,
            shareTags: state.tags.shares,
            roleTags: state.tags.roleTags,
            permission: state.permission,
            ownerGroups: state.groups.ownerGroups,
            joinGroups: state.groups.joinGroups,
            applyGroups: state.groups.applyGroups,
            passGroups: state.groups.passGroups,
            childGroups: state.groups.childGroups,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
            error: state.error
        }
    }
    //bindActionCreators()
)( WindowResize( User ) )