/**
 * Created by kenn on 16/7/4.
 */
import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider';

import * as TYPE from '../../../actions/type'
import { BaseComponent, View, Button } from '../../../components/BaseComponent'
import { D, F, T } from '../../../common'


class Category extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Category'
        //this.checkedAction( 'overCategory', props.data.length >0 ? props.data[0].Id : 0 )
    }

    static defaultProps = {
        width: 1000,
    }

    componentDidMount(){
        this.setOverSt()
    }

    componentDidUpdate(){
        this.setOverSt()
    }

    setOverSt = (  ) => {
        if( !this.props.overSt && this.props.data.length > 0 ) {
            F(this.props.data, ( d ) => {
                if( !d.GcParentId ) {
                    this.checkedAction( 'overCategory', d.Id )
                    return false
                }
            })
        }
    }

    touchTap( key, level ) {
        // This prevents ghost click.
        //event.preventDefault();
        if ( this.props.onTap ) {
            this.props.onTap( key, level )
        }

    }

    //handleRequestClose() {
    //    this.setState({
    //        open: false,
    //    })
    //}

    render() {
        const { overSt, data, width } = this.props
        //this.log(overSt)
        return (
            <View width={width} >
                <View width={150} orientation={'column'} alignH={'center'} >
                    {data.map( ( data, i ) => {
                        if ( data.GcParentId == 0 ) {
                            return (
                                <Button
                                    key={i}
                                    width={'100%'}
                                    height={32}
                                    label={data.GcName}
                                    color={overSt && overSt == data.Id ? 'white' : T.palette.maxGrey}
                                    fontColor={overSt && overSt == data.Id ? T.palette.maxGrey : 'white'}
                                    radius={0}
                                    onOver={() => this.checkedAction( 'overCategory', data.Id )}
                                    onTap={() => this.touchTap( data.Id, 1 )}
                                />
                            )
                        }
                    } )}
                </View>
                <View style={{ padding: 4 }} orientation={'column'} grow={1} width={0} color={'white'} >
                    {data.map( ( cg, i ) => {
                        if ( this.props.overSt == cg.GcParentId ) {
                            return (
                                <View key={'s' + i} orientation={'column'} >
                                    <Button
                                        label={cg.GcName}
                                        onTouchTap={() => this.touchTap( cg.Id, 2 )}
                                    />
                                    <View wrap={'wrap'} >
                                        {data.map( ( d, k ) => {
                                            if ( cg.Id == d.GcParentId ) {
                                                return (
                                                    <Button
                                                        label={d.GcName}
                                                        width={100}
                                                        height={24}
                                                        align={'left'}
                                                        fontColor={T.palette.grey}
                                                        hoverFontColor={T.palette.maxGrey}
                                                        key={k + 'fff'}
                                                        onTap={() => this.touchTap( d.Id, 3 )}
                                                    />
                                                )
                                            }
                                        } )}
                                    </View>
                                </View>
                            )
                        }
                    } )}
                </View>
            </View>
        )
    }
}

export default connect( ( state ) => {
    return {
        data: state.categorys,
        overSt: state.checkedSt.hasOwnProperty( 'overCategory' ) ? state.checkedSt[ 'overCategory' ] : null,
    }
} )( Category )