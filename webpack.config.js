var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
const port = 8080;
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
    entry: {
        'webcb': [
            'webpack-dev-server/client?http://localhost:' + port,
            'webpack/hot/dev-server',
            'react-hot-loader/patch',
            "./src/apps/home/webcb.js"
        ],
        'webcb-user': [
            'webpack-dev-server/client?http://localhost:' + port,
            'webpack/hot/dev-server',
            'react-hot-loader/patch',
            "./src/apps/user/webcb-user.js"
        ],
        'webcb-shop': [
            'webpack-dev-server/client?http://localhost:' + port,
            'webpack/hot/dev-server',
            'react-hot-loader/patch',
            "./src/apps/shop/webcb-shop.js"
        ]
    },
    output: {
        path: __dirname + "/build/",
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // loaders: ['react-hot', "babel"],
            loaders: ["babel"],
            exclude: /node_modules|tools/,
            include: [path.join(__dirname, 'src')]
        }, {
            test: /\.css$/,
            loader: "css-loader"
        }, {
            test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"
        }]
    },
    plugins: [
        commonsPlugin,
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': 'development'
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new DashboardPlugin(dashboard.setData)
    ],
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        hot: true,
        inline: true,
        quiet: true
    },
    devtool: "#inline-source-map",
    port: port
};