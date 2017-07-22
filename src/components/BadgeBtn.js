/**
 * Created by wangyakun on 16/9/6.
 */
import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Badge from 'material-ui/Badge';
import RaisedButton from 'material-ui/RaisedButton';

import {BaseComponent, U, I} from './BaseComponent'


export default class BadgeBtn extends BaseComponent {
    constructor(props) {
        super(props)
        this.display = 'BadgeBtn'
    }

    componentWillMount() {
        this.setState({})
    }

    componentWillReceiveProps(props) {
        this.setState({})
    }

    static defaultProps = {
        num: 0,
        linkTo: ''
    }

    static propTypes = {
        num: React.PropTypes.number,
        key: React.PropTypes.any,
        linkTo: React.PropTypes.string
    }

    render() {
        const {num, btnStyle, label, key, linkTo} = this.props
        const {} = this.state

        const badgeStyle = {
            top: 12,
            right: 12
        }
        return (
            <div {...rootProps}>
                <Link to={linkTo}>
                {
                    num > 0 &&
                    <Badge
                        key={key}
                        badgeContent={num}
                        secondary={true}
                        badgeStyle={badgeStyle}
                    >
                        <RaisedButton key={key} label={label} style={btnStyle}/>
                    </Badge>
                }
                {
                    !num &&
                    <RaisedButton key={key} label={label} style={btnStyle}/>
                }
                </Link>

            </div>
        )
    }
}

const rootProps = {
    style: {
        position: 'relative',
        display: 'inline-block',
        //padding: '24px 24px 12px 12px',
        marginRight: 8,
    }
}