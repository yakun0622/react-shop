/**
 * Created by kenn on 16/7/8.
 */
import React from 'react'
import { connect } from 'react-redux'

import { BaseComponent, Button, View, Label } from '../../../components/BaseComponent'
import { S, P, Q, D, F, T, DG, C } from '../../../common'
import { COOPTS, CATEGORYS, CHECKEDST, SEARCH } from '../../../store/api'
import { SEARCH_COOPTS, SEARCH_CATEGORY, GOODS_COMMON_LIST_LOAD } from '../../../actions/type'

import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import { GOOD_LIST_LIMIT } from '../../config'

class Coopt extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Coopt'

        this.state = {
            height: 32
        }
    }

    mouseOver() {
        this.setState( {
            height: 'auto'
        } )
    }

    mouseLeave() {
        this.setState( {
            height: 32
        } )
    }

    /**
     * 创建分类引导标签
     * @param categoryChecked
     * @param categorys
     * @returns {null}
     */
    categoryTag( categoryChecked, categorys, levels ) {
        if ( categoryChecked ) {
            let each = ( tags, id, level ) => {
                let parent = 0
                F( categorys, ( value ) => {
                    if ( value.Id == id ) {
                        const tag =
                            <Button
                                key={'category' + value.Id}
                                label={value.GcName}
                                height={32}
                                fontSize={T.fontSize.small}
                                onTap={() => this.cooptTap( null, value.Id, level, true )}
                            />
                        tags.unshift( tag )

                        parent = value.GcParentId
                    }
                } )

                if ( parent === 0 ) {
                    return tags
                } else {
                    tags.unshift(
                        <Label key={id + 's'} text={"|"} />
                    )
                    return each( tags, parent, level - 1 )
                }
            }
            return <View alignV={'center'} >
                {each( [], categoryChecked, levels )}
            </View>
        }
        return null
    }

    /**
     * 点击删选项事件
     * @param name
     * @param key
     * @param value
     */
    cooptTap( name, id, data, isCategory, specName ) {
        let searchData = this.props.data.searchData
        if ( !searchData ) {
            searchData = {}
        }

        if ( isCategory ) {

            searchData[ CATEGORYS ] = id
            searchData[ 'categoryLevel' ] = data

            // D( GOODS_COMMON_LIST_LOAD,
            //     Q().query( 'GcId' + data, id ).limit( GOOD_LIST_LIMIT ).ok() )
            //
            // D( SEARCH_CATEGORY, level, key )
        } else {
            //let newsearchData = searchData
            if ( !searchData[ 'coopt' ] ) {
                searchData[ 'coopt' ] = {}
            }

            if ( name != 'brand' && name != 'price' ) {
                // this.log(id, data)
                if ( searchData[ 'coopt' ].speces ) {
                    if ( searchData[ 'coopt' ].speces[ name ] ) {
                        if ( searchData[ 'coopt' ].speces[ name ].values[ id ] ) {
                            delete searchData[ 'coopt' ].speces[ name ].values[ id ]
                            if ( !C( searchData[ 'coopt' ].speces[ name ].values ) ) {
                                delete searchData[ 'coopt' ].speces[ name ]
                                if ( !C( searchData[ 'coopt' ].speces ) ) {
                                    delete searchData[ 'coopt' ].speces
                                }
                            }
                        } else {
                            searchData[ 'coopt' ].speces[ name ].values[ id ] = data
                        }
                    } else {
                        searchData[ 'coopt' ].speces[ name ] = {
                            SpName: specName,
                            values: {}
                        }
                        searchData[ 'coopt' ].speces[ name ].values[ id ] = data
                    }
                } else {
                    searchData[ 'coopt' ].speces = {}
                    searchData[ 'coopt' ].speces[ name ] = {
                        SpName: specName,
                        values: {}
                    }
                    searchData[ 'coopt' ].speces[ name ].values[ id ] = data
                }
            } else {
                if ( searchData[ 'coopt' ].hasOwnProperty( name ) ) {
                    if ( searchData[ 'coopt' ][ name ].hasOwnProperty( id ) ) {
                        delete searchData[ 'coopt' ][ name ][ id ]
                        if ( !C( searchData[ 'coopt' ][ name ] ) ) {
                            delete searchData[ 'coopt' ][ name ]
                            if ( !C( searchData[ 'coopt' ] ) ) {
                                delete searchData[ 'coopt' ]
                            }
                        }
                    } else {
                        searchData[ 'coopt' ][ name ][ id ] = data
                    }
                } else {
                    searchData[ 'coopt' ][ name ] = {}
                    searchData[ 'coopt' ][ name ][ id ] = data
                }
            }

            if ( !C( searchData[ 'coopt' ] ) ) {
                delete searchData[ 'coopt' ]
            }
        }

        DG( searchData )

        // D( SEARCH_COOPTS, {
        //     name,
        //     id,
        //     data
        // } )
    }

    /**
     * 创建选中的删选项标签
     * @param data
     * @returns {*}
     */
    checkedCoopt( data ) {
        if ( !data ) {
            return null
        }

        return (
            <View>
                {
                    F( data, ( value, key ) => {
                        if ( key == 'speces' ) {
                            return F( value, ( specData, specId ) => {
                                return this.checkedCooptItem( specId,
                                    this.setSpecName( key, specData ),
                                    specData.values )
                            } )
                        } else {
                            return this.checkedCooptItem( key, this.setSpecName( key, value ), value )
                        }
                    } )
                }
            </View>
        )
    }

    checkedCooptItem( key, specName, value ) {
        return (
            <View key={key + 1} stopEvent={false}>
                <Label
                    text={specName}
                    fontSize={T.fontSize.small}
                    fontColor={T.palette.grey}
                    key={key + 2}
                    margin={'0 4px'}
                />
                {F( value, ( data, id ) => {
                    return <Button
                        key={'coopt' + id}
                        height={16}
                        fontSize={T.fontSize.small}
                        onTap={() => this.cooptTap( key, id, data, false )}
                        color={T.palette.lightGrey}
                        label={this.getName( key, data ) }
                        radius={12}
                    />
                } )}
            </View>
        )
    }

    /**
     * 获取规格值
     * @param name
     * @param data
     * @returns {*}
     */
    getName = ( name, data ) => {
        // this.log(name, data)
        switch ( name ) {
            case 'brand':
                return data.BrandName
                break
            case 'price':
                return data
                break
            default:
                return data
                break
        }
    }

    /**
     * 选中项的边框颜色
     * @param name
     * @param key
     * @param search
     * @returns {*}
     */
    cooptOptionColor( name, key ) {
        const { search } = this.props.data

        if ( search ) {
            if ( name != 'brand' && name != 'price' ) {
                if ( search.speces && search.speces[ name ] && search.speces[ name ].values[ key ] ) {
                    return "1px solid " + T.palette.grey
                }
            } else {
                if ( search[ name ] && search[ name ][ key ] ) {
                    return "1px solid " + T.palette.grey
                }
            }
        }

        return '1px solid rgba(0,0,0,0)'
    }

    /**
     * 设置规格显示名称
     * @param key
     * @param data
     * @returns {*}
     */
    setSpecName( key, data ) {
        switch ( key ) {
            case 'brand':
                return '品牌'
                break
            case 'price':
                return '价格'
                break
            default:
                return data.SpName
                break
        }
    }


    render() {
        const { categoryChecked, coopts, categorys, search, categoryLevel } = this.props.data
        //const {display} = this.state
        // this.log(width)
        const rootAttr = {
            style: {
                display: categoryChecked ? 'block' : 'none',
                width: this.props.width,
                overflow: 'hidden',
                height: this.state.height,
                backgroundColor: T.palette.minGrey,
                position: 'absolute',
                top: 60,
                left: 0
            },

            onMouseOver: () => this.mouseOver(),
            onMouseLeave: () => this.mouseLeave()
        }

        //this.log(categoryChecked)

        return (
            <div {...rootAttr}>
                <View alignV={'center'}>
                    {this.categoryTag( categoryChecked, categorys, categoryLevel )}
                    {this.checkedCoopt( search )}
                </View>
                <View orientation={'column'} width={this.props.width-24} margin={'0 12px'} >
                    {F( coopts, ( value, key ) => {
                        if ( key == 'speces' ) {
                            return F( value, ( specData, specId ) => {
                                {/*this.log(specId, specData)*/
                                }
                                return this.specItem( specId, this.setSpecName( key, specData ), specData.values )
                            } )
                        } else {
                            return this.specItem( key, this.setSpecName( key, value ), value )
                        }
                    } )}
                </View>
            </div>
        )
    }

    specItem( key, specName, specValue ) {
        // this.log(specName,specValue)
        return (
            <View key={key + 'li'} width={'100%'} margin={'0 0 8px'} >
                <Label
                    width={100}
                    height={16}
                    text={specName}
                    key={key + 'spec'}
                    fontSize={T.fontSize.small}
                    fontColor={T.palette.grey}
                />
                <View wrap={'wrap'} width={0} grow={1}>
                    {F( specValue, ( v, k ) => {
                        return <Button
                            height={16}
                            style={{ border: this.cooptOptionColor( key, k ), minWidth: 80 }}
                            align={'left'}
                            margin={'0 4px 0 0'}
                            fontSize={T.fontSize.small}
                            fontColor={T.palette.maxGrey}
                            key={k + 'spec' + key}
                            label={this.getName( key, v )}
                            onTap={() => this.cooptTap( key, k, v, false, specName )}
                        />
                    } )}
                </View>
            </View>
        )
    }
}

export default connect(
    ( state ) => {
        return {
            data: {
                coopts: state[ COOPTS ],
                categorys: state[ CATEGORYS ],
                categoryChecked: state.search && state.search.categorys,
                categoryLevel: state.search && state.search.categoryLevel,
                search: state.search && state.search.coopt,

                searchData: state.search
            }
        }
    }
    //bindActionCreators()
)( Coopt )