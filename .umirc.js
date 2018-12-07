const path = require('path');
const CleanCSSPlugin = require("less-plugin-clean-css");
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer')
const src = path.resolve(__dirname, 'src');
export default {
    // base: '/admin/',
    // publicPath: 'http://cdn.com/foo',
    // D:\idea\eduboss-platform\src\main\webapp\app\h5app\student
    outputPath: '../../../idea/eduboss-platform/src/main/webapp/app/h5app/student/studentCommentEditor/',
    plugins: [
      ['umi-plugin-react', {
        dva: true,
        antd: true,
        dll: {
            exclude: ['src']
        },
        // hardSource: true,
        fastClick: true,
        routes: {
          exclude: [
            /models\//,
          ],
        },
      }],
    ],
    hash: true,
    exportStatic: {htmlSuffix: true},
    // chainWebpack(config, { webpack }) {
    //     config.merge({
    //       plugin: {
    //         install: {
    //           plugin: require('uglifyjs-webpack-plugin'),
    //           args: [{
    //             sourceMap: false,
    //             uglifyOptions: {
    //               compress: {
    //                 // 删除所有的 `console` 语句
    //                 // drop_console: true,
    //               },
    //               output: {
    //                 // 最紧凑的输出
    //                 beautify: false,
    //                 // 删除所有的注释
    //                 comments: false,
    //               },
    //             }
    //           }]
    //         }
    //       }
    //     })
    // },
    theme: "./theme.config.js",
    cssLoaderOptions: {
        // context: 'src', 
        localIdentName: "[local]_[hash:base64:8]",
        plugins: [
            new CleanCSSPlugin({ advanced: true })
        ]
    },
    // cssModulesExcludes: ['src/assets/css/am.css'],
    // lessLoaderOptions: {
    //     importLoaders: 1,
    //     modules: true,
    //     sourceMap: true,
    //     context: 'src', 
    //     localIdentName: "[local]_[hash:base64:8]",
    //     plugins: [
    //         new CleanCSSPlugin({ advanced: true })
    //     ]
    // },
    alias: {
        SRC: src,
        assets: path.resolve(src, 'assets'),
        components: path.resolve(src, 'components'),
        services: path.resolve(src, 'services'),
        routes: path.resolve(src, 'routes'),
        svg: path.resolve(src, 'svg'),
        utils: path.resolve(src, 'utils'),
    },
    extraPostCSSPlugins: [
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        }),
        autoprefixer
    ],
    proxy: {
      "/eduboss": {
        // "target": "http://www.xuebangsoft.net/",
        "target": "http://uat3.xuebangsoft.net/",
        // "target": "http://192.168.2.175:8080/",
        // "target": "http://192.168.2.195:8080/",
        "changeOrigin": true
      }
    },
};