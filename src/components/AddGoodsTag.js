/**
 * Created by kenn on 2016/10/2.
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { M, F, D, Q, T, L } from '../common'
import { BaseComponent, View, Button, Label, CheckView } from './BaseComponent'

import * as TYPE from '../actions/type'

class AddGoodsTag extends BaseComponent {
    display = 'AddGoodsTag'

    tags = {}

    constructor( props ) {
        super( props )
    }

    state = {
        checked: []
    }

    static defaultProps = {
        width: 'auto',
        height: 'auto',
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
    }

    hasTags = ( groups ) => {
        let has  = false
        F( groups, ( group ) => {
            if( group.tags ) {
                has = true
                return false
            }
        } )

        return has
    }

    componentWillMount() {

        const { ownerGroups, joinGroups, goodsIds } = this.props
        //this.log(goodsIds)
        if( goodsIds ) {
            const { goodsTags } = this.props
            let checked = []

            goodsIds.forEach(( goodsId, i ) => {

                if( i === 0 ) {
                    if( goodsTags && goodsTags[goodsId] ) {
                        checked = Object.keys(goodsTags[goodsId])
                    }
                } else {
                    if( goodsTags &&  goodsTags[goodsId] ) {
                        const tempTagIds = Object.keys(goodsTags[goodsId])
                        checked.forEach(( id, i ) => {
                            if( tempTagIds.indexOf(id) == -1 ) {
                                checked.splice(i, 1)
                            }
                        })
                    }
                }
            })

            this.setState( { checked: checked } )
        }


        let q = Q()
        if( ownerGroups && !this.hasTags(ownerGroups)) {
            q.add('ownerGroupIds', Object.keys(ownerGroups).join(','))
        }

        if( joinGroups && !this.hasTags(joinGroups) ) {
            const owner = []
            const join = []
            F( joinGroups, ( group, groupId ) => {
                if( group.GroupParent == 0 ) {
                    owner.push(groupId)
                } else {
                    join.push(groupId)
                }
            } )

            if( owner.length > 0 ) {
                q.add("joinOwnerGroupIds", owner.join(','))
            }

            if( join.length > 0 ) {
                q.add("joinGroupIds", join.join(','))
            }
        }

        q = q.ok()

        if( q ) {
            D( TYPE.USER_GROUPS_TAG_LOAD, q )
        }

    }

    //componentWillReceiveProps( props ) {
    //    this.setState( {} )
    //}

    render() {
        const {
            width,
            height,
            joinGroups,
            ownerGroups
        } = this.props

        return (
            <View
                width={width}
                height={height}
                orientation={'column'}
                margin={16}
            >
                {ownerGroups && this.items(ownerGroups)}
                {joinGroups && this.items(joinGroups)}
                <Button
                    width={500}
                    label={'保存'}
                    alignSelf={'center'}
                    color={T.palette.main}
                    fontColor={T.palette.white}
                    margin={16}
                    onTap={this.save}
                />
            </View>
        )
    }

    save = () => {
        const { goodsIds, goodsTags } = this.props
        const { checked } = this.state

        const saves = []
        const datas = {}
        goodsIds.forEach(( goodsId ) => {
            checked.forEach(( tagId ) => {
                if( !goodsTags || !goodsTags[goodsId] || !goodsTags[goodsId][tagId] ) {
                    saves.push(goodsId)
                    saves.push(tagId)

                    if( !datas[goodsId] ) {
                        datas[goodsId] = {}
                    }
                    datas[goodsId][tagId] = this.tags[tagId]
                }
            })
        })



        if( saves.length > 1 ) {
            D(TYPE.GOODS_TAG_SAVE, this.formdata('GoodsAndTags', saves.join(',')), datas)
        }

        this.props.close()
    }

    checked = ( name, checked ) => {
        this.setState( { checked } )
    }

    items = ( groups ) => {
        const { checked } = this.state

        let tags = []
        F( groups, ( group, id ) => {
            if( group.tags ) {
                tags.push(
                    <Label
                        key={'l' + id}
                        text={group.GroupName}
                        align={'center'}
                        color={T.palette.lightGrey}
                        fullWidth={true}
                        margin={'8px 0 0 0'}
                    />)
                tags.push(
                    <CheckView
                        key={'c' + id}
                        width={'100%'}
                        itemWidth={200}
                        wrap={'wrap'}
                        datas={group.tags}
                        checked={checked}
                        multiple={true}
                        onCheck={this.checked}
                    />
                )

                Object.assign(this.tags, group.tags)
            }
        } )
        return tags
    }
}
export default connect(
    ( state )=> {
        return {
            goodsTags: state.goodsTags,
            ownerGroups: state.user.ownerGroups,
            joinGroups: state.user.joinGroups,
        }
    }
    //bindActionCreators()
)( AddGoodsTag )