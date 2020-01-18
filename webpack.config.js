const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename:'./index.html'
});

module.exports = {


    devServer: {
        //port: 3001
        historyApiFallback: true
    },

    entry: './examples/src/index.js',
    //entry: './src',

    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: "babel-loader"
        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        }
        ]
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

    plugins: [htmlWebpackPlugin]


};
