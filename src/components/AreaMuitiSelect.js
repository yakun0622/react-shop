/**
 * Created by wangyakun on 2016/11/24.
 */

import React from 'react'
import { connect } from 'react-redux'

import { M, F, D, Q, T, L } from '../common'
import View from './View'
import Button from './Button'
import Label from './Label'
import Dialog from './Dialog';
import SelectView from './SelectView';


import {AREA_MULTI_LOAD} from '../actions/type'

class AreaMuitiSelect extends React.Component {
    display = 'AreaMuitiSelect'

    static defaultProps = {
        width: 'auto',
        margin: 0,
        modal: true,
        open: false,
        isSubmitJson: false,
    }

    static propTypes = {
        width: React.PropTypes.any,
        datas: React.PropTypes.object,
        actionType: React.PropTypes.string,
        isWait: React.PropTypes.bool,
        close: React.PropTypes.func,
        isSubmitJson: React.PropTypes.bool,
        modal: React.PropTypes.bool,
        open: React.PropTypes.any,
        style: React.PropTypes.object,
    }

    componentDidMount() {
        D(AREA_MULTI_LOAD, Q().ok())
    }

    isShowSubmit() {
        let ok = true
        for ( let key in this.props.datas ) {
            if(typeof this.props.datas[ key ] == 'object'){
                for ( let k in this.props.datas[key] ){
                    if ( this.props.datas[ key ][k] === false ) {
                        ok = false
                        break
                    }
                }
            }
            if ( this.props.datas[ key ] === false ) {

                ok = false
                break
            }
        }
        //L('From', ok)
        return ok
    }

    render() {
        const {
            style,
            datas,
            label,
            width,
            margin,
            submitLabel,
            modal,
            open,
            isWait,
            close,
            autoScrollBodyContent,
        } = this.props

        //如果是dialog,则用dialog显示
        if (this.props.close) {
            return (
                <Dialog
                    modal={modal}
                    width={width}
                    close={() => this.props.close()}
                    open={open}
                    title={label}
                    bodyPadding={8}
                    rightButton={this.isShowSubmit() && submitLabel}
                    onRightButton={() => this.submit()}
                >
                    <SelectView items={datas.name}>

                    </SelectView>
                </Dialog>
            )
        } else {
            L(this.display, this.props.datas)
            return (
                <View width={width} alignH={'center'} orientation={'column'} style={style} margin={margin}>
                    <Label
                        text={label}
                        fontSize={18}
                    />
                    {this.props.children}

                    {
                        this.isShowSubmit() &&
                        <Button
                            color={T.palette.darkBlack}
                            hoverColor={T.palette.main}
                            fontColor={T.palette.minGrey}
                            hoverFontColor={T.palette.white}
                            onTap={() => this.submit()}
                            width={width}
                            height={T.height.normal}
                        >
                            {submitLabel}
                        </Button>
                    }
                </View>
            );
        }
    }
}

export default connect(
    (state)=> {
        return {
            datas: state['areaMulti']
        }
    }
    //bindActionCreators()
)(AreaMuitiSelect)