const path = require('path');

/*
const HtmlWebpackPlugin = require('html-webpack-plugin');


const htmlWebpackPlugin = new HtmlWebpackPlugin({
    chunks: ['example'],
    //inject:'body',
    template: path.join(__dirname, 'examples/src/index.html'),
    filename:'./index.html'
});


const htmlWebpackPlugin = new HtmlWebpackPlugin();
*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {


    devServer: {
        port: 4000,
        historyApiFallback: true
    },



    entry: {
        main: './src/index.js',
        //example: './examples/src/index.js'
    },

    output: {

        library: "react-json-previewer",
        libraryTarget: "umd",

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

    //plugins: [new CleanWebpackPlugin(), htmlWebpackPlugin],
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],


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
