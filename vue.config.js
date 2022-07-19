const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const name = require('./package.json').name

module.exports = {
    publicPath: `/`,
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        sourceMap: false,
        modules: false,
        loaderOptions: {
            stylus: {
                import: [resolve('./src/assets/css/index.styl')]
            }
        }
    },
    devServer: {
        port: 8002,
        open: true
        // proxy: {
        //     '/api': {
        //         target: '',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.when(process.env.NODE_ENV !== 'development',
            config => {
                config.optimization.splitChunks({
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial'
                        },
                        elementUI: {
                            name: 'chunk-elementUI',
                            priority: 20,
                            test: /[\\/]node_modules[\\/]element-ui[\\/]/
                        },
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'),
                            minChunks: 2,
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                })
                config.optimization.runtimeChunk('single')
            }
        )
    }
}
