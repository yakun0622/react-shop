/**
 * Created by kenn on 2017/1/15.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, T, STOREIMG } from '../common'
import TextEdit from './TextEdit'
import View from './View'
import Button from './Button'
import Image from './Image'
import DropButton from './DropButton'
import FullDialog from './FullDialog'
import Album from '../apps/common/ui/Album'

import TitleIcon from 'material-ui/svg-icons/editor/title'
import ListIcon from 'material-ui/svg-icons/editor/format-list-bulleted'
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import AddIcon from 'material-ui/svg-icons/content/add'
import ReplaceIcon from 'material-ui/svg-icons/av/shuffle'

/**
 * data : {
 *  type: list|image|text,
 *  option:
 *      list: size, column, color
 *  item: []
 * }
 */
export default class EditView extends React.Component {
    display = 'EditView'

    constructor( props ) {
        super( props )
    }

    state = {
        openTool: false
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
        initHeight: 200,
        fontColor: T.palette.darkBlack,
        fontSize: 15,

        radius: 0,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex: 0,
        margin: 0,

        transition: 'all .3s',

        hand: false,
        display: 'flex',
        orientation: 'row',
        wrap: 'nowrap',
        grow: 0,
        order: 0,
        alignSelf: 'auto',

        imageSize: 'contain',
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        initHeight: React.PropTypes.any,
        margin: React.PropTypes.any,

        //伸缩容器属性
        flow: React.PropTypes.string,
        wrap: React.PropTypes.string,
        orientation: React.PropTypes.string,
        align: React.PropTypes.string,
        alignH: React.PropTypes.string,
        alignV: React.PropTypes.string,

        //图片缓存库 {fileName: blog}
        cacheImages: React.PropTypes.object,

        //伸缩项目属性
        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,
        data: React.PropTypes.object,
        onAdd: React.PropTypes.func,
        onRemove: React.PropTypes.func,
    }

    componentWillMount() {
        this.setState( {} )
    }

    componentWillReceiveProps( props ) {
        this.setState( {} )
    }

    initView = () => {
        const { initHeight, onAdd, width } = this.props
        const buttonProps = {
            width: 0,
            grow: 1,
            radius: 0,
            height: initHeight,
            color: T.palette.minGrey,
            hoverColor: T.palette.main,
            hoverFontColor: 'white',
            iconSize: 32,
            iconPosition: 'top',
        }
        //L(this.display, width)
        return (
            <View width={width} >
                <Button
                    {...buttonProps}
                    label={'添加文字'}
                    icon={TitleIcon}
                    onTap={() => onAdd( {
                        type: 'text',
                        option: { size: T.fontSize.normal, fontColor: T.palette.darkBlack },
                        items: ''
                    } )}
                />
                <Button
                    {...buttonProps}
                    label={'添加图片'}
                    icon={ImageIcon}
                    onTap={() => FullDialog(<Album onChecked={( images ) => this.imageChange( 'add', 0, images )}/>)}
                />
                <Button
                    {...buttonProps}
                    label={'添加列表'}
                    icon={ListIcon}
                    onTap={() => onAdd( {
                        type: 'list',
                        option: { size: T.fontSize.normal, fontColor: T.palette.darkBlack, column: 2 },
                        items: [ '', '' ]
                    } )}
                />
            </View>
        )
    }

    onChange = ( value ) => {
        let data = this.props.data
        data.items = value
        this.props.onChange( data )
    }

    text = ( data ) => {
        const { width } = this.props
        return (
            <TextEdit
                width={width - 24}
                margin={'4px 12px 0'}
                fontSize={data.option.fontSize}
                fontColor={data.option.fontColor}
                value={data.items}
                rows={1}
                editToggle={false}
                borderWidth={0}
                hintText={'添加商品描述'}
                onChange={( value ) => this.onChange( value )}
            />
        )
    }

