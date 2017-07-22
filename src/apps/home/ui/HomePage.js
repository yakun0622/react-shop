/**
 * Created by kenn on 16/8/12.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { S, P, M, F, D, Q, T } from '../../../common'
import {BaseComponent, HomeIcon} from '../../../components/BaseComponent'
import Caroucel from '../../../components/Caroucel'

import {HOME_PAGE} from '../../../store/api'
import {} from '../../../actions/type'


const storyMargin = 32
const storyIndexWidth = 32
const storyTitleHeight = 64

class HomePage extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'HomePage'

        this.state = {
            storyIndex:       false,
            isOverStoryIndex: false
        }
    }

    /**
     * 创建楼层
     * @param images
     */
    story( images, name, divider ) {
        const { stories, carousel, width, height } = this.props

        //一张图片的宽高, 作为其他图片数量的参考
        let marginTop = storyMargin,
            imageWidth = width - storyMargin * 2,
            imageHeight = height - storyMargin * 2 - storyTitleHeight,
            storyWidth = imageWidth

        switch( images.length ) {
            case 8:
                imageHeight = (height - storyTitleHeight - storyMargin * 2 - divider * 2) / 2
                imageWidth = imageHeight
                storyWidth = imageWidth * 4 + divider * 4
                break
            case 18:
                imageHeight = (height - storyTitleHeight - storyMargin * 2 - divider * 3) / 3
                imageWidth = imageHeight
                storyWidth = imageWidth * 6 + divider * 6
                break
            default:
                break
        }


        return (
            <div style={S()
                        .width(storyWidth)
                        .margin('0 auto ')
                        .padding(0, 0, 0, divider)
                        .overflow()
                        .s()}
            >
                <div style={S()
                    .height(storyTitleHeight)
                    .width(storyWidth- divider*2)
                    .color(T.palette.white, 1)
                    .size(T.fontSize.max, 1)
                    .lineHeight(storyTitleHeight)
                    .s()}
                >
                    {name}
                </div>
                {

                    F(
                        images, ( image, i ) => {
                            return <div {...S()
                                .key( i + 'images' )
                                .inline()
                                .width( imageWidth )
                                .height( imageHeight )
                                .margin( 0, divider, divider, 0 )
                                .image( image.url )
                                .center( 2 )
                                .size( 'cover', 2 )
                                .p()
                            } ></div>
                        }
                    )
                }
            </div>
        )

    }

    render() {
        const { stories, carousel, width, height } = this.props
        const { storyIndex, isOverStoryIndex } = this.state

        const rootStyle = {
                      width,
                      height,
            position: 'relative'
        }

        const storyIndexHeight = storyIndexWidth * (stories.length + 2)

        return (
            <div style={rootStyle}>
                <Caroucel ref="caroucel" images={carousel} width={width} height={height}/>
                {
                    storyIndex !== false &&
                    <div {...S()
                        .width( width )
                        .height( height )
                        .position( 1 )
                        .left( 0 )
                        .bottom( 0 )
                        .color( stories[ storyIndex ].color )
                        .transition()
                        .stop()
                        .p()}
                    >

                        { this.story(
                            stories[ storyIndex ].images,
                            stories[ storyIndex ].GcName,
                            stories[ storyIndex ].divider
                        ) }

                    </div>
                }

                <div {...S()
                    .width( storyIndexWidth )
                    .height( storyIndexHeight )
                    .position( 1 )
                    .top( (height - storyIndexHeight) / 2 )
                    .right( 0 )
                    .opacity( isOverStoryIndex ? 0.7 : 0.3 )
                    .p()}>
                    <HomeIcon
                        style={{width: storyIndexWidth, height: storyIndexWidth * 2}}
                        color={T.palette.darkBlack}
                        hoverColor={T.palette.main}
                        onMouseOver={ () => this.setState( { storyIndex: false, isOverStoryIndex: true } )}
                        onMouseLeave={ () => this.setState( { storyIndex: false, isOverStoryIndex: true } )}
                    />

                    {//创建楼层导航按钮
                        F(
                            stories, ( item, i ) => {
                                return <div {...S()
                                    .key( i + 'index' )
                                    .size( storyIndexWidth )
                                    .color( i === storyIndex ? T.palette.main : T.palette.darkBlack )
                                    .over(
                                        () => this.setState( { storyIndex: i, isOverStoryIndex: true } ),
                                        () => this.setState( { isOverStoryIndex: false } )
                                    )
                                    .p()} ></div>
                            }
                        )
                    }
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        let caroucel = ReactDOM.findDOMNode( this.refs.caroucel )
        if( this.state.storyIndex === false ) {
            caroucel.removeAttribute( "class" )
        } else {
            caroucel.className = 'blur'
        }
    }
}

const rootProps = {
    style: {}
}


export default connect(
    ( state )=> {
        return {
            stories:  state[ HOME_PAGE ].stories,
            carousel: state[ HOME_PAGE ].carousel
        }
    }
    //bindActionCreators()
)( HomePage )