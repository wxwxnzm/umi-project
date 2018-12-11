export default {
    base: '/studentCommentEditor/index.html',
    publicPath: './',
    outputPath: '../studentCommentEditor/',
    chainWebpack(config, { webpack }) {
        config.optimization.splitChunks({
            cacheGroups: {
              vendors: {
                name: 'vendors',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
              },
              commons: {
                name: 'commons',
                chunks: 'async',
                minChunks: 1,
                minSize: 0,
              },
            },
        });
        config.merge({
          plugin: {
            install: {
              plugin: require('uglifyjs-webpack-plugin'),
              args: [{
                sourceMap: false,
                uglifyOptions: {
                  compress: {
                    // 删除所有的 `console` 语句
                    drop_console: true,
                  },
                  output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                  },
                }
              }]
            }
          }
        })
    },
};