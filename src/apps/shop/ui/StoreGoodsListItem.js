/**
 * Created by kenn on 2016/10/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'


import {M, F, D, DD, Q, T, R, L, formatDate} from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    Label,
    ArrowDownIcon,
    ArrowUpIcon,
    Icon,
    CancelIcon,
    VerifiedIcon,
    RemoveCircleIcon,
    ListView,
    Dialog,
    Numbers
} from '../../../components/BaseComponent'
import GoodsDetails from '../../common/ui/GoodsDetails'
export default class StoreGoodsListItem extends BaseComponent {
    display = 'StoreGoodsListItem'

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        width: 'auto',
        height: 48,
        margin: 0,

        grow: 0,
        alignSelf: 'start',
    }

    state = {
        offsetHeight: 0,
        open: false,
        openGoodsDetails: false,
        detailGoodsId: false,
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        grow: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        id: React.PropTypes.number,
        goodsCommon: React.PropTypes.any,
        storeId: React.PropTypes.number,
        onOpen: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        onShow: React.PropTypes.func,
        onUnShow: React.PropTypes.func,
    }

    onOpen = () => {
        const {onOpen, id} = this.props
        const {open} = this.state

        !open && onOpen && onOpen(id)
        this.setState({open: !open})
    }

    showGoodsList = (goodses, storeId) => {
        if (!goodses) {
            return null
        }
        return (
            <View width={'100%'} orientation={'column'} overflow={'visible'} margin={'8px 0'}>
                {F(goodses, (goods, id) => {
                    return (
                        <ListView
                            key={1 + id}
                            width={'100%'}
                            height={'auto'}
                            hoverColor={T.palette.white}
                            primaryText={goods.GoodsName}
                            secondText={'库存：' + goods.GoodsStorage}
                            leftIcon={R(storeId, goods.GoodsImage, 1)}
                            leftIconSize={60}
                            goodsId={goods.GoodsId}
                            onTap={() => this.setState({openGoodsDetails: true, detailGoodsId: goods.GoodsId})}
                            margin={'4px 0 0'}
                            rightIcon={<Label text={'¥' + goods.GoodsPrice}
                                              fontColor={T.palette.gold}
                                              margin={'0 8px'}/>}
                        />


                    )
                })}
            </View>
        )
    }

    delete = (id) => {
        const {onDelete} = this.props
        onDelete && onDelete(id)
    }

    unshowGoods = (id) => {
        const {onUnShow} = this.props
        onUnShow && onUnShow(id)
    }
    showGoods = (id) => {
        const {onShow} = this.props
        onShow && onShow(id)
    }

    render() {
        const {
            width,
            height,
            grow,
            alignSelf,
            margin,

            id,
            goodsCommon,
            checked,
            state,
            onTap,
            storeId,
        } = this.props

        const labelProps = {
            margin: '0 16px 5px',
            fontSize: T.fontSize.min,
            //width: 320
        }

        const {offsetHeight, open} = this.state
        return (
            <View
                width={width}
                height={open ? offsetHeight : height}
                grow={grow}
                alignSelf={alignSelf}
                color={open ? T.palette.minGrey : T.palette.white}
                margin={margin}
                borderWidth={1}
                borderColor={checked ? T.palette.main : T.palette.lightGrey}
                onTap={onTap}
                overflow={open ? 'visible' : 'hidden'}
                zIndex={open ? 20 : 1}
                transition={'height'}
                style={{position: "relative"}}
            >
                <View ref="root" orientation={'column'} width={'100%'} overflow={'visible'}>
                    <View width={'100%'} height={height} alignV={'center'}>
                        <View width={height} height={height} src={R(goodsCommon.StoreId, goodsCommon.GoodsImage, 1)}
                              imageSize={height}></View>
                        <View width={0} grow={7}>
                            <Label width={0} grow={3} text={goodsCommon.GoodsName} fontColor={T.palette.green}
                                   margin={'0 16px'}/>
                            <Label width={0} grow={1} text={goodsCommon.Id}/>
                            <Label width={0} grow={1} text={'¥' + goodsCommon.GoodsPrice} fontColor={T.palette.gold}/>
                            <Label width={0} grow={1} text={this.getGoodsStockByCommonId(goodsCommon)}/>
                            <Label width={0} grow={1} text={formatDate(goodsCommon.GoodsAddtime)}/>
                        </View>

                        <View width={0} grow={1} align={'end'}>
                            {goodsCommon.GoodsState == 1 && goodsCommon.GoodsVerify == 1 &&
                            <Button label={'下架'}
                                    {...btnProps}
                                    onTap={() =>this.unshowGoods(goodsCommon.Id)}
                            />}
                            {goodsCommon.GoodsState == 0 && goodsCommon.GoodsVerify == 1 &&
                            <Button label={'上架'}
                                    {...btnProps}
                                    onTap={() =>this.showGoods(goodsCommon.Id)}
                            />}
                            <Button label={'修改'}
                                    {...btnProps}
                                //onTap={() =>this.showGoods(goodsCommon.Id)}
                            />
                            <Button label={'删除'}
                                    {...btnProps}
                                    onTap={() =>this.delete(goodsCommon.Id)}
                            />
                        </View>

                        <Button width={height - 16} margin={8} height={height - 16}
                                icon={open ? ArrowUpIcon : ArrowDownIcon}
                                borderWidth={1}
                                borderColor={T.palette.lightGrey}
                                hoverColor={T.palette.main600a}
                                radius={300}
                                onTap={this.onOpen}
                        />
                    </View>
                    {this.showGoodsList(goodsCommon.Goods, storeId)}

                </View>

                {this.state.openGoodsDetails &&
                <GoodsDetails
                    buyable={false}
                    goodsId={this.state.detailGoodsId}
                    close={() => this.setState({openGoodsDetails: false, detailGoodsId: false})}
                />
                }
            </View>
        )
    }

    getGoodsStockByCommonId = (goodsCommon) => {
        let stock = 0
        F(goodsCommon.Goods, (goods, id) => {
            stock += goods.GoodsStorage
        })

        return stock
    }

    componentDidMount() {
        this.setHeight()
    }

    componentDidUpdate() {
        this.setHeight()
    }

    setHeight() {
        if (this.state.open) {
            const root = ReactDOM.findDOMNode(this.refs.root)
            if (root.offsetHeight != this.state.offsetHeight) {
                this.setState({offsetHeight: root.offsetHeight})
            }
        }
    }
}

const btnProps = {
    color: T.palette.main600a,
    hoverColor: T.palette.main,
    fontColor: T.palette.white,
    radius: 0,
    fontSize: 13,
    height: 24,
    margin: '0 3px',
}