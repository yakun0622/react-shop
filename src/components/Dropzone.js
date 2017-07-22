var React = require('react'),
    ReactDOM = require('react-dom')

import {M} from '../common'
import AddIcon from 'material-ui/svg-icons/content/add';



/**
 * props
 *  isReplace
 */

class Dropzone extends React.Component {

    constructor(props){
        super(props)
        this.display = 'Dropzone'

        this.state = {
            isHover: false
        }
    }

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount() {
        document.addEventListener('dragleave', function(e){e.preventDefault()})
        document.addEventListener('drop', function(e){e.preventDefault()})
        document.addEventListener('dragenter', function(e){e.preventDefault()})
        document.addEventListener('dragover', function(e){e.preventDefault()})

        var box = ReactDOM.findDOMNode(this); //拖拽区域
        box.addEventListener("drop",(e) => {
            e.stopPropagation()
            e.preventDefault(); //取消默认浏览器拖拽效果

            this.change(e.dataTransfer.files)

        },false);
    }


    change(files){

        //检测是否是拖拽文件到页面的操作
        if(files.length == 0){
            return false;
        }
        //检测文件是不是图片
        if(files[0].type.indexOf(this.props.type || 'image') === -1){
            alert("您拖的不是图片！");
            return false;
        }

        //图片尺寸
        //const img = window.webkitURL.createObjectURL(fileList[0]);
        const filename = files[0].name; //图片名称
        const filesize = Math.floor((files[0].size)/1024);
        if(filesize>(this.props.maxSize || 1024) || filesize < (this.props.minSize || 0)){
            alert("上传大小不能超过1MB.");
            return false;
        }

        //console.log(files)
        for (var i = 0; i < files.length; i++) {
            this.props.change(this.createURL(files[i]), filename)
        }
    }

    createURL(blob){
        if (window.URL) {
            return window.URL.createObjectURL(blob);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    }

    click(){

        if (document.getElementById("inputfile")) {
            document.body.removeChild(document.getElementById("inputfile"))
        }

        let input = document.createElement("input");
        input.type = 'file'
        input.id= 'inputfile'
        input.style.top = "-1000px";
        input.style.left = "-1000px";
        input.style.position = "absolute"
        input.multiple = 'multiple'
        input.addEventListener( 'change' ,(e) => this.change(e.target.files))

        document.body.appendChild(input);

        input.click()

    }


    onHoverToggle(){
        this.setState({
            isHover: !this.state.isHover
        })
    }

    /**
     * React 'render'
     */
    render() {



        let rootStyle = {
            width: 48,
            height: 48,
            position: 'absolute',
            opacity: this.state.isHover ? this.props.opacityHover || 1 : this.props.opacity || '0',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            lineHeight: (this.props.style && this.props.style.height || 48) +'px'
        }

        if (this.props.style) {
            rootStyle = M(rootStyle, this.props.style)
        }

        return (
            <Button style={rootStyle} ref="drop"
                    color={T.palette.black700a}
                    hoverColor={T.palette.darkBlack}
                    radius={0}
                 onTap={(e) => this.click(e) }
                    label={this.props.children || '+'}
            />
        )
    }


}

module.exports = Dropzone;