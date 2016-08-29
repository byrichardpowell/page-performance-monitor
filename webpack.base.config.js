var path = require('path')
var webpack = require('webpack')

module.exports = {

    entry: "./src/index.js",

    devServer: {
        host: '127.0.0.1',
        port: '4000',
    },

    resolve: {
        root: [path.join(__dirname, "./src/")],
        extensions: ['', '.js'],
        alias: {
            helpers: path.join(__dirname, "src/helpers"),
            report: path.join(__dirname, "src/report"),
            time: path.join(__dirname, "src/time")
        }
    }

};
