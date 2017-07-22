/**
 * Created by kenn on 2016/9/24.
 */
import React from 'react'


import { F, T, L } from '../common'
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import DoneIcon from 'material-ui/svg-icons/action/done'
import View from './View'
import Button from './Button'
import SearchView from './SearchView'
import ListView from './ListView'

export default class SelectView extends React.Component {
    display = 'SelectView'

    static defaultProps = {
        width: 128,
        height: 32,
        fontColor: T.palette.darkBlack,
        fontSize: T.fontSize.normal,

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
        align: 'center',

        imageSize: 'contain',
        margin: 0,


        itemParentKey: 'parent',
        itemNameKey: 'name',
        firstParent: 0
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        radius: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        shadow: React.PropTypes.any,
        transition: React.PropTypes.string,
        zDepth: React.PropTypes.number,
        margin: React.PropTypes.any,

        animationVertical: React.PropTypes.bool,

        icon: React.PropTypes.any,
        iconPosition: React.PropTypes.string,
        iconSize: React.PropTypes.number,

        open: React.PropTypes.bool,

        label: React.PropTypes.any,
        align: React.PropTypes.string,

        required: React.PropTypes.bool,

        items: React.PropTypes.any,
        onChecked: React.PropTypes.func,
        checked: React.PropTypes.any,
        showChecked: React.PropTypes.bool,
        openWithOver: React.PropTypes.bool,
        showSearch: React.PropTypes.bool,
        onSearch: React.PropTypes.func,

        //带子父关系的选项
        tree: React.PropTypes.bool,
        itemParentKey: React.PropTypes.string,
        itemNameKey: React.PropTypes.string,
        firstParent: React.PropTypes.any,
    }

    state = {
        open: false,
        checked: -1,
        searchValue: ''
    }

    componentWillMount(){
        typeof this.props.open != 'undefined' && this.setState( { open: this.props.open } )
        typeof this.props.checked != 'undefined' && this.setState( { checked: this.props.checked } )
    }

    componentWillReceiveProps( props ) {
        typeof props.open != 'undefined' && this.setState( { open: props.open } )
        typeof props.checked != 'undefined' && this.setState( { checked: props.checked } )
    }

    onOpen = ( event ) => {
        this.setState( {
            open: true,
            anchorEl: event.currentTarget,
        } );
    };

    over = ( e ) => {
        this.setState( {
            open: true,
            anchorEl: e.currentTarget,
        } );
    }

    handleRequestClose = () => {
        this.setState( {
            open: false,
        } );
    };

    render() {
        const {
            width,
            height,
            color,
            hoverColor,
            fontColor,
            hoverFontColor,
            radius,
            borderColor,
            borderWidth,

            margin,

            label,
            fontSize,
            icon,
            iconPosition,
            iconSize,
            align,
            items,
            zDepth,
            animationVertical,
            openWithOver,
            showChecked,
            showSearch,
            onSearch,
            firstParent,
            itemNameKey,
            tree
        } = this.props

        const { checked, searchValue } = this.state

        const props = {
            onTap: this.onOpen
        }

        if ( openWithOver ) {
            props.onOver = this.onOpen
        }

        //L(this.display, items && showChecked && checked != -1 ? 'dfdfdf' : label)
        //L(this.display, checked)

        return (
            <View
                width={width}
                height={height}
                orientation={'column'}
                margin={margin}
            >
                <Button
                    width={'100%'}
                    height={'100%'}
                    label={items && showChecked && checked != -1 ? (tree ? items[checked][itemNameKey] :items[ checked ]) : label}
                    fontSize={fontSize}
                    color={color}
                    hoverColor={hoverColor}
                    fontColor={fontColor}
                    hoverFontColor={hoverFontColor}
                    borderColor={borderColor}
                    borderWidth={borderWidth}
                    icon={icon}
                    iconPosition={iconPosition}
                    iconSize={iconSize}
                    radius={radius}
                    {...props}
                />

                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: "left", vertical: "center" }}
                    targetOrigin={{ horizontal: "left", vertical: "center" }}
                    onRequestClose={this.handleRequestClose}
                    animation={animationVertical ? PopoverAnimationVertical : null}
                    zDepth={zDepth}
                    style={{ width }}
                >
                    {showSearch &&
                     <SearchView
                         width={width - 24}
                         height={32}
                         margin={12}
                         onSearch={onSearch || (( searchValue ) => this.setState( { searchValue } )) }
                     />}

                    {
                        items ? tree ? this.tree(firstParent) :
                            F( items, ( item, id ) => {
                                if( !showSearch || item.indexOf(searchValue) != -1 ) {
                                    return <View
                                        key={id}
                                        width={width}
                                        height={32}
                                        color={T.palette.white}
                                        hoverColor={T.palette.lightGrey}
                                    >
                                        <Button
                                            label={item}
                                            width={0}
                                            grow={1}
                                            fontSize={fontSize}
                                            color={T.palette.white}
                                            hoverColor={T.palette.lightGrey}
                                            fontColor={T.palette.darkBlack}
                                            hoverFontColor={T.palette.darkBlack}
                                            align={align}
                                            icon={icon}
                                            iconPosition={iconPosition}
                                            iconSize={iconSize}
                                            onTap={() => this.onChecked( id )}
                                        />
                                        {
                                            showChecked && checked == id &&
                                            <DoneIcon style={{width: 24, height: 24, margin: 4}} />
                                        }
                                    </View>
                                }

                            } )
                            : this.props.children
                    }
                </Popover>
            </View>
        )
    }

    tree = (parent) => {
            const { items, itemParentKey, itemNameKey, showSearch } = this.props
            const { checkedChildGroupId, searchValue, checked } = this.state
            const elements = F( items, ( data, id ) => {
                if ( data[itemParentKey] == parent && (!showSearch || data[itemNameKey].indexOf(searchValue) != -1 )) {
                    return (
                        <ListView
                            key={id}
                            height={32}
                            checked={id == checked ? true : false}
                            fold={0}
                            primaryColor={T.palette.maxGrey}
                            primaryText={data[itemNameKey]}
                            onTap={() => this.onChecked(id )}
                        >
                            {this.tree( id )}
                        </ListView>
                    )
                }
            } )

            if ( elements.length == 0 ) {
                return null
            }

            return elements
    }

    search = ( value ) => {
        if( this.props.onSearch ) {
            this.props.onSearch(value)
        } else {
            this.setState( { searchValue: value } )
        }
    }

    onChecked( id ) {

        let checked = id
        if( this.state.checked == id ) {
            if( !this.props.required ) {
                checked = -1
            }
        }

        if ( typeof this.props.checked == 'undefined' ) {
            this.setState( {
                open: false,
                checked
            } );
        } else {
            this.setState( {
                open: false,
            } );
        }


        this.props.onChecked && this.props.onChecked( checked )
    }
}