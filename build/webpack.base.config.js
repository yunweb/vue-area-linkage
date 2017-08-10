'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HappyPack = require('happypack');

let getHappyPackConfig = require('./happypack');

let config = require('../config');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'happypack/loader?id=vue'
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=js']
            }
        ]
    },

    resolve:{
        extensions:[".vue",".js"],
        modules: [path.join(__dirname, '../node_modules')],
        alias:{
            '@gh': path.resolve(__dirname, '../gh'),
            '@components': path.resolve(__dirname, '../gh/components'),
            'vue$': 'vue/dist/vue.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new HappyPack(getHappyPackConfig({
            id: 'vue',
            loaders: [{
                path: 'vue-loader',
                query: {
                    // https://github.com/vuejs/vue-loader/issues/863
                    esModule: false
                }
            }]
        })),

        new HappyPack(getHappyPackConfig({
            id: 'js',
            loaders: ['babel-loader']
        })),


        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'tpl.html',
            inject: true,
            env: process.env.NODE_ENV,
            minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false
            }
        })
    ]
};
