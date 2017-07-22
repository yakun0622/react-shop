/**
 * Created by kenn on 16/7/11.
 */
import React from 'react'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before';
import NavigationNext from 'material-ui/svg-icons/image/navigate-next';

import { BaseComponent, View, Button } from './BaseComponent'
import { D, T, M, L } from '../common'


/**
 * 分页组件
 * props
 *  height
 *  max         最大显示数
 *  checked     选择的页数,默认为1
 *  pages       总页数
 *  space       间隔
 *  dotted      圆点
 */
class Paging extends React.Component {
    constructor( props ) {
        super( props )
        this.display = 'Paging'
        let max = props.max ? props.max : 9
        //L(this.display, props.pages)
        if ( max > props.pages ) {
            max = props.pages
        }


        this.state = {
            max: max,
            num: max,
            checked: 1,
            first: 1,
            start: max < props.pages ? max % 2 == 0 ? max / 2 - 1 : max / 2 + 0.5 : 0,
            end: max < props.pages ? max % 2 == 0 ? props.pages - (max / 2 + 1) : props.pages - max / 2 + 0.5 : 0,
            navigation: false
        }
    }

    static defaultProps = {

        width: 'auto',
        height: T.height.normal,
        opacity: 1
    }

    static propTypes = {
        width: React.PropTypes.any,
        height: React.PropTypes.any,
        margin: React.PropTypes.any,
        max: React.PropTypes.number,
        pages: React.PropTypes.number,
        checked: React.PropTypes.number,
        space: React.PropTypes.number,
        dotted: React.PropTypes.any,
        alignSelf: React.PropTypes.string,
        images: React.PropTypes.array,
        onClick: React.PropTypes.func,
        opacity: React.PropTypes.number,
    }

    componentWillReceiveProps( props ) {

        if ( this.props.pages != props.pages ) {
            //this.log(this.props.pages)
            let max = props.max || 9

            if ( max > props.pages ) {
                max = props.pages
            }

            let checked = this.state.checked

            if ( checked > max ) {
                checked = max
            }


            this.state = {
                max: max,
                num: max,
                checked: props.checked || 1,
                first: 1,
                start: max < props.pages ? max % 2 == 0 ? max / 2 - 1 : max / 2 + 0.5 : 0,
                end: max < props.pages ? max % 2 == 0 ? props.pages - (max / 2 + 1) : props.pages - max / 2 + 0.5 : 0,
                navigation: false
            }

            if ( this.props.images ) {
                this.props.onClick( 1 )
            }
        }
    }

    render() {
        const props = this.props
        const { height, pages, width, alignSelf, margin, opacity } = props
        const max = this.state.max


        return (
            <View height={height} width={width}
                  alignSelf={alignSelf}
                  alignH={'between'}
                  overflow={'visible'}
                  margin={margin}
                  style={{opacity: opacity}}
                  transition={'all'}
            >
                {
                    //后退按钮

                    <Button
                        width={height} height={height}
                        fontColor={T.palette.grey}
                        hoverFontColor={T.palette.darkBlack}
                        icon={NavigationBefore}
                        iconSize={height}
                        style={ {
                            opacity: this.state.checked > 1 && max != pages ? 1 : 0
                        }}
                        onTap={this.state.checked > 1 && max != pages ? ( e )=>this.click( e,
                            1,
                            max,
                            pages,
                            'button' ) : null}
                    />
                }
                {this.createPage( height, height, max, this.props.checked || this.state.checked, pages )}
                {
                    //前进按钮
                    <Button
                        width={height} height={height}
                        fontColor={T.palette.grey}
                        hoverFontColor={T.palette.darkBlack}
                        icon={NavigationNext}
                        iconSize={height}
                        style={ {
                            opacity: this.state.checked < pages && max != pages ? 1 : 0
                        }}
                        onTap={this.state.checked < pages && max != pages ? ( e )=>this.click( e,
                            pages,
                            max,
                            pages,
                            'button' ) : null}
                    />
                }
            </View>
        )
    }

    click( e, page, max, pages, name ) {
        e.stopPropagation()
        e.preventDefault()
        //L(this.display, page)

        switch ( name ) {
            case 'before':
                this.setState( {
                    first: 1,
                    checked: page,
                    num: max
                } )
                break
            case 'end':
                if ( page >= this.state.end ) {
                    this.setState( {
                        first: pages - max + 1,
                        checked: page,
                        num: pages
                    } )
                }
                break
            default:
                if ( page > this.state.start && page < this.state.end ) {
                    //if (first >= 1 && first + max -1 <= pages) {
                    let first = page - this.state.start + 1
                    this.setState( {
                        first,
                        checked: page,
                        num: this.state.num + first - this.state.first
                    } )
                } else {
                    if ( page <= this.state.start ) {
                        this.setState( {
                            first: 1,
                            checked: page,
                            num: max
                        } )
                    }

                    if ( page >= this.state.end ) {
                        this.setState( {
                            first: pages - max + 1,
                            checked: page,
                            num: pages
                        } )
                    }
                }
                break
        }

        this.props.onClick( page )
    }


    createPage( width, height, max, checked, pages ) {
        //this.log(this.state.start)
        //this.log(this.state.end)
        //let space = (this.props.space || 0 ) / 2

        let buttons = []

        for ( let i = this.state.first; i <= this.state.num; i++ ) {
            let index = i
            let buttonAttr = {
                style: {
                    width,
                    height,
                    borderWidth: 0,
                    fontSize: i == checked ? 28 : T.fontSize.normal,
                    backgroundColor: 'white',
                    fontWeight: i == checked ? 600 : 100,
                    cursor: 'pointer',
                    //marginLeft: space + ((checked == 1 || max == pages) && i == 1  ? width : 0),
                    //marginRight: space,
                    display: 'block',
                },
                key: i + 'pag',

                onTouchTap: ( e )=>this.click( e, index, max, pages, 'button' )
            }

            if ( this.props.dotted ) {
                buttonAttr.style[ 'borderRadius' ] = height / 2
                buttonAttr.style.backgroundColor = (i == checked ? T.palette.darkBlack : T.palette.lightGrey)
            }

            if ( this.props.images ) {
                buttonAttr.style[ 'backgroundImage' ] = 'url(' + this.props.images[ i - 1 ] + ')'
                buttonAttr.style[ 'backgroundRepeat' ] = 'no-repeat'
                buttonAttr.style[ 'backgroundSize' ] = 'cover'
                buttonAttr.style[ 'backgroundPosition' ] = 'center'
                buttonAttr.style[ 'boxShadow' ] = i == checked ? '0 0 10px ' + T.palette.main : '0 0 0 grey'
            }

            buttons.push(
                <button {...buttonAttr} >
                    {this.props.images || this.props.dotted ? null : i}
                </button>
            )
        }
        if( pages > 1 ) {
            return buttons
        }

        return null

    }
}

export default Paging