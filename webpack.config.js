var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:  {
        app : './app/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            }
        ]
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty',
        child_process: 'empty',
    },
    devtool: 'source-map',
    plugins: [
        
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: '../index.html',
            template: 'app/template.html',
            inject:true
        }),
        new CleanWebpackPlugin(["public"]),
        new ExtractTextPlugin("[name].css")
    ]
};