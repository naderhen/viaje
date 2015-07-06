'use strict';

import path from 'path';
import webpack from 'webpack';
import {isArray} from 'lodash';

import writeStats from './utils/write-stats';
import startServer from './utils/start-server';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const LOCAL_IP = require('dev-ip')();

const PROTOCOL = (process.env.C9_HOSTNAME) ? 'https' : 'http';
const HOST = process.env.C9_HOSTNAME || isArray(LOCAL_IP) && LOCAL_IP[0] || LOCAL_IP || 'localhost';
const PORT = (process.env.C9_HOSTNAME) ? '443' : parseInt(process.env.PORT) + 1 || 3001;
const PUBLIC_PATH = `${PROTOCOL}://${HOST}:${PORT}/assets/`;

export default {
    server: {
        port: PORT,
        options: {
            publicPath: (process.env.C9_HOSTNAME) ? '/' : PUBLIC_PATH,
            hot: true,
            stats: {
                assets: true,
                colors: true,
                version: false,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false
            }
        }
    },
    webpack: {
        devtool: 'eval-source-map',
        entry: {
            app: [
                `webpack-dev-server/client?http://localhost:${PORT}`,
                'webpack/hot/only-dev-server',
                './app/index.js'
            ],
            vendors: [
                './app/vendors.js'
            ]
        },
        publicPath: PUBLIC_PATH,
        output: {
            path: path.join(__dirname, '../dist'),
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[hash].js',
            publicPath: PUBLIC_PATH
        },
        module: {
            preLoaders: [
                // {
                //     test: /\.js$|.jsx$/,
                //     exclude: /node_modules/,
                //     loader: 'eslint'
                // }
            ],
            loaders: [
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
                    loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
                },
                {
                    test: /\.js$|.jsx$/,
                    exclude: /node_modules/,
                    loaders: ['react-hot', 'babel']
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
                }
            ]
        },
        plugins: [

            // extract css
            new ExtractTextPlugin('[name]-[hash].css'),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify('development')
                }
            }),

            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({}),
            function () {
                this.plugin('done', writeStats);
            },

            function () {
                this.plugin('done', startServer);
            }

        ],
        resolve: {
            extensions: ['', '.js', '.json', '.jsx'],
            modulesDirectories: ['node_modules', 'app']
        }
    }
};
