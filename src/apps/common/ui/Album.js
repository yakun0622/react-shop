/**
 * Created by kenn on 2017/1/22.
 */
import React from 'react'
import { connect } from 'react-redux'


import {  D, T, STOREIMG, L } from '../../../common'
import {
    View,
    Button,
    Image,
    DropButton,
    Label,
    DonelIcon,
    CloseIcon,
    UploadIcon,
    FullDialog,
    Paging
} from '../../../components/BaseComponent'
import WindowResize from '../../../components/WindowResize'
import * as TYPE from '../../../actions/type'

class Album extends React.Component {
    display = 'Album'

    static defaultProps = {
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
        max: 9,

    }

    static propTypes = {
        display: React.PropTypes.string,
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        max: React.PropTypes.number,

        onTap: React.PropTypes.func,
        onChecked: React.PropTypes.func,

    }

    state = {
        covers: [],
        page: 1
    }

    onItem = ( cover ) => {
        const covers = this.state.covers
        const i = covers.indexOf( cover )
        if ( i == -1 ) {
            if ( covers.length >= this.props.max ) {
                covers.splice( i, 1, cover )
            } else {
                covers.push( cover )
            }
        } else {
            covers.splice( i, 1 )
        }
        this.setState( { covers } )
    }

    onChecked = ( covers ) => {
        this.props.onChecked( covers )
        FullDialog()
    }

    onPage = ( page ) => {
        this.setState( { page } )
        D(TYPE.ALBUM_LOAD, 'Page=' + (page - 1))
    }

    render() {
        const {
            winWidth,
            winHeight,
            images,
            count
        } = this.props
        const { covers } = this.state
        L( this.display, 'count',Math.ceil(count/40) )
        return (
            <View
                width={winWidth}
                wrap={'wrap'}
            >
                <View wrap={'wrap'} width={0} grow={1} margin={4} >
                    {images && images.map( ( image, i ) => {
                        return (
                            <View
                                key={i + 'ff'}
                                width={size}
                                height={size + 32}
                                alignH={'center'}
                                margin={4}
                                wrap={'wrap'}
                                shadowSize={covers.indexOf( image.ApicCover ) == -1 ? 0 : 6}
                                shadowColor={T.palette.main}
                                hand={true}
                                onTap={() => this.onItem( image.ApicCover )}
                            >
                                <Image imageSize={size} src={STOREIMG( image.ApicCover )} />
                                <Label text={image.ApicName} />
                            </View>
                        )
                    } )}
                </View>
                <View
                    width={'100%'}
                    height={toolBarHeight}
                    alignH={'between'}
                    alignV={'center'}
                    alignSelf={'end'}
                    color={T.palette.white800a}
                    style={{ position: 'fixed', bottom: 0, left: 0 }} >
                    <Paging
                        max={9}
                        pages={Math.ceil(count/40)}
                        checked={this.state.page}
                        onClick={this.onPage}
                    />
                    <View>
                        <DropButton
                            {...buttonProps}
                            action={TYPE.ALBUM_ADD}
                            icon={UploadIcon}
                            label={'上传图片'}
                        />
                        <Button
                            {...buttonProps}
                            label={'确定'}
                            icon={DonelIcon}
                            onTap={() => this.onChecked( covers )}
                        />
                        <Button
                            {...buttonProps}
                            label={'关闭'}
                            icon={CloseIcon}
                            onTap={() => FullDialog()}
                        />
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        D( TYPE.ALBUM_LOAD )
    }
}


const size = 256
const toolBarHeight = 128

const buttonProps = {
    width: toolBarHeight,
    height: toolBarHeight,
    radius: 0,
    iconPosition: 'top',
    iconSize: 48,
    hoverColor: T.palette.orange
}
export default connect(
    ( state ) => {
        return {
            images: state.album.images,
            count: state.album.count
        }
    }
    //bindActionCreators()
)( WindowResize( Album ) )

