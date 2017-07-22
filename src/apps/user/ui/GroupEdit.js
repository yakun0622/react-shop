/**
 * Created by kenn on 16/9/14.
 */
import React from 'react'

import { M, F, D, Q, T, L } from '../../../common'
import { BaseComponent, Form, TextField, Area } from '../../../components/BaseComponent'
import { GROUP_ADD, GROUP_EDIT, AREA_LOAD } from '../../../actions/type'

export default class GroupEdit extends BaseComponent {
    display = 'GroupEdit'

    constructor( props ) {
        super( props )
        this.state = {
            datas: props.datas || this.initDatas( props )
        }
    }

    initDatas = ( props ) => {
        return {
            GroupName: false,
            GroupDesc: null,
            GroupEmail: null,
            GroupTel: null,
            GroupAddress: null,
            GroupParent: props.parentId,
            GroupOwnerId: props.ownerId,
            GroupOwnerName: props.ownerName,
            GroupMemberCount: props.memberCount || 0,
            GroupBelong: props.belongId,
            GroupLevels: props.groupLevels,
            GroupAreaId: null,
            GroupCityId: null,
            GroupDistrictId: null,
            GroupAreaInfo: null,
        }
    }

    componentWillReceiveProps( props ) {
        let datas = this.state.datas
        if ( props.datas ) {
            datas = props.datas
        } else {
            //this.log('ownerID',props.ownerId)
            datas.GroupParent = props.parentId
            datas.GroupOwnerId = props.ownerId
            datas.GroupOwnerName = props.ownerName
            datas.GroupMemberCount = props.memberCount || 0
            datas.GroupBelong = props.belongId
            datas.GroupLevels = props.groupLevels
        }
        this.setState( { datas } )
    }

    static defaultProps = {
        open: false,
        parentId: 0,
        memberCount: 0,
    }

    static propTypes = {
        parentId: React.PropTypes.number,
        close: React.PropTypes.func,
        open: React.PropTypes.bool,
        ownerId: React.PropTypes.number,
        ownerName: React.PropTypes.string,
        memberCount: React.PropTypes.number,
        belongId: React.PropTypes.number
    }

    render() {
        const {
            close,
            open,
            parentId
        } = this.props
        const { datas } = this.state
        //this.log('render', datas.GroupOwnerId )
        return (
            <Form
                width={500}
                open={open}
                close={close}
                modal={true}
                datas={datas}
                label={datas.Id ? '公司信息编辑' : parentId ? '创建子公司' : '创建公司'}
                submitLabel={datas.Id ? '修改' : '保存'}
                isSubmitJson={true}
                actionType={datas.Id ? GROUP_EDIT : GROUP_ADD}
            >
                <TextField
                    name={'GroupName'}
                    value={datas.GroupName}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ required: true, minLength: 2, maxLength: 32 }}
                    label={'公司名称'}
                />
                <TextField
                    name={'GroupDesc'}
                    value={datas.GroupDesc}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 5, maxLength: 256 }}
                    label={'公司描述'}
                />
                <TextField
                    name={'GroupEmail'}
                    value={datas.GroupEmail}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 5, maxLength: 256 }}
                    label={'Email'}
                />
                <TextField
                    name={'GroupTel'}
                    value={datas.GroupTel}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 5, maxLength: 256 }}
                    label={'公司电话'}
                />
                <Area
                    areaId={datas.GroupAreaId}
                    cityId={datas.GroupCityId}
                    districtId={datas.GroupDistrictId}
                    onChange={( info, areaId, cityId, districtId ) => this.setArea( info,
                        areaId,
                        cityId,
                        districtId )}
                />
                <TextField
                    name={'GroupAddress'}
                    value={datas.GroupAddress}
                    onChange={( name, value ) => this.setFormDatas( name, value )}
                    rules={{ minLength: 5, maxLength: 256 }}
                    label={'公司详细地址'}
                />
            </Form>
        )
    }

    setArea( info, areaId, cityId, districtId ) {
        const datas = this.state.datas
        datas.GroupAreaId = areaId
        datas.GroupCityId = cityId
        datas.GroupDistrictId = districtId
        datas.GroupAreaInfo = info
        //L( this.display, datas.GroupAreaId )
        //L( this.display, datas.GroupCityId )
        //L( this.display, datas.GroupDistrictId )
        this.setState( { datas } )

    }

    componentDidMount() {
        D( AREA_LOAD, Q().query( 'AreaParentId', 0 ).limit( 40 ).ok() )
    }
}
