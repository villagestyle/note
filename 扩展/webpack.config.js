const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 使用mini-css-extract-plugin插件来打包css文件, 将css打包到单独的css文件中, 会将所有的css样式合并为一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包到多个文件中
// const ExtractTextWebpackPlgin = require('extract-text-webpack-plugin');
// let indexLess = new ExtractTextWebpackPlgin('index.less');
// let indexCss = new ExtractTextWebpackPlgin('index.css');
module.exports = {
    mode: 'development', // 开发模式
    // 入口(entry)
    // 使用babel-polyfill来转换es的新api
    entry: ["@babel/polyfill", './src/main.js'], // 入口文件
    // entry: path.resolve(__dirname,'../src/main.js'), // 入口文件
    // 输出(output)
    output: {
        filename: '[name].[hash].js', // 打包后的文件名称, 文件的名称每次都不一样, 用以避免缓存
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    // 使用loader来解析css文件
    // postcss-loader 用来为css添加浏览器前缀
    // postcss-loader是借助autoprefixer插件给css属性添加前缀的
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // 从右向左解析原则
            },
            // 1. 打包成一个css文件(默认打包方式)
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // 使用MiniCssExtractPlugin.loader后不使用style-loader
                    'css-loader',
                    // 在wenpack.config.js中直接配置或在postcss.config.js中配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    // 'postcss-loader',
                    'less-loader'], // 从右向左解析原则
            },
            // 2. 打包到多个css文件中(方法已弃用)
            // {
            //     test: /\.css$/,
            //     use: indexCss.extract({
            //         use: ['css-loader']
            //     })
            // },
            // {
            //     test: /\.less$/,
            //     use: indexLess.extract({
            //         use: ['css-loader', 'less-loader']
            //     })
            // }

            // 打包图片, 字体, 媒体文件
            {
                test: /\.(jpe?g|png|gif)$/i, // 图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            // 使用babel-loader和babel-core来转义js文件
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modiles/
            }
            // 实际项目中的配置
            //   {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: vueLoaderConfig
            //   },
            //   { test: /\.sass$/,
            //     loaders: ['style', 'css', 'sass']
            //   },
            //   {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test')]
            //   },
            //   {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //       limit: 10000,
            //       name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            //   },
            //   {
            //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //       limit: 10000,
            //       name: utils.assetsPath('media/[name].[hash:7].[ext]')
            //     }
            //   },
            //   {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //       limit: 10000,
            //       name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            //   }
        ]
    },
    // 插件(plugins)
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // html的入口, 打包生成的js文件会被自动引入此html文件中
            filename: 'index.html',
            chunks: ['main'] // 与入口文件对应的模块名
        }),
        // 多个入口文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/header.html'),
            filename: 'header.html',
            chunks: ['header'] // 与入口文件对应的模块名
        }),
        // 配置打包输出前清空文件夹
        new CleanWebpackPlugin(),
        // 使用mini-css-extract-plugin打包
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: '[id].css'
        }),
        // 使用extract-text-webpack-plugin打包
        // indexCss,
        // indexLess
    ],
} 