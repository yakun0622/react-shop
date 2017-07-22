/**
 * Created by kenn on 16/7/30.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import View from './View'

export default class ScollView extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'ScollView'

        this.state= {
            scollWidth: 0
        }
    }

    static defaultProps = {

    }

    static propType = {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.any,

    }

    render() {
        const { height, color, width, order, alignSelf, grow } = this.props

        let style = {
            overflowY: 'scroll',
            overflowX: 'hidden',
            flexGrow: grow,
            order,
            alignSelf
        }

        let rootStyle = {
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto'
        }

        rootStyle['width'] = width
        rootStyle['height'] = height


        style['maxHeight'] = height
        style['width'] = 3000
        //rootStyle['backgroundColor'] = 'yellow'

        return (
            <View style={rootStyle}>
                <View style={style}>
                    <View width={width} overflow={'hidden'}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}