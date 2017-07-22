/**
 * Created by kenn on 16/8/20.
 */
import React from 'react'
import {connect} from 'react-redux'

class Snackbar extends React.Component {
    constructor(props) {
        super(props)
        this.display = 'Snackbar'
        this.state = {
            open: false
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }


    render() {
        const {open, text} = this.props
        console.log('asasasasass')

        return (
            <Snackbar
                open={open}
                message={text}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
            />
        )
    }
}

export default connect(
    (state)=> {
        return {
            open: state['snackBar'].open,
            text: state['snackBar'].text
        }
    }
)(Snackbar)