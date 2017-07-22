/**
 * Created by kenn on 16/7/12.
 */
import React from 'react'

import { BaseComponent, View } from './BaseComponent'
import Paging from './Paging'


/**
 * 图片轮播组件
 * props
 *  width
 *  images [array] 图片路径
 *  style  [object] root 样式
 *  isOver      图片显示有用, 缩略图是否重叠在图片上
 */
export default class ImageCarousel extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'ImageCarousel'

        this.state = {
            imageIndex: 0,
            isOverImage: false
        }
    }

    static defaultProps = {
        checked: -1
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        images: React.PropTypes.any,
        checked: React.PropTypes.number,
        onRequestImageIndex: React.PropTypes.func
    }

    componentWillReceiveProps(props) {
        if( props.checked > -1 ) {
            this.setState( {
                imageIndex: props.checked
            } )
        }

    }

    checkedImage( page ) {
        //this.log(page)
        this.setState( {
            imageIndex: page - 1,
            //isOver: false
        } )
    }

    requestIndex( e, index ) {
        e.stopPropagation()
        e.preventDefault()
        this.setState( { isOver: true } )
        if ( this.props.onRequestImageIndex ) {
            const { images } = this.props
            if( images && images.length) {
                this.props.onRequestImageIndex( index )
            } else {
                this.props.onRequestImageIndex( -1 )
            }
        }
    }

    render() {
        const { images, width, height } = this.props
        const { imageIndex } = this.state
        let max = this.props.max
        const pagingWidth = width - 24
        const pagingHeight = (pagingWidth - 8 * (max + 1)) / (max + 2)

        const image = images && images.length > 0 ? images[ this.state.imageIndex ] : 'images/default.png'

        return (
            <View
                width={width}
                height={height}
                src={image}
                onOver={( e ) => this.requestIndex( e, this.state.imageIndex )}
                onLeave={() => this.setState( { isOver: false } )}
            >
                <Paging
                    width={pagingWidth}
                    height={pagingHeight}
                    pages={images ? images.length : 1}
                    max={max}
                    alignSelf={'end'}
                    checked={imageIndex + 1}
                    images={images || [ image ]}
                    onClick={( page ) => this.checkedImage( page ) }
                    margin={8}
                    opacity={this.state.isOver ? 0.8 : 0}
                />
            </View>
        )
    }
}