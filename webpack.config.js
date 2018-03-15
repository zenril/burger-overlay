const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let pathsToClean = [
    'build'
];

let cleanOptions = {
    root:     path.resolve(__dirname),
    exclude:  ['.htaccess'],
    verbose:  true,
    dry:      false
};

// function HelloAsyncPlugin(options) {
//     var _this = this;
//     this.options = options;
//     _this.files = {};
//     _this.done = 0;

    
//     _this.write = function(callback){
//         fs.writeFile(_this.options.write, JSON.stringify(_this.files), 'utf8', function (err) {
//             if (err) {
//                 return console.log(err);
//             }

//             console.log("The file was saved!");
//             callback();
//         }); 
//     }


// }

// HelloAsyncPlugin.prototype.apply = function(compiler) {
//     var _this = this;


//     compiler.plugin("emit", function(compilation, callback) {

//         fs.readdir(_this.options.read, function(err, flist){
//             var keep = [];
//             for (let i = 0; i < flist.length; i++) {
//                 const element = flist[i];
//                 if(/svg/g.test(element)){
//                     keep.push(element);
//                 }
//             }

//             for (let j = 0; j < keep.length; j++) {
//                 const element = keep[j];
//                 sizeOf( path.resolve(_this.options.read, element) ).then(function(size){
//                     _this.files[element] = {
//                         ratio : size.width / size.height
//                     };

//                     _this.done++;

//                     if(_this.done == keep.length){
//                         _this.write(callback);
//                     }
//                 });
//             }

                          

//         });
    
//     });

// };

// module.exports = HelloAsyncPlugin;

module.exports = {
    entry:  {
        app : './app/js/App.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js?cache=[hash:11]',
        publicPath: '/'
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
        new CopyWebpackPlugin([
            { from: '.htaccess', to: './' }  
        ]),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: '../build/index.html',
            template: 'app/template.html',
            inject:true
        }),
        new CleanWebpackPlugin(["build/*.*"], cleanOptions),
        new ExtractTextPlugin("[name].css?cache=[hash:10]"),
        // new HelloAsyncPlugin({
        //     read : path.resolve(__dirname, 'app/img/svgs'),
        //     write : path.resolve(__dirname, 'build/json.json')
        // })
    ]
};