var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

module.exports = {
    entry: {
        'webcb': [
            "./src/apps/home/webcb.js"
        ],
        'webcb-user': [
            "./src/apps/user/webcb-user.js"
        ],
        'webcb-shop': [
            "./src/apps/shop/webcb-shop.js"
        ],
    },
    output: {
        path: __dirname + "/",
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["babel"],
            exclude: /node_modules|tools/,
            include: [path.join(__dirname, 'src')]
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"
        }]
    },
    plugins: [
        commonsPlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};