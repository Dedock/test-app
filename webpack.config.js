const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json')

const PATHS = {
    appRoot: path.join(__dirname, './src/client'),
    app: path.resolve(__dirname, './src/client/app'),
    dist: path.join(__dirname, './dist'),
    style: path.join(__dirname, './src/client/main.css'),
    lib: path.join(__dirname, './src/client/lib/dataService.js'),
    tabs: path.resolve(__dirname, './src/client/view/tabs'),
    node_exclude: path.resolve(__dirname, './node_modules/')
}



const common = {
    entry: {
        app:PATHS.appRoot,
        lib: PATHS.lib,
        style: PATHS.style
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                exclude: PATHS.node_exclude,
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Webpack, React, React-Router-v4, Code-split Demo',
            template: 'index.html',
            appMountId: 'app'
        })
    ]
};

//Dev server config
const development = merge(common, {
    entry: [
        'react-hot-loader/patch',
        PATHS.appRoot
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

        // display only errors - verbose output
        stats: 'errors-only',

        // parse host and port from env
        host: process.env.HOST,
        port: process.env.PORT,
        publicPath: '/'
    },

    module: {
        rules: [
            {// Define development specific CSS setup
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: PATHS.appRoot
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, '/node_modules/')
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()

    ]
})


//Build (production) config
const production = {
    entry: {
        //Extract vendor's bundle (via npm package dependencies)
        // could be manual enum [ 'react', 'react-dom', 'react-router etc ...
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: PATHS.dist,
        //Here comes code split ! module chunk's!
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        publicPath: "/",
        pathinfo: true
    },
    module: {
        rules: [
            // Extract CSS during build
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: PATHS.style
            }
        ]
    },
    //Following plugins to 'adjust' prod build
    plugins: [
        // Setting DefinePlugin production mode affects React library size!
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        //clean build folder
        new CleanPlugin([PATHS.dist]),
        // Output extracted CSS to a file
        new ExtractTextPlugin('[name].[chunkhash].css'),
        // Extract vendor files
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest'],
        }),
        new webpack.optimize.UglifyJsPlugin()
        //Pretty nice to see Bundles Map
        //new BundleAnalyzerPlugin({
        //    analyzerMode: 'static'
        //})
    ]
}

//Use config by env, if 'production' otherwise 'development'
module.exports = (env) => {

    process.env.BABEL_ENV = env

    if (env === 'production')
        return merge(common, production)

    return merge(common, development)
};
