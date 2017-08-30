var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var loaders = [
    {
        'test': /\.js?$/,
        'exclude': /node_modules/,
        "loader": "babel",
        'query': {
            'presets': [
                'es2015',
                'stage-0'
            ],
            plugins: ['transform-runtime']
        }
    },
    {
        'test': /\.vue?$/,
        'loader': 'vue'
    },
    {
        test: /\.less$/,
        loader: "style!css!less"
    }
];

module.exports = {
    devtool: 'eval-source-map',
    // devtool: false,
    entry: path.resolve('src', 'app.js'),
    debug: false,
    output: {
        sourceMap: false,
        pathinfo: false,
        path: path.resolve('build'),
        // filename: '[name].[hash].js',//hash 后悔
        filename: '[name].js',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('.', 'index.tpl.html'),
            inject: 'body',
            output: {
                publicPath: path.resolve('.'),
            },
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {from: 'static/**'}
        ]),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
                comments: false
            }
        })
    ],
    module: {
        loaders: loaders
    },
    vue: {
        less: "css!less"
    },
    /*解决 不能使用template模板的问题*/
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    devServer: {
        headers: {"Access-Control-Allow-Origin": "*"},
        proxy: {
            '/v1/restserver/ting': {
                target: 'http://tingapi.ting.baidu.com/',
                secure: false
            },
            '/data2/music*': {
                host: "yinyueshiting.baidu.com",
                target: 'http://yinyueshiting.baidu.com/',
                secure: false,
                changeOrigin: true,
                rewrite: function (req, proxyOptions) {
                    // console.log(JSON.stringify(req));
                    delete req.headers.referer;
                    //百度referer不为空时，请求403
                    // console.log(req.headers);
                }
            }
        },
        //ip可访问
        host: "0.0.0.0"
    }
};
