/**
 * Created by kenn on 16/8/7.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { M, F, D, Q, T, L } from '../common'
import View from './View'
import { AREA } from '../store/api'
import { AREA_LOAD } from '../actions/type'

/**
 * 地区选择组件
 * 绑定了area state
 *
 * props:
 *  areaId
 *  cityId
 *  isRequired
 *
 *  onChange
 */
class Area extends React.Component {
    display = 'Area'

    static defaultProps = {
        width: 'auto',
        areaId:     null,
        cityId:     null,
        districtId: null,
    }

    static propTypes = {
        width:      React.PropTypes.any,
        areaId:     React.PropTypes.any,
        cityId:     React.PropTypes.any,
        districtId: React.PropTypes.any,
        isRequired: React.PropTypes.bool,
        onChange:   React.PropTypes.func
    }


    render() {
        const { width, isRequired, areaId, cityId, districtId } = this.props
        console.log(this.props)
        return (
            <View width={width}>
                <SelectField
                    fullWidth={true}
                    value={areaId || ''}
                    onChange={( e, i, value ) => this.change( 1, value )}
                    floatingLabelText={'省' + (isRequired && !areaId ? ' *' : '')}
                >
                    {this.getAreaItems( 0 )}
                </SelectField>
                {
                    areaId ?
                    <SelectField
                        fullWidth={true}
                        value={cityId || ''}
                        onChange={( e, i, value ) => this.change( 2, value )}
                        floatingLabelText={'市' + (isRequired && !cityId ? ' *' : '')}
                    >
                        {this.getAreaItems( areaId )}
                    </SelectField>
                        :null
                }
                {
                    cityId ?
                    <SelectField
                        fullWidth={true}
                        value={districtId || ''}
                        onChange={( e, i, value ) => this.change( 3, value )}
                        floatingLabelText={'县(区)' + (isRequired && !districtId ? ' *' : '')}
                    >
                        {this.getAreaItems( cityId )}
                    </SelectField>
                        :null
                }
            </View>
        )
    }


    change( name, value ) {
        let areaId = null, cityId = null, districtId = null, info = null
        const { areas, onChange } = this.props
        switch ( name ) {
            case 1:
                areaId = value
                info = areas[ areaId ].AreaName
                break
            case 2:
                areaId = this.props.areaId
                cityId = value
                info = areas[ areaId ].AreaName + ' ' + areas[ cityId ].AreaName
                break
            default:
                areaId = this.props.areaId
                cityId = this.props.cityId
                districtId = value
                info = areas[ areaId ].AreaName + ' ' + areas[ cityId ].AreaName + ' ' + areas[ districtId ].AreaName
                break
        }


        if( name != 3 ) {
            let hasArea = false
            F( areas, ( data, id ) => {
                if ( data.AreaParentId == value ) {
                    hasArea = true
                    return false
                }
            } )

            if ( !hasArea ) {
                D( AREA_LOAD, Q().query( 'AreaParentId', value ).limit( 500 ).ok() )
            }
        }


        areaId = Number( areaId )
        cityId = Number( cityId )
        districtId = Number( districtId )

        if ( this.props.isRequired ) {
            onChange( info ? info : false, areaId || false, cityId || false, districtId || false )
        } else {

            onChange( info, areaId, cityId, districtId )
        }

    }

    componentDidMount() {
        if ( this.props.areaId) {
            D( AREA_LOAD, Q().query( 'AreaParentId', this.props.areaId ).limit( 500 ).ok() )
        }
        if ( this.props.cityId ) {
            D( AREA_LOAD, Q().query( 'AreaParentId', this.props.areaId ).limit( 500 ).ok() )
        }
    }

    getAreaItems( parentId ) {
        return F( this.props.areas, ( data, id ) => {
            if ( data.AreaParentId == parentId ) {
                return <MenuItem key={id} value={data.Id} primaryText={data.AreaName} />
            }
        } )
    }

}

export default connect(
    ( state )=> {
        return {
            areas: state[ AREA ]
        }
    }
    //bindActionCreators()
)( Area )