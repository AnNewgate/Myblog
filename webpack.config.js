var webpack = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 页面入口文件配置
    entry : {
        'view/main/index': './client/static/js/view/main/index.js'
    },
    // 入口文件输出配置
    output : {
        path : __dirname + '/client/static/output/js/',
        filename : '[name].bundle.js'
    },
    module: {
        // 加载器配置
        rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader!jsx-loader?harmony'
            //loader: 'babel-loader!jsx-loader?harmony'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }
        ]        
    },
    // 其他解决方案配置
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.json'],
    },
    // 插件项
    // plugins : [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ],
    // optimization: {
    //     minimizer: [
    //     new UglifyJsPlugin({
    //         sourceMap: true,
    //         compress: {
    //                warnings: false,
    //         },
    //     }),
    //     ],
    // },
    // optimization: {
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         uglifyOptions: {
    //           compress: {
    //             drop_console: true,
    //           }
    //         }
    //       })
    //     ]
    // }
}