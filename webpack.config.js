const webpack = require("webpack");
const path = require("path");
const cssExtract = require("mini-css-extract-plugin");
const cssMinimizer = require("optimize-css-assets-webpack-plugin");
const jsMinimizer = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new jsMinimizer({
                parallel: true
            }),
            new cssMinimizer({})
        ]
    } ,
    plugins:[
        new cssExtract({
            filename: "index.css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets:["env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    cssExtract.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot:true,
        open: true,
        port: 10021
    }
};