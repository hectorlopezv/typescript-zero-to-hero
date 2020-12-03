
const path =  require('path');
const cleanPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }, 
    module: {//apllied per file
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [//aply to general workflow end?
        new cleanPlugin.CleanWebpackPlugin()
    ]
};