/**
 * Created by kenn on 16/7/5.
 */
import React from 'react'

import theme from '../style/theme'
import { L, Q, D, T, F } from '../common'
import {
    CHECKED,
    CHECKEDS
} from '../actions/type'
import store from '../store/main'
import DialogView from 'material-ui/Dialog';
export Dialog from './Dialog'

export RaisedButton from 'material-ui/RaisedButton'
export FlatButton from 'material-ui/FlatButton'
export Drawer from 'material-ui/Drawer'
export Divider from 'material-ui/Divider'
export IconButton from 'material-ui/IconButton'

import * as Radio from 'material-ui/RadioButton'
export const RadioButton = Radio.RadioButton
export const RadioButtonGroup = Radio.RadioButtonGroup

import * as list from 'material-ui/List';
export const ListItem = list.ListItem

export Checkbox from 'material-ui/Checkbox';
export SelectField from 'material-ui/SelectField';
export MenuItem from 'material-ui/MenuItem';
export Menu from 'material-ui/Menu';
export LinearProgress from 'material-ui/LinearProgress';
export Avatar from 'material-ui/Avatar';

import * as step from 'material-ui/Stepper'
export const Step = step.Step
export const Stepper = step.Stepper
export const StepButton = step.StepButton
export const StepContent = step.StepContent

// From https://github.com/oliviertassinari/react-swipeable-views
export SwipeableViews from 'react-swipeable-views';

export ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
export CloseIcon from 'material-ui/svg-icons/navigation/close';
export CancelIcon from 'material-ui/svg-icons/navigation/cancel';
export DonelIcon from 'material-ui/svg-icons/action/done';
export FavoriteIcon from 'material-ui/svg-icons/action/favorite';
export RemoveCircleIcon from 'material-ui/svg-icons/content/remove-circle';
export RemoveIcon from 'material-ui/svg-icons/content/remove';
export AddIcon from 'material-ui/svg-icons/content/add';
export EditIcon from 'material-ui/svg-icons/content/create';
export RadioCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
export RadioUncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';
export HomeIcon from 'material-ui/svg-icons/action/home';
export StoreIcon from 'material-ui/svg-icons/action/store';
export LogoutIcon from  'material-ui/svg-icons/maps/directions-walk'
export AccountCircle from 'material-ui/svg-icons/action/account-circle';
export GroupIcon from 'material-ui/svg-icons/social/group';
export LockIcon from 'material-ui/svg-icons/action/https';
export KeyIcon from 'material-ui/svg-icons/communication/vpn-key';
export ShareIcon from 'material-ui/svg-icons/social/share';
export LabelIcon from 'material-ui/svg-icons/maps/local-offer';
export DoneAllIcon from 'material-ui/svg-icons/action/done-all';
export ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
export ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
export VerifiedIcon from 'material-ui/svg-icons/action/verified-user';
export SearchIcon from 'material-ui/svg-icons/action/search';

export Subheader from 'material-ui/Subheader';
export DatePicker from './DatePicker';
export ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
export VisibilityIcon from 'material-ui/svg-icons/action/visibility';
export UploadIcon from 'material-ui/svg-icons/file/file-upload';

import TextInput from './TextField';
export const TextField = TextInput

export Area from './Area';
export AreaMuitiSelect from './AreaMuitiSelect';
export ScrollView from './ScollView';
export Form from './Form';
export GroupRadio from './GroupRadio';
export View from './View';
export Button from './Button';
export Label from './Label';
export Image from './Image';
export PhoneCode from './PhoneCode';
export Icon from './Icon';
export CheckView from './CheckView';
export CardView from './CardView';
export UserEdit from './UserEdit';
export FloatButton from './FloatButton';
export ListView from './ListView';
export TabView from './TabView'
export ConfirmDialog  from './ConfirmDialog'
export SelectView  from './SelectView'
export DropButton  from './DropButton'
export Paging  from './Paging'
export Numbers  from './Numbers'
export AreaCheckView  from './AreaCheckView'
export AreaForm  from './AreaForm'
export Snackbar  from './Snackbar'
export TextEdit  from './TextEdit'
export EditView  from './EditView'
export FullDialog  from './FullDialog'
export Loading  from './Loading'

export class BaseComponent extends React.Component {

    loaded = {}

    constructor( props ) {
        super( props )
        this.display = 'BaseComponent'
        this.state = {
            openDialog: false
        }
    }

