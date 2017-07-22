/**
 * Created by kenn on 2016/10/27.
 */
import React from 'react'


import { F, T } from '../../../common'
import { BaseComponent, SelectView, Button } from '../../../components/BaseComponent'

export default class GroupSelect extends BaseComponent {
    display = 'GroupSelect'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 256,
        height: 'auto',
        label: '选择公司',
        fontColor: T.palette.white,
        color: T.palette.main
    }

    state = {
        open: false,
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        margin: React.PropTypes.any,
        color: React.PropTypes.string,
        fontColor: React.PropTypes.string,
        label: React.PropTypes.string,
        ownerGroups: React.PropTypes.object,
        joinGroups: React.PropTypes.object,
        checked: React.PropTypes.number,
        onChecked: React.PropTypes.func,
    }

    onItemTap = ( groupId ) => {
        this.setState( { open: false } )
        this.props.onChecked( groupId )
    }

    selectGroupItem = ( data, id, groupCheckedId, isOwner ) => {
        return <Button
            key={'group' + id}
            width={this.props.width}
            label={data.GroupName}
            fontColor={groupCheckedId == id ? T.palette.main : T.palette.darkBlack}
            hoverColor={T.palette.lightGrey}
            onTap={() => this.onItemTap( isOwner ? data.Id : data.GroupId )}
        />
    }

    render() {
        const {
            width,
            height,
            margin,
            fontColor,
            color,
            ownerGroups,
            joinGroups,
            checked
        } = this.props

        const { open } = this.state

        const titleStyle = { fontSize: T.fontSize.small, color: T.palette.grey, marginLeft: 16 }

        let selectChilds = []
        let label = null

        if ( checked ) {
            selectChilds.push(
                <Button
                    key={'groupcancel'}
                    width={this.props.width}
                    label={'取消选择'}
                    fontColor={T.palette.grey}
                    hoverColor={T.palette.lightGrey}
                    onTap={(  ) => this.onItemTap(0)}
                    radius={0}
                />
            )
        }

        if ( ownerGroups ) {
            if ( ownerGroups[ checked ] ) {
                label = ownerGroups[ checked ].GroupName
            }
            selectChilds.push( <p key='ownerGroups' style={titleStyle} value={'owner'} >自建的</p> )
            F( ownerGroups, ( data, id ) => {
                selectChilds.push( this.selectGroupItem( data, id, checked, true ) )
            } )
        }

        if ( joinGroups ) {
            if ( joinGroups[ checked ] ) {
                label = joinGroups[ checked ].GroupName
            }
            selectChilds.push( <p key="joinGroups" style={titleStyle} value={'join'} >加入的</p> )
            F( joinGroups, ( data, id ) => {
                selectChilds.push( this.selectGroupItem( data, id, checked, false ) )
            } )
        }

        return (
            <SelectView
                width={width}
                open={open}
                color={color}
                fontColor={fontColor}
                margin={margin}
                label={ label || this.props.label}
            >
                {selectChilds}
            </SelectView>
        )
    }
}