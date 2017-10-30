var path = require('path');
var webpack = require('webpack');
    
module.exports = {
    entry: './app/js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
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
    devtool: 'source-map'
};