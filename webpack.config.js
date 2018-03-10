const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = [
    'build'
];

let cleanOptions = {
    root:     path.resolve(__dirname),
    exclude:  ['shared.js'],
    verbose:  true,
    dry:      false
};


module.exports = {
    entry:  {
        app : './app/js/App.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.[hash:10].js',
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
            },
            {
                loader: 'url-loader',
                test: /\.(svg|ogg)$/,
                options: {
                    limit: 250,
                }
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
        new CleanWebpackPlugin(["build"], cleanOptions),
        new ExtractTextPlugin("[name].[hash:10].css")
    ]
};