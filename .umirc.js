const path = require('path');
const CleanCSSPlugin = require("less-plugin-clean-css");
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer')
const src = path.resolve(__dirname, 'src');
export default {
    plugins: [
      ['umi-plugin-react', {
        dva: true,
        antd: true,
        dll: {
            exclude: ['src']
        },
        // dynamicImport: {
        //     webpackChunkName: true,
        // },
        dynamicImport: true,
        chunks: ['vendors', 'umi'],
        // hardSource: true,
        fastClick: true,
        routes: {
          exclude: [
            /models\//,
          ],
        },
      }],
      ['./customPlugin.js', {name: 'app'}]
    ],
    hash: true,
    exportStatic: {htmlSuffix: true},
    theme: "./theme.config.js",
    cssLoaderOptions: {
        // context: 'src', 
        localIdentName: "[local]_[hash:base64:8]",
        plugins: [
            new CleanCSSPlugin({ advanced: true })
        ]
    },
    define: {
        // 添加这个自定义的环境变量
        "process.env.UMI_ENV": process.env.UMI_ENV, // * 本地开发环境：dev，测试服：test，正式服：prod
    },
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