    /**
     *
     * @param element
     * @param width
     * @param title   1 在右上角出现退出按钮
     * @returns {XML}
     */
    dialog( element, width, title ) {
        let p = {
            modal: false,
            // onRequestClose: ( open ) => this.closeDialog() ,
            contentStyle: {
                maxWidth: 'none'
            },

            bodyStyle: {
                padding: 0
            },
            overlayStyle: {
                backgroundColor: T.palette.black700a
            }
        }

        let open = 'openDialog'

        if ( title ) {
            switch ( title ) {
                case 1:
                    p.modal = true
                    p.title = <CloselIcon
                        color={T.palette.white600a}
                        hoverColor={T.palette.white}
                        style={{ width: 64, height: 64, cursor: 'pointer' }}
                        onClick={() => this.setState( { openDialog: false } )}
                    />
                    break
                case 2:
                    break
                default:
                    open = title
                    break
            }

            p.titleStyle = { position: 'fixed', top: -64, right: -64, padding: 0 }
        }
        p.onRequestClose = () => this.closeDialog( open )

        if ( width ) {
            if ( typeof width == 'object' ) {
                p = Object.assign( {}, p, width )
            } else {
                p.contentStyle.width = width
            }
        }

        if ( this.state[ open ] ) {
            return (
                <DialogView
                    open={true}
                    {...p}
                >
                    {element}
                </DialogView>
            )
        }
    }

    openDialog = ( name = 'openDialog' ) => {
        if ( typeof name == 'string' ) {
            let state = this.state
            state[ name ] = true
            this.setState( state )
        } else {
            this.setState( name )
        }

        document.getElementById( 'container' ).className = 'blur'

    }

    closeDialog = ( name = 'openDialog' ) => {
        document.getElementById( 'container' ).removeAttribute( "class" )

        this.state[ name ] = false
        this.setState( this.state )
    }

    /**
     * 创建多字段参数,用于PUT uri的":d"
     * @param fields
     * @returns {string}
     */
    createFields( ...fields ) {
        return encodeURIComponent( fields.join( ',' ) )
    }

    /**
     * 验证数据
     * 需要验证的数据默认为false
     * 所有数据都不为false则验证通过
     * @param data
     * @param callback
     */
    verify( data, successs ) {
        let isRequired = true
        F(
            data, ( data ) => {
                if ( data === false ) {
                    isRequired = false
                }
            }
        )

        if ( !isRequired ) {
            this.setState( { verify: true } )
        } else {
            successs()
        }
    }

    /**
     * 封装put数据
     * @param data
     * @param feilds
     */
    putData( data, ...feilds ) {
        let formdata = new FormData()
        formdata.append( 'fields', feilds.join( ',' ) )
        formdata.append( 'data', JSON.stringify( data ) )
        return formdata
    }

    /**
     * 创建FormData
     * 如果是一个参数,则是必须是对象,健值与FormData 对应
     * 如果是多个,则参数个数必须是偶数,数组索引偶数为key,奇数为值
     * @param datas
     * @returns {*}
     */
    formdata = ( ...datas ) => {
        let formdata = new FormData()
        let key
        if ( datas.length == 1 ) {
            for ( key  in datas[ 0 ] ) {
                formdata.append( key, datas[ 0 ][ key ] )
            }
        } else {
            datas.forEach( ( item, id ) => {
                if ( id % 2 == 0 ) {
                    key = item
                } else {
                    formdata.append( key, item )
                }
            } )
        }
        // this.log(formdata.get)
        return formdata
    }

    /**
     * 设置组件theme
     */
    setTheme() {
        //如果有组件的theme则设置
        if ( theme.hasOwnProperty( this.display ) ) {
            this.theme = theme[ this.display ]
        }
    }

    log( ...title ) {
        title.unshift( this.display )
        L( ...title )
    }

    /**
     * 设置表单数据
     * @param name
     * @param value
     * @param stateName  state 中的数据名称
     */
    setFormDatas( name, value, stateName = 'datas' ) {
        L(this.display, 'setFormDatas', value)
        let state = this.state
        state[ stateName ][ name ] = value
        this.setState( state )
    }

    /**
     * 提交表单按钮, 如果数据里有false的值则按钮为disabled
     * @param datas
     * @param type
     * @param id
     * @returns {XML}
     */
    verify( datas ) {
        let ok = true

        for ( let key in datas ) {
            if ( datas[ key ] === false ) {
                ok = false
                break
            }
        }
        return ok
    }

