/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T } from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    CardView,
    ListView,
    TabView,
    AccountCircle,
    Dialog,
    SelectView,
    CheckView,
    Label,
    TextField
} from '../../../components/BaseComponent'

import { IMAGE_DATA_URL, IMAGEURL } from '../../config'

import * as API from '../../../store/api'
import * as TYPE from '../../../actions/type'

class Member extends BaseComponent {
    display = 'Member'

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
    }

    componentWillMount() {
        this.setState( {
            checked: 0,
            openAssignRole: false,
            checkedChildGroupId: -1,
            open: false,
            searchValue: null,
            checkedRoleId: -1,

            openRemoveMember: false,
            leaveReason: '',
            removeName: '解雇'
        } )
    }

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    render() {
        const {
            width,
            height,
            applyMembers,
            checkedGroup,
            childGroups
        } = this.props
        const { checked, openAssignRole, checkedChildGroupId, open, checkedRoleId, openRemoveMember, removeName } = this.state

        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'} >
                <TabView
                    width={'auto'}
                    grow={1}
                    color={T.palette.lightGrey}
                    fontColor={T.palette.maxGrey}
                    hoverColor={T.palette.grey}
                    hoverFontColor={T.palette.white}
                    checkedColor={T.palette.main}
                    margin={16}
                    toggle={false}
                    tabs={[ '在职', '人才库', '申请者', '离职' ]}
                    checked={checked}
                    onChecked={( checked ) => this.setState( { checked } ) }
                >
                    {this.list( 'joinMembers' )}
                    {this.list( 'passMembers' )}
                    {this.list( 'applyMembers' )}
                    {this.list( 'rejectMembers' )}
                </TabView>

                <Dialog
                    title={'分配角色'}
                    width={500}
                    open={!!openAssignRole}
                    rightButton={'保 存'}
                    onRightButton={this.onAssignRoleRightButton}

                    close={() => this.setState( { openAssignRole: false, checkedChildGroupId: -1 } )}
                >
                    <SelectView
                        width={200}
                        open={open}
                        showSearch={true}
                        showChecked={true}
                        color={T.palette.orange}
                        fontColor={T.palette.white}
                        hoverColor={T.palette.main}
                        hoverFontColor={T.palette.white}
                        radius={5}
                        margin={16}
                        tree={true}
                        items={childGroups}
                        itemParentKey={'GroupParent'}
                        itemNameKey={'GroupName'}
                        firstParent={checkedGroup}
                        label={'选择子组'}

                        checked={checkedChildGroupId}
                        onChecked={this.onAssignRoleChildGroupChecked}
                    />
                    <CheckView
                        width={'auto'}
                        wrap={'wrap'}
                        datas={this.getRoles()}
                        isNumber={true}
                        itemWidth={150}
                        margin={8}
                        checked={checkedRoleId}
                        onCheck={( name, checkedRoleId ) => this.setState( { checkedRoleId } )}
                    />
                </Dialog>
                <Dialog
                    title={removeName + '成员'}
                    width={500}
                    open={!!openRemoveMember}
                    rightButton={removeName}
                    onRightButton={this.onRemoveMemberRightButton.bind( this, removeName )}
                    bodyPadding={16}

                    close={() => this.setState( { openRemoveMember: false, leaveReason: '' } )}
                >
                    <TextField
                        name='LeaveReason'
                        value={this.state.leaveReason}
                        label={removeName + '原因'}
                        onChange={( name, leaveReason ) => this.setState( { leaveReason } )}
                        rowsMax={10}
                        rules={{ maxlength: 255 }}
                    />
                </Dialog>
            </View>
        )
    }

    onRemoveMemberRightButton = ( name ) => {
        const formdata = {'Id': this.state.openRemoveMember, 'LeaveReason': this.state.leaveReason}
        if ( name == '解雇' ) {
            formdata.Status = 6
        } else {
            formdata.Status = 0
        }
        D( TYPE.MEMBER_REMOVE, formdata, 'form' )

        this.setState( { openRemoveMember: false } )
    }

    onAssignRoleChildGroupChecked = ( checkedChildGroupId ) => {
        if ( !this.has( this.props.roles, checkedChildGroupId, 'GroupId' ) ) {
            D( TYPE.ROLE_LOAD, Q().query( 'group_id', checkedChildGroupId ).ok() )
        }

        this.setState( { checkedChildGroupId } )
    }

    onAssignRoleRightButton = () => {
        const { roles, checkedGroup, joinMembers } = this.props
        const { checkedRoleId, openAssignRole, checkedChildGroupId } = this.state

        if ( checkedRoleId == -1 ) {
            return
        }
        if ( joinMembers && joinMembers[ openAssignRole ] && joinMembers[ openAssignRole ].RoleId ) {
            D( TYPE.MEMBER_CHANGE_ROLE,
                {
                    'Id': openAssignRole,
                    'RoleId': checkedRoleId,
                    'GroupId': checkedChildGroupId == -1 ? checkedGroup : checkedChildGroupId,
                    'MemberId': joinMembers[ openAssignRole ].MemberId,
                    'ApplyTime': joinMembers[ openAssignRole ].ApplyTime,
                    'JoinTime': joinMembers[ openAssignRole ].JoinTime
                },
                'form'
            )
        } else {
            D( TYPE.MEMBER_ASSIGN_ROLE,
                {
                    'RoleId': checkedRoleId,
                    'Id': openAssignRole,
                    'GroupId': checkedChildGroupId == -1 ? checkedGroup : checkedChildGroupId
                },
                'form'
            )
        }


        this.setState( { openAssignRole: false, checkedRoleId: -1 } )
    }

    getRoles() {
        const { roles, checkedGroup } = this.props
        const { checkedChildGroupId } = this.state
        const groupId = checkedChildGroupId == -1 ? checkedGroup : checkedChildGroupId
        const rolesDatas = {}
        F( roles, ( role, id ) => {
            if ( role.GroupId == groupId && role.RoleLock ) {
                rolesDatas[ id ] = role.RoleName
            }
        } )
        return rolesDatas
    }

    list( name ) {

        const { checkedGroup, childGroups, checkedGroupChild } = this.props

        return (
            <View wrap={'wrap'} overflow={'visible'} >
                {F( this.props[ name ], ( member, id ) => {
                    if ( name == 'joinMembers' && checkedGroupChild ) {
                        if ( member.GroupId == checkedGroupChild ) {
                            return this.listItem( name, member, id )
                        }
                    } else if ( member.GroupId == checkedGroup ) {
                        return this.listItem( name, member, id )
                    }
                } )}
            </View>
        )

    }

    listItem( name, member, id ) {
        const { checkedGroup, childGroups, roles } = this.props
        return (
            <CardView
                key={id + 12}
                width={150}
                height={100}
                align={'center'}
                image={member.MemberAvatar != '' ? IMAGE_DATA_URL + member.MemberAvatar
                    : <AccountCircle style={{ width: 64, height: 64, margin: '8px 0 0' }}
                                     color={T.palette.lightGrey} />}
                imageWidth={64}
                imageHeight={64}
                imageMargin={'8px 0 0'}
                margin={20}
                primaryText={member.MemberTruename != '' ? member.MemberTruename
                    : member.MemberName != '' ? member.MemberName : member.MemberMobile}
                textHeight={24}
            >
                {name == 'joinMembers' &&
                 <Label text={'角色: ' + roles[ member.RoleId ].RoleName} margin={8} fontColor={T.palette.maxGrey} />
                }

                {name == 'applyMembers' ?
                    <Button
                        width={128}
                        label={'收录人才库'}
                        color={T.palette.minGrey}
                        hoverColor={T.palette.orange}
                        fontColor={T.palette.maxGrey}
                        hoverFontColor={T.palette.white}
                        margin={8}
                        onTap={() => D( TYPE.MEMBER_PASS,
                            { Id: member.MgId, GroupId: checkedGroup }, 'form' )}
                    /> : null}

                {name != 'rejectMembers' ?
                    <Button
                        width={128}
                        label={name == 'joinMembers' ? '转换角色' : '分配角色'}
                        color={T.palette.minGrey}
                        hoverColor={T.palette.orange}
                        fontColor={T.palette.maxGrey}
                        hoverFontColor={T.palette.white}
                        margin={8}
                        onTap={() => this.setState( {
                            openAssignRole: id,
                            checkedChildGroupId: name == 'joinMembers' &&
                                                 childGroups[ member.GroupId ] ? member.GroupId : -1,
                            checkedRoleId: name == 'joinMembers' ? member.RoleId : -1,
                        } )}
                    /> : null}

                {name != 'rejectMembers' ?
                    <Button
                        width={128}
                        label={name == 'joinMembers' ? '解雇' : name == 'passMembers' ? '删除' : '拒绝'}
                        color={T.palette.minGrey}
                        hoverColor={T.palette.red}
                        fontColor={T.palette.maxGrey}
                        hoverFontColor={T.palette.white}
                        margin={8}
                        onTap={() => this.setState( {
                            openRemoveMember: id,
                            removeName: name == 'joinMembers' ? '解雇' : '删除'
                        } )}
                    /> : null}
            </CardView>
        )
    }
}
export default connect(
    ( state ) => {
        return {
            user: state.user,
            roles: state.roles,
            applyMembers: state.members.apply,
            childGroups: state.groups.childGroups,
            passMembers: state.members.pass,
            joinMembers: state.members.join,
            rejectMembers: state.members.reject,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
        }
    }
    //bindActionCreators()
)( Member )