    imageChange = ( name, index, images ) => {
        let data = this.props.data

        switch ( name ) {
            case 'replace':
                data.items[ index ] = images[0]
                break
            case 'add':
                this.props.onAdd( { type: 'image', option: { column: 1 }, items: images } )
                return
            default:
                data.items.splice( index, 1 )
                if ( !data.items.length ) {
                    this.props.onRemove()
                    return
                }
                break
        }
        this.props.onChange( data )
    }

    image = ( data ) => {
        const buttonProps = {
            width: 32,
            height: 32,
            color: T.palette.black300a,
            hoverColor: T.palette.white,
            fontColor: T.palette.white800a,
            hoverFontColor: T.palette.darkBlack,
            iconSize: 24
        }

        return (
            F( data.items, ( image, i ) => {
                return (
                    <View key={'img' + i} width={'100%'} style={{ position: 'relative' }}>
                        <Button
                            {...buttonProps}
                            icon={ReplaceIcon}
                            style={{ position: 'absolute',top: 8, right: 48 }}
                            max={1}
                            onTap={() => FullDialog(<Album max={1} onChecked={( images ) => this.imageChange( 'replace', i, images )}/>)}
                        />
                        <Button
                            {...buttonProps}
                            icon={ClearIcon}
                            style={{ position: 'absolute', top: 8, right: 8 }}
                            onTap={() => this.imageChange( 'remove', i )}
                        />
                        <Image
                            key={'im' + i}
                            src={STOREIMG(image)}
                            width={'100%'}
                        />
                    </View>
                )
            } )
        )
    }

    onListChange = ( name, index, value ) => {
        const data = this.props.data
        switch ( name ) {
            case 'add':
                data.items.push( '' )
                data.items.push( '' )
                break
            case 'edit':
                data.items[ index ] = value
                break
            default:
                data.items.splice( index, 2 )
                break
        }
        this.props.onChange( data )
    }

    list = ( data ) => {
        const { width } = this.props
        return (
            F( data.items, ( item, i ) => {
                if ( i % 2 == 0 ) {
                    return (
                        <View
                            width={width / data.option.column - 4 * data.option.column}
                            height={32} key={'ie' + i}
                            margin={'4px 0 0 4px'}
                            alignV={'center'}
                        >
                            <TextEdit
                                width={0}
                                grow={1}
                                borderWidth={0}
                                fontColor={T.palette.grey}
                                fontSize={T.fontSize.small}
                                value={item}
                                hintText={'属性名称'}
                                onChange={( value ) => this.onListChange( 'edit', i, value )}
                            />
                            <TextEdit
                                width={0}
                                grow={2}
                                borderWidth={0}
                                hintText={'属性值'}
                                value={data.items[ i + 1 ]}
                                onChange={( value ) => this.onListChange( 'edit', i + 1, value )}
                            />
                            {data.items.length > 2 &&
                             <Button
                                 width={16}
                                 height={16}
                                 radius={12}
                                 color={T.palette.lightGrey}
                                 hoverColor={T.palette.darkBlack}
                                 fontColor={T.palette.white800a}
                                 hoverFontColor={T.palette.white}
                                 icon={ClearIcon}
                                 iconSize={12}
                                 onTap={() => this.onListChange( 'remove', i )}
                             />}
                        </View>
                    )
                }
            } )
        )

    }

    onTool = ( name, value ) => {
        let data = this.props.data
        switch ( name ) {
            case 'add':
                data.items.push( '' )
                data.items.push( '' )
                break
            default:
                data.option[ name ] = value
                break
        }
        this.props.onChange( data )
    }

