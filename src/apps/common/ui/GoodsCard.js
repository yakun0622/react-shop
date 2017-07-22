/**
 * Created by kenn on 2016/10/14.
 */
import React from 'react'


import { M, F, D, Q, T, L, R } from '../../../common'
import { BaseComponent, View, Button, CardView, Label, Numbers } from '../../../components/BaseComponent'
import GoodsDetails from './GoodsDetails'

export default class GoodsCard extends BaseComponent {
    display = 'GoodsCard'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 200,
        height: 175,
        margin: 8
    }

    state = {
        isOver: false
    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        goodsId: React.PropTypes.number,
        goodsCommonId: React.PropTypes.number,
        name: React.PropTypes.string,
        image: React.PropTypes.any,
        price: React.PropTypes.number,
        tags: React.PropTypes.any,
        num: React.PropTypes.number,
        onNumChange: React.PropTypes.func,
    }

    render() {
        const {
            width,
            height,
            goodsId,
            goodsCommonId,
            image,
            price,
            name,
            margin,
            tags,
            num,
            onNumChange,
        } = this.props
        const { isOver, openGoodsDetails } = this.state

        //this.log(isOver)
        return (
            <CardView
                width={width}
                height={height}
                image={image}
                margin={margin}
                onOver={() => this.setState( { isOver: true } )}
                onLeave={() => this.setState( { isOver: false } )}
                onTap={() => this.setState( { openGoodsDetails: true } )}
            >
                <View orientation={'column'} alignH={'center'} width={'100%'} >
                    <Label
                        wrap={isOver}
                        fullWidth={true}
                        text={name}
                        margin={4}
                    />
                    <Label
                        text={"¥" + price}
                        margin={4}
                        fontColor={T.palette.gold}
                    />
                    {tags &&
                     F( tags, ( tagName, id ) => {
                         return (
                             <Label
                                 key={id + 99}
                                 text={tagName}
                                 width={'100%'}
                                 height={20}
                                 radius={10}
                                 align={'center'}
                                 margin={4}
                                 fontSize={T.fontSize.small}
                                 color={T.palette.lightGrey}
                             />
                         )
                     } )
                    }
                </View>
                {openGoodsDetails &&
                    <GoodsDetails
                        buyable={false}
                        goodsId={goodsId}
                        goodsCommonId={goodsCommonId}
                        close={(  ) => this.setState( { openGoodsDetails: false } )}
                    />
                }
            </CardView>
        )
    }
}