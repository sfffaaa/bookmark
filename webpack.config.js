const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './frontend/app.js',
    output: {
        path: `${__dirname}/build`,
        filename: 'app.bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './frontend/index.html',
        hash: true,
    })],
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
};