    tool = ( type ) => {
        const { data } = this.props
        const buttonProps = {
            width: 24,
            height: 24,
            hoverColor: T.palette.orange,
            fontColor: T.palette.white800a,
            hoverFontColor: T.palette.white,
            margin: '0 2px'
        }


        return (
            <View
                width={this.props.width - 16}
                height={this.state.openTool ? 40 : 0}
                transition={'all'}
                alignV={'center'}
                alignH={'between'}
                color={T.palette.white800a}
                style={{ position: 'absolute', top: this.state.openTool ? -40 : 0, left: 0, padding: '0 8px' }}
            >
                {type == 'text' &&
                 <View>
                     <Button
                         {...buttonProps}
                         color={data.option.fontSize == T.fontSize.normal ? T.palette.darkBlack : T.palette.black300a}
                         label={'小'}
                         fontSize={T.fontSize.small}
                         onTap={() => this.onTool( 'fontSize', T.fontSize.normal )}
                     />
                     <Button
                         {...buttonProps}
                         label={'中'}
                         color={data.option.fontSize == T.fontSize.big ? T.palette.darkBlack : T.palette.black300a}
                         fontSize={T.fontSize.normal}
                         onTap={() => this.onTool( 'fontSize', T.fontSize.big )}
                     />
                     <Button
                         {...buttonProps}
                         label={'大'}
                         color={data.option.fontSize == T.fontSize.max ? T.palette.darkBlack : T.palette.black300a}
                         fontSize={T.fontSize.big}
                         onTap={() => this.onTool( 'fontSize', T.fontSize.max )}
                     />
                 </View>
                }
                {type == 'text' &&
                 <View>
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.darkBlack}
                         onTap={() => this.onTool( 'fontColor', T.palette.darkBlack )}
                     />
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.grey}
                         onTap={() => this.onTool( 'fontColor', T.palette.grey )}
                     />
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.red}
                         onTap={() => this.onTool( 'fontColor', T.palette.red )}
                     />
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.green}
                         onTap={() => this.onTool( 'fontColor', T.palette.green )}
                     />
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.orange}
                         onTap={() => this.onTool( 'fontColor', T.palette.orange )}
                     />
                 </View>
                }
                {type == 'list' &&
                 <View>
                     <Button
                         {...buttonProps}
                         label={'|'}
                         color={data.option.column == 1 ? T.palette.darkBlack : T.palette.black300a}
                         onTap={() => this.onTool( 'column', 1 )}
                     />
                     <Button
                         {...buttonProps}
                         label={'||'}
                         color={data.option.column == 2 ? T.palette.darkBlack : T.palette.black300a}
                         onTap={() => this.onTool( 'column', 2 )}
                     />
                     <Button
                         {...buttonProps}
                         label={'|||'}
                         color={data.option.column == 3 ? T.palette.darkBlack : T.palette.black300a}
                         onTap={() => this.onTool( 'column', 3 )}
                     />
                 </View>
                }
                {type != 'image' &&
                 <View alignH={'center'} >
                     {type == 'list' &&
                      <Button
                          width={24}
                          height={24}
                          radius={12}
                          color={T.palette.white800a}
                          hoverColor={T.palette.white}
                          fontColor={T.palette.black700a}
                          hoverFontColor={T.palette.darkBlack}
                          icon={AddIcon}
                          iconSize={20}
                          margin={'0 8px'}
                          onTap={() => this.onTool( 'add' )}
                      />}
                     <Button
                         width={24}
                         height={24}
                         radius={12}
                         color={T.palette.white800a}
                         hoverColor={T.palette.white}
                         fontColor={T.palette.black700a}
                         hoverFontColor={T.palette.darkBlack}
                         icon={ClearIcon}
                         iconSize={20}
                         onTap={() => this.props.onRemove()}
                     />
                 </View>
                }
            </View>
        )
    }

    render() {
        const {
            width,
            height,
            data,
            onAdd
        } = this.props
        return (
            <View
                width={width}
                orientation={data && data.type == 'list' ? 'row' : 'column'}
                wrap={data && data.type == 'list' ? 'wrap' : 'nowrap'}
                onOver={() => this.setState( { openTool: true } )}
                onLeave={() => this.setState( { openTool: false } )}
                margin={'8px 0 0 0'}
                style={{ position: 'relative' }}
                overflow={'visible'}
            >
                {!onAdd ? this[ data.type ]( data ) : this.initView()}
                {data && data.type != 'image' && this.tool( data.type )}
            </View>
        )
    }
}