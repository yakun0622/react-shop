/**
 * Created by kenn on 16/8/10.
 */
import React from 'react'
import { connect } from 'react-redux'


import { S, P, M, F, D, Q, T } from '../../../common'
import { BaseComponent, Dialog, Area, DonelIcon, TextField } from '../../../components/BaseComponent'

import { GOODS } from '../../../store/api'
import { ADDRESS_ADD, ADDRESS_EDIT } from '../../../actions/type'

class OrderAddressEdit extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'OrderAddressEdit'

        this.state = {
            datas: props.datas || {
                TrueName: null,
                MobPhone: null,
                TelPhone: '',
                AreaInfo: '',
                AreaId: null,
                CityId: null,
                districtId: null,
                Address: null
            }
        }
    }

    //componentWillReceiveProps( props ) {
    //    this.setState( { datas: props.datas || {
    //        TrueName: false,
    //        MobPhone: false,
    //        TelPhone: '',
    //        AreaInfo: '',
    //        AreaId: false,
    //        CityId: false,
    //        districtId: null,
    //        Address: false
    //    } } )
    //}

    area( AreaInfo, AreaId, CityId, districtId ) {
        let addressData = this.state.datas
        addressData.AreaInfo = AreaInfo
        addressData.AreaId = AreaId
        addressData.CityId = CityId
        addressData.districtId = districtId
        this.setState( { addressData } )
    }

    editAddressData( name, value ) {
        const datas = this.state.datas
        datas[ name ] = value
        this.setState( { datas } )
    }

    submit() {
        const datas = this.state.datas
        delete datas.districtId

        D( this.props.isAdd ? ADDRESS_ADD : ADDRESS_EDIT, this.state.datas, this.state.datas.Id )
        this.setState( { datas: {
            TrueName: false,
            MobPhone: false,
            TelPhone: '',
            AreaInfo: '',
            AreaId: false,
            CityId: false,
            districtId: null,
            Address: false
        } } )
        this.props.onClose( false )
    }

    render() {
        const { TrueName, MobPhone, TelPhone, AreaId, CityId, Address, districtId } = this.state.datas
        const { isAdd, open } = this.props

        return (
            <Dialog
                open={open}
                width={600}
                close={this.props.onClose}
            >
                {
                    this.verify( this.state.datas ) &&
                    <DonelIcon {...S()
                        .color( T.palette.white600a, 2 )
                        .color( T.palette.white, 3 )
                        .size( 64 )
                        .click( () => this.submit() )
                        .hand()
                        .position( 2 )
                        .top( -64 )
                        .right( -64 )
                        .p()}
                    />

                }

                <TextField
                    name="TrueName"
                    label={'姓名'}
                    value={TrueName}
                    onChange={( name, value ) => this.editAddressData( name, value )}
                />
                <TextField
                    name="MobPhone"
                    label={'手机'}
                    value={MobPhone}
                    onChange={( name, value ) => this.editAddressData( name, value + '' )}
                />
                <TextField
                    name="TelPhone"
                    label={'座机'}
                    value={TelPhone}
                    onChange={( name, value ) => this.editAddressData( name, value+ '' )}
                />

                <Area
                    areaId={AreaId}
                    cityId={CityId}
                    districtId={districtId}
                    width={550}
                    onChange={( AreaInfo, AreaId, CityId, districtId ) => this.area( AreaInfo,
                        AreaId,
                        CityId,
                        districtId )}
                    isRequired={true} />

                <TextField
                    name="Address"
                    value={Address}
                    label={'详细地址'}
                    onChange={( name, value ) => this.editAddressData( name, value )}
                />
            </Dialog>

        );
    }
}

export default connect(
    ( state )=> {
        return {
            data: state.user
        }
    }
    //bindActionCreators()
)( OrderAddressEdit )