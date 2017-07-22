/**
 * Created by kenn on 16/8/12.
 */
import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { S, P, M, F, D, Q, T } from '../common'
import {BaseComponent, U, I} from './BaseComponent'
import Paging from './Paging'

import {GOODS} from '../store/api'
import {} from '../actions/type'


export default class Caroucel extends BaseComponent {
    constructor( props ) {
        super( props )
        this.display = 'Caroucel'

        this.state = {
            index: 0
        }
    }

    render() {
        const { data, style, width, height, images } = this.props
        const { index } = this.state


        return (
            <div {...P( rootProps, style )
                .width( width )
                .height( height )
                .image( images[ index ].url )
                .color( images[ index ].color )
                .transition()
                .p()}>
                <div {...S()
                    .width( width )
                    .height( 64 )
                    .over( () => this.toggle( 1 ), () => this.toggle( 0 ) )
                    .position( 2 )
                    .bottom( 0 )
                    .left( 0 )
                    .p()
                }>
                    <Paging max={images.length} pages={images.length} checked={ index + 1 } height={16}
                            dotted={true}
                            space={16}
                            onClick={(page) => this.setState({ index: page-1 })}/>
                </div>
            </div>
        )
    }

    toggle( name ) {
        if( name ) {
            clearInterval( this.t )
        } else {
            this.setInterval()
        }
    }

    componentDidMount() {
        this.setInterval()
    }

    componentWillUnmount() {
        clearInterval( this.t )
    }

    setInterval() {
        this.t = setInterval(
            () => {
                const { index } = this.state
                this.setState( { index: index < this.props.images.length - 1 ? index + 1 : 0 } )
            }, 3000
        )
    }
}

const rootProps = {
    style: {
        margin:             '0 auto',
        backgroundSize:     'contain',
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center',
    }
}