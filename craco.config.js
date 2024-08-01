const path = require("path")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        configure(webpackConfig) {
            webpackConfig.plugins.push(new MonacoWebpackPlugin())
            return webpackConfig
        }
    }
}