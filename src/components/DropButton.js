/**
 * Created by kenn on 2017/1/13.
 */
var React = require( 'react' ),
    ReactDOM = require( 'react-dom' )

import { M, T, L, D } from '../common'
import AddIcon from 'material-ui/svg-icons/content/add';
import Button from './Button'


/**
 * props
 *  isReplace
 */
export default class DropButton extends React.Component {
    display = 'DropButton'

    state = {
        isHover: false
    }

    static defaultProps = {
        width: 'auto',
        height: 32,
        fontSize: T.fontSize.normal,
        fontColor: T.palette.darkBlack,
        radius: 4,
        borderWidth: 0,
        borderColor: T.palette.darkBlack,
        zIndex: 0,
        align: 'center',
        grow: 0,
        order: 0,
        alignSelf: 'auto',

        margin: 0,

        shadowSize: 0,
        shadowOffset: 0,
        shadowColor: T.palette.grey,

        iconPosition: 'left',
        iconSize: 16,

        imageSize: 'contain',
        toUrl: true,

        disable: false,
    }

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount() {
        document.addEventListener( 'dragleave', function ( e ) {
            e.preventDefault()
        } )
        document.addEventListener( 'drop', function ( e ) {
            e.preventDefault()
        } )
        document.addEventListener( 'dragenter', function ( e ) {
            e.preventDefault()
        } )
        document.addEventListener( 'dragover', function ( e ) {
            e.preventDefault()
        } )

        var box = ReactDOM.findDOMNode( this ); //拖拽区域
        box.addEventListener( "drop", ( e ) => {
            e.stopPropagation()
            e.preventDefault(); //取消默认浏览器拖拽效果

            this.change( e.dataTransfer.files )

        }, false );
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        hand: React.PropTypes.any,
        radius: React.PropTypes.any,
        borderWidth: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontColor: React.PropTypes.string,
        hoverColor: React.PropTypes.string,
        hoverFontColor: React.PropTypes.string,
        shadow: React.PropTypes.any,
        transition: React.PropTypes.string,
        position: React.PropTypes.object,

        disable: React.PropTypes.bool,

        shadowSize: React.PropTypes.number,
        shadowOffset: React.PropTypes.number,
        shadowColor: React.PropTypes.string,

        align: React.PropTypes.string,

        grow: React.PropTypes.number,
        order: React.PropTypes.number,
        alignSelf: React.PropTypes.string,

        icon: React.PropTypes.any,
        iconPosition: React.PropTypes.string,
        iconSize: React.PropTypes.number,

        label: React.PropTypes.any,
        max: React.PropTypes.number,
        action: React.PropTypes.string,

        onChange: React.PropTypes.func,
    }

    readBlobAsDataURL = ( blob, name, size, width, height ) => {
        let a = new FileReader();
        a.onload = function ( e ) {
            this.props.onChange(e.target.result, name, size, width, height)
        };
        a.readAsDataURL( blob );
    }

    createObjectURL = (blob) => {
        if (window.URL) {
            return window.URL.createObjectURL(blob);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    }


    change( files ) {

        //检测是否是拖拽文件到页面的操作
        if ( files.length == 0 ) {
            return false;
        }
        //检测文件是不是图片
        if ( files[ 0 ].type.indexOf( this.props.type || 'image' ) === -1 ) {
            alert( "您拖的不是图片！" );
            return false;
        }

        const { max, action } = this.props
        let length = files.length
        if ( max ) {
            if ( length > max ) {
                length = max
            }
        }
        //console.log(files)
        for ( let i = 0; i < length; i++ ) {
            //图片尺寸
            //const img = window.webkitURL.createObjectURL(fileList[0]);
            const filesize = Math.floor( (files[ i ].size) / 1024 );
            if ( filesize > (this.props.maxSize || 1024) || filesize < (this.props.minSize || 0) ) {
                return false;
            }

            let img = new Image()
            img.src = this.createObjectURL(files[i])
            if ( img.complete ) {
                this.imageArgs( action, files[i], filesize, img )

            } else {
                img.onload = () =>  {
                    //L(this.display, files[i] )
                    this.imageArgs( action, files[i], filesize, img )
                }
            }
        }
    }

    imageArgs( action, file, filesize, image ) {
        if ( action ) {
            let formdata = new FormData()
            formdata.append( 'Image', file, file.name )
            formdata.append( 'Size', filesize )
            formdata.append( 'Width', image.width )
            formdata.append( 'Height', image.height )
            D( action, formdata )
        } else {
            this.readBlobAsDataURL( file, file.name, filesize, image.width, image.height )
        }
    }

    click() {

        if ( document.getElementById( "inputfile" ) ) {
            document.body.removeChild( document.getElementById( "inputfile" ) )
        }

        let input = document.createElement( "input" );
        input.type = 'file'
        input.id = 'inputfile'
        input.style.top = "-1000px";
        input.style.left = "-1000px";
        input.style.position = "absolute"
        input.multiple = 'multiple'
        input.addEventListener( 'change', ( e ) => this.change( e.target.files ) )

        document.body.appendChild( input );

        input.click()

    }

    /**
     * React 'render'
     */
    render() {

        const {
            width, height, color, hoverColor, fontColor,
            hoverFontColor, radius, fontSize, margin,
            shadowSize,
            shadowOffset,
            shadowColor,
            label,
            icon,
            iconPosition,
            iconSize,
            grow,
            alignSelf,
            order
        } = this.props

        const position = this.props.position
        if ( position ) {
            position.position = 'absolute'
        }

        return (
            <Button
                ref="drop"
                width={width}
                height={height}
                color={color}
                hoverColor={hoverColor}
                fontColor={fontColor}
                hoverFontColor={hoverFontColor}
                radius={radius}
                fontSize={fontSize}
                margin={margin}
                shadowSize={shadowSize}
                shadowOffset={shadowOffset}
                shadowColor={shadowColor}

                onTap={( e ) => this.click( e ) }
                label={label}
                icon={icon}
                iconPosition={iconPosition}
                iconSize={iconSize}
                grow={grow}
                alignSelf={alignSelf}
                order={order}
                style={position}
            />
        )
    }


}