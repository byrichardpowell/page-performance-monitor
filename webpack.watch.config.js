var _ = require('lodash')
var path = require('path')
var webpack = require('webpack')
var webpackBaseConfig = require('./webpack.base.config.js')

module.exports = _.extend({}, webpackBaseConfig, {

    devServer: _.extend({}, webpackBaseConfig.devServer, {
        inline: true,
        hot: true,
        progress: true,
        colors: true
    }),

    output: {
        path: __dirname,
        filename: "watch/bundle.js"
    }

});
