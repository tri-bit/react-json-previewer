const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    chunks: ['example'],
    template: path.join(__dirname, 'examples/src/index.html'),
    filename:'./index.html'
});

module.exports = {


    devServer: {
        port: 3001,
        historyApiFallback: true
    },

    //entry: './examples/src/index.js',
    entry: {
        main: './src/index.js',
        example: './examples/src/index.js'
    },

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

    plugins: [htmlWebpackPlugin],

    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }


};
