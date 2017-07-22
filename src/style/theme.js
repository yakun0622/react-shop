/**
 * Created by kenn on 16/7/6.
 */

import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {fade} from 'material-ui/utils/colorManipulator'
import {
    cyan500,
    cyan700,
    pinkA200,
    grey100,
    grey300,
    grey400,
    grey500,
    grey700,
    grey800,
    grey900,
    orange500,
    red500,
    lime900,
    white,
    darkBlack,
    fullBlack,
} from 'material-ui/styles/colors';


const fontSize = {
    max:    18,
    big:    15,
    normal: 13,
    small:  12,
    min:    11
}
const height = {
    max:          64,
    big:          48,
    normal:       40,
    small:        32,
    min:          24,
    headerHeight: 80
}
const palette = {
    main:     cyan500,
    //main:     '#03A9F4',
    main900a: fade( cyan500, 0.9 ),
    main300a: fade( cyan500, 0.8 ),
    main600a: fade( cyan500, 0.6 ),

    white:     white,
    white300a: fade( white, 0.3 ),
    white600a: fade( white, 0.6 ),
    white800a: fade( white, 0.8 ),

    minGrey:   grey100,
    lightGrey: grey300,
    grey:      grey500,
    maxGrey:   grey800,

    darkBlack: grey900,
    black300a: fade( grey900, 0.3 ),
    black700a: fade( grey900, 0.7 ),

    gold: lime900,

    red: '#D81B60',

    transparent: fade( white, 0 ),

    green: '#4CAF50',

    orange: orange500,
    orange800a: fade( orange500, 0.8 ),

    error: red500
}

const theme = {
    fontFamily: "Microsoft YaHei, Arial",
    Header:     {
        height: 80
    },

    GoodsCard: {
        width: 200,
    },

    baseTheme: {
        fontSize,
        height,
        palette
    },

    menuItem: {
        selectedTextColor: palette.main
    },
}

//console.log(getMuiTheme(baseTheme));
console.log( getMuiTheme( theme ) );

//let a = {a: 1, b: {c:4}}
//let b = {a: 1, b: {c:4}}
//console.log(JSON.stringify(a) == JSON.stringify(b));
export default getMuiTheme( theme )