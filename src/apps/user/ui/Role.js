/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, DD, Q, T, L } from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    TabView,
    Form,
    TextField,
    CheckView,
    LockIcon,
    CardView,
    LabelIcon,
    Dialog,
    KeyIcon
} from '../../../components/BaseComponent'

import * as API from '../../../store/api'
import * as TYPE from '../type'

class Role extends BaseComponent {
    display = 'Role'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
    }

    componentWillMount() {
        this.setState( {
            permissionChecked: null,
            lock: 0,
            roleTagIds: false,
            roleDatas: {
                RoleName: false,
                RoleDesc: null,
                GroupId: Number( this.props.checkedGroupChild || this.props.checkedGroup ),
                RolePermission: null,
                ApproveLevel: null,
                ApproveOrder: null,
                ApproveMonth: null,
                ApproveYear: null
            }
        } )
    }

    componentWillReceiveProps( props ) {
        const roleDatas = this.state.roleDatas
        roleDatas.GroupId = Number( props.checkedGroupChild || props.checkedGroup )
        this.setState( { roleDatas } )
    }

    render() {

        const { roles, checkedGroup, checkedGroupChild } = this.props
        const { lock, isEdit, roleDatas } = this.state
        const checked = checkedGroupChild || checkedGroup

        return (
            <View orientation={'column'} width={'100%'} overflow={'visible'} >
                <View>
                    <Button
                        width={128}
                        label={'添加角色'}
                        color={T.palette.orange}
                        hoverColor={T.palette.main}
                        fontColor={T.palette.white800a}
                        hoverFontColor={T.palette.white}
                        margin={8}
                        onTap={() => this.open( null, false )}
                    />
                    <TabView
                        width={200}
                        tabs={[ '角色', '锁定的角色' ]}
                        margin={8}
                        fontColor={T.palette.grey}
                        checked={lock}
                        toggle={false}
                        onChecked={( checked ) => this.setState( { lock: checked } )}
                    />
                </View>


                {roles && <View width={'100%'} wrap={'wrap'} alignH={'center'} overflow={'visible'} >
                    {F( roles, ( role, id ) => {
                        if ( checked == role.GroupId && role.RoleLock == !this.state.lock ) {
                            return (
                                <CardView
                                    key={'role' + id}
                                    width={200}
                                    height={48}
                                    align={'center'}
                                    primaryText={role.RoleName}
                                    secondText={role.RoleDesc}
                                    margin={8}
                                    onTap={() => this.open( role, true )}
                                >
                                    <View>
                                        <Button
                                            icon={role.RoleLock ? LockIcon : KeyIcon }
                                            iconSize={24}
                                            margin={8}
                                            onTap={() =>
                                                DD( role.RoleLock ? '确定要锁住该角色，不使用吗？' : '确定继续使用该角色吗？',
                                                    role.RoleLock ? TYPE.ROLE_LOCK : TYPE.ROLE_UNLOCK, null, role.Id )}
                                        />
                                        {role.RoleLock ?
                                            <Button
                                                icon={ LabelIcon }
                                                iconSize={24}
                                                margin={8}
                                                onTap={() => this.openEditTags( role.Id )}
                                            />
                                            : null
                                        }
                                    </View>
                                </CardView>

                            )
                        }
                    } )}
                </View>
                }
                {this.editRole( roleDatas, isEdit )}
                {this.editTags( roleDatas, isEdit )}
            </View>
        )
    }

    /**
     * 打开角色标签选择器
     * @param checkedRoleId
     */
    openEditTags( checkedRoleId ) {
        this.setState( {
            openEditTags: true,
            checkedRoleId
        } )
    }

    /**
     * 为角色绑定标签
     * @returns {XML}
     */
    editTags() {
        const { tags, checkedGroup } = this.props
        let checkDatas = {}
        let tagIds = []
        F( tags, ( tag, id ) => {
            if ( checkedGroup == tag.GroupId && tag.TagLock ) {
                checkDatas[ id ] = tag.TagName
                tagIds.push( tag.Id )
            }
        } )

        const defaultRoleTags = F( this.props.roleTags, ( datas ) => {
            if ( datas.RoleId == this.state.checkedRoleId ) {
                return datas.TagId
            }
        } )

        this.log(defaultRoleTags)

        return (
            <Dialog
                width={616}
                title={'标签设定'}
                open={this.state.openEditTags}
                rightButton={'保 存'}
                onRightButton={() => this.onEditTags( defaultRoleTags )}
                close={() => this.setState( { openEditTags:false, roleTagIds: false } )}
            >
                <View alignH={'center'} margin={8} >
                    <Button
                        width={128}
                        label={'全选'}
                        onTap={() => this.setState( { roleTagIds: tagIds } )}
                    />
                    <Button
                        width={128}
                        label={'取消'}
                        onTap={() => this.setState( { roleTagIds: [] } )}
                    />
                </View>
                <CheckView
                    width={616}
                    wrap={'wrap'}
                    datas={checkDatas}
                    multiple={true}
                    isNumber={true}
                    itemWidth={150}
                    margin={8}
                    checked={this.state.roleTagIds || defaultRoleTags }
                    onCheck={( name, checked ) => this.setState( { roleTagIds: checked } )}
                />
            </Dialog>
        )
    }

    /**
     * 提交角色标签选择
     * @param oldTagIds
     */
    onEditTags( oldTagIds ) {
        const { roleTagIds, checkedRoleId } = this.state


        if ( oldTagIds.length != 0 ) {
            const addTagIds = []
            const removeTagIds = []

            if( roleTagIds ) {
                roleTagIds.forEach( ( newId ) => {
                    if ( oldTagIds.indexOf( newId ) == -1 ) {
                        addTagIds.push( newId )
                    }
                } )
            }

            oldTagIds.forEach( ( oldId ) => {
                if ( !roleTagIds || roleTagIds.indexOf( oldId ) == -1 ) {
                    removeTagIds.push( oldId )
                }
            } )

            this.log( 'add', addTagIds )
            this.log( 'remove', removeTagIds )

            if ( addTagIds.length != 0 ) {
                const formdata = {}
                formdata.RoleId = checkedRoleId
                formdata.TagIds = JSON.stringify( addTagIds )
                D( TYPE.TAG_ROLE_ADD, formdata, 'form' )
            }

            if ( removeTagIds.length != 0 ) {
                const formdata = {}
                formdata.RoleId = checkedRoleId
                formdata.TagIds = JSON.stringify( removeTagIds )
                D( TYPE.TAG_ROLE_REMOVE, formdata, 'form' )
            }

        } else if ( roleTagIds.length != 0 ) {
            const formdata = {}
            formdata.RoleId = checkedRoleId
            formdata.TagIds = JSON.stringify( roleTagIds )
            D( TYPE.TAG_ROLE_ADD, formdata, 'form' )
        }
        this.setState( { openEditTags: false } )
    }


    open( datas, isEdit ) {
        this.setState( {
            roleDatas: datas || {
                RoleName: false,
                RoleDesc: null,
                GroupId: Number( this.props.checkedGroupChild || this.props.checkedGroup ),
                RolePermission: null,
                ApproveLevel: null,
                ApproveOrder: null,
                ApproveMonth: null,
                ApproveYear: null
            },
            open: true,
            isEdit
        } )
    }


    /**
     * 编辑权限
     * @param roleDatas
     * @param isEdit
     * @returns {XML}
     */
    editRole( roleDatas, isEdit ) {
        const permission = roleDatas.RolePermission
        //this.log('permission',(permission & 2) == 2)
        const isApprover = permission ? ((permission & 4) == 4) : false
        return (
            <Form
                width={500}
                label={'角色设置'}
                open={this.state.open}
                datas={roleDatas}
                actionType={isEdit ? TYPE.ROLE_EDIT : TYPE.ROLE_ADD}
                isSubmitJson={true}
                close={() => this.closeDialog( 'open' )}
            >
                <TextField
                    name={'RoleName'}
                    value={roleDatas.RoleName}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'角色名称'}
                    rules={{ required: true, minLength: 2, maxLength: 64 }}
                />
                <TextField
                    name={'RoleDesc'}
                    rowsMax={10}
                    value={roleDatas.RoleDesc}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'角色简述'}
                    rules={{ minLength: 2, maxLength: 255 }}
                />
                <CheckView
                    itemWidth={220}
                    defaultValue={this.getPermission( roleDatas.RolePermission )}
                    checked={this.getPermission( roleDatas.RolePermission )}
                    wrap={'wrap'}
                    multiple={true}
                    isNumber={true}
                    name={'RolePermission'}
                    label={'权限'}
                    datas={this.permissionDatas()}
                    onCheck={( name, checked ) => this.setPermission( name, checked, 'roleDatas' )}
                />
                {isApprover && <TextField
                    name={'ApproveLevel'}
                    value={roleDatas.ApproveLevel}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'审批级别'}
                    rules={{ number: true }}
                />}
                {isApprover && <TextField
                    name={'ApproveOrder'}
                    value={roleDatas.ApproveOrder}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'订单审批额度'}
                    rules={{ number: true }}
                />}
                {isApprover && <TextField
                    name={'ApproveMonth'}
                    value={roleDatas.ApproveMonth}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'月审批额度'}
                    rules={{ number: true }}
                />}
                {isApprover && <TextField
                    name={'ApproveYear'}
                    value={roleDatas.ApproveYear}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'roleDatas' )}
                    label={'年审批额度'}
                    rules={{ number: true }}
                />}

            </Form>
        );
    }

    /**
     * 设置权限选项数据
     * @returns {*|number}
     */
    permissionDatas() {
        let p = M(this.props.permission)
        //this.log(this.props.permission )
        if ( this.props.checkedGroupChild ) {
            delete p[ 1 ]
            delete p[ 2 ]
        }

        return p
    }

    /**
     * 获取权限
     * @param permission
     * @returns {*}
     */
    getPermission = ( permission ) => {
        let p = []

        //this.log( permission )
        F( this.props.permission, ( data, code ) => {
            if ( Number( code ) & permission ) {
                p.push( Number( code ) )
            }
        } )

        if ( p.length > 0 ) {
            return p
        }

        return null
    }

    /**
     * 设置权限
     * @param name
     * @param datas
     * @param stateName
     */
    setPermission = ( name, datas, stateName ) => {
        let p = 0

        datas.forEach( ( data ) => {
            p = p | data
        } )
        this.setFormDatas( name, p, stateName )
    }
}
export default connect(
    ( state )=> {
        return {
            tags: state.tags.tags,
            roleTags: state.tags.roleTags,
            roles: state.roles,
            permission: state.permission,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
        }
    }
    //bindActionCreators()
)( Role )