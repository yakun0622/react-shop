/**
 * Created by kenn on 16/9/18.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, DD, Q, T, L } from '../../../common'
import {
    BaseComponent,
    View,
    Button,
    TabView,
    Form,
    TextField,
    LockIcon,
    CardView,
    KeyIcon,
    CheckView,
    Dialog,
    ShareIcon
} from '../../../components/BaseComponent'

import * as API from '../../../store/api'
import * as TYPE from '../type'

class Tag extends BaseComponent {
    display = 'Tag'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',

    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,

    }

    componentWillMount() {
        this.setState( {
            lock: 0,
            isEdit: false,
            open: false,
            tagDatas: {
                TagName: false,
            },
            openShareTag: false,
            shareGroupIds: []
        } )
    }

    componentWillReceiveProps( props ) {
        const tagDatas = this.state.tagDatas
        tagDatas.GroupId = Number( props.checkedGroupChild || props.checkedGroup )
        this.setState( { tagDatas } )
    }

    render() {

        const { tags, checkedGroup, checkedGroupChild, shareTags, ownerGroups } = this.props
        const { lock, isEdit, tagDatas, openShareTag } = this.state

        //let tagIds = null


        //if( checkedGroupChild  && shareTags ) {
        //    tagIds = []
        //    shareTags.forEach(( data ) => {
        //        if( data.GroupId == checkedGroupChild && tagIds.indexOf(data.TagId) == -1 ) {
        //                tagIds.push(data.TagId)
        //        }
        //    })
        //
        //    this.log(tagIds)
        //}

        //this.log(tags)
        return (
            <View orientation={'column'} width={'100%'} overflow={'visible'} >
                <View>
                    <Button
                        width={128}
                        label={'添加标签'}
                        color={T.palette.orange}
                        hoverColor={T.palette.main}
                        fontColor={T.palette.white800a}
                        hoverFontColor={T.palette.white}
                        margin={8}
                        onTap={() => this.open( null, false )}
                    />
                    <TabView
                        width={200}
                        tabs={[ '标签', '锁定的标签' ]}
                        margin={8}
                        fontColor={T.palette.grey}
                        checked={lock}
                        toggle={false}
                        onChecked={( checked ) => this.setState( { lock: checked } )}
                    />
                </View>


                {tags && <View width={'100%'} wrap={'wrap'} alignH={'center'} overflow={'visible'} >
                    {F( tags, ( tag, id ) => {
                        if ( checkedGroup == tag.GroupId && tag.TagLock == !this.state.lock ) {
                            return (
                                <CardView
                                    key={'tag' + id}
                                    width={200}
                                    height={48}
                                    align={'center'}
                                    primaryText={tag.TagName}
                                    margin={8}
                                    onTap={() => this.open( M( tag ), true )}
                                >
                                    <View>
                                        <Button
                                            icon={tag.TagLock ? LockIcon : KeyIcon }
                                            iconSize={24}
                                            margin={8}
                                            onTap={() =>
                                                DD( tag.TagLock ? '确定要锁住该标签，不使用吗？' : '确定继续使用该标签吗？',
                                                    tag.TagLock ? TYPE.TAG_LOCK : TYPE.TAG_UNLOCK, null, tag.Id )}
                                        />
                                        {
                                            tag.TagLock ?
                                                <Button
                                                    icon={ ShareIcon }
                                                    iconSize={24}
                                                    margin={8}
                                                    onTap={() => this.setState( { openShareTag: tag.Id } )}
                                                /> : null
                                        }
                                    </View>

                                </CardView>
                            )
                        }
                    } )}
                </View>
                }

                {this.editTag( isEdit )}
                {openShareTag ? this.share() : null}
            </View>
        )
    }

    /**
     * 标签分享选择
     * @returns {XML}
     */
    share = () => {
        const { childGroups, checkedGroup, checkedGroupChild } = this.props
        const { shareGroupIds } = this.state
        let checkDatas = {}

        if ( checkedGroupChild ) {
            checkDatas[ checkedGroupChild ] = childGroups[ checkedGroupChild ].GroupName
            const loadChild = ( parentId) => {
                F( childGroups, ( data, id ) => {
                    if ( data.GroupParent == parentId ) {
                        checkDatas[ id ] = data.GroupName
                        loadChild( id )
                    }
                } )
            }
            loadChild( checkedGroupChild )
        } else {
            F( childGroups, ( group, id ) => {
                if ( checkedGroup == group.GroupBelong ) {
                    checkDatas[ id ] = group.GroupName
                }
            } )
        }



        //this.log( this.state.shareGroupIds )
        return (
            <Dialog
                width={616}
                title={'分享标签'}
                open={this.state.openShareTag ? true : false}
                rightButton={'保 存'}
                onRightButton={() => this.onShare()}
                close={() => this.closeDialog( 'openShareTag' )}
            >
                <View alignH={'center'} margin={8} >
                    <Button
                        width={128}
                        label={'全选'}
                        onTap={() => this.setState( { shareGroupIds: this.getGroupIds() } )}
                    />
                    <Button
                        width={128}
                        label={'取消'}
                        onTap={() => this.setState( { shareGroupIds: [] } )}
                    />
                </View>
                <CheckView
                    width={500}
                    wrap={'wrap'}
                    datas={checkDatas}
                    multiple={true}
                    isNumber={true}
                    itemWidth={150}
                    margin={8}
                    checked={shareGroupIds.length != 0 ? shareGroupIds : this.getShareGroupIds()}
                    onCheck={( name, checked ) => this.setState( { shareGroupIds: checked } )}
                />
            </Dialog>
        )
    }

    /**
     * 根据标签获取已经分享的组id
     * @returns {*}
     */
    getShareGroupIds(){
        const { shareTags } = this.props
        if( !shareTags ) {
            return null
        }

        let ids = []
        F( shareTags, ( data ) => {
            if( data.TagId == this.state.openShareTag ) {
                ids.push(data.GroupId)
            }
        } )
        return ids
    }

    /**
     * 获取组id
     * @returns {Array}
     */
    getGroupIds() {
        const { childGroups, checkedGroup, checkedGroupChild } = this.props

        const ids = []

        if( checkedGroupChild ) {
            ids.push(checkedGroupChild)
            const loadChild = ( parentId) => {
                F( childGroups, ( data, id ) => {
                    if ( data.GroupParent == parentId ) {
                        ids.push(data.Id)
                        loadChild( id )
                    }
                } )
            }
            loadChild(checkedGroupChild)
        } else {
            F( childGroups, ( group, id ) => {
                if ( checkedGroup == group.GroupBelong ) {
                    ids.push( group.Id )
                }
            } )
        }
        return ids
    }

    /**
     * 标签分享
     * 上传数据
     */
    onShare = () => {
        const { openShareTag, shareGroupIds } = this.state
        const { shareTags, checkedGroup } = this.props

        const formdata = {}
        formdata.TagId = openShareTag
        if ( shareTags ) {
            const oldShareGroupIds = this.getShareGroupIds()
            const addGroupIds = []
            const removeGroupIds = []

            shareGroupIds.forEach(( newId ) => {
                if( oldShareGroupIds.indexOf(newId) == -1 ) {
                    addGroupIds.push(newId)
                }
            })

            oldShareGroupIds.forEach(( oldId ) => {
                if( shareGroupIds.indexOf(oldId) == -1 ) {
                    removeGroupIds.push(oldId)
                }
            })

            //this.log('add',addGroupIds )
            //this.log('remove',removeGroupIds )

            if( addGroupIds.length != 0 ) {
                formdata.GroupIds = JSON.stringify(addGroupIds)
                D( TYPE.TAG_SHARE, formdata, 'form' )
            }

            if( removeGroupIds.length!= 0 ) {
                formdata.GroupIds = JSON.stringify(removeGroupIds)
                D( TYPE.TAG_UNSHARE, formdata, 'form' )
            }


        } else if( shareGroupIds.length != 0 ) {
            formdata.GroupIds = JSON.stringify(shareGroupIds)
            D( TYPE.TAG_SHARE, formdata, 'form' )
        }
        this.setState( { openShareTag: false } )
    }

    /**
     * 编辑添加标签
     * @param datas
     * @param isEdit
     */
    open( datas, isEdit ) {

        const { checkedGroup, ownerGroups, joinGroups } = this.props

        this.setState( {
            tagDatas: datas || {
                TagName: false,
                GroupId: this.props.checkedGroup,
                MemberId: ownerGroups && ownerGroups[ checkedGroup ] ?
                    ownerGroups[ checkedGroup ].GroupOwnerId : joinGroups[ checkedGroup ].GroupOwnerId
            },
            open: true,
            isEdit
        } )
    }

    editTag( isEdit ) {
        const { tagDatas } = this.state
        return (
            <Form
                width={500}
                label={'添加标签'}
                open={this.state.open}
                datas={tagDatas}
                actionType={isEdit ? TYPE.TAG_SAVE : TYPE.TAG_ADD}
                isSubmitJson={true}
                close={() => this.closeDialog( 'open' )}
            >
                <TextField
                    name={'TagName'}
                    value={tagDatas.TagName}
                    onChange={( name, value ) => this.setFormDatas( name, value, 'tagDatas' )}
                    label={'标签名称'}
                    rules={{ required: true, minLength: 2, maxLength: 64 }}
                />
            </Form>
        );
    }
}
export default connect(
    ( state )=> {
        return {
            tags: state.tags.tags,
            shareTags: state.tags.shares,
            checkedGroup: state.checkedSt.checkedGroup,
            checkedGroupChild: state.checkedSt.checkedGroupChild,
            ownerGroups: state.groups.ownerGroups,
            joinGroups: state.groups.joinGroups,
            childGroups: state.groups.childGroups,
        }
    }
    //bindActionCreators()
)( Tag )