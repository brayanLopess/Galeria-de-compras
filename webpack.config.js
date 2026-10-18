const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    target: "web",
    mode: "development",

    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        filename: "main.contenthash.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        clean: true
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        client: {
            logging: "warn",
        },
        watchFiles: [path.resolve(__dirname, "index.html")],
        port: 3000,
        open: true,
        liveReload: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            favicon: path.resolve(__dirname, "src", "assets", "favIcon.svg")
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "index.html"),
                    to: path.resolve(__dirname, "dist", "src", "assets")
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets", "images"),
                    to: path.resolve(__dirname, "dist", "src", "assets", "images")
                },
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets", "icons"),
                    to: path.resolve(__dirname, "dist", "src", "assets", "icons")
                },
            ]
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: "asset/resource",
            },
        ]
    }
}