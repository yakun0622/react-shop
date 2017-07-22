/**
 * Created by kenn on 16/9/17.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import { T, L } from '../common'
import Icon from './Icon'
import View from './View'
import Label from './Label'

export default class CardView extends React.Component {
    display = 'CardView'

    state = {
        height: 0,
        isOver: false,
    }

    static defaultProps = {
        width: 'auto',
        height: minHeight,
        textHeight: 48,
        fontColor: T.palette.darkBlack,
        fontSize: 15,

        radius: 0,
        zIndex: 0,
        margin: 0,

        color: T.palette.white,
        primaryColor: T.palette.darkBlack,

        display: 'flex',
        orientation: 'row',
        wrap: 'nowrap',
        grow: 0,
        order: 0,
        alignSelf: 'auto',

        shadow: '0 0 1px ' + T.palette.grey,
        hoverShadow: '0 0 16px ' + T.palette.grey,

        imageWidth: '100%',
        imageHeight: 'auto',
        imageMargin: 0,

        leftIconSize: 32,
        leftIconColor: T.palette.darkBlack,
        leftIconMargin: 8,

        rightIconSize: 32,
        rightIconColor: T.palette.darkBlack,
        rightIconMargin: 8,
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        radius: React.PropTypes.any,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,

        image: React.PropTypes.any,
        imageWidth: React.PropTypes.any,
        imageHeight: React.PropTypes.any,
        imageMargin: React.PropTypes.any,

        leftIcon: React.PropTypes.any,
        leftIconSize: React.PropTypes.number,
        leftIconColor: React.PropTypes.string,
        leftIconMargin: React.PropTypes.any,

        rightIcon: React.PropTypes.any,
        rightIconSize: React.PropTypes.number,
        rightIconColor: React.PropTypes.string,
        rightIconMargin: React.PropTypes.any,


        zIndex: React.PropTypes.number,
        margin: React.PropTypes.any,

        shadow: React.PropTypes.string,
        hoverShadow: React.PropTypes.string,

        primaryText: React.PropTypes.string,
        primaryColor: React.PropTypes.string,
        secondText: React.PropTypes.string,
        textHeight: React.PropTypes.number,

        //伸缩容器属性
        align: React.PropTypes.string,

        //伸缩项目属性
        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        style: React.PropTypes.object,


        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,
    }

    //componentWillMount() {
    //    this.setState( {} )
    //}
    //
    //componentWillReceiveProps( props ) {
    //    this.setState( {} )
    //}

    over = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        if ( !this.state.isOver ) {
            this.setState( { isOver: true } )
        }
        this.props.onOver && this.props.onOver(e)
    }

    leave = ( e ) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isOver: false } )

        this.props.onLeave && this.props.onLeave(e)
    }

    render() {
        const {
            width,
            height,
            color,
            margin,

            image,
            imageWidth,
            imageHeight,
            imageMargin,

            leftIcon,
            leftIconSize,
            leftIconColor,
            leftIconMargin,

            shadow,
            hoverShadow,

            rightIcon,
            rightIconSize,
            rightIconColor,
            rightIconMargin,

            primaryText,
            primaryColor,
            secondText,
            textHeight,

            align,
            style,
            radius,
            onTap,
        } = this.props

        const { isOver } = this.state

        const rootProps = {
            width,
            height: height == 'auto' ? height : isOver ? this.state.height : height,
            hand: true,
            transition: 'all',
            radius,
            color,

            onOver: this.over,
            onLeave: this.leave,
            onTap
        }

        if ( shadow ) {
            rootProps.shadow = isOver ? hoverShadow : shadow
        }
        //L(this.display, primaryText)
        return (

            <div style={{ position: 'relative', height, margin, zIndex: isOver ? 1000 : 0 }} >
                <View {...rootProps}>
                    <View
                        width={'100%'}
                        height={'auto'}
                        orientation={'column'}
                        alignH={align}
                        hand={true}
                        ref="root"
                        margin={'0 4px'}
                    >
                        {image ?
                            <Icon
                                src={image}
                                width={imageWidth}
                                height={imageHeight}
                                margin={imageMargin} />
                            : null
                        }
                        {primaryText ?
                            <View alignV={'center'} width={'100%'} hand={true} >
                                {leftIcon ?
                                    <Icon
                                        src={leftIcon}
                                        size={leftIconSize}
                                        margin={leftIconMargin}
                                        color={leftIconColor} />
                                    : null}
                                <View
                                    width={0}
                                    orientation={'column'}
                                    alignH={align}
                                    alignV={'center'}
                                    height={textHeight}
                                    grow={1}
                                    hand={true}
                                >
                                    <Label
                                        fontColor={primaryColor}
                                        text={primaryText}
                                    />

                                    {secondText ?
                                        <Label
                                            text={secondText}
                                            fontSize={T.fontSize.small}
                                            fontColor={T.palette.grey}
                                        /> : null}
                                </View>
                                {rightIcon ?
                                    <Icon
                                        src={rightIcon}
                                        size={rightIconSize}
                                        margin={rightIconMargin}
                                        color={rightIconColor} />
                                    : null}
                            </View> : null}
                        {this.props.children}
                    </View>
                </View>
            </div>
        )
    }

    componentDidMount() {
        this.setHeight()
    }

    componentDidUpdate() {
        this.setHeight()
    }

    setHeight() {
        const { height } = this.props
        if ( height != 'auto' ) {
            const root = ReactDOM.findDOMNode( this.refs.root )
            if ( root.offsetHeight != this.state.height ) {
                this.setState( { height: root.offsetHeight } )
            }
        }
    }
}

const minHeight = 48