var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './skin/custom-skin.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins:['transform-custom-element-classes','transform-es2015-classes']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};