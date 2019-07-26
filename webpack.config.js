var webpack = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 页面入口文件配置
    entry : {
        'view/main/layout/index': './client/static/js/view/main/layout/index.js',
        'view/main/index/index': './client/static/js/view/main/index/index.js',
        'view/main/moodEssay/index': './client/static/js/view/main/moodEssay/index.js',
        'view/weather/index': './client/static/js/view/weather/index.js'
    },
    // 入口文件输出配置
    output : {
        path : __dirname + '/client/static/output/',
        filename : 'js/[name].bundle.js',
        publicPath : 'http://localhost:8080/client/static/output/'
    },
    module: {
        // 加载器配置
        rules: [
            {
                test: /\.js?$/,
                //loader: 'babel?presets[]=react&presets[]=es2015'
                loader: ['babel-loader']
            },
        // {
        //     test: /\.js$/,
        //     //loader: 'babel?presets[]=react&presets[]=es2015'
        //     loader: 'babel-loader!jsx-loader?harmony'
        // },
        // {
        //     test: /\.jsx$/,
        //     loader: 'babel-loader!jsx-loader?harmony'
        //     //loader: 'babel-loader!jsx-loader?harmony'
        // },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
         //处理图片
        {
            //处理图片包含有参数的图片
            test: /\.(gif|png|jpg|svg)\??.*$/i,
            loaders: [
                //小于8k的图片编译为base64，大于10k的图片使用file-loader            
                'url-loader?limit=8192&name=image/[name]-[hash:5].[ext]',
                //图片压缩
                'image-webpack-loader'
            ]  
        },
         //处理字体文件
         { 
             test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
             loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font/[name]-[hash:5].[ext]" 
        },
         {
            test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: [
                'url-loader?limit=10000&name=font/[name]-[hash:5].[ext]'
            ]
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