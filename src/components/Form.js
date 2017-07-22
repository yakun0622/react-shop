/**
 * Created by kenn on 16/8/14.
 */
import React from 'react'


import { D, T, L} from '../common'
import View from './View'
import Button from './Button'
import Label from './Label'
import Dialog from './Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * form表单
 * 提交功能已经包含, 只要写子组件
 * props
 *  datas           数据
 *  actionType      action的type
 */
export  default class Form extends React.Component {
    display = 'Form'

    static defaultProps = {
        width: 'auto',
        submitLabel: '保 存',
        margin: 0,
        isSubmitJson: false,
        modal: true,
        open: false,
    }

    static propTypes = {
        width: React.PropTypes.any,
        datas: React.PropTypes.object,
        actionType: React.PropTypes.string,
        isWait: React.PropTypes.bool,
        close: React.PropTypes.func,
        isSubmitJson: React.PropTypes.bool,
        submitLabel: React.PropTypes.string,
        modal: React.PropTypes.bool,
        open: React.PropTypes.any,
        label: React.PropTypes.string,

        style: React.PropTypes.object,
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

    /**
     * 根据datas 中是否含有Id判断是更新还是添加数据
     */
    submit(){
        const { isWait, datas, actionType, close } = this.props

        //L(this.display, datas)
        if( datas.Id ) {
            let data = datas
            const id = data.Id

            let formdata = this.createFormdata(data, true)
            D( actionType, formdata, 'form' )
        } else {
            D( actionType, this.createFormdata(datas, false), 'form' )
        }

        !isWait && close && this.props.close()
    }

    createFormdata(datas, isUpdate){
        let formdata = {}
        let fields = []
        if( this.props.isSubmitJson ) {
            let d = {}
            for(let key in datas){
                if( (datas[key] || datas[key] === 0) && key[0] >= 'A' && key[0] <= 'Z' ) {
                    if( typeof datas[key] == 'string') {
                        d[key] = datas[key].trim()
                    } else {
                        d[key] = datas[key]
                    }

                    if( isUpdate && key != 'Id' ) {
                        fields.push(key)
                    }
                }
            }
            formdata.data = JSON.stringify(d)
        }else {
            for(let key in datas){
                if( (datas[key] || datas[key] === 0)  && key[0] >= 'A' && key[0] <= 'Z' ) {
                    if( typeof datas[key] == 'string') {
                        formdata[key] = datas[key].trim()
                    } else {
                        formdata[key] = datas[key]
                    }
                }

                if( isUpdate && key != 'Id' ) {
                    fields.push(key)
                }
            }
        }

        if( fields.length != 0 ) {
            formdata['fields'] = fields.join(',')
        }

        return formdata
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
        if ( this.props.close ) {
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
                    {this.props.children}
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
