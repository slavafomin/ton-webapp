
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as path from 'path';
import * as webpack from 'webpack';

import {} from 'webpack-dev-server';


const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const IS_PROD = (process.env.NODE_ENV === 'production');

const config: webpack.Configuration = {
  mode: (IS_PROD ? 'production' : 'development'),
  entry: path.resolve(srcPath, 'main.ts'),
  devtool: (IS_PROD ? 'hidden-nosources-source-map' : 'eval'),
  output: {
    path: distPath,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      'buffer': require.resolve('buffer/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: path.resolve(distPath, 'stats.json'),
      // statsOptions: {
      //   all: true,
      // },
    }),
  ],
  devServer: {
    static: {
      directory: distPath,
    },
    port: 8080,
    proxy: {
      // Proxy is required to avoid CORS issues in development
      '/toncenter': {
        target: 'https://toncenter.com/api/v2/jsonRPC',
        secure: false,
        changeOrigin: true,
        ignorePath: true,
      },
    }
  },
};

export default config;
