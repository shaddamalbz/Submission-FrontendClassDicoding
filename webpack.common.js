const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry:"./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpeg?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
                
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}