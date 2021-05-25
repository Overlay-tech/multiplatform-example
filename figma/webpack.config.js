const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const localUrl = 'https://b86c45f47ba8.ngrok.io';

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    figmaBridge: './src/figmaBridge.ts', // The entry point for your UI code
    main: './src/main.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'], plugins: [new TsconfigPathsPlugin()] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "figmaBridge.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['figmaBridge'],
      environment: {
        pluginEndpoint: process.env.PLUGIN_ENDPOINT ? process.env.PLUGIN_ENDPOINT : localUrl,
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.EnvironmentPlugin({
      PLUGIN_ENDPOINT: localUrl, // Only for dev env
    }),
  ],
});
