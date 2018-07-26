const slsw = require('serverless-webpack')

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: 'development',
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname,
                exclude: /node_modules/
            }
        ]
    }
};