    /**
     * 判断对象或数组是否有值
     * @param datas  需要判断的对象
     * @param value  需要判断的值
     * @param key    如果有key，表示有嵌套对象
     * @returns {boolean}
     */
    has = ( datas, value, key = null ) => {
        if ( !datas ) {
            return false
        }

        if ( Array.isArray( datas ) ) {
            if ( datas.length == 0 ) {
                return false
            }
        } else {
            if ( Object.keys( datas ).length == 0 ) {
                return false
            }
        }

        let has = false
        F( datas, ( data ) => {
            if ( key !== null ) {
                if ( data[ key ] == value ) {
                    has = true
                    return false
                }
            } else {
                if ( data == value ) {
                    has = true
                    return false
                }
            }
        } )
        return has
    }

    /**
     * 重置rootProps
     * @returns {*}
     */
    rootProps( props = { style: {} } ) {
        if ( this.props.style ) {
            return M( rootProps, props, { style: this.props.style } )
        }

        return M( rootProps, props )
    }

    /**
     * 判断是否是string
     * @param string
     * @returns {boolean}
     */
    isString( string ) {
        return typeof string == 'string' ? true : false
    }

    /**
     * 判断是否是array
     * @param array
     * @returns {boolean}
     */
    isArray( array ) {
        return Array.isArray( array )
    }

    /**
     * 判断数组是否存在某个元素
     * @param arr
     * @param value
     * @returns {boolean}
     */
    inArray( arr, value ) {
        var i = arr.length;
        while ( i-- ) {
            if ( arr[ i ] === value ) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断是否是object
     * @param object
     * @returns {boolean}
     */
    isObject( object ) {
        return typeof object == 'object' && !Array.isArray( object ) ? true : false
    }


    /**
     * 触发checked action
     * @param field  数据集名
     * @param key
     * @param muilti
     */
    checkedAction( field, key, muilti ) {
        store.dispatch(
            {
                type: muilti ? CHECKEDS : CHECKED,
                field: field,
                key: key
            }
        )
    }

    /**
     * 根据key判断数据是否被选中
     * @param key
     * @returns {boolean}
     */
    checked( key ) {
        //this.log(this.props.checkedSt)
        if ( this.props.checkedSt ) {
            if ( this.isArray( this.props.checkedSt ) ) {
                return this.inArray( this.props.checkedSt, key )
            } else {
                return key == this.props.checkedSt
            }
        }
        return false
    }

    /**
     * 根据加载记录判断是否加载数据
     * @param type
     * @param data
     * @param id
     * @param suffix
     */
    load = ( type, data, id, suffix = '' ) => {
        const tag = type + suffix
        if( !this.loaded[ tag ] || (this.props.error && this.props.error[ type ] && this.loaded[ tag ] < 2) ) {
            if ( this.loaded[ tag ] ) {
                ++this.loaded[ tag ]
            } else {
                this.loaded[ tag ] = 1
            }
            D(type, data, id)
        }
    }

    /**
     * 是否已经加载过
     * @param type
     * @param suffix
     * @returns {boolean}
     */
    isLoaded = ( type, suffix = '' ) => {
        if( this.loaded[type + suffix] ) {
            return true
        }
        return false
    }

    /**
     * 格式化时间函数
     * @param timestamp 时间戳
     * @param format 格式 YYYY MM DD HH mm ss
     * @returns {*}
     */
    formatDate( timestamp, format ) {
        if ( timestamp.toString().length == 10 ) {
            return Moment( timestamp * 1000 ).format( format || 'YYYY-MM-DD HH:mm:ss' );
        } else {
            return Moment( timestamp ).format( format || 'YYYY-MM-DD HH:mm:ss' );
        }
    }

    /**
     * 根据一个字段值取另一个字段值
     * @param datas  数据源
     * @param name   需要取值的字段名称，可多值
     * @param value  根据字段的值
     * @param feild  根据字段名称
     * @returns {*}
     */
    getBy = ( datas, name, value, feild = 'Id' ) => {
        let v = null
        F(datas, ( data ) => {
            if( data[feild] == value ) {
                if( typeof name == 'object') {
                    v = name.map(( n ) => {
                        return data[n]
                    })
                } else {
                    v = data[name]
                }
                return false
            }
        })
        return v
    }
}


export const LANG = {
    brand: '品牌',
    color: '颜色',
    spec: '规格'
}