/**
 * Created by kenn on 16/9/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import Checkbox from 'material-ui/svg-icons/toggle/check-box';
import CheckboxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import  {lightBlue300} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {S, P, M, MM, F, D, Q, T, L, R, DD} from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    TabView,
    ListView,
    Form,
    TextField,
    CheckView,
    AccountCircle,
    LockIcon,
    CardView,
    KeyIcon,
} from '../../../components/BaseComponent'
import GoodsDetails from './../../common/ui/GoodsDetails'
import Paging from '../../../components/Paging'

import * as api from '../../../store/api'
import * as TYPE from '../../../actions/type'


const STORE_REFUND_RETURN_LIMIT = 10

class RefundReturn extends BaseComponent {
    display = 'RefundReturn'

    constructor(props) {
        super(props)

        this.state = {
            detailOpen: false,
            overItemId: 0,
            goodsCommonId: null,
            goodsCommon: {},
            lock: 0,
            checkedItemId: [],
            searchType: 1,
            searchValue: null,
            storeClass: null,
            checkedAll: false,
        }
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
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
        hand: React.PropTypes.any,
        radius: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        src: React.PropTypes.string,
        imageSize: React.PropTypes.string,
        shadow: React.PropTypes.any,
        transition: React.PropTypes.string,
        zIndex: React.PropTypes.number,
        margin: React.PropTypes.any,

        //伸缩容器属性
        flow: React.PropTypes.string,
        wrap: React.PropTypes.string,
        orientation: React.PropTypes.string,
        align: React.PropTypes.string,
        alignH: React.PropTypes.string,
        alignV: React.PropTypes.string,

        //伸缩项目属性
        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        style: React.PropTypes.object,

        onTap: React.PropTypes.func,
        onOver: React.PropTypes.func,
        onLeave: React.PropTypes.func,
    }

    componentWillMount() {
        this.setState({})
    }

    componentDidMount() {
        D(TYPE.STORE_REFUND_RETURN_LOAD, Q().limit(STORE_REFUND_RETURN_LIMIT).ok())
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    pagingClick = (page) => {
        D(TYPE.STORE_REFUND_RETURN_LOAD,
            Q().limit(STORE_REFUND_RETURN_LIMIT, page == 1 ? 0 : STORE_REFUND_RETURN_LIMIT * (page - 1) - 1).ok())
    }

    render() {
        const {refundReturnList, listCount} = this.props.data
        L(refundReturnList)
        const {isOver} = this.state
        const {overItemId, goodsCommonId, goodsCommon, detailOpen, lock, checkedAll} = this.state
        const checkAllProps = {
            onTouchTap: (e) => this.checkedAll(e),
            color: "rgb(0, 188, 212)",
            viewBox: '0 0 24 24'
        }

        let pages = Math.ceil(listCount / STORE_REFUND_RETURN_LIMIT)

        return (
            <View width={'100%'} overflow={'visible'} orientation={'column'} alignH={'stretch'}>
                <View height={50} style={{marginLeft: 5}}>
                    {
                        checkedAll ? <Checkbox {...checkAllProps}/> : <CheckboxOutlineBlank {...checkAllProps}/>
                    }
                    <span onTouchTap={(e) => this.checkedAll(e)} style={{cursor: 'default'}}>全选</span>
                </View>
                {
                    refundReturnList && <View grow={1} flow={'column'} shadowSize={5} alignSelf={'stretch'}>

                        {
                            F(refundReturnList, (data, id)=>this.list(data, id))
                        }
                        <Divider />

                        {
                            pages
                                ?
                                <View style={{marginTop: 10}}><Paging height={40} max={9} pages={pages}
                                                                      onClick={(page)=>this.pagingClick(page)}/></View>
                                : null
                        }
                    </View>
                }


                {   detailOpen && <GoodsDetails
                    goodsCommonId={goodsCommonId}
                    close={()=>this.closeDialog('detailOpen')}
                    userInfo={this.props.userInfo}/>
                }

            </View>
        )
    }


    /**
     * 选择图标
     * @param e
     * @param name
     */
    checked = (e, id) => {
        e.stopPropagation()
        e.preventDefault()
        let checked = this.state.checkedItemId
        if (checked.indexOf(id) == -1) {
            checked.push(id)
        } else {
            checked.splice(checked.indexOf(id), 1)
        }
        this.setState(
            {
                checkedItemId: checked
            }
        )

    }

    /**
     * 每行数据全选按钮+商品图片渲染
     * @param props
     * @returns {XML}
     */
    leftIcons = (props) => {
        let {id, checkedId, gImage} = props
        const checkProps = {
            onTouchTap: (e) => this.checked(e, id),
            color: "rgb(0, 188, 212)",
            viewBox: '0 0 24 24'
        }
        return <View>
            {
                checkedId.indexOf(id) != -1 ? <Checkbox {...checkProps}/> : <CheckboxOutlineBlank {...checkProps}/>
            }
            {
                <Avatar src={R(7, gImage, 1)} size={50} style={{marginLeft: 10, marginRight: 10}}/>
            }
        </View>
    }

    /**
     * 列表渲染
     * @param data
     * @param id
     * @returns {XML}
     */
    list = (data, id) => {
        const {checkedItemId} = this.state
        return <ListView primaryText={data.Goods.GoodsName}
                         width={'100%'}
                         height={60}
                         key={id}
                         primaryColor={lightBlue300}
                         secondText={"订单编号：" + data.OrderSn}
                         leftIcon={() => this.leftIcons({id: id, checkedId: checkedItemId, gImage: data.GoodsImage})}
                         rightIcon={<IconMenu
                             iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                         >
                             <MenuItem value="1" primaryText="商品详情" onTouchTap={() => this.details(id, data)}/>
                             <MenuItem value="2" primaryText="上架"
                                       onTouchTap={() =>this.showGoods(id)}/>
                             <MenuItem value="3" primaryText="下架"
                                       onTouchTap={() =>this.unshowGoods(id)}/>
                         </IconMenu>}
                         showFoldIcon={true}
                         shadowSize={5}
                         children={
                             <View key={id} style={{marginLeft: 16}}>
                                 aaaaaaa
                             </View>
                         }
                         child={
                             <div style={{position: 'absolute', marginLeft: 200, marginTop: 2}}>
                                 <div style={{display: 'flex', marginTop: 18}}>
                                     <p style={{fontSize: T.fontSize.min, marginLeft: 15}}>
                                         退款编号：{data.RefundSn}</p>
                                     <p style={{fontSize: T.fontSize.min, marginLeft: 15}}>
                                         退款金额：￥{data.RefundAmount}</p>
                                 </div>
                             </div>

                         }
        />
    }
}
export default connect(
    (state)=> {
        return {
            data: {
                refundReturnList: state['refundReturn'].refundReturnList,
                listCount: state['refundReturn'].count
            }
        }
    }
    //bindActionCreators()
)(RefundReturn)