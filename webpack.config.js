const merge = require('webpack-merge');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WorkerPlugin = require('worker-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { createDefaultConfig } = require('@open-wc/building-webpack');
const config = createDefaultConfig({
  input: path.resolve(__dirname, './index.html'),
});

module.exports = (env, argv) => {
  return merge(config, {
    output: {
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(s*)css$/i,
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./node_modules'],
                }
              },
            }
          ]
        },
      ],
    },
    plugins: [
      new WorkerPlugin(),
      new CopyPlugin([
        { from: './robots.txt', to: './' },
        { from: './favicon.ico', to: './' },
        { from: './_redirects', to: './' }
      ]),
      argv.mode !== 'production' ? new BundleAnalyzerPlugin() : false,
    ].filter(Boolean),
    devtool: argv.mode !== 'production' ? 'source-map' : 'false',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true
    }
  })
}