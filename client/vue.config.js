// vue.config.js
const webpack = require("webpack");

module.exports = {
    // 选项...
    publicPath: '/',
    devServer: {
        port: 8080,
        open: true,
        proxy:{
            '/api':{
                // target:'http://localhost:5000/api',
                target:'http://localhost:5000/',
                ws:true,
                changeOrigin:true,
                /* pathRewrite:{
                    '^api':'',
                }, */
            }
        },
    },
}