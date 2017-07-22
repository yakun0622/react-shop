/**
 * Created by kenn on 16/8/15.
 */
import React from 'react'

import {M, F, D, T, L } from '../common'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

export default class GroupRadio extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'GroupRadio'
    }

    static propTypes = {
        datas: React.PropTypes.object,
        defaultValue: React.PropTypes.any,
        onChange: React.PropTypes.func,
        name: React.PropTypes.string,

    }


    render() {
        const {
            datas,
            defaultValue,
            onChange,
            name,
            toRight,        //是否选择框位置显示在右边,
            horizontal,     //是否水平排列
            label,
            style
        } = this.props



        return (
            <div style={style}>
                {
                    label &&
                    <div style={{height: 32, lineHeight: 32 + 'px', fontSize: T.fontSize.min, color: T.palette.grey}}>
                        {label}
                    </div>
                }

                <RadioButtonGroup
                    name={name}
                    defaultSelected={defaultValue ? defaultValue + '' : null}
                    onChange={( e, value ) => onChange(value, name)}
                >
                    {
                        F( datas, ( label, value ) => {
                            let style = {}
                            if ( horizontal ) {
                                style.display = 'inline-block'
                                style.verticalAlign = 'top'
                                style.width = 'auto'
                                style.minWidth = 200
                                style.marginRight = 16
                            }
                            return <RadioButton
                                key={value + name || 'radioButtonGroup'}
                                label={label}
                                value={value}
                                style={style}
                                labelPosition={toRight ? 'right' : 'left'}
                            />
                        } )
                    }

                </RadioButtonGroup>
            </div>
        )
    }
}