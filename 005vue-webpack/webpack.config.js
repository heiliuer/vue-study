var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    }
];

module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve('src', 'main.js'),
    output: {
        path: path.resolve('build'),
        filename: '[name].js',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'index.tpl.html'),
            inject: 'body',
            filename: 'index.html'
        })
    ],
    module: {
        loaders: loaders
    }
};
