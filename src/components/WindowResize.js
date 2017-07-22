/**
 * Created by kenn on 16/7/8.
 */
import React from 'react'
//import {Link} from 'react-router'
//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'

//import {WIDTH} from './BaseComponent'
//import {GOODS} from '../../store/api'
//import {} from '../../actions/type'

export default (ResizeComponent) => class WindowResize extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'WindowResize'
        this.state = {
            winWidth: document.documentElement.clientWidth,
            winHeight: document.documentElement.clientHeight
        }
    }

    componentDidMount() {

        window.onresize = () => {
            this.setState({
                winWidth: document.documentElement.clientWidth,
                winHeight: document.documentElement.clientHeight
            })
        }
    }

    render() {
        return <ResizeComponent {...this.props} {...this.state} />
    }
}
