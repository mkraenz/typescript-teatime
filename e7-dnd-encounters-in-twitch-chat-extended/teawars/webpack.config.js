// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");
const webpack = require("webpack");

module.exports = (env, argv) => ({
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
            { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./"),
        publicPath: "/build/",
        host: "localhost",
        port: 8080,
        open: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            phaser,
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            WEBSOCKET_SERVER_URL:
                argv.mode === "production"
                    ? "http://localhost:63140"
                    : "http://localhost:3000",
        }),
    ],
});
