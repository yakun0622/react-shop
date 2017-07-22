/**
 * Created by kenn on 16/7/9.
 */
import React from 'react'

import { IMAGEURI, D, T, showDetails } from '../../../common'
import {Card, CardMedia} from 'material-ui/Card'

import {BaseComponent} from '../../../components/BaseComponent'
import GoodsDetails from '../../common/ui/GoodsDetails'

export default class GoodsCard extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'GoodsCard'

        this.state = {
            height: props.width + T.height.min*2 + 8,
            borderWidth: 0,
            zIndex: 0,
            nameHeight: T.height.min,

            boxShadow: '0 0 5px ' + T.palette.minGrey,
            isShowLikeMenu: false,
            open: false
        }
    }

    static defaultProps = {
        width: 200
    }

    static propTypes = {

    }

    mouseEnterCard(e){
        e.stopPropagation()
        e.preventDefault()
        let s = {
            boxShadow: '0 0 30px ' + T.palette.grey,
            zIndex: 1000,
            nameHeight: T.height.min*2
        }

        if (!this.props.goodsId) {
            s['height'] = this.props.width + T.height.min*4 + 16
        }

        this.setState(s)
    }

    mouseLeaveCard(e){
        e.stopPropagation()
        e.preventDefault()
        let s = {
            zIndex: 0,
            boxShadow: '0 0 5px ' + T.palette.minGrey,
            isShowLikeMenu: false,
            nameHeight: T.height.min
        }

        if (!this.props.goodsId) {
            s['height'] =  this.props.width + T.height.min*2 + 8
        }
        this.setState(s)
    }

    open(e){
        e.stopPropagation()
        e.preventDefault()
        showDetails(this.props.goodsCommonId)
    }

    close(){
        this.setState({
            open: false
        })
    }

    render() {
        const { image, title, price, likes, goodsId, goodsCommonId, goodsCommon, goods } = this.props

        const height = T.height.min
        const margin = 0
        const textAlign = 'center'
        const lineHeight = height + 'px'

        const rootAttr = {
            style: {
                width: this.props.width,
                height: this.props.width + height*2 + 8,
                margin: 10,
                position: 'relative',
                cursor: "pointer",
                transition: 'height .3s',
                display: 'inline-block',
                zIndex: this.state.zIndex,
                verticalAlign: 'top',
            },

            onClick: (e)=>this.open(e)
        }

        const cardAttr = {
            style: {
                overflow: 'hidden',
                width: this.props.width,
                height: this.state.height,
                boxShadow: this.state.boxShadow
            },
            onMouseEnter: (e)=>this.mouseEnterCard(e),
            onMouseLeave: (e)=>this.mouseLeaveCard(e),
        }

        const imageAttr = {
            style: {
                overflow: 'hidden'
            },

            mediaStyle: {
                width: rootAttr.style.width,
                height: rootAttr.style.width,
            }
        }


        const nameAttr = {
            style: {
                margin,
                padding: '2px 4px',
                fontSize: T.fontSize.normal,
                height: this.state.nameHeight,
                textAlign,
                lineHeight,
                overflow: 'hidden'
            }
        }

        const priceAttr = {
            style: {
                margin,
                padding: '2px 4px',
                fontSize: T.fontSize.big,
                height,
                textAlign,
                color: T.palette.gold,
                lineHeight
            }
        }

        return (
            <div {...rootAttr}>
                <Card {...cardAttr}>
                    <CardMedia {...imageAttr}>
                        <img src={image} />
                    </CardMedia>
                    <p {...nameAttr} >{title}</p>
                    <p {...priceAttr} >{'￥' + price}</p>
                </Card>
                {
                    this.state.open ?
                        <GoodsDetails
                            goodsCommonId={Number(goodsCommonId)}
                            close={()=>this.close()}
                            user={this.props.userInfo}
                        />
                        :null
                }

            </div>
        )
    }
}